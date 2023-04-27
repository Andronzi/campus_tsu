import Button from "@/components/atoms/button";
import WithPermission from "@/components/atoms/withPermission";
import {
  semesterConvertions,
  statusColors,
  statusConvertions,
} from "@/pages/data/course";
import { CourseDetails } from "@/services/Course/types";
import { FC } from "react";
import ChangeCourseStatusForm from "../forms/changeStatus";

type BasicCourseInfoProps = {
  data: CourseDetails;
  setHeader: Function;
  setBody: Function;
  setShow: Function;
};

const BasicCourseInfo: FC<BasicCourseInfoProps> = ({
  data,
  setHeader,
  setBody,
  setShow,
}) => (
  <ul className="mt-2 list-none pl-0">
    <li className="flex justify-between items-center p-4 border-solid border border-slate-300 rounded-t-md">
      <div>
        <p className="font-medium text-md">Статус курса</p>
        <p className={`${statusColors[data.status]}	text-sm `}>
          {statusConvertions[data.status]}
        </p>
      </div>
      <WithPermission roles={["Admin", "Teacher"]}>
        <Button
          className="w-max bg-yellow-400 hover:bg-yellow-600"
          value="Изменить"
          onClick={() => {
            setHeader("Изменить статус");
            setBody(<ChangeCourseStatusForm courseId={data.id} />);
            setShow();
          }}
        />
      </WithPermission>
    </li>
    <li className="-mt-px flex items-center p-4 border-solid border border-slate-300">
      <div className="basis-1/2">
        <p className="font-medium text-md">Учебный год</p>
        <p className="text-gray-600	text-sm">
          {data.startYear} - {data.startYear + 1}
        </p>
      </div>
      <div className="basis-1/2">
        <p className="font-medium text-md">Семестр</p>
        <p className="text-gray-600	text-sm">
          {semesterConvertions[data.semester]}
        </p>
      </div>
    </li>
    <li className="-mt-px flex items-center p-4 border-solid border border-slate-300">
      <div className="basis-1/2">
        <p className="font-medium text-md">Всего мест</p>
        <p className="text-gray-600	text-sm">{data.maximumStudentsCount}</p>
      </div>
      <div className="basis-1/2">
        <p className="font-medium text-md">Студентов зачислено</p>
        <p className="text-gray-600	text-sm">{data.studentsEnrolledCount}</p>
      </div>
    </li>
    <li className="-mt-px p-4 border-solid border border-slate-300 rounded-b-md">
      <p className="font-medium text-md">Заявок на рассмотрении</p>
      <p className="text-gray-600	text-sm">{data.studentsInQueueCount}</p>
    </li>
  </ul>
);

export default BasicCourseInfo;
