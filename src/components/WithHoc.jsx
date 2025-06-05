const withHoc = (WrappedCom) => {
  return (prop) => {
    return (
      <div className="relative">
        <p className="absolute top-10 text-sm bg-gray-700 px-1 left-5 text-white rounded-lg">
          Ad
        </p>
        <WrappedCom {...prop} />
      </div>
    );
  };
};

export default withHoc;