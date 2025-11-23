//
//  TripInfoView.swift
//  SixtDigitalSalesAgent
//
//  Created by Youssef El-Toukhi on 22/11/2025.
//

import SwiftUI

struct TripInfoView: View {
    @State private var peopleCount: Int = 2

    @State private var hasKids: Bool? = nil
    @State private var kidsCount: Int = 0
    
    enum Luggage: String, CaseIterable, Identifiable {
        case light, medium, heavy
        var id: String { rawValue }

        var title: String {
            switch self {
            case .light: return "Light (1–2 bags)"
            case .medium: return "Medium (3–4 bags)"
            case .heavy: return "Heavy (5+ bags)"
            }
        }
        var subtitle: String {
            switch self {
            case .light: return "Backpacks or small suitcases"
            case .medium: return "Standard travel luggage"
            case .heavy: return "Large suitcases or bulky items"
            }
        }
    }
    @State private var luggage: Luggage = .medium

    enum Transmission: String, CaseIterable, Identifiable {
        case automaticPreferred, manualOk
        var id: String { rawValue }
        var title: String {
            switch self {
            case .automaticPreferred: return "Automatic preferred"
            case .manualOk: return "Manual is fine"
            }
        }
    }
    @State private var transmission: Transmission = .automaticPreferred

    enum TripType: String, CaseIterable, Identifiable {
        case business, leisure, family
        var id: String { rawValue }
        var title: String {
            rawValue.capitalized
        }
        var icon: String {
            switch self {
            case .business: return "briefcase"
            case .leisure:  return "sun.max"
            case .family:   return "house"
            }
        }
    }
    
    @State private var tripType: TripType = .leisure

    enum SpecialNeed: String, CaseIterable, Identifiable {
        case extraLegroom, easyParking, luxuryFeel, ecoFriendly
        var id: String { rawValue }
        var title: String {
            switch self {
            case .extraLegroom: return "Extra legroom"
            case .easyParking:  return "Easy parking"
            case .luxuryFeel:   return "Luxury feel"
            case .ecoFriendly:  return "Eco-friendly"
            }
        }
    }
    
    @State private var specialNeeds: Set<SpecialNeed> = []

    enum DrivingDistance: String, CaseIterable, Identifiable {
        case shortCity, mixed, longHighway
        var id: String { rawValue }
        var title: String {
            switch self {
            case .shortCity:   return "Short city trips"
            case .mixed:       return "Mixed driving"
            case .longHighway: return "Long highway trips"
            }
        }
    }
    
