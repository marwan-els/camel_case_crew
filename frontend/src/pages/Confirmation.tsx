import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Calendar, 
  Shield, 
  Car, 
  Home, 
  Printer, 
  Fuel, 
  Users, 
  Briefcase 
} from "lucide-react";

// --- Types based on your JSON Payload ---
interface VehicleAttribute {
  key: string;
  title: string;
  value: string;
  iconUrl: string;
}

interface VehicleDetails {
  brand: string;
  model: string;
  images: string[];
  transmissionType: string;
  fuelType: string;
  passengersCount: number;
  bagsCount: number;
  attributes: VehicleAttribute[];
  acrissCode: string;
}

interface ProtectionPackage {
  name: string;
  price: {
    displayPrice: {
      amount: number;
      currency: string;
      suffix: string;
    };
  };
  includes:Array<{ title: string; description: string }>;
}

interface BookingData {
  id: string;
  status: string;
  createdAt: string;
  bookedCategory: string;
  selectedVehicle: {
    vehicle: VehicleDetails;
    pricing: {
      totalPrice: {
        amount: number;
        currency: string;
      }
    }
  };
  protectionPackages?: ProtectionPackage;
}

const Confirmation = () => {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      const bookingId = sessionStorage.getItem("bookingId");
      
      // If testing without session, you might want to hardcode an ID here or handle redirect
      if (!bookingId) {
        console.error("No booking ID found");
        // navigate("/"); // Optional: Redirect to home if no ID
        setIsLoading(false); 
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/booking/" + bookingId);
        
        if (!response.ok) throw new Error("Failed to fetch");
        
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-red-500">Booking details not found.</p>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  const { vehicle } = booking.selectedVehicle;
  const protection = booking.protectionPackages;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header / Success Banner */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your reservation. A confirmation email has been sent to you.
          </p>
          <div className="inline-block bg-white px-6 py-3 rounded-lg border border-gray-200 shadow-sm">
            <span className="text-gray-500 text-sm uppercase tracking-wider">Booking Reference</span>
            <p className="text-2xl font-mono font-bold text-primary">{booking.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Vehicle Details (Takes up 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" /> 
                  Vehicle Details
                </h2>
                <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-700">
                  {vehicle.acrissCode || booking.bookedCategory}
                </span>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2">
                    <img 
                      src={vehicle.images[0]} 
                      alt={`${vehicle.brand} ${vehicle.model}`} 
                      className="w-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{vehicle.brand} {vehicle.model}</h3>
                      <p className="text-gray-500 text-sm">or similar premium sedan</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <AttributeBadge icon={<Briefcase size={16}/>} label={`${vehicle.bagsCount} Bags`} />
                      <AttributeBadge icon={<Users size={16}/>} label={`${vehicle.passengersCount} Seats`} />
                      <AttributeBadge icon={<Fuel size={16}/>} label={vehicle.fuelType} />
                      <AttributeBadge icon={<Car size={16}/>} label={vehicle.transmissionType} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Protection Section */}
            {protection && (
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                  <h2 className="font-semibold text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" /> 
                    Coverage & Protection
                  </h2>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                    active
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{protection.name}</h3>
                      <p className="text-sm text-gray-500">Selected Package</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">
                        {protection.price.displayPrice.currency} {protection.price.displayPrice.amount}
                      </span>
                      <span className="text-gray-400 text-sm"> {protection.price.displayPrice.suffix}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    {protection.includes.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                         <CheckCircle className="w-4 h-4 text-green-600 mt-1 shrink-0" />
                         <div>
                           <p className="text-sm font-medium text-gray-900">{item.title}</p>
                           <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-4">Booking Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Booked on</p>
                    <p className="font-medium">
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                   <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                     <span>Status</span>
                     <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded capitalize">
                       {booking.status}
                     </span>
                   </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate("/")} className="w-full h-12 text-lg">
                <Home className="mr-2 h-4 w-4" /> Return to Home
              </Button>
              <Button variant="outline" onClick={() => window.print()} className="w-full">
                <Printer className="mr-2 h-4 w-4" /> Print Confirmation
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper Component for vehicle badges
const AttributeBadge = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md text-sm text-gray-700">
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default Confirmation;