import React from "react";
import { VEG, NON_VEG } from "../../utils/constants";

const VegIndicator = React.memo(({ isVeg, className = "w-5 h-5" }) => {
  return (
    <div className={className}>
      {isVeg ? (
        <img src={VEG} alt="Vegetarian" />
      ) : (
        <img src={NON_VEG} alt="Non-Vegetarian" />
      )}
    </div>
  );
});

VegIndicator.displayName = "VegIndicator";

export default VegIndicator;