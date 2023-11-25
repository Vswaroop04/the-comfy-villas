const RatingComponent = ({ rating }: any) => {
  // Determine the number of full stars, half stars and empty stars
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex  mr-2 bg-slate-600">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-yellow-400">
          ★
        </span>
      ))}
      {halfStars === 1 && <span className="text-yellow-400">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingComponent;
