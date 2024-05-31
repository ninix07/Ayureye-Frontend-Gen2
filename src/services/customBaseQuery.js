import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../constant/constants";

const customBaseQuery = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  });
  let result = await baseQuery(args, api, extraOptions);
  if (result?.data?.token) {
    localStorage.setItem("token", result.data.token);
  }

  return result;
};

export default customBaseQuery;
