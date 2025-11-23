from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
import os
from pathlib import Path


load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

prompt = Path(__file__).with_name("sixt_agent_prompt.txt").read_text()


response = elevenlabs.conversational_ai.agents.create(
    name="Sixt Sales Agent",
    tags=["test"], 
    conversation_config={
        "tts": {
            "voice_id": "21m00Tcm4TlvDq8ikWAM",
            "model_id": "eleven_flash_v2"
        },
        "agent": {
            "first_message": "Hi, this is Rachel from Sixt. How can I help you today?",
            "prompt": {
                "prompt": prompt,
            }
        }
    }
)

print("Agent created with ID:", response.agent_id)
