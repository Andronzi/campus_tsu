import Attestation from "@/components/atoms/attestationInfo";
import Button from "@/components/atoms/button";
import WithPermission from "@/components/atoms/withPermission";
import {
  studentStatusColors,
  studentStatusConvertions,
} from "@/pages/data/student";
import { useGetUserProfileQuery } from "@/services/Account/accountApi";
import { useEditStudentStatusMutation } from "@/services/Course/courcesApi";
import { Student } from "@/services/Course/types";
import { FC } from "react";

type StudentsListProps = {
  courseId: string;
  students: Student[];
};

const StudentsList: FC<StudentsListProps> = ({ courseId, students }) => {
  const userEmail = useGetUserProfileQuery().data?.email;
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
              <WithPermission roles={["Teacher", "Admin"]}>
                <>
                  <Attestation
                    type="Промежуточная"
                    result={student.midtermResult}
                  />
                  <Attestation type="Итоговая" result={student.finalResult} />
                </>
              </WithPermission>

              {userEmail === student.email && (
                <>
                  <Attestation
                    type="Промежуточная"
                    result={student.midtermResult}
                  />
                  <Attestation type="Итоговая" result={student.finalResult} />
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
