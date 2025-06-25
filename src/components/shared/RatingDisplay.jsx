import React from "react";

const RatingDisplay = React.memo(
  ({ rating, additionalInfo, iconClass = "fi fi-ss-star", className = "" }) => {
    return (
      <p className={`flex items-center gap-1 ${className}`}>
        <i className={`${iconClass} text-green-600`}></i>
        {rating}
        {additionalInfo && (
          <>
            <span className="mx-1">.</span>
            <span>{additionalInfo}</span>
          </>
        )}
      </p>
    );
  }
);

RatingDisplay.displayName = "RatingDisplay";

export default RatingDisplay;