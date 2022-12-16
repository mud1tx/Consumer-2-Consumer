import React from "react";
import BorrowDetail from "../features/BorrowDetail/BorrowDetail";
import Navbar from "../components/Navbar"
import Foter from "../components/Footer";
import Footer from "../components/Footer";
const BorrowPage = () => {
  return (
    <div>
      <Navbar/>
      <BorrowDetail />
      <Footer/>
    </div>
  );
};

export default BorrowPage;
