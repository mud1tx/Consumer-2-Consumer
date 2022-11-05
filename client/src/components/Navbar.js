import React, { useState } from "react";
import classes from "./Navbar.module.css";
import Button from "../layouts/Button";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  const [sideBarClick, setSideBarClick] = useState(false);

  return (
    <div className={classes.navbar_sideBar_container}>
      {/*NAV-BAR CODE  */}

      <div className={classes.navbar}>
        <div className={classes.navbar_company_logo}>
          <img alt="Company Logo" src="../Images/company-logo.png" />
        </div>
        <div className={classes.navbar_pages}>
          <div className={classes.navbar_page}>
            <p>Shop</p>
          </div>
          <div className={classes.navbar_page}>
            <p>Products</p>
          </div>
          <div className={classes.navbar_page}>
            <p>Cart</p>
          </div>
          <div className={classes.navbar_page}>
            <p>Orders</p>
          </div>
          <div className={classes.navbar_page}>
            <p>Add Products</p>
          </div>
          <div className={classes.navbar_page}>
            <p>Admin Products</p>
          </div>
        </div>
        <div className={classes.navbar_searchBox}>
          <input type="search" placeholder="Search Product..." />
        </div>
        <div className={classes.navbar_login_signUp_Btn}>
          <Button className="" type="button">
            Login
          </Button>
          <Button className="" type="button">
            SignUp
          </Button>
        </div>
        <div className={classes.navbar_sideBar}>
          <HiMenu
            className={classes.navbar_sideBar_logo}
            onClick={() => {
              setSideBarClick(!sideBarClick);
            }}
          />
        </div>
      </div>

      {/* SIDE-BAR CODE */}

      {sideBarClick && (
        <div className={classes.sideBar_content}>
          <div>
            <div className={classes.sideBar_halfContent}>
              <Button className={`${classes.login_btn}`} type="button">
                Login
              </Button>
              <Button className={`${classes.signUp_btn}`} type="button">
                SignUp
              </Button>
            </div>
          </div>
          <div className={classes.sideBar_fullContent}>
            <div className={classes.sidebar_page}>
              <p>Shop</p>
            </div>
            <div className={classes.sidebar_page}>
              <p>Products</p>
            </div>
            <div className={classes.sidebar_page}>
              <p>Cart</p>
            </div>
            <div className={classes.sidebar_page}>
              <p>Orders</p>
            </div>
            <div className={classes.sidebar_page}>
              <p>Add Products</p>
            </div>
            <div className={classes.sidebar_page}>
              <p>Admin Products</p>
            </div>
            <Button className={`${classes.login_btn}`} type="button">
              Login
            </Button>
            <Button className={`${classes.signUp_btn}`} type="button">
              SignUp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
