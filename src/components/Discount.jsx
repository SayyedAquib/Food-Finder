import { IMAGE_URL } from "../utils/constants";

const Discount = ({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) => (
  <div className="flex gap-2 min-w-[328px] border p-3 h-[76px] rounded-2xl">
    <img
      src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
      alt="offer logo"
    />
    <div>
      <h2 className="font-bold text-xl">{header}</h2>
      <p className="text-gray-500">{couponCode}</p>
    </div>
  </div>
);

export default Discount;
