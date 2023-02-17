import React, { useState } from "react";
import classes from "./AddProducts.module.css";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../BASE_URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.authenticateUser);

  const [user, setUser] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    images: {},
  });
  const handleInputs = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "images") {
      value = e.target.files;
    }
    setUser({ ...user, [name]: value });
  };

  const postAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", user.title);
    formData.append("category", user.category);
    formData.append("price", user.price);
    formData.append("description", user.description);
    formData.append("userId", userLoggedIn?.user?._id);
    // console.log("yuny",user.images[0])
    for (let i = 0; i < user.images.length; i++) {
      formData.append("images", user.images[i]);
    }

    // for (var key of formData.entries()) {
    //   console.log("Sdfdssdfsd", key[0] + ", " + key[1]);
    // }
    // console.log("aaaaanananana", formData, e);

    const adminPostProductApi = await fetch(`${BASE_URL}/admin/add-product`, {
      method: "POST",
      body: formData,
    });
    const addedProductRes = await adminPostProductApi.json();
    const { ok } = addedProductRes;
    const { message } = addedProductRes;
    if (ok) {
      setUser({
        title: "",
        category: "",
        price: "",
        description: "",
        images: {},
      });
      toast.success(`${message}`);
      navigate("/");
    } else {
      toast.error(`${message}`);
    }
  };

  return (
    <>
      <div className="pt-20">
        <main className={classes.addProduct_form}>
          <form className={classes.product_form} onSubmit={postAddProduct}>
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
                // id="formFile"
                id="files"
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
