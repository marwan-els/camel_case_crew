import ElevenLabs
import SwiftUI

struct AIAgentView: View {
    enum ConnectState {
        case ready
        case connecting
//        case connected
    }

    @State private var state: ConnectState = .ready

    var body: some View {
        VStack(spacing: 18) {

            Spacer().frame(height: 30)

            // Logo
            Text("SIXT")
                .font(.system(size: 44, weight: .black))
                .padding(.top, 10)

            Text("AI Sales Agent")
                .font(.system(size: 22, weight: .bold))

            Text("Let's find the perfect vehicle for you")
                .font(.system(size: 16))
                .foregroundStyle(Color("muted"))
                .padding(.bottom, 30)

            // Big mic button
            Button {
                toggleState()
            } label: {
                ZStack {
                    Circle()
                        .fill(buttonColor)
                        .frame(width: 170, height: 170)
                        .shadow(color: .black.opacity(0.12), radius: 12, x: 0, y: 6)

                    Image(systemName: buttonIcon)
                        .font(.system(size: 36, weight: .semibold))
                        .foregroundStyle(.white)
                }
            }
            .buttonStyle(.plain)
            .animation(.easeInOut(duration: 0.2), value: state)

            // Status text
            Text(statusTitle)
                .font(.system(size: 20, weight: .bold))
                .padding(.top, 16)

            Text("Tap the button to start your conversation")
                .font(.system(size: 15))
                .foregroundStyle(Color("muted"))

            Spacer()
        }
        .frame(maxWidth: .infinity)
        .background(Color.white)
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private var buttonColor: Color {
        switch state {
        case .ready: return Color.black.opacity(0.9)
        case .connecting: return Color.black.opacity(0.45)
        }
    }
    
    private var buttonIcon: String {
        switch state {
        case .ready: return "mic.slash.fill"   // like your screenshot
        case .connecting: return "mic.fill"
        }
    }
    
    private var statusTitle: String {
        switch state {
        case .ready: return "Ready to start"
        case .connecting: return "Connecting..."
        }
    }
    
    private func toggleState() {
        switch state {
        case .ready:
            state = .connecting

            // Optional: simulate a connection delay and go back to ready
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                state = .ready
            }

        case .connecting:
            // If you want tapping again to cancel:
            state = .ready
        }
    }
}

#Preview {
    AIAgentView()
}
