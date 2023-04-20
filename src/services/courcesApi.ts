import { emptySplitApi } from './emptySplitApi';

export type Course = {
  id: string;
  name: string;
  startYear: number;
  maximumStudentsCount: number;
  remainingSlotsCount: number;
  status: Status;
  semester: string;
}

type Status = "Created" | "OpenForAssigning" | "Started" | "Finished";

export const courcesApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getUserCources: build.query<Course[], string>({
      query: () => 'courses/my',
      providesTags: ["MyCources"]
    }),
    getCourcesByGroupId: build.query<Course[], string>({
      query: (id) => `groups/${id}`,
    }),
    getTeachingCourses: build.query<Course[], string>({
      query: () => 'courses/teaching',
      providesTags: ["TeachingCources"]
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserCourcesQuery, useGetCourcesByGroupIdQuery, useGetTeachingCoursesQuery } = courcesApi