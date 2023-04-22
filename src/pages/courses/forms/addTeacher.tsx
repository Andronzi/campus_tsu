import Button from "@/components/atoms/button";
import { IUser, useGetAllUsersQuery } from "@/services/Account/accountApi";
import { useAddteacherMutation } from "@/services/Course/courcesApi";
import { AddTeacherRequest } from "@/services/Course/types";
import { FC } from "react";
import { useForm } from "react-hook-form";

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
    addTeacher({ ...data, courseId });
  };
  return (
    <div className="flex justify-start w-full">
      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <select
          className="mt-4 p-2 font-montserrat border-2 border-slate-200 rounded-md border-solid"
          {...register("userId")}
        >
          {users?.map((user: IUser) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <Button className="text-white w-full ml-0 mt-6" value="Создать" />
      </form>
    </div>
  );
};

export default AddTeacherForm;
