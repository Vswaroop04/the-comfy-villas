
import RatingComponent from "./RatingComponent";

const CardComponent = ({
  title,
  subtitle,
  location,
  price,
  rating,
  imageSrc,
}: {
  title: string;
  subtitle: string;
  location: string;
  price: string;
  rating: number;
  imageSrc: string;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:scale-110 duration-300">
      <img className="w-full rounded-t-lg" src={imageSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{location}</p>
        <div className="my-2">
          <RatingComponent rating={rating} />
        </div>
        <div className="font-bold text-3xl">{price}</div>
      </div>
    </div>
  );
};

export default CardComponent;
