import { IMAGE_URL } from "../../utils/constants";

const NoRestaurant = ({data}) => {
  return (
    <div className="flex mt-64 overflow-hidden justify-center items-center flex-col">
      <img
        className="w-72"
        src={`${IMAGE_URL}fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png`}
        alt="unserviceable location"
      />
      <h1 className="text-lg font-bold">{data}</h1>
    </div>
  );
};
export default NoRestaurant;
