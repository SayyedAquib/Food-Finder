import React from "react";
import { Link } from "react-router-dom";

const LinkWrapper = React.memo(({ to, children, className = "" }) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
});

LinkWrapper.displayName = "LinkWrapper";

export default LinkWrapper;