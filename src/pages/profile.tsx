import Button from "@/components/atoms/button";
import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from "@/services/Account/accountApi";
import { Profile, ProfileRequest } from "@/services/Account/models";
import Input from "@/ui/Input";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { data } = useGetUserProfileQuery();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>();
  const [editProfile] = useEditUserProfileMutation();

  useEffect(() => {
    setValue("fullName", data?.fullName || "");
    setValue("email", data?.email || "");
    setValue("birthDate", data?.birthDate.toString().split("T")[0] || "");
  }, [setValue, data]);

  const onSubmit = async (data: ProfileRequest) => {
    try {
      await editProfile(data).unwrap();
      toast.success("Профиль успешно изменен");
    } catch (err: any) {
      console.log(err.data.errors);
      if (err.data.errors.BirthDate) {
        toast.error("Дата рождения не может быть позже сегодняшнего дня");
      } else if (err.data.errors.FullName) {
        if (err.data.errors.FullName[0] === "User full name is required.") {
          toast.error("Имя является обязательным параметром");
        } else {
          toast.error("Имя является неверным");
        }
      } else {
        toast.error("Не удалось изменить профиль");
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-3xl mt-4">Ваш профиль</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="fullName"
          label="Ваш ФИО"
          type="text"
          errors={errors}
          rules={{
            required: "Ваше имя является обязательным параметром",
            validate: (value: string) => {
              const fio = value.split(" ");
              if (!fio[0]?.length || !fio[1]?.length || !fio[2]?.length) {
                return "ФИО является неверным";
              }
            },
          }}
          register={register}
        />
        <Input
          name="email"
          label="Ваш email"
          type="text"
          disabled={true}
          register={register}
          errors={errors}
          className="disabled:opacity-75"
        />
        <Input
          name="birthDate"
          label="Ваша дата рождения"
          type="date"
          register={register}
          errors={errors}
          rules={{
            required: "Дата рождения является обязательным параметром",
            validate: (value: string) => {
              const now = new Date(Date.now());
              const year = now.getFullYear();
              const month = now.getMonth();
              const day = now.getDate();
              const inputDate = value.split("-");
              if (+inputDate[0] == year && +inputDate[1] == month + 1) {
                if (day < +inputDate[2]) {
                  return "Дата не может быть позже чем сегодня";
                }
              }
            },
          }}
          className="disabled:opacity-75"
        />
        <Button
          value="Изменить"
          className="mt-4 bg-yellow-400 hover:bg-yellow-600"
        />
      </form>
    </div>
  );
};

export default Profile;
