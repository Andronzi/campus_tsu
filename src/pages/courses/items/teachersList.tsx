import Button from "@/components/atoms/button";
import { Teacher } from "@/services/Course/types";
import { FC } from "react";

type TeachersListProps = {
  teachers: Teacher[];
};

const TeachersList: FC<TeachersListProps> = ({ teachers }) => (
  <>
    {teachers.map((teacher: Teacher) => (
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
            className="w-max bg-green-400 hover:bg-green-400 hover:translate-y-0 ml-4 py-1 px-3 cursor-default"
            value="основной"
          />
        )}
      </li>
    ))}
  </>
);

export default TeachersList;
