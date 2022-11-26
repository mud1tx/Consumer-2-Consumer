const initial_state = {
  user: "",
};

export const authenticateUser = (state = initial_state, { type, payload }) => {
  switch (type) {
    case "AUTH_USER":
      return { ...state, user: payload };
    default:
      return state;
  }
};
