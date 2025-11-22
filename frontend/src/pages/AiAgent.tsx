import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceInterface from "@/components/VoiceInterface";

const AiAgent = () => {
  const navigate = useNavigate();

  const handleComplete = (recommendations: any[]) => {
    // Store recommendations and navigate to results
    sessionStorage.setItem("recommendations", JSON.stringify(recommendations));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-foreground mb-2">SIXT</h1>
        <h2 className="text-xl font-semibold text-foreground">
          AI Sales Agent
        </h2>
        <p className="text-muted-foreground mt-2">
          Let's find the perfect vehicle for you
        </p>
      </div>

      {/* Voice Interface */}
      <VoiceInterface 
        onComplete={handleComplete}
      />
    </div>
  );
};

export default AiAgent;
