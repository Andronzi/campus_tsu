import Button from "@/components/atoms/button";
import { useEditCourseStatusMutation } from "@/services/Course/courcesApi";
import { EditCourseStatus } from "@/services/Course/types";
import { FC } from "react";
import { useForm } from "react-hook-form";

type ChangeCourseStatusFormProps = {
  courseId: string;
};

const ChangeCourseStatusForm: FC<ChangeCourseStatusFormProps> = ({
  courseId,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCourseStatus>({
    defaultValues: {
      courseId: courseId,
    },
  });
  const [editCourseStatus] = useEditCourseStatusMutation();

  const onSubmit = async (data: EditCourseStatus) => {
    editCourseStatus({ ...data, courseId });
  };
  return (
    <div className="flex justify-start w-full">
      <form
        className="w-full flex flex-col mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <label className="flex">
            Открыт для записи
            <input
              {...register("status")}
              className="ml-2"
              type="radio"
              value="OpenForAssigning"
            />
          </label>
          <label className="ml-4">
            В процессе обучения
            <input
              {...register("status")}
              className="ml-2"
              type="radio"
              value="Started"
            />
          </label>
          <label className="ml-4">
            Закрыт
            <input
              {...register("status")}
              className="ml-2"
              type="radio"
              value="Finished"
            />
          </label>
        </div>
        <Button className="text-white w-full ml-0 mt-6" value="Создать" />
      </form>
    </div>
  );
};

export default ChangeCourseStatusForm;
