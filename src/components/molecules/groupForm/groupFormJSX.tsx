import Input from "@/ui/Input";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Button from "../../atoms/button";

type GroupFormJSXProps = {
  handleSubmit: Function;
  onSubmit: (data: any) => Promise<void>;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
};

const GroupFormJSX: FC<GroupFormJSXProps> = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
}) => (
  <div className="flex justify-start w-full">
    <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        type="text"
        register={register}
        rules={{
          required: "Название группы является обязательным параметром",
        }}
        errors={errors}
        className="w-full box-border"
      />
      <Button className="text-white w-full ml-0 mt-4" value="Отправить" />
    </form>
  </div>
);

export default GroupFormJSX;
