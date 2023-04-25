import Button from "@/components/atoms/button";
import {
  studentResultColors,
  studentResultConvertions,
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
            <div className="flex items-center basis-1/2">
              <p className="text-sm text-blue-400 underline cursor-pointer">
                Промежуточная аттестация
              </p>
              <Button
                value={studentResultConvertions[student.midtermResult]}
                className={`${
                  studentResultColors[student.midtermResult]
                } w-max ml-2 px-2 pt-2 pb-2 pointer-events-none !cursor-default !text-xs`}
              />
            </div>
            <div className="ml-6 flex items-center basis-1/2">
              <p className="text-sm text-blue-400 underline cursor-pointer">
                Финальная аттестация
              </p>
              <Button
                value={studentResultConvertions[student.midtermResult]}
                className={`${
                  studentResultColors[student.midtermResult]
                } w-max ml-2 px-2 pt-2 pb-2 pointer-events-none !cursor-default !text-xs`}
              />
            </div>
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
