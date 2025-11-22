import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff } from 'lucide-react';

interface VoiceInterfaceProps {
  onSpeakingChange: (speaking: boolean) => void;
  onComplete: (recommendations: any[]) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  onSpeakingChange,
  onComplete 
}) => {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [conversationStatus, setConversationStatus] = useState<string>("idle");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const startConversation = async () => {
    try {
      setConversationStatus("connecting");
      
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect to WebSocket edge function
      const ws = new WebSocket(
        `wss://jrdndvepzbvlfojuamsk.supabase.co/functions/v1/realtime-sixt-agent`
      );

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setConversationStatus("connected");
        
        toast({
          title: "Connected",
          description: "Voice interface is ready. Start speaking!",
        });
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received:", data);

        // Handle different event types
        if (data.type === 'response.audio.delta') {
          onSpeakingChange(true);
        } else if (data.type === 'response.audio.done') {
          onSpeakingChange(false);
        } else if (data.type === 'conversation.complete') {
          // AI has finished gathering info and has recommendations
          if (data.recommendations) {
            onComplete(data.recommendations);
          }
        } else if (data.type === 'input_audio_buffer.speech_started') {
          setIsUserSpeaking(true);
        } else if (data.type === 'input_audio_buffer.speech_stopped') {
          setIsUserSpeaking(false);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to voice service",
          variant: "destructive",
        });
        setConversationStatus("error");
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        setConversationStatus("disconnected");
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to start conversation',
        variant: "destructive",
      });
      setConversationStatus("error");
    }
  };

  const endConversation = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }
    setIsConnected(false);
    onSpeakingChange(false);
    setConversationStatus("idle");
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Animated Microphone Button */}
      <div className="relative">
        <Button
          onClick={isConnected ? endConversation : startConversation}
          disabled={conversationStatus === "connecting"}
          className={`
            w-32 h-32 rounded-full text-white font-bold shadow-lg
            transition-all duration-300
            ${isConnected 
              ? 'bg-primary hover:bg-primary-hover' 
              : 'bg-secondary hover:bg-secondary/90'
            }
            ${isUserSpeaking ? 'animate-glow' : ''}
          `}
        >
          {conversationStatus === "connecting" ? (
            <div className="animate-pulse">
              <Mic className="w-12 h-12" />
            </div>
          ) : isConnected ? (
            <div className={isUserSpeaking ? "animate-scale-pulse" : ""}>
              <Mic className="w-12 h-12" />
            </div>
          ) : (
            <MicOff className="w-12 h-12" />
          )}
        </Button>

        {/* Speaking Indicator Ring */}
        {isUserSpeaking && (
          <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-75" />
        )}
      </div>

      {/* Status Text */}
      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">
          {conversationStatus === "connecting" && "Connecting..."}
          {conversationStatus === "connected" && !isConnected && "Ready to start"}
          {isConnected && !isUserSpeaking && "Listening..."}
          {isUserSpeaking && "You're speaking"}
          {conversationStatus === "error" && "Connection failed"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {!isConnected 
            ? "Click the button to start your conversation" 
            : "Click again to end the conversation"
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceInterface;
