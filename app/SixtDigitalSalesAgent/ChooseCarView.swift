import SwiftUI

struct Car: Identifiable, Hashable {
    let id = UUID()
    let name: String
    let orSimilar: Bool
    let seats: Int
    let bags: Int
    let transmission: String
    let doors: Int
    let features: [String]
    let imageName: String? // optional asset name
}

struct ChooseCarView: View {
    private let bookedCars: [Car] = [
        Car(name: "VW Polo", orSimilar: true, seats: 5, bags: 2, transmission: "Manual", doors: 5,
            features: ["Air Conditioning", "Bluetooth", "USB"], imageName: nil),
        Car(name: "Opel Corsa", orSimilar: true, seats: 5, bags: 2, transmission: "Automatic", doors: 5,
            features: ["Air Conditioning", "Navigation", "Bluetooth"], imageName: nil),
        Car(name: "Ford Fiesta", orSimilar: true, seats: 5, bags: 2, transmission: "Manual", doors: 5,
            features: ["Air Conditioning", "Radio", "USB"], imageName: nil)
    ]
    
    private let upgradeCars: [Car] = [
        Car(name: "BMW 3 Series", orSimilar: true, seats: 5, bags: 4, transmission: "Automatic", doors: 4,
            features: ["Premium Sound", "Navigation", "Leather Seats"], imageName: nil),
        Car(name: "Mercedes C-Class", orSimilar: true, seats: 5, bags: 4, transmission: "Automatic", doors: 4,
            features: ["Premium Audio", "Navigation", "Ambient Lighting"], imageName: nil)
    ]
    
    @State private var selectedCar: Car? = nil
    @State private var selectedUpgrade: Car? = nil
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {

                    header

                    // -------- Booked class ----------
                    SectionTitle("Your booked class")

                    HorizontalCarRow(cars: bookedCars) { car in
                        BookedCarCard(
                            car: car,
                            isSelected: selectedCar == car,
                            accent: Color("sixtOrange"),
                            border: Color("border")
                        ) {
                            selectedCar = car
                            selectedUpgrade = nil
                        }
                    }

                    // -------- Upgrade section ----------
                    upgradeSection

                    // -------- Bottum buttons ----------
                    bottomButtons
                        .padding(.top, 10)
                }
                .padding(.horizontal, 18)
                .padding(.bottom, 24)
            }
            .background(Color.white)
        }
    }
    
    private var header: some View {
        VStack(spacing: 6) {
            Text("Choose your car")
                .font(.system(size: 30, weight: .black))
            Text("Pick a car from your class or upgrade for more comfort.")
                .font(.system(size: 16))
                .foregroundStyle(Color("muted"))
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 8)
    }
    
    private var upgradeSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 8) {
                Image(systemName: "sparkles")
                    .foregroundStyle(Color("sixtOrange"))
                Text("Upgrade your experience")
                    .font(.system(size: 20, weight: .bold))
            }

            Text("Upgrade to premium for extra space, features, and comfort.")
                .font(.system(size: 15))
                .foregroundStyle(Color("muted"))

            HorizontalCarRow(cars: upgradeCars) { car in
                UpgradeCarCard(
                    car: car,
                    isSelected: selectedUpgrade == car,
                    accent: Color("sixtOrange"),
                    border: Color("border"),
                    upgradePriceText: "Upgrade for +€50"
                ) {
                    selectedUpgrade = car
                    selectedCar = nil
                }
            }
        }
        .padding(14)
        .background(Color("upgradeBg"))
        .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
        .overlay(
            RoundedRectangle(cornerRadius: 16, style: .continuous)
                .stroke(Color("sixtOrange").opacity(0.25), lineWidth: 1)
        )
        .padding(.top, 8)
    }
    
    private var bottomButtons: some View {
        HStack(spacing: 12) {
            OutlinedButton(title: "Back", height: 54, border: Color("border")) {
                // TODO: pop
            }

            FilledButton(title: "Continue", height: 54, bg: Color("sixtOrange")) {
                // TODO: proceed with selectedCar/selectedUpgrade
            }
            .opacity((selectedCar != nil || selectedUpgrade != nil) ? 1 : 0.5)
            .disabled(selectedCar == nil && selectedUpgrade == nil)
        }
    }
    
    private var bottomBar: some View {
            HStack(spacing: 12) {
                OutlinedButton(title: "Back", height: 54, border: Color("border")) {
                    // TODO: pop
                }

                FilledButton(title: "Continue", height: 54, bg: Color("sixtOrange")) {
                    // TODO: proceed with selectedCar/selectedUpgrade
                }
                .opacity((selectedCar != nil || selectedUpgrade != nil) ? 1 : 0.5)
                .disabled(selectedCar == nil && selectedUpgrade == nil)
            }
            .padding(.horizontal, 18)
            .padding(.vertical, 12)
            .background(
                Rectangle()
                    .fill(.white)
                    .shadow(color: .black.opacity(0.08), radius: 12, x: 0, y: -2)
            )
        }
}

