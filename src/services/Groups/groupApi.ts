import { emptySplitApi } from '../emptySplitApi';


export type Group = {
  id: string;
  name: string;
}

type AddGroupModel = {
    name: string;
}

export const groupsApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getAllGroups: build.query<Group[], void>({
      query: () => '/groups',
      providesTags: ["Groups"]
    }),
    addGroup: build.mutation<void, AddGroupModel>({
        query(body: AddGroupModel) {
            return {
                url: '/groups',
                method: "POST",
                body,
            }
        },
        invalidatesTags: ['Groups'],
    }),
    deleteGroup: build.mutation<void, string>({
        query(id) {
            return {
                url: `/groups/${id}`,
                method: "DELETE",
            }
        },
        invalidatesTags: ["Groups"],
    })
  }),
  overrideExisting: false,
})

export const { useGetAllGroupsQuery, useAddGroupMutation, useDeleteGroupMutation } = groupsApi