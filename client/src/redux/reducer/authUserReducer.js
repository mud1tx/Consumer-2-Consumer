const initial_state = null;

export const authenticateUser = (state = initial_state, { type, payload }) => {
  switch (type) {
    case "AUTH_USER":
      return { ...payload };
    default:
      return state;
  }
};
