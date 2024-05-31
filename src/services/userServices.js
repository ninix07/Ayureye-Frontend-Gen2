import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import { UserLoginURL, UserSignupURL } from "../constant/constants";

export const userApi = createApi({
  reducerPath: "User",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (UserData) => ({
        url: UserSignupURL,
        method: "POST",
        body: UserData,
      }),
    }),
    loginUser: builder.mutation({
      query: (UserData) => ({
        url: UserLoginURL,
        method: "POST",
        body: UserData,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginUserMutation } = userApi;
