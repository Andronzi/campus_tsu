import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputType = "email" | "text" | "password" | "date" | "radio";

type InputProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  value?: string;
  type: InputType;
  errors: any;
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
  className: string;
};

const Input = <T extends FieldValues>({
  label,
  name,
  value,
  type,
  errors,
  register,
  rules,
  className,
}: InputProps<T>) => (
  <div className="mt-4">
    <label
      className={`block font-montserrat ${
        type === "radio" && "flex items-center"
      }`}
      htmlFor={name}
    >
      <p>{label}</p>
      <input
        id={name}
        value={value}
        type={type}
        className={`${
          type !== "radio" && "mt-2"
        } border-1 border-slate-200 rounded-md border-solid 
      text-md py-2 pl-1 text-slate-800 outline-0 focus:ring-1 
      ring-blue-300 font-montserrat w-60 ${className}`}
        {...(register && register(name, rules))}
      />
    </label>
    {errors[name] && (
      <p className="mt-1 mb-0 font-montserrat text-red-400">
        {errors[name].message}
      </p>
    )}
  </div>
);

export default Input;
