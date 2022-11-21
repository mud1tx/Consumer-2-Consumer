import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  const login = async () => {
    try {
      const response = await fetch("http://localhost:5000/login");
      const json = await response.json();
      console.log("req from login",json);
      setIsAuth(json);
      return json;
    } catch (err) {
      console.log("Error", err);
    }
  };

//   const logout = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/logout");
//       const json = await response.json();
//       console.log(json);
//       setIsAuth(json);
//     } catch (err) {
//       console.log("Error", err);
//     }
//   };

  const value = {
    isAuth,
    setIsAuth,
    login,
    // logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
