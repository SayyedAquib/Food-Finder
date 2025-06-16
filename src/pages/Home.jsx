import { Outlet } from "react-router-dom";
import Head from "../components/Head";

const Home = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};

export default Home;
