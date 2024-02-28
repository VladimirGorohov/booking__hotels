import { Input } from "antd";

const _Input = ({
  placeholder,
  value,
  onChange,
  className,
  defaultValue,
  disabled,
  onClick,
}) => {
  return (
    <Input
      disabled={disabled}
      defaultValue={defaultValue}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
      onClick={onClick}
    />
  );
};

export default _Input;
