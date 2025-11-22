import { ConversationStatus } from '../hooks/useVoiceSession.tsx';

interface StatusDisplayProps {
  status: ConversationStatus;
  isUserSpeaking: boolean;
  activeImage: string | null;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ 
  status, 
  isUserSpeaking, 
  activeImage 
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
      {activeImage && (
        <img
          src={activeImage}
          alt="Car Pitcture"
          className="w-64 h-40 object-cover rounded-lg shadow-md animate-in fade-in zoom-in duration-300"
        />
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