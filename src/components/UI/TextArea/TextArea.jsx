import { Input } from "antd";
const { TextArea } = Input;

const _TextArea = (placeholder, onChange, value) => (
  <TextArea placeholder={placeholder} onChange={onChange} value={value} />
);
export default _TextArea;
