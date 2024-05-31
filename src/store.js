import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./services/userServices";
import authReducer from "./Reducer/authReducer";
import { inferenceApi } from "./services/inferenceservices";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [userApi.reducerPath]: userApi.reducer,
    [inferenceApi.reducerPath]: inferenceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(inferenceApi.middleware),
});

setupListeners(store.dispatch);

export default store;
