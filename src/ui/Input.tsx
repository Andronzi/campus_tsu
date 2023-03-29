import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: Path<T>;
  type: string;
  register: UseFormRegister<T>;
  validationProps: Object;
  errors: any;
};

const Input = <T extends FieldValues>({
  label,
  register,
  validationProps,
  errors,
}: InputProps<T>) => (
  <>
    {console.log(validationProps)}
    <label>{label}</label>
    <input {...register(label, validationProps)} />
    {errors[label] && <p>{errors[label].message}</p>}
  </>
);

export default Input;
