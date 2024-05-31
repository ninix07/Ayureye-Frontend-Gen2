import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import { ImageInferenceURL, getImageURL } from "../constant/constants";

export const inferenceApi = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    sendImage: builder.mutation({
      query: (Image) => ({
        url: ImageInferenceURL,
        method: "POST",
        body: Image,
      }),
    }),
    getImage: builder.query({
      query: () => ({
        url: getImageURL,
        method: "GET",
      }),
    }),
  }),
});

export const { useSendImageMutation, useLazyGetImageQuery } = inferenceApi;
