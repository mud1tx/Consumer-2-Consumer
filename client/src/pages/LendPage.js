import React from "react";
import Lend from "../features/Lend/Lend";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const LendPage = () => {
  return (
    <div>
      <Navbar/>
      <Lend />
      <Footer/>
    </div>
  );
};

export default LendPage;
