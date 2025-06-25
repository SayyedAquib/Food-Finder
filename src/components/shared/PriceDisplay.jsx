import React from "react";

const PriceDisplay = React.memo(({ price, className = "" }) => {
  return (
    <p className={className}>
      <i className="fi fi-bs-indian-rupee-sign text-sm pt-1 inline-block"></i>
      {price}
    </p>
  );
});

PriceDisplay.displayName = "PriceDisplay";

export default PriceDisplay;