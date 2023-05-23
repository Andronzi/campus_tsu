import Button from "@/components/atoms/button";
import { useEditCourseMarkMutation } from "@/services/Course/courcesApi";
import { EditStudentMark } from "@/services/Course/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type ChangeStudentMarkFormProps = {
  studentName?: string;
  courseId: string;
  studentId: string;
  markType: string;
};

const ChangeStudentMarkForm: FC<ChangeStudentMarkFormProps> = ({
  courseId,
  studentId,
  markType,
  studentName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStudentMark>({
    defaultValues: {
      courseId: courseId,
      studentId,
    },
  });
  const [editStudentMark] = useEditCourseMarkMutation();

  const onSubmit = async (data: EditStudentMark) => {
    const type = markType === "Промежуточная" ? "Midterm" : "Final";
    try {
      await editStudentMark({ ...data, markType: type }).unwrap();
      toast.success("Оценка успешно изменена");
    } catch (err) {
      toast.error("Не удалось изменить оценку");
    }
  };
  return (
    <div className="flex justify-start w-full">
      <p>{studentName}</p>
      <form
        className="w-full flex flex-col mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <label className="flex">
            <input
              {...register("mark")}
              className="ml-2"
              type="radio"
              value="Passed"
            />
            Пройдено
          </label>
          <label className="ml-4">
            <input
              {...register("mark")}
              className="ml-2"
              type="radio"
              value="Failed"
            />
            Зафейлено
          </label>
        </div>
        <Button
          className="text-white w-full ml-0 mt-6 bg-yellow-400 hover:bg-yellow-600"
          value="Изменить"
        />
      </form>
    </div>
  );
};

export default ChangeStudentMarkForm;
