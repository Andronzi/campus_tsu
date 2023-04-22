import Button from "@/components/atoms/button";
import FormModal from "@/components/molecules/formModal";
import InfoPanel from "@/components/molecules/infoPanel/infoPanel";
import useModal from "@/hooks/useModal";
import { useGetCourcesDetailsQuery } from "@/services/Course/courcesApi";
import { Notification, Student, Teacher } from "@/services/Course/types";
import { useRouter } from "next/router";
import { useState } from "react";
import AddNotificationForm from "./forms/addNotification";
import AddTeacherForm from "./forms/addTeacher";
import BasicCourseInfo from "./items/basicCourseInfo";

const CourseDetails = () => {
  const router = useRouter();
  const courseId = typeof router.query.id === "string" ? router.query.id : "";
  const { show, setShow, header, setHeader } = useModal();
  const [body, setBody] = useState() as any;

  const { data, isLoading, error } = useGetCourcesDetailsQuery(courseId);

  if (isLoading) {
    return <p>Загрузка данных</p>;
  }

  if (error || typeof data === "undefined") {
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div className="max-w-7xl mx-auto font-montserrat mb-4">
      <h2 className="text-3xl">{data.name}</h2>
      <p className="text-xl font-medium">Основные данные курса</p>
      <BasicCourseInfo {...data} />
      <InfoPanel
        {...[
          { "Требования к курсу": data.requirements },
          { Аннотация: data.annotations },
          {
            Уведомления: (
              <ul className="m-0 p-0 border-solid border border-slate-300 rounded-b-md">
                <Button
                  className="w-max m-4"
                  onClick={() => {
                    setHeader("Создать уведомление");
                    setBody(<AddNotificationForm courseId={data.id} />);
                    setShow();
                  }}
                  value="Создать уведомление"
                />
                {data.notifications.map(
                  (notification: Notification, index: number) => (
                    <li
                      className={`flex px-3 py-2 border-x-0 border-t border-b-0 border-solid border-slate-300 ${
                        notification.isImportant && "bg-red-500 text-white"
                      } last:rounded-b-md`}
                      key={index}
                    >
                      {notification.text}
                    </li>
                  )
                )}
              </ul>
            ),
          },
        ]}
      />

      <InfoPanel
        {...[
          {
            Преподаватели: (
              <ul className="p-0 m-0">
                <Button
                  className="w-max m-4"
                  onClick={() => {
                    setHeader("Добавить учителя");
                    setBody(<AddTeacherForm courseId={data.id} />);
                    setShow();
                  }}
                  value="Добавить учителя"
                />
                {data.teachers.map((teacher: Teacher, index: number) => (
                  <li
                    className="flex px-3 py-2 border-solid border border-slate-300 -mt-px last:rounded-b-md"
                    key={teacher.email}
                  >
                    <div>
                      <p className="text-md font-semibold">{teacher.name}</p>
                      <p className="text-sm text-gray-600">{teacher.email}</p>
                    </div>
                    {!!teacher.isMain && (
                      <Button
                        className="w-max bg-green-400 hover:bg-green-600 ml-4 py-1 px-3"
                        value="основной"
                      />
                    )}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            Студенты: (
              <ul className="p-0 m-0 list-none">
                {data.students.map((student: Student, index: number) => (
                  <li
                    className="px-3 py-2 border-solid border border-slate-300 -mt-px last:rounded-b-md"
                    key={index}
                  >
                    {student.name}
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
      />
      <FormModal
        show={show}
        header={header}
        onCloseButtonClick={setShow}
        body={body}
      />
    </div>
  );
};

export default CourseDetails;
