import CourseCard from "@/components/atoms/course-card";
import { useGetUserCourcesQuery } from "@/services/Course/courcesApi";
import { Course } from "@/services/Course/types";
import { NextPage } from "next";
import { Suspense } from "react";

const Groups: NextPage = () => {
  const courses = useGetUserCourcesQuery().data;
  return (
    <Suspense fallback={<p>Loading groups...</p>}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-montserrat">Ваши курсы</h2>
        <ul className="pl-0">
          {courses?.map((course: Course) => {
            console.log(course);
            return <CourseCard key={course.id} {...course} />;
          })}
        </ul>
      </div>
    </Suspense>
  );
};

export default Groups;
