import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface VehicleCardProps {
  vehicle: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    features: string[];
    recommended: boolean;
  };
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {vehicle.recommended && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            Recommended
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{vehicle.category}</p>
          <h3 className="text-2xl font-bold text-foreground">{vehicle.name}</h3>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {vehicle.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Per day</p>
            <p className="text-2xl font-bold text-foreground">
              €{vehicle.price}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary-hover">
            Select
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
