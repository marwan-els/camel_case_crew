# Sixt Digital Sales Agent

An AI-powered voice assistant for Sixt car rentals that provides real-time vehicle upgrades, booking management, and interactive vehicle demonstrations through a conversational interface.

## 🚗 Overview

This project consists of a voice-enabled AI sales agent that helps Sixt customers upgrade their rental vehicles, add protection packages, and interact with their bookings through natural conversation. The agent can demonstrate vehicles by triggering lights and locks, display vehicle cards, and seamlessly manage booking modifications.

## 🏗️ Architecture

The project is split into three main components:

- **Backend (Python)**: ElevenLabs AI agent creation and configuration
- **Frontend (React + TypeScript)**: Web interface with voice interaction
- **iOS App (SwiftUI)**: Native iOS application for the sales agent

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **shadcn/ui** component library
- **ElevenLabs React SDK** for voice conversations
- **React Router** for navigation

### Backend
- **Python 3.x**
- **ElevenLabs API** for conversational AI
- **LangChain** for AI orchestration
- **OpenAI & Google Generative AI** integrations

### iOS App
- **SwiftUI**
- **Xcode Project**

## 📁 Project Structure

```
camel_case_crew/
├── app/                          # iOS Application
│   ├── SixtDigitalSalesAgent/   # SwiftUI source files
│   ├── fastlane/                # Deployment configuration
│   └── SixtDigitalSalesAgent.xcodeproj/
│
├── backend/                      # Python backend
│   ├── create_agent.py          # ElevenLabs agent setup
│   ├── create_tools.py          # Custom tools/functions
│   ├── sixt_agent_prompt.txt    # AI agent prompt configuration
│   └── requirements.txt
│
└── frontend/                     # React web application
    ├── src/
    │   ├── components/          # React components
    │   │   ├── VoiceInterface.tsx
    │   │   ├── MicButton.tsx
    │   │   ├── StatusDisplay.tsx
    │   │   ├── VehicleCard.tsx
    │   │   └── ui/              # shadcn/ui components
    │   ├── hooks/
    │   │   └── useVoiceSession.tsx
    │   ├── pages/
    │   │   ├── AiAgent.tsx
    │   │   ├── BookingId.tsx
    │   │   ├── Choice.tsx
    │   │   └── Recommendations.tsx
    │   └── lib/
    ├── package.json
    └── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Python 3.8+
- ElevenLabs API key
- OpenAI API key (optional)
- Google AI API key (optional)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file at the root directory with your Elevenlabs API key:
```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

4. Create the AI agent:
```bash
python create_agent.py
```

5. Note the `agent_id` from the output and add it to your frontend environment variables.
```env
ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
```

7. Create the AI tools (AI uses it to call SIXT's API endpoints):
```bash
python create_tools.py
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (using npm or bun):
```bash
npm install
# or
bun install
```

3. Add the following enviroment variable to the .env file:
```env
VITE_AGENT_ID=your_agent_id_from_backend
```

4. Start the development server:
```bash
npm run dev
# or
bun dev
```

5. Open your browser to `http://localhost:8080`

### iOS App Setup

1. Navigate to the app directory:
```bash
cd app
```

2. Run xcodegen:
```bash
xcodegen generate
```

3. Open the Xcode project:
```bash
open SixtDigitalSalesAgent.xcodeproj
```

4. Update the `agentId` in `ConversationViewModel`

4. Build and run the app in Xcode or use Fastlane for deployment.

## 🎯 Features

### Voice Interaction
- Real-time voice conversation with AI sales agent "Rachel"
- Natural language processing for booking inquiries
- Voice-activated vehicle upgrades and protection packages

### Vehicle Management
- View current booking details
- Browse available vehicle upgrades
- Interactive vehicle demonstrations (blink lights, unlock)
- Real-time vehicle card display with images and specs

### Booking Operations
- Retrieve booking information by ID
- Assign upgraded vehicles to bookings
- Add protection packages
- Seamless booking modifications

### UI/UX
- Responsive design for mobile and desktop
- Real-time status indicators
- Visual feedback for user speech detection
- Smooth animations and transitions

## 🔧 Configuration

### Agent Prompt Customization

Edit `backend/sixt_agent_prompt.txt` to customize the AI agent's behavior:
- Adjust the persona and tone
- Modify conversation flow
- Update upselling strategies
- Configure tool usage rules

### Environment Variables

**Frontend (`.env`):**
```env
VITE_AGENT_ID=          # ElevenLabs agent ID
```

**Backend (`.env`):**
```env
ELEVENLABS_API_KEY=     # ElevenLabs api key
ELEVENLABS_AGENT_ID=    # ElevenLabs agent ID
```

## 📱 Available Routes

- `/` - Landing page
- `/choice` - Manual vs AI agent selection
- `/booking-id` - Booking ID input
- `/ai-agent` - Voice interface for AI interaction
- `/manual-input` - Manual booking management
- `/recommendations` - Vehicle recommendations

## 🧪 Development

### Build for Production

```bash
cd frontend
npm run build
# or
bun run build
```

### Build for Development

```bash
npm run build:dev
```

### Linting

```bash
npm run lint
```


## 📄 License

This project is private and proprietary.

## 👥 Team

Developed by the Camel Case Crew team.
- [Marwan Elsayed](https://www.linkedin.com/in/marwan-eslayed1/)
- [Youssef Eltoukhi](https://www.linkedin.com/in/youssefeltoukhi/)
- [Nayer Kotry](https://www.linkedin.com/in/nayerkotry/)

## 🔗 Additional Resources

- [ElevenLabs Documentation](https://elevenlabs.io/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TailwindCSS Documentation](https://tailwindcss.com)

---

**Note**: Make sure to keep your API keys secure and never commit them to version control. All `.env` files are ignored via `.gitignore`.
