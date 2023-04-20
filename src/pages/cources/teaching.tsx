import CourseCard from "@/components/atoms/course-card";
import { Course, useGetTeachingCoursesQuery } from "@/services/courcesApi";
import { NextPage } from "next";
import { Suspense } from "react";

const Groups: NextPage = () => {
  const cources = useGetTeachingCoursesQuery().data;
  return (
    <Suspense fallback={<p>Loading groups...</p>}>
      <div className="max-w-7xl mx-auto">
        <h2 className="font-montserrat">Ваши курсы</h2>
        <ul className="pl-0">
          {cources?.map((course: Course) => {
            return <CourseCard key={course.id} {...course} />;
          })}
        </ul>
      </div>
    </Suspense>
  );
};

export default Groups;
