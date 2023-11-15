interface TRequestAppointment {
  name: string;
  email: string;
  phone: string;
  listingId: string;
}

interface TResponseAppointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  listingId: string;
}
interface TResponseViewAppointments {
  id: string;
  name: string;
  email: string;
  phone: string;
  listingId: string;
}