import { IMAGE_URL } from "../../utils/constants";

const BodyShimmer = () => {
  return (
    <div className="w-full">
      <div className="w-full text-white flex justify-center items-center gap-5 flex-col h-[350px] bg-slate-900">
        <div className="relative flex items-start">
          <img
            className="w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
            src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_40,h_40/icecream_wwomsa`}
            alt="Loading Icon"
            width={40}
            height={40}
            loading="lazy"
          />
          <span className="loader "></span>
        </div>

        <h1 className="text-2xl">Looking for great food near you....</h1>
      </div>

      <div className="w-[70%] mx-auto py-6 flex flex-wrap gap-10">
        {Array(12)
          .fill("")
          .map((data, i) => (
            <div
              key={i}
              className="w-[295px] animate h-[182px]  rounded-md"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default BodyShimmer;
