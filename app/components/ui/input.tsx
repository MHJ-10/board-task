import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

const Input = (props: InputProps) => {
  return <input className="input" {...props} />;
};

export default Input;
