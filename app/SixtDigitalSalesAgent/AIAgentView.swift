import ElevenLabs
import SwiftUI

struct AIAgentView: View {
    enum ConnectState {
        case ready
        case connecting
        case connected
    }

    @State private var state: ConnectState = .ready
    @State private var bookingId: String?
    @State private var errorMessage: String?
    @StateObject private var viewModel = ConversationViewModel()

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
                print("clicked")
                Task {
                    if viewModel.isConnected {
                        await viewModel.endConversation()
                        state = .ready
                    } else {
                        if let bookingId {
                            state = .connecting
                            await viewModel.startConversation(bookingId: bookingId)
                            state = .connected
                        } else {
                            state = .ready
                        }
                    }
                }
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

            if let errorMessage {
                Text(errorMessage)
                    .font(.system(size: 13))
                    .foregroundColor(.red)
                    .padding(.top, 8)
            }

            Spacer()
        }
        .frame(maxWidth: .infinity)
        .background(Color.white)
        .navigationBarTitleDisplayMode(.inline)
        .task {
            do {
                bookingId = try await getMockBookingId()
                print("Received bookingId:", bookingId ?? "nil")
            } catch {
                errorMessage = "Failed to load booking: \(error.localizedDescription)"
                print("Error fetching bookingId:", error)
            }
        }
    }

    // MARK: - UI Helpers

    private var buttonColor: Color {
        switch state {
        case .ready: return Color.black.opacity(0.9)
        case .connecting: return Color.black.opacity(0.45)
        case .connected: return Color.sixtOrange
        }
    }

    private var buttonIcon: String {
        switch state {
        case .ready: return "mic.slash.fill"
        case .connecting: return "mic.fill"
        case .connected: return "mic.fill"
        }
    }

    private var statusTitle: String {
        switch state {
        case .ready: return "Ready to start"
        case .connecting: return "Connecting..."
        case .connected: return "Listening..."
        }
    }

    // MARK: - Networking

    func getMockBookingId() async throws -> String {
        guard let url = URL(string: "https://hackatum25.sixt.io/api/booking") else {
            throw URLError(.badURL)
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let (data, response) = try await URLSession.shared.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw URLError(.badServerResponse)
        }
        struct BookingResponse: Decodable {
            let id: String
        }
        print("booking_id: \(data)")
        
        let decoded = try JSONDecoder().decode(BookingResponse.self, from: data)
        return decoded.id
    }
}

#Preview {
    AIAgentView()
}
