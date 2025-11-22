import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useConversation } from '@elevenlabs/react';
import { Mic, MicOff } from 'lucide-react';

const AGENT_ID = import.meta.env.VITE_AGENT_ID as string;

interface VoiceInterfaceProps {
  onComplete: (recommendations: any[]) => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ 
  onComplete 
}) => {
    const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      setConversationStatus("connected");
    },
    onDisconnect: () => {
      setIsConnected(false);
      setConversationStatus("idle");
      setIsUserSpeaking(false);
    },
  });
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [conversationStatus, setConversationStatus] =
    useState<"idle" | "connecting" | "connected" | "error">("idle");
  const startConversation = async () => {
    try {
      setConversationStatus("connecting");
      
      // Request microphone access
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Connect to WebSocket edge function
      console.log('Starting conversation with AGENT_ID:', AGENT_ID);
      const conversationId = await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc', // either "webrtc" or "websocket"
        userId: '<your-end-user-id>', // optional field
});

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

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      console.error("Error ending conversation:", e);
    } finally {
      setIsConnected(false);
      setIsUserSpeaking(false);
      setConversationStatus("idle");
    }
  };

  // Derive a nice status label for the UI
  let statusLabel = "Ready to start";
  if (conversationStatus === "connecting") statusLabel = "Connecting...";
  else if (conversationStatus === "error") statusLabel = "Connection failed";
  else if (isConnected && !isUserSpeaking) statusLabel = "Listening...";
  else if (isUserSpeaking) statusLabel = "You're speaking";

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <Button
          onClick={isConnected ? endConversation : startConversation}
          disabled={conversationStatus === "connecting"}
          className={`
            w-32 h-32 rounded-full text-white font-bold shadow-lg
            transition-all duration-300
            ${
              isConnected
                ? "bg-primary hover:bg-primary-hover"
                : "bg-secondary hover:bg-secondary/90"
            }
            ${isUserSpeaking ? "animate-glow" : ""}
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

        {isUserSpeaking && (
          <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-75" />
        )}
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-foreground">{statusLabel}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {!isConnected
            ? "Click the button to start your conversation"
            : "Click again to end the conversation"}
        </p>
      </div>
    </div>
  );
};

export default VoiceInterface;