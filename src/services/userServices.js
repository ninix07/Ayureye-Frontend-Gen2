import { CreateApi, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseURL } from "../constant/constants";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({}),
});
