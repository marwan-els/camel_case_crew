import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
const BookingId = () => {
  const [bookingId, setBookingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const mockBookingId = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Failed to verify booking");
      }
      const data = await response.json();
      console.log("Booking Response Data:", data);
      const verifiedId = data.id;
      console.log("Verified Booking ID:", verifiedId);
      // Store the verified ID
      sessionStorage.setItem("bookingId", verifiedId);
      console.log("Booking id:", verifiedId);
      toast({
        title: "Success",
        description: "Booking verified successfully.",
      });
      navigate("/choice");
    } catch (error) {
      console.error("Booking Error:", error);
      toast({
        title: "Connection or Verification Error",
        description: "We couldn't verify your booking. Please check your ID and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) {
      toast({
        title: "Booking ID Required",
        description: "Please enter your booking ID to continue.",
        variant: "destructive",
      });
      return;
    }
    await mockBookingId();
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        {/* SIXT Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-foreground mb-2">SIXT</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            Premium Mobility Service
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="bookingId" className="text-sm font-medium text-foreground">
              Booking ID
            </label>
            <Input
              id="bookingId"
              type="text"
              placeholder="Enter your booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="h-12 text-base"
            />
            <p className="text-xs text-muted-foreground">
              You can find your booking ID in your confirmation email
            </p>
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary-hover transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </Card>
    </div>
  );
};
export default BookingId;