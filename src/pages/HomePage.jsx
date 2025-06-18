import { Outlet } from "react-router-dom";
import Head from "../components/Head";

const HomePage = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};

export default HomePage;
