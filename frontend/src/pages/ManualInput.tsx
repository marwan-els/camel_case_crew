import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

const ManualInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    budget: "",
    features: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock recommendations based on input
    const mockRecommendations = [
      {
        id: "1",
        name: "BMW 3 Series",
        category: "Compact Executive",
        price: 75,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        features: ["Sport Seats", "LED Lights", "Parking Assist"],
        recommended: true,
      },
      {
        id: "2",
        name: "Audi A4",
        category: "Premium Sedan",
        price: 78,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        features: ["Virtual Cockpit", "Quattro AWD", "Ambient Lighting"],
        recommended: false,
      },
    ];

    sessionStorage.setItem("recommendations", JSON.stringify(mockRecommendations));
    navigate("/recommendations");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/choice")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-foreground mb-2">SIXT</h1>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Manual Vehicle Selection
            </h2>
            <p className="text-muted-foreground">
              Enter your preferences to find matching vehicles
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Vehicle Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Daily Budget (€)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter your daily budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Features</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Navigation",
                  "Leather Seats",
                  "Sunroof",
                  "Premium Sound",
                  "Adaptive Cruise",
                  "Parking Assist",
                ].map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            features: [...formData.features, feature],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            features: formData.features.filter(
                              (f) => f !== feature
                            ),
                          });
                        }
                      }}
                    />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover"
            >
              Find Vehicles
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ManualInput;
