import { Button } from "antd";

const _Button = ({ title, onClick, className, style }) => {
  return (
    <Button onClick={onClick} className={className} style={style}>
      {title}
    </Button>
  );
};

export default _Button;
