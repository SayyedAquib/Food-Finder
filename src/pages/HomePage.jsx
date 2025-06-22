import { Outlet } from "react-router-dom";
import Head from "../components/head/Head";
import { Footer } from "../components/index";

const HomePage = () => {
  return (
    <>
      <Head />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomePage;
