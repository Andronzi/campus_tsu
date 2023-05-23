import Button from "@/components/atoms/button";
import { useEditCourseDataMutation } from "@/services/Course/courcesApi";
import { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type ChangeStudentMarkFormProps = EditCourseData;

type EditCourseData = {
  courseId: string;
  requirements: string;
  annotations: string;
};

const EditCourseDetails: FC<ChangeStudentMarkFormProps> = ({
  courseId,
  requirements,
  annotations,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCourseData>({
    defaultValues: {
      courseId,
      requirements,
      annotations,
    },
  });
  const [editCourseData] = useEditCourseDataMutation();
  const [requirementsData, setRequirementsData] = useState(requirements);
  const [annotationsData, setAnnotationsData] = useState(annotations);

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

  const onSubmit = async (data: EditCourseData) => {
    try {
      await editCourseData({ ...data }).unwrap();
      toast.success("Детали курса успешно изменены");
    } catch (err) {
      toast.error("Не удалось изменить детали курса");
    }
  };
  return (
    <div className="flex justify-start w-full">
      <form
        className="w-full flex flex-col mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 items-center">
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
                  data={requirementsData}
                  onChange={(event: any, editor: any) => {
                    setRequirementsData(editor.getData());
                    onChange(editor.getData());
                  }}
                />
              </>
            )}
          />
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
                  data={annotationsData}
                  onChange={(event: any, editor: any) => {
                    setAnnotationsData(editor.getData());
                    onChange(editor.getData());
                  }}
                />
              </>
            )}
          />
        </div>
        <Button
          className="text-white w-full ml-0 mt-6 bg-yellow-400 hover:bg-yellow-600"
          value="Изменить"
        />
      </form>
    </div>
  );
};

export default EditCourseDetails;
