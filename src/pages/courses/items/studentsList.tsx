import { Student } from "@/services/Course/types";
import { FC } from "react";

type StudentsListProps = {
  students: Student[];
};

const StudentsList: FC<StudentsListProps> = ({ students }) => (
  <>
    {students.map((student: Student) => (
      <li
        className="px-3 py-2 border-solid border border-slate-300 -mt-px last:rounded-b-md"
        key={student.email}
      >
        {student.name}
      </li>
    ))}
  </>
);

export default StudentsList;