    @State private var drivingDistance: DrivingDistance = .mixed
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 16) {

                    header

                    card {
                        VStack(alignment: .leading, spacing: 22) {

                            // People
                            SectionHeader(
                                icon: "person.2.fill",
                                iconColor: Color("sixtOrange"),
                                title: "How many people are traveling?"
                            )
                            StepperRow(value: $peopleCount, range: 1...9)

                            // Kids
                            VStack(alignment: .leading, spacing: 10) {
                                Text("Are any kids traveling with you?")
                                    .font(.system(size: 18, weight: .bold))

                                YesNoToggle(
                                    selection: $hasKids,
                                    yesTitle: "Yes",
                                    noTitle: "No",
                                    accent: Color("sixtOrange")
                                )

                                if hasKids == true {
                                    HStack(spacing: 12) {
                                        Text("Number of kids")
                                            .foregroundStyle(Color("muted"))
                                        Spacer()
                                        StepperRow(value: $kidsCount, range: 0...6, compact: true)
                                    }
                                    .padding(.top, 6)
                                }
                            }

                            // Luggage
                            VStack(alignment: .leading, spacing: 12) {
                                Text("How much luggage are you bringing?")
                                    .font(.system(size: 18, weight: .bold))

                                ForEach(Luggage.allCases) { option in
                                    RadioCardRow(
                                        title: option.title,
                                        subtitle: option.subtitle,
                                        isSelected: luggage == option,
                                        accent: Color("sixtOrange")
                                    )
                                    .onTapGesture { luggage = option }
                                }
                            }

                            // Transmission
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Transmission preference")
                                    .font(.system(size: 18, weight: .bold))

                                ForEach(Transmission.allCases) { option in
                                    RadioRow(
                                        title: option.title,
                                        isSelected: transmission == option,
                                        accent: Color("sixtOrange")
                                    )
                                    .onTapGesture { transmission = option }
                                }
                            }

                            // Trip type
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Trip type")
                                    .font(.system(size: 18, weight: .bold))

                                HStack(spacing: 10) {
                                    ForEach(TripType.allCases) { type in
                                        ChipButton(
                                            title: type.title,
                                            icon: type.icon,
                                            isSelected: tripType == type,
                                            accent: Color("sixtOrange")
                                        ) {
                                            tripType = type
                                        }
                                    }
                                }
                            }

                            // Special needs
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Special requests (optional)")
                                    .font(.system(size: 18, weight: .bold))

                                ForEach(SpecialNeed.allCases) { need in
                                    CheckboxRow(
                                        title: need.title,
                                        isSelected: specialNeeds.contains(need),
                                        accent: Color("sixtOrange")
                                    ) {
                                        toggleNeed(need)
                                    }
                                }
                            }

                            // Driving distance
                            VStack(alignment: .leading, spacing: 12) {
                                Text("Estimated driving distance")
                                    .font(.system(size: 18, weight: .bold))

                                ForEach(DrivingDistance.allCases) { option in
                                    RadioRow(
                                        title: option.title,
                                        isSelected: drivingDistance == option,
                                        accent: Color("sixtOrange")
                                    )
                                    .onTapGesture { drivingDistance = option }
                                }
                            }

                            // Bottom buttons
                            HStack(spacing: 12) {
                                OutlinedButton(title: "Back", height: 54, border: Color("lightBorder")) {
                                    // TODO: pop navigation
                                }

                                FilledButton(title: "See available cars", height: 54, bg: Color("sixtOrange")) {
                                    // TODO: proceed to recommendation view
                                    // You now have all inputs in state.
                                }
                            }
                            .padding(.top, 8)
                        }
                    }
                }
                .padding(.horizontal, 18)
                .padding(.bottom, 24)
            }
            .background(Color.white)
        }
    }
    private var header: some View {
        VStack(spacing: 6) {
            Text("Tell us about your trip")
                .font(.system(size: 30, weight: .black))

            Text("Help us pick the best car for you")
                .font(.system(size: 16))
                .foregroundStyle(Color("muted"))
        }
        .padding(.top, 8)
        .padding(.bottom, 6)
    }

    private func card<Content: View>(@ViewBuilder _ content: () -> Content) -> some View {
        VStack { content() }
            .padding(18)
            .frame(maxWidth: .infinity)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(.white)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .stroke(Color("lightBorder"), lineWidth: 1)
            )
            .shadow(color: .black.opacity(0.05), radius: 10, x: 0, y: 3)
    }

    private func toggleNeed(_ need: SpecialNeed) {
        if specialNeeds.contains(need) {
            specialNeeds.remove(need)
        } else {
            specialNeeds.insert(need)
        }
    }
}

struct SectionHeader: View {
    let icon: String
    let iconColor: Color
    let title: String

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: icon)
                .font(.system(size: 18, weight: .semibold))
                .foregroundStyle(iconColor)
            Text(title)
                .font(.system(size: 18, weight: .bold))
        }
    }
}

struct StepperRow: View {
    @Binding var value: Int
    let range: ClosedRange<Int>
    var compact: Bool = false

    var body: some View {
        HStack(spacing: 16) {
            Button {
                value = max(range.lowerBound, value - 1)
            } label: {
                Image(systemName: "minus")
                    .font(.system(size: 16, weight: .bold))
                    .frame(width: 44, height: 44)
                    .background(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color("lightBorder")))
            }

            Text("\(value)")
                .font(.system(size: compact ? 20 : 28, weight: .bold))
                .frame(minWidth: 30)

            Button {
                value = min(range.upperBound, value + 1)
            } label: {
                Image(systemName: "plus")
                    .font(.system(size: 16, weight: .bold))
                    .frame(width: 44, height: 44)
                    .background(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color("lightBorder")))
            }

