import Button from "@/components/atoms/button";
import CourseCard from "@/components/atoms/course-card";
import WithPermission from "@/components/atoms/withPermission";
import AddCourseForm from "@/components/molecules/courseForm/addCourseForm";
import FormModal from "@/components/molecules/formModal";
import useModal from "@/hooks/useModal";
import { useGetCourcesByGroupIdQuery } from "@/services/Course/courcesApi";
import { Course } from "@/services/Course/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const groupId = typeof router.query.id === "string" ? router.query.id : "";
  const { data } = useGetCourcesByGroupIdQuery(groupId);
  const { show, setShow, header, setHeader } = useModal();
  const [body, setBody] = useState() as any;
  return (
    <div className="max-w-7xl mx-auto">
      <WithPermission roles={["Admin"]}>
        <Button
          value="Создать"
          className="mt-3 mb-3"
          onClick={() => {
            setHeader("Создание курса");
            setBody(<AddCourseForm groupId={groupId} />);
            setShow();
          }}
        />
      </WithPermission>
      <h2 className="font-montserrat text-slate-800">
        Группа - {router.query.name}
      </h2>
      <ul className="pl-0">
        {data?.map((course: Course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </ul>
      <FormModal
        header={header}
        body={body}
        show={show}
        onCloseButtonClick={setShow}
      />
    </div>
  );
}
