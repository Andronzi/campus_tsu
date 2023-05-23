import { studentResultColors, studentResultConvertions } from "@/data/student";
import ChangeStudentMarkForm from "@/pages/courses/forms/changeStudentMarkForm";
import { StudentMarks } from "@/services/Course/types";
import { FC } from "react";
import Button from "./button";

type AttestationProps = {
  setHeader: Function;
  setBody: Function;
  setShow: Function;
  type: any;
  studentId: string;
  courseId: string;
  result: StudentMarks;
};

const Attestation: FC<AttestationProps> = ({
  setHeader,
  setBody,
  setShow,
  type,
  result,
  courseId,
  studentId,
}) => (
  <div className="flex items-center basis-1/2">
    <p
      className="text-sm text-blue-400 underline cursor-pointer"
      onClick={() => {
        setHeader(`Изменения для ${type} аттестация`);
        setBody(
          <ChangeStudentMarkForm
            courseId={courseId}
            studentId={studentId}
            markType={type}
          />
        );
        setShow();
      }}
    >
      {type} аттестация
    </p>
    <Button
      value={studentResultConvertions[result]}
      className={`${studentResultColors[result]} w-max ml-2 px-2 pt-2 pb-2 pointer-events-none !cursor-default !text-xs`}
    />
  </div>
);

export default Attestation;
