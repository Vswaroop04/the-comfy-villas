// OffersGridComponent.jsx
import CardComponent from './CardComponent';

const OffersGridComponent = () => {
  // Dummy data for the offers, you should replace this with your actual data
  const offers = [
    {
      id: 1,
      title: "5382 Rue Taillon",
      subtitle: "Villa",
      location: "Montreal, Canda",
      price: "$2300",
      rating: 4.2,
      imageSrc: "/assets/gallery/wedding.png"
    },
    {
      id: 2,
      title: "Meetings",
      subtitle: "Room",
      location: "Experience an Exclusively Private Environment to Boost Your Productivity",
      price: "$999 /night",
      rating: 4.0,
      imageSrc: "/path-to-your-meetings-room-image.jpg"
    },
    {
      id: 3,
      title: "Romantic Dining",
      subtitle: "Dining",
      location: "Indulge in a Memorable One-Time Romantic Dinner for Two",
      price: "$499 /table",
      rating: 4.5,
      imageSrc: "/path-to-your-dining-image.jpg"
    },
        {
      id: 3,
      title: "Romantic Dining",
      subtitle: "Dining",
      location: "Indulge in a Memorable One-Time Romantic Dinner for Two",
      price: "$499 /table",
      rating: 4.5,
      imageSrc: "/path-to-your-dining-image.jpg"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      {/* Assume HeaderElement is imported and used here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <CardComponent
            key={offer.id}
            title={offer.title}
            subtitle={offer.subtitle}
            location={offer.location}
            price={offer.price}
            rating={offer.rating}
            imageSrc={offer.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersGridComponent;
