import { useState, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { useToast } from '@/hooks/use-toast';
import VehicleCard from '@/components/VehicleCard';
import { set } from 'date-fns';
import { Vehicle } from '@/components/VehicleCard';
import { useNavigate } from "react-router-dom";


// Types
export type ConversationStatus = 'idle' | 'connecting' | 'connected' | 'error';

interface UseVoiceSessionProps {
  agentId: string;
  bookingId: string;
}

export const useVoiceSession = ({ agentId, bookingId }: UseVoiceSessionProps) => {
  const { toast } = useToast();
  
  // State
  const [status, setStatus] = useState<ConversationStatus>('idle');
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);
  const [carDetails, setCarDetails] = useState<Vehicle | null>(null);
  const navigate = useNavigate();
  

  // ElevenLabs Conversation Hook
  const conversation = useConversation({
    clientTools: {
      dismissCar: async () => {
        setShowVehicle(false);
        return "Image Hidden Successfully";
      },
      showCar : async (vehicle: Vehicle) => {
        setShowVehicle(true);
        setCarDetails(vehicle);
        return "Car Details Displayed Successfully";
      },
      redirect_to_confirmation_page: async () => {
        navigate("/confirmation");
    }
  },
    onConnect: () => {
      setStatus('connected');
    },
    onDisconnect: () => {
      setStatus('idle');
      setIsUserSpeaking(false);
      setShowVehicle(false);
      // navigate("/confirmation");
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      setStatus('error');
      toast({
        title: "Connection Error",
        description: typeof error === 'string' ? error : "Failed to connect to agent.",
        variant: "destructive",
      });
    },
  });

  // Actions
  const startSession = useCallback(async () => {
    try {
      setStatus('connecting');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      await conversation.startSession({
        agentId,
        connectionType: 'webrtc',
        dynamicVariables: { booking_id: bookingId }
      });
    } catch (error) {
      setStatus('error');
      console.error('Failed to start session:', error);
      toast({
        title: "Microphone Error",
        description: "Could not access microphone.",
        variant: "destructive",
      });
    }
  }, [agentId, bookingId, conversation, toast]);

  const endSession = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (e) {
      console.error("Error ending session", e);
    } finally {
      setStatus('idle'); // Ensure cleanup
    }
  }, [conversation]);

  const toggleSession = () => {
    if (status === 'connected') {
      endSession();
    } else {
      startSession();
    }
  };

  return {
    status,
    isUserSpeaking,
    showVehicle,
    toggleSession,
    carDetails
  };
};