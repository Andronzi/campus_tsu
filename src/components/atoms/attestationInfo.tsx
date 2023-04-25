import {
  studentResultColors,
  studentResultConvertions,
} from "@/pages/data/student";
import { StudentMarks } from "@/services/Course/types";
import { FC } from "react";
import Button from "./button";

type AttestationProps = {
  result: StudentMarks;
};

const Attestation: FC<AttestationProps> = ({ result }) => (
  <div className="flex items-center basis-1/2">
    <p className="text-sm text-blue-400 underline cursor-pointer">
      Промежуточная аттестация
    </p>
    <Button
      value={studentResultConvertions[result]}
      className={`${studentResultColors[result]} w-max ml-2 px-2 pt-2 pb-2 pointer-events-none !cursor-default !text-xs`}
    />
  </div>
);

export default Attestation;
