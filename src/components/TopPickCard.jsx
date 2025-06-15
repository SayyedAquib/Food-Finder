import { IMAGE_URL } from "../utils/constants";

const TopPickCard = ({ creativeId, defaultPrice, price }) => (
  <div className="min-w-[400px] relative h-[405px]">
    <img
      className="w-full h-full"
      src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
      alt="Top Pick Item"
    />
    <div className="absolute bottom-4 text-white flex justify-between w-full px-5">
      <p>₹{defaultPrice / 100 || price / 100}</p>
      <button className="px-10 py-2 font-bold text-green-400 bg-white rounded-xl">
        Add
      </button>
    </div>
  </div>
);

export default TopPickCard;
