import { createApi} from "@reduxjs/toolkit/query/react";
import type { Address, User } from "../../app/models/user";
import type { LoginSchemaType } from "../../lib/schema/loginSchema";
import { router } from "../../app/routes/Routes";
import type { RegisterSchemaType } from "../../lib/schema/registerSchema";
import { customBaseQuery } from "../../app/api/baseApi";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: customBaseQuery,
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
    fetchAddress: builder.query<Address, void>({
      query: () => ({
        url: "account/address",
      }),
    }),
    updateUserAddress: builder.mutation<Address, Address>({
      query: (address) => ({
        url: "account/address",
        method: "POST",
        body: address,
      }),
      onQueryStarted: async (address, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          accountApi.util.updateQueryData(
            "fetchAddress",
            undefined,
            (draft) => {
              Object.assign(draft, { ...address });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
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
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} = accountApi;
