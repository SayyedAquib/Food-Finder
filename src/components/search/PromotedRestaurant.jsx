const PromotedRestaurant = (WrappedCom) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-md">
            Ad
          </span>
        </div>
        <WrappedCom {...props} />
      </div>
    );
  };
};

export default PromotedRestaurant;
