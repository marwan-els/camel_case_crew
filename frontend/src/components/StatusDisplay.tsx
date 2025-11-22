import { ConversationStatus } from '../hooks/useVoiceSession.tsx';
import VehicleCard from './VehicleCard.tsx';
import { Vehicle } from './VehicleCard.tsx'

interface StatusDisplayProps {
  status: ConversationStatus;
  isUserSpeaking: boolean;
  showVehicle: boolean;
  carDetails: Vehicle | null;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ 
  status, 
  isUserSpeaking, 
  showVehicle,
  carDetails
}) => {
  
  const getStatusLabel = () => {
    switch (status) {
      case 'connecting': return "Connecting...";
      case 'error': return "Connection failed";
      case 'connected': return isUserSpeaking ? "You're speaking" : "Listening...";
      default: return "Ready to start";
    }
  };

  return (
    <div className="text-center flex flex-col items-center gap-4">
      {showVehicle && (
        <VehicleCard vehicle={carDetails} />
      )}
      
      <div>
        <p className="text-lg font-semibold text-foreground">
            {getStatusLabel()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {status === 'idle' 
            ? "Click the button to start your conversation" 
            : "Click again to end the conversation"}
        </p>
      </div>
    </div>
  );
};