import Layout from "@/components/molecules/layout/layout";
import { useLoginUserMutation } from "@/services/Account/accountApi";
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

const Login: NextPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data: IFormInputs) => {
    const response = await loginUser(data);
    if ("data" in response) {
      localStorage.setItem("token", response.data.token);
      router.push("/");
    }
  };
  return (
    <Layout>
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
            rules={{ required: "Email is required" }}
            errors={errors}
          />
          <Input
            label="Пароль"
            name="password"
            type="password"
            register={register}
            rules={{
              required: "Password is required",
            }}
            errors={errors}
          />
          <Input
            label="Повторите пароль"
            name="repeatPassword"
            type="password"
            register={register}
            rules={{
              required: "Repeat password is required",
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
    </Layout>
  );
};

export default Login;
