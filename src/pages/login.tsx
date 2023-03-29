import Input from "@/ui/Input";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();
  const onSubmit = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="email"
        type="email"
        register={register}
        validationProps={{ required: "Email is required" }}
        errors={errors}
      />
      <Input
        label="password"
        type="password"
        register={register}
        validationProps={{
          required: "Password is required",
        }}
        errors={errors}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
