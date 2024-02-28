import React from "react";
import { Rate } from "antd";
const _Rate = ({
  defaultValue,
  onChange,
  className,
  disabled,
  onClick,
  value,
}) => (
  <Rate
    defaultValue={defaultValue}
    onChange={onChange}
    className={className}
    disabled={disabled}
    onClick={onClick}
    value={value}
  />
);
export default _Rate;
