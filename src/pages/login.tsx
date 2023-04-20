import { useLoginUserMutation } from "@/services/Account/accountApi";
import Input from "@/ui/Input";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export interface IFormInputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data: IFormInputs) => {
    const response = await loginUser(data);
    if ("data" in response) {
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
        <button
          type="submit"
          className="mt-6 border-0 px-4 py-3 rounded-md bg-blue-400
           text-white cursor-pointer hover:bg-blue-700
            hover:-translate-y-1 transition duration-300 text-md font-montserrat w-60"
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Login;
