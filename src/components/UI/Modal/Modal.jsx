import { Modal } from "antd";

const _Modal = ({ title, children, open, onOk, onCancel, className }) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        className={className}
      >
        {children}
      </Modal>
    </>
  );
};
export default _Modal;
