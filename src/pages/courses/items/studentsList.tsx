import Attestation from "@/components/atoms/attestationInfo";
import Button from "@/components/atoms/button";
import {
  studentStatusColors,
  studentStatusConvertions,
} from "@/pages/data/student";
import { Student } from "@/services/Course/types";
import { FC } from "react";

type StudentsListProps = {
  students: Student[];
};

const StudentsList: FC<StudentsListProps> = ({ students }) => (
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
            <Attestation result={student.midtermResult} />
            <Attestation result={student.finalResult} />
          </div>
        )}
        {student.status === "InQueue" && (
          <div>
            <Button value="Принять" className="w-max" />
            <Button
              value="Отклонить заявку"
              className="w-max bg-red-400 hover:bg-red-600 ml-2"
            />
          </div>
        )}
      </li>
    ))}
  </>
);

export default StudentsList;
