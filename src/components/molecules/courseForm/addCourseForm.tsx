import Button from "@/components/atoms/button";
import { IUser, useGetAllUsersQuery } from "@/services/Account/accountApi";
import { useAddCourseMutation } from "@/services/Course/courcesApi";
import { CourseRequest } from "@/services/Course/types";
import Input from "@/ui/Input";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type AddCourseFormProps = {
  groupId: string;
};

const AddCourseForm: FC<AddCourseFormProps> = ({ groupId }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseRequest>();
  const [addCourse] = useAddCourseMutation();
  const users = useGetAllUsersQuery().data;
  const [data, setData] = useState("");

  const onSubmit = async (data: CourseRequest) => {
    await addCourse({ ...data, groupId });
  };
  return (
    <div className="flex justify-start w-full">
      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Название курса"
          name="name"
          type="text"
          register={register}
          rules={{
            required: "Название курса является обязательным параметром",
          }}
          errors={errors}
          className="w-full box-border"
        />
        <Input
          label="Год начала курса"
          name="startYear"
          type="text"
          register={register}
          rules={{
            required: "Год начала курса является обязательным параметром",
          }}
          errors={errors}
          className="w-full box-border"
        />
        <Input
          label="Общее количество мест"
          name="maximumStudentsCount"
          type="text"
          register={register}
          rules={{
            required: "Общее количество мест является обязательным параметром",
          }}
          errors={errors}
          className="w-full box-border"
        />
        <div className="flex">
          <Input
            label="Осенний"
            name="semester"
            value="Autumn"
            type="radio"
            register={register}
            rules={{
              required: "Выбор семестра является обязательным параметром",
            }}
            errors={errors}
            className="w-full box-border"
          />
          <Input
            label="Весенний"
            name="semester"
            value="Spring"
            type="radio"
            register={register}
            rules={{
              required: "Выбор семестра является обязательным параметром",
            }}
            errors={errors}
            className="w-full box-border"
          />
        </div>
        <p className="font-montserrat mt-4 mb-2">Требования</p>
        <Controller
          name="requirements"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            formState,
            fieldState,
          }) => (
            <>
              <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                  setData(editor.getData());
                  onChange(editor.getData());
                }}
              />
            </>
          )}
        />
        <p className="font-montserrat mt-4 mb-2">Аннотации</p>
        <Controller
          name="annotations"
          control={control}
          render={({
            field: { onChange, onBlur, value, ref },
            formState,
            fieldState,
          }) => (
            <>
              <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(event, editor) => {
                  setData(editor.getData());
                  onChange(editor.getData());
                }}
              />
            </>
          )}
        />
        <select
          className="mt-4 p-2 font-montserrat border-2 border-slate-200 rounded-md border-solid"
          {...register("mainTeacherId")}
        >
          {users?.map((user: IUser) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <Button className="text-white w-full ml-0 mt-6" value="Отправить" />
      </form>
    </div>
  );
};

export default AddCourseForm;