            Spacer()
        }
    }
}

struct YesNoToggle: View {
    @Binding var selection: Bool?
    let yesTitle: String
    let noTitle: String
    let accent: Color

    var body: some View {
        HStack(spacing: 10) {
            toggleButton(title: yesTitle, isSelected: selection == true) {
                selection = true
            }
            toggleButton(title: noTitle, isSelected: selection == false) {
                selection = false
            }
        }
    }

    private func toggleButton(title: String, isSelected: Bool, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(isSelected ? .white : .black)
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
                .background(isSelected ? accent : .white)
                .clipShape(RoundedRectangle(cornerRadius: 10))
                .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color("lightBorder")))
        }
    }
}

struct RadioRow: View {
    let title: String
    let isSelected: Bool
    let accent: Color

    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .stroke(accent, lineWidth: 1.6)
                .frame(width: 20, height: 20)
                .overlay(
                    Circle()
                        .fill(accent)
                        .frame(width: 10, height: 10)
                        .opacity(isSelected ? 1 : 0)
                )

            Text(title)
                .font(.system(size: 16, weight: .semibold))

            Spacer()
        }
        .padding(.vertical, 14)
        .padding(.horizontal, 14)
        .background(.white)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color("lightBorder"), lineWidth: 1)
        )
    }
}

struct RadioCardRow: View {
    let title: String
    let subtitle: String
    let isSelected: Bool
    let accent: Color

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Circle()
                .stroke(accent, lineWidth: 1.6)
                .frame(width: 20, height: 20)
                .overlay(
                    Circle()
                        .fill(accent)
                        .frame(width: 10, height: 10)
                        .opacity(isSelected ? 1 : 0)
                )
                .padding(.top, 2)

            VStack(alignment: .leading, spacing: 3) {
                Text(title)
                    .font(.system(size: 16, weight: .semibold))
                Text(subtitle)
                    .font(.system(size: 14))
                    .foregroundStyle(Color("muted"))
            }

            Spacer()
        }
        .padding(.vertical, 14)
        .padding(.horizontal, 14)
        .background(.white)
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color("lightBorder"), lineWidth: 1)
        )
    }
}

struct ChipButton: View {
    let title: String
    let icon: String
    let isSelected: Bool
    let accent: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            VStack(spacing: 6) {
                Image(systemName: icon)
                    .font(.system(size: 18, weight: .semibold))
                Text(title)
                    .font(.system(size: 15, weight: .semibold))
            }
            .foregroundStyle(isSelected ? .white : .black)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 14)
            .background(isSelected ? accent : .white)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color("lightBorder")))
        }
    }
}

struct CheckboxRow: View {
    let title: String
    let isSelected: Bool
    let accent: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                RoundedRectangle(cornerRadius: 6)
                    .stroke(accent, lineWidth: 1.6)
                    .frame(width: 20, height: 20)
                    .overlay(
                        Image(systemName: "checkmark")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundStyle(.white)
                            .opacity(isSelected ? 1 : 0)
                    )
                    .background(
                        RoundedRectangle(cornerRadius: 6)
                            .fill(accent)
                            .opacity(isSelected ? 1 : 0)
                    )

                Text(title)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(.black)

                Spacer()
            }
            .padding(.vertical, 14)
            .padding(.horizontal, 14)
            .background(.white)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color("lightBorder"), lineWidth: 1)
            )
        }
    }
}

struct FilledButton: View {
    let title: String
    let height: CGFloat
    let bg: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(.white)
                .frame(maxWidth: .infinity)
                .frame(height: height)
                .background(bg)
                .clipShape(RoundedRectangle(cornerRadius: 12))
        }
    }
}

struct OutlinedButton: View {
    let title: String
    let height: CGFloat
    let border: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 16, weight: .semibold))
                .foregroundStyle(.black)
                .frame(maxWidth: .infinity)
                .frame(height: height)
                .background(.white)
                .clipShape(RoundedRectangle(cornerRadius: 12))
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color("lightBorder"), lineWidth: 1)
                )
        }
    }
}



#Preview {
    TripInfoView()
}
