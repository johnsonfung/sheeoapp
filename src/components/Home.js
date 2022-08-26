import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.location.replace("https://coralus.world");
  }, []);
  return <div>Redirecting you to Coralus...</div>;
};

export default Home;
