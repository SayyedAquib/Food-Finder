

const OfflinePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <i className="fi fi-rr-wifi-slash text-red-500 text-7xl mb-4"></i>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">You're Offline</h1>
      <p className="text-gray-600 mb-6">
        Looks like you’ve lost your internet connection. <br />
        Please check your network and try again.
      </p>
    </div>
  );
};

export default OfflinePage;
