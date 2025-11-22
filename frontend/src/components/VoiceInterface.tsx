import React from 'react';
import { useVoiceSession } from './useVoiceSession.tsx';
import { MicButton } from './MicButton.tsx';
import { StatusDisplay } from './StatusDisplay.tsx';

const AGENT_ID = (import.meta as any).env.VITE_AGENT_ID as string;



const VoiceInterface: React.FC = ({}) => {
  // 1. Get Booking Context
  const bookingId = sessionStorage.getItem("bookingId") || "Unknown Booking";
  console.log("VoiceInterface Booking ID:", bookingId);
  // 2. Initialize Logic Hook
  const { 
    status, 
    isUserSpeaking, 
    activeImage, 
    toggleSession 
  } = useVoiceSession({ 
    agentId: AGENT_ID, 
    bookingId 
  });

  // 3. Render
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <MicButton 
        status={status}
        isUserSpeaking={isUserSpeaking}
        onClick={toggleSession}
      />
      
      <StatusDisplay 
        status={status}
        isUserSpeaking={isUserSpeaking}
        activeImage={activeImage}
      />
    </div>
  );
};

export default VoiceInterface;