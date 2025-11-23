import SwiftUI

struct BookingIDView: View {

    @State private var bookingID: String = ""
    @State private var goToAIChoice = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {

                    Spacer().frame(height: 60)

                    // SIXT Logo
                    Text("SIXT")
                        .font(.system(size: 44, weight: .black))

                    Text("PREMIUM MOBILITY SERVICE")
                        .font(.system(size: 15, weight: .semibold))
                        .foregroundStyle(Color("muted"))
                        .tracking(1.1)

                    Spacer().frame(height: 30)

                    // Booking ID field
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Booking ID")
                            .font(.system(size: 18, weight: .bold))

                        TextField("Enter your booking ID", text: $bookingID)
                            .textInputAutocapitalization(.characters)
                            .autocorrectionDisabled()
                            .padding(.horizontal, 14)
                            .padding(.vertical, 14)
                            .background(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(Color("border"), lineWidth: 1)
                            )

                        Text("You can find your booking ID in your confirmation email.")
                            .font(.system(size: 14))
                            .foregroundStyle(Color("muted"))
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.horizontal, 24)

                    // Continue button
                    Button {
                        goToAIChoice = true
                    } label: {
                        Text("Continue")
                            .font(.system(size: 18, weight: .bold))
                            .foregroundStyle(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 18)
                            .background(Color("sixtOrange"))
                            .clipShape(RoundedRectangle(cornerRadius: 12))
                            .padding(.horizontal, 24)
                    }
                    .opacity(bookingID.isEmpty ? 0.5 : 1)
                    .disabled(bookingID.isEmpty)

                    Spacer()
                }
                .padding(.bottom, 60)
            }
            .background(Color.white)
            .navigationDestination(isPresented: $goToAIChoice) {
                AIChoiceView()
            }
        }
    }
}

#Preview {
    BookingIDView()
}
