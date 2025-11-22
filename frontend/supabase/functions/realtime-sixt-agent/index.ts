import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  // Upgrade to WebSocket
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket", { status: 426 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  let openaiWs: WebSocket | null = null;

  socket.onopen = () => {
    console.log("Client connected");
    
    // Connect to OpenAI Realtime API
    openaiWs = new WebSocket(
      "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "OpenAI-Beta": "realtime=v1",
        },
      }
    );

    openaiWs.onopen = () => {
      console.log("Connected to OpenAI");
      
      // Configure session with SIXT sales agent prompt
      const sessionConfig = {
        type: "session.update",
        session: {
          modalities: ["text", "audio"],
          instructions: `You are a professional SIXT rental sales agent. Your role is to help customers find the perfect vehicle upgrade.

Guidelines:
- Be friendly, professional, and enthusiastic about SIXT's premium service
- Ask about their trip purpose (business, leisure, family)
- Inquire about passenger count and luggage needs
- Ask about preferred features (luxury, performance, fuel efficiency)
- Suggest 2-3 vehicles that match their criteria
- Emphasize SIXT's premium quality and service

When you have gathered enough information, say "Based on what you've told me, I have some excellent recommendations for you" and end the conversation.`,
          voice: "alloy",
          input_audio_format: "pcm16",
          output_audio_format: "pcm16",
          input_audio_transcription: {
            model: "whisper-1",
          },
          turn_detection: {
            type: "server_vad",
            threshold: 0.5,
            prefix_padding_ms: 300,
            silence_duration_ms: 1000,
          },
          temperature: 0.8,
          max_response_output_tokens: "inf",
        },
      };

      openaiWs!.send(JSON.stringify(sessionConfig));
    };

    openaiWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("OpenAI event:", data.type);
      
      // Forward all OpenAI events to client
      socket.send(event.data);

      // Check if conversation should end
      if (data.type === "response.done") {
        // Extract recommendations from conversation
        // For now, send mock recommendations
        const mockRecommendations = [
          {
            id: "1",
            name: "BMW 5 Series",
            category: "Premium Sedan",
            price: 89,
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
            features: ["Leather Interior", "Navigation", "Premium Sound"],
            recommended: true,
          },
          {
            id: "2",
            name: "Mercedes E-Class",
            category: "Luxury Sedan",
            price: 95,
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
            features: ["Massage Seats", "360° Camera", "Adaptive Cruise"],
            recommended: true,
          },
        ];

        socket.send(JSON.stringify({
          type: "conversation.complete",
          recommendations: mockRecommendations,
        }));
      }
    };

    openaiWs.onerror = (error) => {
      console.error("OpenAI WebSocket error:", error);
      socket.send(JSON.stringify({
        type: "error",
        message: "Connection to AI service failed",
      }));
    };

    openaiWs.onclose = () => {
      console.log("OpenAI connection closed");
      socket.close();
    };
  };

  socket.onmessage = (event) => {
    // Forward client messages to OpenAI
    if (openaiWs && openaiWs.readyState === WebSocket.OPEN) {
      openaiWs.send(event.data);
    }
  };

  socket.onclose = () => {
    console.log("Client disconnected");
    if (openaiWs) {
      openaiWs.close();
    }
  };

  socket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
  };

  return response;
});
