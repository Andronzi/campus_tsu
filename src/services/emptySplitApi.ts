import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://camp-courses.api.kreosoft.space/', 
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }

    return headers;
  } }),
  tagTypes: ['Profile', 'Groups', 'Courses', 'MyCourses', 'TeachingCourses', 'CoursesDetails'],
  endpoints: () => ({}),
})