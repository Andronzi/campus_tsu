import { useAddGroupMutation } from "@/services/Groups/groupApi";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import GroupFormJSX from "./groupFormJSX";
import { IGroupForm } from "./types";

const AddGroupForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGroupForm>();
  const [addGroup] = useAddGroupMutation();

  const onSubmit = async (data: IGroupForm) => {
    try {
      await addGroup(data).unwrap();
      toast.success("Группа успешно добавлена");
    } catch (err) {
      toast.error("Не удалось добавить группу");
    }
  };
  return (
    <GroupFormJSX
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
    />
  );
};

export default AddGroupForm;
