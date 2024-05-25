import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { patientApi } from "./services/patientServices";
import authReducer from "./Reducer/authReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [patientApi.reducerPath]: patientApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(patientApi.middleware),
});

setupListeners(store.dispatch);

export default store;
