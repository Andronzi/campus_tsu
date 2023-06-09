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
import EditCourseDetails from "./forms/editCourseDetails";
import BasicCourseInfo from "./items/basicCourseInfo";
import CourseInfoListContainer from "./items/courseInfoList";
import NotificationList from "./items/notificationList";
import StudentsList from "./items/studentsList";
import TeachersList from "./items/teachersList";

const CourseDetails = () => {
  const router = useRouter();
  const courseId = typeof router.query.id === "string" ? router.query.id : "";
  const { show, setShow, header, setHeader } = useModal();
  const [body, setBody] = useState() as any;

  const { data, isLoading, error } = useGetCourcesDetailsQuery(courseId);
  const userEmail = useGetUserProfileQuery().data?.email;
  const [addUser] = useAddUserToCourseMutation();

  const provideFormData = (header: string, body: any) => {
    setHeader(header);
    setBody(body);
    setShow();
  };

  const handleEditButtonClick = () => {
    provideFormData(
      "Редактировать детали курса",
      <EditCourseDetails
        courseId={courseId}
        requirements={data?.requirements!}
        annotations={data?.annotations!}
      />
    );
  };

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
        <div className="flex">
          {!data.teachers.filter(
            (teacher: Teacher) => teacher.email === userEmail
          ).length && (
            <WithPermission roles={["Admin"]}>
              <Button
                value="Редактировать"
                className="w-max bg-yellow-400 hover:bg-yellow-600"
                onClick={() => handleEditButtonClick()}
              />
            </WithPermission>
          )}
          {!!data.teachers.filter(
            (teacher: Teacher) => teacher.email === userEmail
          ).length && (
            <Button
              value="Редактировать"
              className="w-max bg-yellow-400 hover:bg-yellow-600"
              onClick={() => handleEditButtonClick()}
            />
          )}

          {!data.students.filter(
            (student: Student) => student.email === userEmail
          ).length &&
            !data.teachers.filter(
              (teacher: Teacher) => teacher.email === userEmail
            ).length &&
            data.status === "OpenForAssigning" && (
              <Button
                value="Записаться на курс"
                onClick={() => {
                  addUser(courseId);
                }}
                className="w-max bg-green-400 hover:bg-green-600 ml-4"
              />
            )}
        </div>
      </div>
      <BasicCourseInfo
        data={data}
        setHeader={setHeader}
        setBody={setBody}
        setShow={setShow}
      />
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
                    provideFormData(
                      "Создать уведомление",
                      <AddNotificationForm courseId={data.id} />
                    );
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
                {data.teachers.filter(
                  (teacher) => teacher.isMain && teacher.email === userEmail
                ).length ? (
                  <Button
                    className="w-max m-4"
                    onClick={() => {
                      provideFormData(
                        "Добавить учителя",
                        <AddTeacherForm courseId={data.id} />
                      );
                    }}
                    value="Добавить учителя"
                  />
                ) : (
                  <WithPermission roles={["Admin"]}>
                    <Button
                      className="w-max m-4"
                      onClick={() => {
                        provideFormData(
                          "Добавить учителя",
                          <AddTeacherForm courseId={data.id} />
                        );
                      }}
                      value="Добавить учителя"
                    />
                  </WithPermission>
                )}
                <TeachersList teachers={data.teachers} />
              </CourseInfoListContainer>
            ),
          },
          {
            Студенты: (
              <CourseInfoListContainer>
                <StudentsList
                  setHeader={setHeader}
                  setBody={setBody}
                  setShow={setShow}
                  courseId={courseId}
                  students={data.students}
                  teachers={data.teachers}
                />
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
