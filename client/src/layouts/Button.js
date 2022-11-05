import React, { useState, useEffect } from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const [btnClassName, setBtnClassName] = useState(props.className);

  useEffect(() => {
    if (props.className !== "") {
      setBtnClassName(props.className);
    } else {
      setBtnClassName(classes.btn);
    }
  }, [props.className]);

  console.log(props.className);
  return (
    <div>
      <button className={btnClassName} type={props.type}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
