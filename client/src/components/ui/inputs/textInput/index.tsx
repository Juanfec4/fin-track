import { ChangeEvent, FC } from "react";

export enum InputType {
  Text = "text",
  Password = "password",
}
interface TextInputProps {
  fieldName: string;
  placeholder: string;
  label: string;
  inputType: InputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const Input: FC<TextInputProps> = ({
  fieldName,
  placeholder,
  label,
  inputType,
  handleChange,
  value,
}) => {
  return (
    <span className="input">
      <label htmlFor={fieldName} className="input__label">
        {label}
      </label>
      <input
        type={inputType}
        id={fieldName}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="input__field"
      />
    </span>
  );
};
export default Input;
