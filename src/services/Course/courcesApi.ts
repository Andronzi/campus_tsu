import { emptySplitApi } from '../emptySplitApi';
import { AddNotification, AddTeacherRequest, Course, CourseDetails, CourseRequest } from './types';

export const courcesApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getUserCources: build.query<Course[], string | void>({
      query: () => 'courses/my',
      providesTags: ["MyCourses"]
    }),
    getCourcesByGroupId: build.query<Course[], string>({
      query: (id) => `groups/${id}`,
      providesTags: [{type: "Courses"}]
    }),
    getTeachingCourses: build.query<Course[], string | void>({
      query: () => 'courses/teaching',
      providesTags: ["TeachingCourses"]
    }),
    getCourcesDetails: build.query<CourseDetails, string>({
      query: (id) => `courses/${id}/details`,
      providesTags: ["CoursesDetails"]
    }),
    addCourse: build.mutation<void, CourseRequest>({
      query(data: CourseRequest) {
          const {groupId, ...body} = data;
          return {
              url: `/courses/${groupId}`,
              method: "POST",
              body,
          }
      },
      invalidatesTags: [{type: "Courses"}],
    }),
    addNotification: build.mutation<void, AddNotification>({
      query(data: AddNotification) {
        const {courseId, ...body} = data;
        return {
            url: `/courses/${courseId}/notifications`,
            method: "POST",
            body,
        }
    },
    invalidatesTags: ["CoursesDetails"]
    }),
    addteacher: build.mutation<void, AddTeacherRequest>({
      query(data: AddTeacherRequest) {
        const {courseId, ...body} = data;
        return {
            url: `/courses/${courseId}/teachers`,
            method: "POST",
            body,
        }
    },
    invalidatesTags: ["CoursesDetails"]
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserCourcesQuery, useGetCourcesByGroupIdQuery, useGetTeachingCoursesQuery, useAddCourseMutation, useAddNotificationMutation, useAddteacherMutation, useGetCourcesDetailsQuery } = courcesApi
