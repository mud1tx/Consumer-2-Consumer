import React, { useState } from "react";
import classes from "./AddProducts.module.css";
import { useSelector } from "react-redux";

const AddProducts = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);
  console.log(userLoggedIn.user._id)

  const [user, setUser] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <main className={classes.addProduct_form}>
        <form
          className={classes.product_form}
          action="/admin/add-product"
          encType="multipart/form-data"
          method="POST"
        >
          <div className={classes.form_control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={user.title}
              onChange={handleInputs}
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              value={user.category}
              onChange={handleInputs}
            />
          </div>
          <div className={classes.form_control}>
            <input
              type="file"
              className={classes.image_input}
              name="images"
              id="formFile"
              multiple
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={user.price}
              onChange={handleInputs}
            />
          </div>
          <div className={classes.form_control}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              value={user.description}
              onChange={handleInputs}
            ></textarea>
          </div>
          <div className={classes.form_control}>
            <input
              type="hidden"
              name="userId"
              id="userId"
              value={userLoggedIn.user._id}
              onChange={handleInputs}
            />
          </div>
          <button className={classes.addProduct_form_submit_btn} type="submit">
            Add-Product
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddProducts;
