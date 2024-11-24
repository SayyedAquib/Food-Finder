import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ resInfo }) => (
  <p className="text-[12px] text-slate-500">
    <Link to="/" className="hover:text-slate-700 hover:cursor-pointer">
      Home
    </Link>{" "}
    /
    <Link to="/" className="hover:text-slate-700 hover:cursor-pointer">
      {resInfo.city}
    </Link>{" "}
    /<span className="text-slate-700">{resInfo.name}</span>
  </p>
);

export default Breadcrumb;
