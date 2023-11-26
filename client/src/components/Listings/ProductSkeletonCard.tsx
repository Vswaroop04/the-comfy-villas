const ProductSkeletonCard = ({
	isOtherListing = false,
	isBestDeal = false,
	isGradeReport = false,
}) => {
	if (isOtherListing) {
		return (
			<div className="m-1.5 p-2 pb-6 space-y-3 mx-2 mb-2 max-w-sm rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 hover:scale-110 duration-300">
				<div className="flex flex-row justify-center">
					<div className="flex flex-col  gap-4 items-center">
						<div className="bg-gray-300 h-16 w-16 rounded-full"></div>
						<div className="justify-start items-start gap-3 space-y-2">
							<div className="bg-gray-300 h-4 w-24 rounded-md"></div>
							<div className="bg-gray-300 h-4 w-16 rounded-md"></div>
							<div className="bg-gray-300 h-4 w-16 rounded-md"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
};

export default ProductSkeletonCard;
