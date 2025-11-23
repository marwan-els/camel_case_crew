//
//  ConversationViewModel.swift
//  SixtDigitalSalesAgent
//
//  Created by Nayer Kotry on 23/11/2025.
//
import SwiftUI
import ElevenLabs
import Combine

@MainActor
class ConversationViewModel: ObservableObject {
    @Published var messages: [Message] = []
    @Published var isConnected = false
    @Published var isMuted = false
//    @Published var agentState: AgentState = .listening
    @Published var connectionStatus = "Disconnected"
    private var conversation: Conversation?
    private var cancellables = Set<AnyCancellable>()
    func startConversation(bookingId: String) async {
        do {
            conversation = try await ElevenLabs.startConversation(
                agentId: "agent_7601kaq3pkqzexxbnpbg7fcgkq4p",
                config: ConversationConfig(
                    dynamicVariables: ["booking_id": bookingId]
                )
            )
            setupObservers()
        } catch {
            print("Failed to start conversation: \(error)")
            connectionStatus = "Failed to connect"
        }
    }
    func endConversation() async {
        await conversation?.endConversation()
        conversation = nil
        cancellables.removeAll()
    }
    func toggleMute() async {
        try? await conversation?.toggleMute()
    }
    func sendTestMessage() async {
        try? await conversation?.sendMessage("Hello from the app!")
    }
    private func setupObservers() {
        guard let conversation else { return }
        conversation.$messages
            .assign(to: &$messages)
        conversation.$state
            .map { state in
                switch state {
                case .idle: return "Disconnected"
                case .connecting: return "Connecting..."
                case .active: return "Connected"
                case .ended: return "Ended"
                case .error: return "Error"
                }
            }
            .assign(to: &$connectionStatus)
        conversation.$state
            .map { $0.isActive }
            .assign(to: &$isConnected)
        conversation.$isMuted
            .assign(to: &$isMuted)
//        conversation.$agentState
//            .assign(to: &$agentState)
    }
}
