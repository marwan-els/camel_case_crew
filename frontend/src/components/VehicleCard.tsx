import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export interface Vehicle {
  brand: string;
  model: string;
  groupType: string;
  image: string;
  fuelType: string;
  transmissionType: string;
  price: number;
}

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          // alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{vehicle.groupType}</p>
          <h3 className="text-2xl font-bold text-foreground">{vehicle.brand} {vehicle.model}</h3>
        </div>

        {/* Features */}
        <div className="space-y-2">
            {vehicle.fuelType && <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground">{vehicle.fuelType}</span>
            </div>}
            <div className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-foreground">{vehicle.transmissionType}</span>
            </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-4 border-t border-border flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Per day</p>
            <p className="text-2xl font-bold text-foreground">
              €{vehicle.price}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;
