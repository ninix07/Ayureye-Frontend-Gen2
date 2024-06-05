import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import {
  getParticularImageURL,
  getParticularPredictionURL,
} from "../constant/constants";

export const particularPatientApi = createApi({
  reducerPath: "particularPatient",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getparticularImage: builder.query({
      query: () => ({
        url: getParticularImageURL,
        method: "GET",
      }),
    }),
    getparticularprediction: builder.mutation({
      query: (patientData) => ({
        url: getParticularPredictionURL,
        method: "Post",
        body: patientData,
      }),
    }),
  }),
});

export const {
  useGetparticularImageQuery,
  useGetparticularpredictionMutation,
} = particularPatientApi;
