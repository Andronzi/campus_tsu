import { useRegisterUserMutation } from "@/services/Account/accountApi";
import Input from "@/ui/Input";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export interface IFormInputs {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  repeatPassword: string;
}

const Registration: NextPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const router = useRouter();
  const [registerUser] = useRegisterUserMutation();

  const onSubmit = async (data: IFormInputs) => {
    const response = await registerUser(data);
    if ("data" in response) {
      localStorage.setItem("token", response.data.token);
      router.push("/");
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        className="w-full flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="ФИО"
          name="fullName"
          type="text"
          register={register}
          rules={{ required: "ФИО обязательно" }}
          errors={errors}
        />
        <Input
          label="Дата рождения"
          name="birthDate"
          type="date"
          register={register}
          rules={{ required: "Дата рождения обязательна" }}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          rules={{ required: "Email является обязательным параметром" }}
          errors={errors}
        />
        <Input
          label="Пароль"
          name="password"
          type="password"
          register={register}
          rules={{
            required: "Пароль является обязательным параметром",
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
