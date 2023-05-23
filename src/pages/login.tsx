import { useLoginUserMutation } from "@/services/Account/accountApi";
import { Login } from "@/services/Account/models";
import Input from "@/ui/Input";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const router = useRouter();
  const [loginUser] = useLoginUserMutation();

  const onSubmit = async (data: Login) => {
    try {
      await loginUser(data).unwrap();
      toast.success("The login was successful");
      router.push("/");
    } catch (err) {
      toast.error("The login wasn't successful");
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full mt-8">
      <p className="text-4xl">Аутентификация</p>
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
