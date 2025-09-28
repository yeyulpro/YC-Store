import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../app/models/user";
import type { LoginSchemaType } from "../../lib/schema/loginSchema";
import { router } from "../../app/routes/Routes";
import type { RegisterSchemaType } from "../../lib/schema/registerSchema";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:5004/api",
    credentials: "include",
  }),
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginSchemaType>({
      query: (creds) => {
        return {
          url: "login?useCookies=true",
          method: "POST",
          body: creds,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerUser: builder.mutation<void, RegisterSchemaType>({
      query: (creds) => {
        return {
          url: "account/register",
          method: "POST",
          body: creds,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(["UserInfo"]));
          router.navigate("/login");
        } catch (error) {
          console.log(error);
        }
      },
    }),
    userInfo: builder.query<User, void>({
      query: () => "account/user-info",
      providesTags: ["UserInfo"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(accountApi.util.invalidateTags(["UserInfo"]));
          router.navigate("/");
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterUserMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = accountApi;
