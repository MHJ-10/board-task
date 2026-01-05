import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

const Input = (props: InputProps) => {
  return <input className="input__control" {...props} />;
};

export default Input;
