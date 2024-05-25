import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, patientSignupURL } from "../constant/constants";

export const patientApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (todo) => ({
        url: patientSignupURL,
        method: "POST",
        body: todo,
      }),
    }),
  }),
});

export const { useGetTodosQuery, useCreatePatientMutation, useGetMoviesQuery } =
  patientApi;
