import { emptySplitApi } from '../emptySplitApi';

export type Profile = {
    fullName: string;
    email: string;
    birthDate: Date;
}

export type Login = {
    email: string;
    password: string;
}

export type Role = "Teacher" | "Student" | "Admin";

export type RolesList = {
  [P in Role as `is${P}`]: boolean;
}

export const accountApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
      getUserProfile: build.query<Profile, string | void>({
        query: () => '/profile',
        providesTags: ["Profile"]
      }),
      loginUser: build.mutation<{ token: string }, Login>({
        query(body: Login) {
            return {
                url: '/login',
                method: "POST",
                body,
            }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            localStorage.setItem("token", data.token);
            // dispatch(emptySplitApi.
          } catch (err) {
            console.log(err);
          }
        }
      }),
      logoutUser: build.mutation<void, void>({
        query() {
            return {
                url: '/logout',
                method: "POST",
            }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            dispatch(emptySplitApi.util.resetApiState());
            localStorage.removeItem("token");
          } catch (err) {
            console.log(err);
          }
        }
      }),
      getUserRoles: build.query<RolesList, void>({
        query: () => '/roles',
      })
    }),
    overrideExisting: false,
  })
  
  export const { useGetUserProfileQuery, useLoginUserMutation, useLogoutUserMutation, useGetUserRolesQuery } = accountApi