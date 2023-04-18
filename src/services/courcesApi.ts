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
    getUserCources: build.query<Course[], void>({
      query: () => 'courses/my',
    }),
    getTeachingCourses: build.query<Course[], void>({
      query: () => 'courses/teaching',
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserCourcesQuery, useGetTeachingCoursesQuery } = courcesApi