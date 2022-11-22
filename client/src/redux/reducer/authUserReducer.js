const initialState = {};

export const authenticateUser = (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUTH_USER":
      // console.log("payload",payload);
      state = { ...payload };
      console.log("state", state);
      return state;
    default:
      return null;
  }
};