struct HorizontalCarRow<CardContent: View>: View {
    let cars: [Car]
    @ViewBuilder let card: (Car) -> CardContent

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            LazyHStack(spacing: 14) {
                ForEach(cars) { car in
                    card(car)
                        .frame(width: 280) // nice iPhone card width
                }
            }
            .padding(.horizontal, 2)
        }
    }
}

struct BookedCarCard: View {
    let car: Car
    let isSelected: Bool
    let accent: Color
    let border: Color
    let action: () -> Void

    private let muted = Color.black.opacity(0.6)

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 10) {

                CarImagePlaceholder()

                VStack(alignment: .leading, spacing: 4) {
                    Text(car.name)
                        .font(.system(size: 18, weight: .bold))
                    if car.orSimilar {
                        Text("or similar")
                            .font(.system(size: 14))
                            .foregroundStyle(muted)
                    }
                }

                CarSpecsRow(car: car, muted: muted)

                FeatureChipsRow(features: car.features)

                // Included button
                Text("Included in your booking")
                    .font(.system(size: 15, weight: .semibold))
                    .foregroundStyle(.black.opacity(0.5))
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(Color.black.opacity(0.06))
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .padding(.top, 2)
            }
            .padding(12)
            .background(.white)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(isSelected ? accent : border, lineWidth: isSelected ? 2 : 1)
            )
            .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 3)
        }
        .buttonStyle(.plain)
    }
}

struct UpgradeCarCard: View {
    let car: Car
    let isSelected: Bool
    let accent: Color
    let border: Color
    let upgradePriceText: String
    let action: () -> Void

    private let muted = Color.black.opacity(0.6)
    private let upgradeBtnBg = Color(red: 1.0, green: 0.94, blue: 0.92)

    var body: some View {
        Button(action: action) {
            VStack(alignment: .leading, spacing: 10) {

                CarImagePlaceholder()

                VStack(alignment: .leading, spacing: 4) {
                    Text(car.name)
                        .font(.system(size: 18, weight: .bold))
                    if car.orSimilar {
                        Text("or similar")
                            .font(.system(size: 14))
                            .foregroundStyle(muted)
                    }
                }

                CarSpecsRow(car: car, muted: muted)

                FeatureChipsRow(features: car.features)

                Text(upgradePriceText)
                    .font(.system(size: 16, weight: .bold))
                    .foregroundStyle(accent)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(upgradeBtnBg)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .padding(.top, 2)
            }
            .padding(12)
            .background(.white)
            .clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
            .overlay(
                RoundedRectangle(cornerRadius: 14)
                    .stroke(isSelected ? accent : border, lineWidth: isSelected ? 2 : 1)
            )
            .shadow(color: .black.opacity(0.05), radius: 8, x: 0, y: 3)
        }
        .buttonStyle(.plain)
    }
}

struct CarImagePlaceholder: View {
    private let bg = Color.black.opacity(0.08)

    var body: some View {
        RoundedRectangle(cornerRadius: 12)
            .fill(bg)
            .frame(height: 140)
            .overlay(
                Image(systemName: "car.fill")
                    .font(.system(size: 26, weight: .semibold))
                    .foregroundStyle(.black.opacity(0.25))
            )
    }
}

struct CarSpecsRow: View {
    let car: Car
    let muted: Color

    var body: some View {
        VStack(spacing: 6) {
            HStack {
                SpecItem(icon: "person.2", text: "\(car.seats) seats", muted: muted)
                Spacer()
                SpecItem(icon: "suitcase", text: "\(car.bags) bags", muted: muted)
            }
            HStack {
                SpecItem(icon: "gearshape", text: car.transmission, muted: muted)
                Spacer()
                SpecItem(icon: "door.left.hand.open", text: "\(car.doors) doors", muted: muted)
            }
        }
        .padding(.vertical, 2)
    }
}

struct SpecItem: View {
    let icon: String
    let text: String
    let muted: Color

    var body: some View {
        HStack(spacing: 6) {
            Image(systemName: icon)
                .foregroundStyle(muted)
            Text(text)
                .font(.system(size: 14, weight: .semibold))
                .foregroundStyle(muted)
        }
    }
}

struct FeatureChipsRow: View {
    let features: [String]

    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 6) {
                ForEach(features, id: \.self) { f in
                    Text(f)
                        .font(.system(size: 12, weight: .semibold))
                        .foregroundStyle(.white)
                        .padding(.vertical, 6)
                        .padding(.horizontal, 10)
                        .background(Color.black.opacity(0.9))
                        .clipShape(Capsule())
                }
            }
        }
    }
}

struct SectionTitle: View {
    let title: String
    init(_ t: String) { title = t }

    var body: some View {
        Text(title)
            .font(.system(size: 20, weight: .bold))
            .padding(.top, 6)
    }
}


#Preview {
    ChooseCarView()
}
