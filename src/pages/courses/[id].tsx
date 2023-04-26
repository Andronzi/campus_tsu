import Button from "@/components/atoms/button";
import FormModal from "@/components/molecules/formModal";
import InfoPanel from "@/components/molecules/infoPanel/infoPanel";

import useModal from "@/hooks/useModal";
import {
  useAddUserToCourseMutation,
  useGetCourcesDetailsQuery,
} from "@/services/Course/courcesApi";
import { useRouter } from "next/router";
import { useState } from "react";

import AddNotificationForm from "./forms/addNotification";
import AddTeacherForm from "./forms/addTeacher";

import WithPermission from "@/components/atoms/withPermission";
import { useGetUserProfileQuery } from "@/services/Account/accountApi";
import { Student, Teacher } from "@/services/Course/types";
import {
  BasicCourseInfo,
  CourseInfoListContainer,
  NotificationList,
  StudentsList,
  TeachersList,
} from "./items/index";

const CourseDetails = () => {
  const router = useRouter();
  const courseId = typeof router.query.id === "string" ? router.query.id : "";
  const { show, setShow, header, setHeader } = useModal();
  const [body, setBody] = useState() as any;

  const { data, isLoading, error } = useGetCourcesDetailsQuery(courseId);
  const userEmail = useGetUserProfileQuery().data?.email;
  const [addUser] = useAddUserToCourseMutation();

  if (isLoading) {
    return <p>Загрузка данных</p>;
  }

  if (error || typeof data === "undefined") {
    return <p>Ошибка загрузки данных</p>;
  }

  return (
    <div className="max-w-7xl mx-auto font-montserrat mb-4">
      <h2 className="text-3xl">{data.name}</h2>
      <div className="flex justify-between">
        <p className="text-xl font-medium">Основные данные курса</p>
        <WithPermission roles={["Admin"]}>
          <Button
            value="Редактировать"
            className="w-max bg-yellow-400 hover:bg-yellow-600"
          />
        </WithPermission>
        {!!data.teachers.filter(
          (teacher: Teacher) => teacher.email === userEmail
        ).length ? (
          <Button
            value="Редактировать"
            className="w-max bg-yellow-400 hover:bg-yellow-600"
          />
        ) : (
          <WithPermission roles={["Teacher"]}>
            <Button
              value="Записаться на курс"
              className="w-max bg-green-400 hover:bg-green-600"
            />
          </WithPermission>
        )}

        {!!data.students.filter(
          (student: Student) => student.email === userEmail
        ).length ? null : (
          <Button
            value="Записаться на курс"
            onClick={() => {
              addUser(courseId);
            }}
            className="w-max bg-green-400 hover:bg-green-600"
          />
        )}
      </div>
      <BasicCourseInfo {...data} />
      <InfoPanel
        {...[
          { "Требования к курсу": data.requirements },
          { Аннотация: data.annotations },
          {
            Уведомления: (
              <CourseInfoListContainer>
                <Button
                  className="w-max m-4"
                  onClick={() => {
                    setHeader("Создать уведомление");
                    setBody(<AddNotificationForm courseId={data.id} />);
                    setShow();
                  }}
                  value="Создать уведомление"
                />
                <NotificationList notifications={data.notifications} />
              </CourseInfoListContainer>
            ),
          },
        ]}
      />

      <InfoPanel
        {...[
          {
            Преподаватели: (
              <CourseInfoListContainer>
                <Button
                  className="w-max m-4"
                  onClick={() => {
                    setHeader("Добавить учителя");
                    setBody(<AddTeacherForm courseId={data.id} />);
                    setShow();
                  }}
                  value="Добавить учителя"
                />
                <TeachersList teachers={data.teachers} />
              </CourseInfoListContainer>
            ),
          },
          {
            Студенты: (
              <CourseInfoListContainer>
                <StudentsList courseId={courseId} students={data.students} />
              </CourseInfoListContainer>
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
