import Attestation from "@/components/atoms/attestationInfo";
import Button from "@/components/atoms/button";
import WithPermission from "@/components/atoms/withPermission";
import { studentStatusColors, studentStatusConvertions } from "@/data/student";
import {
  useGetUserProfileQuery,
  useGetUserRolesQuery,
} from "@/services/Account/accountApi";
import { useEditStudentStatusMutation } from "@/services/Course/courcesApi";
import { Student, Teacher } from "@/services/Course/types";
import { FC } from "react";

type StudentsListProps = {
  setHeader: Function;
  setBody: Function;
  setShow: Function;
  courseId: string;
  students: Student[];
  teachers: Teacher[];
};

const StudentsList: FC<StudentsListProps> = ({
  setHeader,
  setBody,
  setShow,
  courseId,
  students,
  teachers,
}) => {
  const userEmail = useGetUserProfileQuery().data?.email;
  const isAdmin = useGetUserRolesQuery().data?.isAdmin;
  const [editStudentStatus] = useEditStudentStatusMutation();
  return (
    <>
      {students.map((student: Student) => (
        <li
          className="flex justify-between px-3 py-2 border-solid border border-slate-300 -mt-px last:rounded-b-md"
          key={student.email}
        >
          <div className="basis-1/3">
            <p className="font-medium text-md">{student.name}</p>
            <p className="text-sm text-gray-700">
              Статус -
              <span
                className={`${studentStatusColors[student.status]} font-medium`}
              >
                {studentStatusConvertions[student.status]}
              </span>
            </p>
            <p className="text-sm text-gray-700">{student.email}</p>
          </div>
          {student.status === "Accepted" && (
            <div className="flex items-center basis-3/5">
              {!teachers.filter(
                (teacher: Teacher) => teacher.email === userEmail
              ).length &&
                isAdmin && (
                  <>
                    <Attestation
                      setHeader={setHeader}
                      setBody={setBody}
                      setShow={setShow}
                      courseId={courseId}
                      studentId={student.id}
                      type="Промежуточная"
                      result={student.midtermResult}
                    />
                    <Attestation
                      setHeader={setHeader}
                      setBody={setBody}
                      setShow={setShow}
                      courseId={courseId}
                      studentId={student.id}
                      type="Итоговая"
                      result={student.finalResult}
                    />
                  </>
                )}

              {!!teachers.filter(
                (teacher: Teacher) => teacher.email === userEmail
              ).length && (
                <>
                  <Attestation
                    setHeader={setHeader}
                    setBody={setBody}
                    setShow={setShow}
                    courseId={courseId}
                    studentId={student.id}
                    type="Промежуточная"
                    result={student.midtermResult}
                  />
                  <Attestation
                    setHeader={setHeader}
                    setBody={setBody}
                    setShow={setShow}
                    courseId={courseId}
                    studentId={student.id}
                    type="Итоговая"
                    result={student.finalResult}
                  />
                </>
              )}

              {userEmail === student.email && !isAdmin && (
                <>
                  <Attestation
                    setHeader={setHeader}
                    setBody={setBody}
                    setShow={setShow}
                    courseId={courseId}
                    studentId={student.id}
                    type="Промежуточная"
                    result={student.midtermResult}
                  />
                  <Attestation
                    setHeader={setHeader}
                    setBody={setBody}
                    setShow={setShow}
                    courseId={courseId}
                    studentId={student.id}
                    type="Итоговая"
                    result={student.finalResult}
                  />
                </>
              )}
            </div>
          )}
          {student.status === "InQueue" && (
            <WithPermission roles={["Admin", "Teacher"]}>
              <div>
                <Button
                  value="Принять"
                  className="w-max"
                  onClick={() => {
                    editStudentStatus({
                      courseId: courseId,
                      status: "Accepted",
                      studentId: student.id,
                    });
                  }}
                />
                <Button
                  value="Отклонить заявку"
                  className="w-max bg-red-400 hover:bg-red-600 ml-2"
                  onClick={() => {
                    editStudentStatus({
                      courseId: courseId,
                      status: "Declined",
                      studentId: student.id,
                    });
                  }}
                />
              </div>
            </WithPermission>
          )}
        </li>
      ))}
    </>
  );
};

export default StudentsList;
