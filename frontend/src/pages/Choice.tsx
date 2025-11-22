import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, FileText } from "lucide-react";

const Choice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-foreground mb-2">SIXT</h1>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How would you like to proceed?
          </h2>
          <p className="text-muted-foreground">
            Choose your preferred method to upgrade your rental
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Agent Option */}
          <Card 
            className="p-8 hover:shadow-[0_0_30px_hsla(20,100%,50%,0.3)] transition-shadow cursor-pointer group"
            onClick={() => navigate("/ai-agent")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:animate-scale-pulse transition-transform">
                <Mic className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground">
                Talk to AI Agent
              </h3>
              
              <p className="text-muted-foreground">
                Have a conversation with our intelligent sales agent who will guide you 
                to find the perfect vehicle upgrade for your needs
              </p>

              <Button 
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover"
              >
                Start Conversation
              </Button>
            </div>
          </Card>

          {/* Manual Input Option */}
          <Card 
            className="p-8 hover:shadow-[0_0_30px_hsla(0,0%,0%,0.1)] transition-shadow cursor-pointer group"
            onClick={() => navigate("/manual-input")}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:animate-scale-pulse transition-transform">
                <FileText className="w-10 h-10 text-secondary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground">
                Manual Input
              </h3>
              
              <p className="text-muted-foreground">
                Prefer to browse on your own? Enter your preferences manually 
                and we'll show you matching vehicles
              </p>

              <Button 
                variant="secondary"
                className="w-full h-12 text-base font-semibold"
              >
                Enter Manually
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Choice;
