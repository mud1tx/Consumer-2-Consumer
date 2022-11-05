import React from "react";
import Navbar from "../../components/Navbar";
import classes from "./AddProducts.module.css";
import Button from "../../layouts/Button";

const AddProducts = () => {
  return (
    <div>
      <Navbar />
      <main className={classes.addProduct_form}>
        <form
          className={classes.product_form}
          // action="/admin/add-product"
          // method="post"
        >
          <div className={classes.form_control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              // value={user.title}
              // onChange={handleInputs}
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="actual-btn">Choose File</label>
            <input type="file" id="actual-btn" name="imageUrl" />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              // value={user.price}
              // onChange={handleInputs}
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              // value={user.description}
              // onChange={handleInputs}
            ></textarea>
          </div>
          <Button
            className={classes.addProduct_form_submit_btn}
            type="submit"
            onClick={() => {}}
          >
            Add-Product
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AddProducts;
