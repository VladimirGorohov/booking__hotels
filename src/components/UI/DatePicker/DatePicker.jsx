import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const _DatePicker = ({
  onChange,
  value,
  defaultValue,
  format,
  pickerValue,
  disabled,
}) => (
  <RangePicker
    onChange={onChange}
    value={value}
    defaultValue={defaultValue}
    format={format}
    pickerValue={pickerValue}
    disabled={disabled}
  />
);

export default _DatePicker;
