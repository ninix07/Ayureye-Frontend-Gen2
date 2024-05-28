import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import { patientLoginURL, patientSignupURL } from "../constant/constants";

export const patientApi = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (data) => ({
        url: patientSignupURL,
        method: "POST",
        body: data,
      }),
    }),
    loginPatient: builder.mutation({
      query: (data) => ({
        url: patientLoginURL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePatientMutation, useLoginPatientMutation } = patientApi;
