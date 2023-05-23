import { useRegisterUserMutation } from "@/services/Account/accountApi";
import { Registration } from "@/services/Account/models";
import Input from "@/ui/Input";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Registration: NextPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>();
  const router = useRouter();
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data: Registration) => {
    try {
      await registerUser(data).unwrap();
      toast.success("Registration was successful");
      router.push("/");
    } catch (err) {
      toast.error("Registration wasn't successful");
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full mt-8">
      <p className="text-4xl">Регистрация</p>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="ФИО"
          name="fullName"
          type="text"
          register={register}
          rules={{
            required: "ФИО обязательно",
            validate: (value: string) => {
              const fio = value.split(" ");
              if (!fio[0]?.length || !fio[1]?.length || !fio[2]?.length) {
                return "ФИО является неверным";
              }
            },
          }}
          errors={errors}
        />
        <Input
          label="Дата рождения"
          name="birthDate"
          type="date"
          register={register}
          rules={{
            required: "Дата рождения обязательна",
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
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          rules={{
            required: "Email является обязательным параметром",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email адрес является невалиданым",
            },
          }}
          errors={errors}
        />
        <Input
          label="Пароль"
          name="password"
          type="password"
          register={register}
          rules={{
            required: "Пароль является обязательным параметром",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
              message:
                "Должен содержать 8 символов, 1 заглавный, 1 строчный и 1 цифру",
            },
          }}
          errors={errors}
        />
        <Input
          label="Подтвердите пароль"
          name="confirmPassword"
          type="password"
          register={register}
          rules={{
            required: "Подтверждение пароля обязательно",
            validate: (value: string) => {
              if (watch("password") !== value) {
                return "Пароли не совпадают";
              }
            },
          }}
          errors={errors}
        />
        <button
          type="submit"
          className="mt-6 border-0 px-4 py-3 rounded-md bg-blue-400
           text-white cursor-pointer hover:bg-blue-700
            hover:-translate-y-1 transition duration-300 text-md font-montserrat w-60"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
