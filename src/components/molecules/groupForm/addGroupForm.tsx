import { useAddGroupMutation } from "@/services/Groups/groupApi";
import { FC } from "react";
import { useForm } from "react-hook-form";
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
    await addGroup(data);
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
