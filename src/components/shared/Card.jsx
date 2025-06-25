import React from "react";

const Card = React.memo(
  ({ children, className = "bg-white rounded-2xl p-4 m-4", onClick }) => {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;