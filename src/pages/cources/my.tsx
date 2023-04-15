import CourseCard from "@/components/atoms/course-card";
import Layout from "@/components/molecules/layout/layout";
import { Course, useGetUserCourcesQuery } from "@/services/courcesApi";
import { NextPage } from "next";
import { Suspense } from "react";

const Groups: NextPage = () => {
  const cources = useGetUserCourcesQuery().data;
  return (
    <Suspense fallback={<p>Loading groups...</p>}>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-montserrat">Ваши курсы</h2>
          <ul className="pl-0">
            {cources?.map((course: Course) => {
              console.log(course);
              return <CourseCard key={course.id} {...course} />;
            })}
          </ul>
        </div>
      </Layout>
    </Suspense>
  );
};

export default Groups;
