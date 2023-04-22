import { useUpdateGroupMutation } from "@/services/Groups/groupApi";
import { FC } from "react";
import { useForm } from "react-hook-form";
import GroupFormJSX from "./groupFormJSX";
import { IGroupForm } from "./types";

type EditGroupProps = {
  groupId: string;
};

const EditGroupForm: FC<EditGroupProps> = ({ groupId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGroupForm>();
  const [updateGroup] = useUpdateGroupMutation();

  const onSubmit = async (data: IGroupForm) => {
    await updateGroup({ id: groupId, name: data.name });
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

export default EditGroupForm;
