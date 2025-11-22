import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { ConversationStatus } from './useVoiceSession.tsx';
import { cn } from '@/lib/utils'; // Assuming you have a class merger utility

interface MicButtonProps {
  status: ConversationStatus;
  isUserSpeaking: boolean;
  onClick: () => void;
}

export const MicButton: React.FC<MicButtonProps> = ({ status, isUserSpeaking, onClick }) => {
  const isConnecting = status === 'connecting';
  const isConnected = status === 'connected';

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        disabled={isConnecting}
        className={cn(
          "w-32 h-32 rounded-full text-white font-bold shadow-lg transition-all duration-300",
          isConnected ? "bg-primary hover:bg-primary-hover" : "bg-secondary hover:bg-secondary/90",
          isUserSpeaking && "animate-glow"
        )}
      >
        {isConnecting ? (
          <div className="animate-pulse">
            <Loader2 className="w-12 h-12 animate-spin" /> 
          </div>
        ) : isConnected ? (
          <div className={cn(isUserSpeaking && "animate-scale-pulse")}>
            <Mic className="w-12 h-12" />
          </div>
        ) : (
          <MicOff className="w-12 h-12" />
        )}
      </Button>

      {/* Speaking Ring Animation */}
      {isUserSpeaking && (
        <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-75 pointer-events-none" />
      )}
    </div>
  );
};