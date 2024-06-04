import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import {
  UserLoginURL,
  UserSignupURL,
  allPatients,
  getUserDetail,
} from "../constant/constants";

export const allPatientApi = createApi({
  reducerPath: "AllPatient",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getAllPatient: builder.query({
      query: () => ({
        url: allPatients,
        method: "Get",
      }),
    }),
  }),
});

export const { useGetAllPatientQuery } = allPatientApi;
