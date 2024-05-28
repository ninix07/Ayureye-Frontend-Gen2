const token = localStorage.getItem("token");

const initialState = {
  isAuthenticated: !!token,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "auth/setToken":
      return { ...state, isAuthenticated: true };
    case "auth/logout":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
