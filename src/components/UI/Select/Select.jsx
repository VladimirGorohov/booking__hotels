import React from "react";
import { Select } from "antd";

const _Select = ({ defaultValue, options, onChange, width, disabled }) => (
  <Select
    defaultValue={defaultValue}
    style={{
      width: width,
    }}
    options={options}
    onChange={onChange}
    disabled={disabled}
  />
);
export default _Select;
