import React, { useState, useEffect } from "react";
import classes from "./AddProducts.module.css";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../BASE_URL";

const AddProducts = () => {
  const userLoggedIn = useSelector((state) => state.authenticateUser);

  const [user, setUser] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    images: {},
  });
  const handleInputs = (e) => {
    console.log("efwfwf", user);
    const name = e.target.name;
    let value = e.target.value;
    if (name === "images") {
      value = e.target.files;
      console.log("jnkj", value);
    }
    setUser({ ...user, [name]: value });
  };

  // const postAddProduct = async (e) => {
  //   e.preventDefault();
  //   const adminPostProductApi = await fetch(`${BASE_URL}/admin/add-product`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: user.title,
  //       category: user.category,
  //       images: user.images,
  //       price: user.price,
  //       description: user.description,
  //       userId: userLoggedIn?.user?._id,
  //     }),
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   const addedProductRes = await adminPostProductApi.json();
  //   console.log("sdjklfnsjdfnjdsnfsjknd",addedProductRes)
  //   const { ok } = addedProductRes;
  //   if (!ok) {
  //   } else {
  //   }
  // };

  return (
    <>
      <div className="pt-20">
        <main className={classes.addProduct_form}>
          <form
            className={classes.product_form}
            action="/admin/add-product"
            encType="multipart/form-data"
            method="POST"
            // onSubmit={postAddProduct}
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
                onChange={handleInputs}
              />
            </div>
            <div className={classes.form_control}>
              <label htmlFor="price">Price per day</label>
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
                value={userLoggedIn?.user._id}
                onChange={handleInputs}
              />
            </div>
            <button
              className={classes.addProduct_form_submit_btn}
              type="submit"
            >
              Add-Product
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default AddProducts;
