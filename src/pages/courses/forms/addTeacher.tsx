import Button from "@/components/atoms/button";
import { useGetAllUsersQuery } from "@/services/Account/accountApi";
import { User } from "@/services/Account/models";
import { useAddteacherMutation } from "@/services/Course/courcesApi";
import { AddTeacherRequest } from "@/services/Course/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AddNotificationFormProps = {
  courseId: string;
};

const AddTeacherForm: FC<AddNotificationFormProps> = ({ courseId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTeacherRequest>();
  const [addTeacher] = useAddteacherMutation();
  const users = useGetAllUsersQuery().data;

  const onSubmit = async (data: AddTeacherRequest) => {
    try {
      await addTeacher({ ...data, courseId }).unwrap();
      toast.success("Комментарий успешно добавлен");
    } catch (err) {
      toast.error("Не удалось добавить комментарий");
    }
  };
  return (
    <div className="flex justify-start w-full">
      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <select
          className="mt-4 p-2 font-montserrat border-2 border-slate-200 rounded-md border-solid"
          {...register("userId", {
            required: "Имя учителя является обязательным параметром",
          })}
        >
          {users?.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <Button className="text-white w-full ml-0 mt-6" value="Добавить" />
      </form>
    </div>
  );
};

export default AddTeacherForm;
