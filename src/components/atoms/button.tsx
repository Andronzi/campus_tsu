import cx from "classnames";
import { FC, MouseEventHandler } from "react";

type ButtonType = "button" | "reset" | "submit";

type ButtonProps = {
  type?: ButtonType;
  className?: string;
  value?: string;
  onClick?: MouseEventHandler;
};

const Button: FC<ButtonProps> = ({ type, className, value, onClick }) => (
  <button
    onClick={onClick}
    type={type || "submit"}
    className={cx(
      `mt-6 border-0 px-4 py-3 rounded-md bg-blue-400
    text-white cursor-pointer hover:bg-blue-700
     hover:-translate-y-1 transition duration-300 text-md font-montserrat w-60`,
      className
    )}
  >
    {value || "Отправить"}
  </button>
);

export default Button;
