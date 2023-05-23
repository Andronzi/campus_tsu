import Button from "@/components/atoms/button";
import { useAddNotificationMutation } from "@/services/Course/courcesApi";
import { AddNotification } from "@/services/Course/types";
import Input from "@/ui/Input";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type AddNotificationFormProps = {
  courseId: string;
};

const AddNotificationForm: FC<AddNotificationFormProps> = ({ courseId }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNotification>({
    defaultValues: {
      courseId: courseId,
      text: "",
      isImportant: false,
    },
  });
  const [addNotification] = useAddNotificationMutation();

  const onSubmit = async (data: AddNotification) => {
    try {
      await addNotification({ ...data, courseId }).unwrap();
      toast.success("Комментарий успешно добавлен");
    } catch (err) {
      toast.error("Не удалось добавить комментарий");
    }
  };
  return (
    <div className="flex justify-start w-full">
      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="text"
          type="text"
          register={register}
          rules={{
            required: "Название курса является обязательным параметром",
          }}
          errors={errors}
          className="w-full box-border"
        />
        <Controller
          control={control}
          name="isImportant"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <>
              <label>
                Является важным
                <input
                  className="ml-2"
                  type="radio"
                  onBlur={onBlur}
                  onChange={() => onChange(true)}
                />
              </label>
            </>
          )}
        />
        <Button className="text-white w-full ml-0 mt-6" value="Добавить" />
      </form>
    </div>
  );
};

export default AddNotificationForm;
