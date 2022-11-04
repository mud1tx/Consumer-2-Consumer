import React from "react";
import classes from "./Navbar.module.css";
import Button from "../layouts/Button";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navbar_company_logo_pages}>
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
      </div>
      <div className={classes.navbar_searchBox_login_signUp}>
        <div className={classes.navbar_searchBox}>
          <input type="search" placeholder="Search Product..."/>
        </div>
        <div className={classes.navbar_login_Signup_Btn}>
          <Button className="" type="button" data="Login" />
          <Button className="" type="button" data="SignUp" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
