import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputType = "email" | "text" | "password";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  type: InputType;
  errors: any;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
};

const Input = <T extends FieldValues>({
  label,
  type,
  errors,
  register,
  rules,
}: InputProps<T>) => (
  <div className="mt-4 w-60">
    <label className="block font-montserrat">{label}</label>
    <input
      type={type}
      className="mt-2 border-1 border-slate-200 rounded-md border-solid 
      text-md py-2 pl-1 text-slate-800 outline-0 focus:ring-1 
      ring-blue-300 font-montserrat w-full"
      {...(register && register(label, rules))}
    />
    {errors[label] && (
      <p className="mt-1 mb-0 font-montserrat text-red-400">
        {errors[label].message}
      </p>
    )}
  </div>
);

export default Input;
