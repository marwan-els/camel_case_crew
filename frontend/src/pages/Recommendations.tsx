import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/VehicleCard";
import { ArrowLeft } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  features: string[];
  recommended: boolean;
}

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
        {
          id: "1",
          name: "BMW 5 Series",
          category: "Premium Sedan",
          price: 89,
          image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
          features: ["Leather Interior", "Navigation", "Premium Sound"],
          recommended: true,
        },
        {
          id: "2",
          name: "Mercedes E-Class",
          category: "Luxury Sedan",
          price: 95,
          image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
          features: ["Massage Seats", "360° Camera", "Adaptive Cruise"],
          recommended: true,
        },
        {
          id: "3",
          name: "Audi A6",
          category: "Executive Sedan",
          price: 92,
          image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
          features: ["Virtual Cockpit", "Matrix LED", "Sport Package"],
          recommended: false,
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
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
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
