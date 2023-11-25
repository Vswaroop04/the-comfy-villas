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
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:scale-110 duration-300">
      <img className="w-full rounded-t-lg" src={imageSrc} alt={title} />
      <div className="relative">
        <div className="px-6 py-4 flex">
          <div>
            <div className=" flex-none text-sm mb-2">{subtitle}</div>
            <div className=" flex-none font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{location}</p>
          </div>
          <div className="absolute right-0 top-10">
            <div className="ml-4">
              <span className=" ml-6 text-sm text-gray-600">
                {Math.round(rating * 10) / 10}
              </span>
              <div
                className=" flex-none text-sm mb-2
            "
              >
                Ratings
              </div>
            </div>

            <RatingComponent rating={rating} />
          </div>
        </div>
        <div className="px-6  py-4 font-bold text-3xl">${price}</div>
      </div>
    </div>
  );
};

export default CardComponent;
