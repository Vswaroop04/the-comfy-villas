import { useState } from "react";

const StarRating = ({ maxStars, onStarClick }: any) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleStarHover = (starValue: any) => {
    setHoveredRating(starValue);
  };

  const handleStarClick = (starValue: any) => {
    setSelectedRating(starValue);
    onStarClick(starValue);
  };

  return (
    <ul className="my-1 flex list-none gap-1 p-0" data-te-rating-init>
      {Array.from({ length: maxStars }, (_, index) => (
        <li key={index}>
          <span
            className={`text-primary ${
              index + 1 <= (hoveredRating || selectedRating)
                ? "text-yellow-500"
                : "text-gray-300"
            } [&>svg]:h-5 [&>svg]:w-5`}
            title={`Rating ${index + 1}`}
            data-te-rating-icon-ref
            onMouseEnter={() => handleStarHover(index + 1)}
            onMouseLeave={() => handleStarHover(0)}
            onClick={() => handleStarClick(index + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={
                index + 1 <= (hoveredRating || selectedRating)
                  ? "yellow"
                  : "none"
              }
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default StarRating;
