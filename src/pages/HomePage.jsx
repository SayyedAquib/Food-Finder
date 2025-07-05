import { Outlet } from "react-router-dom";
import Head from "../components/head/Head";
import { Footer } from "../components/index";
import { useOnlineStatus } from "../hooks";
import OfflinePage from "./OfflinePage";

const HomePage = () => {
  const isOnline = useOnlineStatus();

  return (
    <>
      <Head />
      {isOnline ? <Outlet /> : <OfflinePage />}
      <Footer />
    </>
  );
};

export default HomePage;
