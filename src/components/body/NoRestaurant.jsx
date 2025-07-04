import { IMAGE_URL } from "../../utils/constants";

const NoRestaurant = ({data}) => {
  return (
    <div className="flex mt-10 overflow-hidden justify-center items-center flex-col">
      <img
        className="w-72 h-72"
        src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_auto,h_auto/portal/m/location_unserviceable.png`}
        alt="unserviceable location"
        loading="lazy"
        width={288}
        height={288}
      />
      <h1 className="text-lg font-semibold">{data}</h1>
    </div>
  );
};
export default NoRestaurant;
