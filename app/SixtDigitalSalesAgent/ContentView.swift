import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("SIXT")
    }
}
    
//struct AdaptiveCards<Content: View>: View {
//    let spacing: CGFloat
//    @ViewBuilder var content: Content
//
//    var body: some View {
//        ViewThatFits(in: .horizontal) {
//            // Wide layout: two columns
//            HStack(alignment: .top, spacing: spacing) {
//                content
//            }
//
//            // Compact layout: one column
//            VStack(spacing: spacing) {
//                content
//            }
//        }
//    }
//}
    
//struct OptionCard: View {
//    let icon: String
//    let iconBg: Color
//    let title: String
//    let description: String
//    let buttonTitle: String
//    let buttonBg: Color
//    let badge: String?
//    let action: () -> Void
//
//    private let lightBorder = Color.black.opacity(0.08)
//    private let bodyGray    = Color.black.opacity(0.6)
//
//    var body: some View {
//        VStack(spacing: 14) {
//            // Icon circle
//            ZStack {
//                Circle()
//                    .fill(iconBg)
//                    .frame(width: 72, height: 72)
//
//                Image(systemName: icon)
//                    .font(.system(size: 28, weight: .semibold))
//                    .foregroundStyle(.white)
//            }
//            .padding(.top, 6)
//
//            Text(title)
//                .font(.system(size: 20, weight: .bold))
//
//            Text(description)
//                .font(.system(size: 15))
//                .foregroundStyle(bodyGray)
//                .multilineTextAlignment(.center)
//                .padding(.horizontal, 8)
//
//            Spacer(minLength: 0)
//
//            Button(action: action) {
//                Text(buttonTitle)
//                    .font(.system(size: 16, weight: .semibold))
//                    .foregroundStyle(.white)
//                    .frame(maxWidth: .infinity)
//                    .padding(.vertical, 14)
//                    .background(buttonBg)
//                    .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
//            }
//        }
//        .padding(18)
//        .frame(maxWidth: .infinity, minHeight: 260)
//        .background(
//            RoundedRectangle(cornerRadius: 14, style: .continuous)
//                .fill(Color.white)
//        )
//        .overlay(
//            RoundedRectangle(cornerRadius: 14, style: .continuous)
//                .stroke(lightBorder, lineWidth: 1)
//        )
//        .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 3)
        
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
//    }
//}

#Preview {
    ContentView()
}
