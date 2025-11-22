import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/VehicleCard";
import { ArrowLeft } from "lucide-react";
import { Vehicle } from "@/components/VehicleCard";

const Recommendations = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load recommendations from session storage
    const stored = sessionStorage.getItem("recommendations");
    if (stored) {
      setVehicles(JSON.parse(stored));
    } else {
      // Fallback to mock data if none stored
      setVehicles([
        // Mock Vehicle Data According to Vehicle Interface
        {
          brand: "Toyota",
          model: "Corolla",
          groupType: "Sedan",
          image: "https://example.com/images/toyota_corolla.jpg",
          fuelType: "Petrol",
          transmissionType: "Automatic",
          price: 45,
        },
        {
          brand: "Ford",
          model: "Focus",
          groupType: "Hatchback",
          image: "https://example.com/images/ford_focus.jpg",
          fuelType: "Diesel",
          transmissionType: "Manual",
          price: 40,
        },
        {
          brand: "BMW",
          model: "3 Series",
          groupType: "Sedan",
          image: "https://example.com/images/bmw_3series.jpg",
          fuelType: "Hybrid",
          transmissionType: "Automatic",
          price: 70,
        },
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/choice")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-center">
            <h1 className="text-5xl font-black text-foreground mb-2">SIXT</h1>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Our Recommendations
            </h2>
            <p className="text-muted-foreground">
              Based on your preferences, here are the best vehicles for you
            </p>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard vehicle={vehicle} />
          ))}
        </div>

        {/* No Results */}
        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No recommendations available. Please start a new conversation.
            </p>
            <Button
              onClick={() => navigate("/choice")}
              className="mt-4 bg-primary hover:bg-primary-hover"
            >
              Start Over
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
