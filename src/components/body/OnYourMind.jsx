import { HorizontalScroller } from "../shared/index";
import { IMAGE_URL } from "../../utils/constants";

const OnYourMind = ({ data = [] }) => {
  return (
    <HorizontalScroller
      title="What's on your mind?"
      itemWidth="120px"
      gap="gap-2 md:gap-4"
    >
      {data.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer group w-full max-w-[150px] mx-auto"
        >
          <img
            className="w-full group-hover:scale-105 transition-transform duration-200"
            src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_200,h_200/${item.imageId}`}
            alt={item?.action?.text || "Food category"}
            fetchpriority="high"
            width={200}
            height={200}
          />
        </div>
      ))}
    </HorizontalScroller>
  );
};

export default OnYourMind;
