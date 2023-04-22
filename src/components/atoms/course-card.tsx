import { statusColors, statusConvertions } from "@/pages/data/course";
import { Course } from "@/services/Course/types";
import router from "next/router";
import { FC } from "react";

const CourseCard: FC<Course> = (course) => {
  const {
    name,
    startYear,
    semester,
    maximumStudentsCount,
    remainingSlotsCount,
    status,
  } = course;

  return (
    <div
      className="flex justify-between font-montserrat border-solid border border-slate-300 p-4 cursor-pointer"
      onClick={() => {
        router.push({
          pathname: `/courses/${course.id}`,
        });
      }}
    >
      <div className="w-[80%]">
        <h2 className="mt-0 mb-0 font-medium text-xl w-[80%]">{name}</h2>
        <p className="text-md mt-2">Учебный год - {startYear}</p>
        <p className="text-md mt-1">Семестр - {semester}</p>
        <p className="text-xs mt-2 text-current">
          Мест всего - {maximumStudentsCount}
        </p>
        <p className="text-xs mt-1 text-current">
          Мест свободно - {remainingSlotsCount}
        </p>
      </div>
      <p className={`${statusColors[status]} font-medium`}>
        {statusConvertions[status]}
      </p>
    </div>
  );
};

export default CourseCard;
