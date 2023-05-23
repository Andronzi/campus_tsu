import Button from "@/components/atoms/button";
import { useGetAllUsersQuery } from "@/services/Account/accountApi";
import { User } from "@/services/Account/models";
import { useAddCourseMutation } from "@/services/Course/courcesApi";
import { CourseRequest } from "@/services/Course/types";
import Input from "@/ui/Input";
import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
  const [requirements, setRequirements] = useState("");
  const [annotations, setAnnotations] = useState("");
  const editorRef: any = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    if (typeof window !== "undefined") setEditorLoaded(true);
  }, []);

  const onSubmit = async (data: CourseRequest) => {
    try {
      await addCourse({ ...data, groupId }).unwrap();
      toast.success("Вы успешно добавили курс");
    } catch (err) {
      toast.error("Не удалось добавить курс");
    }
  };
  return editorLoaded ? (
    <div className="flex justify-start w-full">
      <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Название курса"
          name="name"
          type="text"
          register={register}
          rules={{
            required: "Название курса является обязательным параметром",
            pattern: {
              value: /^[а-яА-Яa-zA-Z]+$/,
              message:
                "Название курса может содержать только символы латиницы, кириллицы",
            },
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
            min: {
              value: 2023,
              message: "Минимальный год начала должен быть 2023",
            },
            max: {
              value: 2040,
              message: "Максимальный год начала должен быть 2040",
            },
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
            min: {
              value: 1,
              message: "Минимальное количество мест должно быть 1",
            },
            max: {
              value: 1000,
              message: "Максимальное количество мест должно быть 1000",
            },
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
          rules={{ required: "Требования являются обязательным параметром" }}
          render={({
            field: { onChange, onBlur, value, ref },
            formState,
            fieldState,
          }) => (
            <>
              <CKEditor
                editor={ClassicEditor}
                data={requirements}
                onChange={(
                  event: any,
                  editor: { getData: () => SetStateAction<string> }
                ) => {
                  setRequirements(editor.getData());
                  onChange(editor.getData());
                }}
              />
            </>
          )}
        />
        {errors.requirements && (
          <p className="mt-1 mb-0 font-montserrat text-red-400">
            {errors.requirements.message}
          </p>
        )}
        <p className="font-montserrat mt-4 mb-2">Аннотации</p>
        <Controller
          name="annotations"
          control={control}
          rules={{ required: "Аннотации являются обязательным параметром" }}
          render={({
            field: { onChange, onBlur, value, ref },
            formState,
            fieldState,
          }) => (
            <>
              <CKEditor
                editor={ClassicEditor}
                data={annotations}
                onChange={(
                  event: any,
                  editor: { getData: () => SetStateAction<string> }
                ) => {
                  setAnnotations(editor.getData());
                  onChange(editor.getData());
                }}
              />
            </>
          )}
        />
        {errors.annotations && (
          <p className="mt-1 mb-0 font-montserrat text-red-400">
            {errors.annotations.message}
          </p>
        )}
        <select
          className="mt-4 p-2 font-montserrat border-2 border-slate-200 rounded-md border-solid"
          {...register("mainTeacherId")}
        >
          {users?.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <Button className="text-white w-full ml-0 mt-6" value="Отправить" />
      </form>
    </div>
  ) : null;
};

export default AddCourseForm;
