import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import VehicleCard from "@/components/VehicleCard";
import { ArrowLeft } from "lucide-react";
import { Vehicle } from "@/components/VehicleCard";

const Confirmation = () => {
  const [vehicle, setVehicle] = useState<Vehicle>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

//  Fetch completed booking using bookingId from sessionStorage
  useEffect(() => {
    const fetchBooking = async () => {
      const bookingId = sessionStorage.getItem("bookingId");
      if (!bookingId) {
        console.error("No booking ID found in sessionStorage");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch("/api/booking/" + bookingId);
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const data = await response.json();
        console.log("Fetched Booking Data:", data);
        setVehicle(data.vehicle);
      }
      catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, []);


  return (
    // Show Confirmation and Vehicle Details
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Booking Confirmed!</h1>
      {isLoading ? (
        <p>Loading vehicle details...</p>
      ) : vehicle ? (
        <VehicleCard vehicle={vehicle} />
      ) : (
        <p>No vehicle details available.</p>
      )}
    </div>  
  );
};

export default Confirmation;
