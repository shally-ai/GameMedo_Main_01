import { useState, useEffect } from "react";
import { api } from "@/integrations/api";
import { Loader2, Calendar as CalendarIcon, Phone, User, Mail } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  preferred_date: string;
  preferred_time: string;
  created_at: any;
}


const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await api.getAdminBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({ title: "Failed to load bookings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-heading text-2xl font-bold uppercase text-foreground">Scheduled Calls</h2>
        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold">
          {bookings.length} Total
        </span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Table View (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary text-muted-foreground border-b border-border">
                <th className="p-4 font-heading text-xs tracking-wider uppercase">Name / Contact</th>
                <th className="p-4 font-heading text-xs tracking-wider uppercase">Date & Time</th>
                <th className="p-4 font-heading text-xs tracking-wider uppercase">Booked On</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground italic font-medium">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" /> {booking.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Mail className="w-3 h-3" /> {booking.email}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Phone className="w-3 h-3" /> {booking.whatsapp}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-foreground font-medium">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        {booking.preferred_date}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 ml-6">
                        {booking.preferred_time}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground font-medium">
                      {booking.created_at ? (
                        format(
                          booking.created_at.toDate ? booking.created_at.toDate() : new Date(booking.created_at), 
                          "PPP"
                        )
                      ) : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Card View (Mobile) */}
        <div className="md:hidden divide-y divide-border">
          {bookings.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground italic font-medium">
              No bookings found.
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="p-4 space-y-4 hover:bg-secondary/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-foreground flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> {booking.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{booking.email}</div>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                    {booking.created_at ? (
                        format(
                          booking.created_at.toDate ? booking.created_at.toDate() : new Date(booking.created_at), 
                          "MMM d"
                        )
                      ) : "N/A"}
                  </div>
                </div>

                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-secondary/50 p-2 rounded border border-border/50">
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Schedule</div>
                    <div className="flex items-center gap-1.5 font-bold text-xs truncate">
                      <CalendarIcon className="w-3 h-3 text-primary shrink-0" />
                      {booking.preferred_date}
                    </div>
                  </div>
                  <div className="bg-secondary/50 p-2 rounded border border-border/50">
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Time</div>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <Loader2 className="w-3 h-3 text-primary shrink-0 opacity-50" />
                      {booking.preferred_time}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                  <Phone className="w-3 h-3" /> {booking.whatsapp}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
