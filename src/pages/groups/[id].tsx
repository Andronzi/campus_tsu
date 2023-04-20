import CourseCard from "@/components/atoms/course-card";
import { Course, useGetCourcesByGroupIdQuery } from "@/services/courcesApi";
import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  console.log(router.query);
  const { data } = useGetCourcesByGroupIdQuery(router.query.id);
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="font-montserrat text-slate-800">
        Группа - {router.query.name}
      </h2>
      <ul className="pl-0">
        {data?.map((course: Course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>
    </div>
  );
}
