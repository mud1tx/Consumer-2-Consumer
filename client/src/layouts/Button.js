import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button className={`${props.className} ${classes.btn}`} type={props.type}>
        {props.data}
      </button>
    </div>
  );
};

export default Button;
