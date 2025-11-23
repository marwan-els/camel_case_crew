import SwiftUI

struct AIChoiceView: View {
    @State private var showAIAgent = false
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 14) {
                    Text("SIXT")
                        .font(.system(size: 44, weight: .black))
                        .padding(.top, 20)
                    
                    Text("How would you like to proceed?")
                        .font(.system(size: 22, weight: .bold))
                    
                    Text("Choose your preferred method to upgrade your rental")
                        .font(.system(size: 15, weight: .regular))
                        .foregroundStyle(Color("bodyGray"))
                        .padding(.bottom, 12)
                    
                    AdaptiveCards(spacing: 14) {
                        OptionCard(
                            icon: "mic.fill",
                            iconBg: Color("sixtOrange"),
                            title: "Talk to AI Agent",
                            description: "Have a conversation with our intelligent sales agent who will guide you to find the perfect vehicle upgrade for your needs",
                            buttonTitle: "Start Conversation",
                            buttonBg: Color("sixtOrange"),
                            badge: "preferred Option"
                        ) {
                            showAIAgent = true
                        }
                        NavigationLink(destination: TripInfoView()) {
                            OptionCard(
                                icon: "doc.text.fill",
                                iconBg: Color.black.opacity(0.9),
                                title: "Manual Input",
                                description: "Prefer to browse on your own? Enter your preferences manually and we'll show you matching vehicles",
                                buttonTitle: "Enter Manually",
                                buttonBg: Color.black.opacity(0.9),
                                badge: nil
                            ) {
                            }
                        }
                    }
                    .padding(.top, 10)
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 24)
            }
            .background(Color.white)
            .navigationDestination(isPresented: $showAIAgent) {
                            AIAgentView()
                        }
        }
    }
}
    
struct AdaptiveCards<Content: View>: View {
    let spacing: CGFloat
    @ViewBuilder var content: Content

    var body: some View {
        ViewThatFits(in: .horizontal) {
            // Wide layout: two columns
            HStack(alignment: .top, spacing: spacing) {
                content
            }

            // Compact layout: one column
            VStack(spacing: spacing) {
                content
            }
        }
    }
}
    
struct OptionCard: View {
    let icon: String
    let iconBg: Color
    let title: String
    let description: String
    let buttonTitle: String
    let buttonBg: Color
    let badge: String?
    let action: () -> Void

    private let lightBorder = Color.black.opacity(0.08)
    private let bodyGray    = Color.black.opacity(0.6)

    var body: some View {
        VStack(spacing: 14) {
            // Icon circle
            ZStack {
                Circle()
                    .fill(iconBg)
                    .frame(width: 72, height: 72)

                Image(systemName: icon)
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundStyle(.white)
            }
            .padding(.top, 6)

            Text(title)
                .font(.system(size: 20, weight: .bold))

            Text(description)
                .font(.system(size: 15))
                .foregroundStyle(bodyGray)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 8)

            Spacer(minLength: 0)

            Button(action: action) {
                Text(buttonTitle)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(.white)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 14)
                    .background(buttonBg)
                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
            }
        }
        .padding(18)
        .frame(maxWidth: .infinity, minHeight: 260)
        .background(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .fill(Color.white)
        )
        .overlay(
            RoundedRectangle(cornerRadius: 14, style: .continuous)
                .stroke(lightBorder, lineWidth: 1)
        )
        .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 3)
        
//        if let badge = badge {
//            Text(badge)
//                .font(.system(size: 12, weight: .semibold))
//                .padding(.vertical, 4)
//                .padding(.horizontal, 10)
//                .background(Color.black)
//                .foregroundColor(.white)
//                .clipShape(Capsule())
//                .padding(10)
//        }
    }
}

#Preview {
    AIChoiceView()
}
