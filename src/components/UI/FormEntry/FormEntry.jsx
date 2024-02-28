import statusUser from "../../../store/statusUser";
import autorizedUser from "../../../store/autorizedUser";
import _Modal from "../Modal/Modal";
import _Button from "../Button/Button";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { autorisationUser } from "../../../API/users";

const FormEntry = ({ onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUserEntry, setDataUserEntry] = useState({
    login: "",
    password: "",
  });
  const { login, password } = dataUserEntry;

  const [message, setMessage] = useState("");

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    autorisationUser(dataUserEntry).then((resp) => {
      if (resp.status === 200) {
        statusUser.changeAutorised(true);
        autorizedUser.addUser(resp.data);
        onCancel();
      } else if (resp.status === 301 || resp.status == 301) {
        setMessage("Неверный логин или пароль");
        setIsModalOpen(true);
      }
    });
  };
  return (
    <>
      <_Modal
        title={message}
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <_Button title="Ok" onClick={handleCancel} />
      </_Modal>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="username"
          rules={[{ required: true, message: "Введите ваше имя" }]}
        >
          <Input
            value={login}
            onChange={(e) =>
              setDataUserEntry({ ...dataUserEntry, login: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) =>
              setDataUserEntry({ ...dataUserEntry, password: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={onSubmit}>
            Войти
          </Button>{" "}
          <br />
        </Form.Item>
      </Form>
    </>
  );
};
export default FormEntry;
