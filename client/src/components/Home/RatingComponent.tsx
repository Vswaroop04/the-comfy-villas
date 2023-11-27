const RatingComponent = ({ rating }: any) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex">
      <div className="flex bg-slate-600 p-1">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-black">
            ★
          </span>
        ))}
        {/* Half star */}
        {halfStar === 1 && <span className="text-black">★</span>}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300">
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingComponent;
