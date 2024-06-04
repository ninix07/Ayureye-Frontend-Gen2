import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import {
  UserLoginURL,
  UserSignupURL,
  getUserDetail,
} from "../constant/constants";

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
    reloadUser: builder.query({
      query: () => ({
        url: getUserDetail,
        method: "Get",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useReloadUserQuery,
} = userApi;
