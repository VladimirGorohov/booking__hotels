import React, { useState } from "react";
import _Modal from "../Modal/Modal";
import _Button from "../Button/Button";
import { Button, Form, Input, Select } from "antd";
import { observer } from "mobx-react-lite";
import { registerUser } from "../../../API/users";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const FormRegistartion = observer(({ closeRegistration }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const [message, setMessege] = useState("");

  const onFinish = (values) => {
    registerUser(values).then((resp) => {
      if (resp.resolve.status === 200) {
        setMessege(resp.resolve.message);
        closeRegistration();
      } else if (resp.resolve.status === 300) {
        setMessege(resp.resolve.message);
      }
      setIsModalOpen(true);
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="7">+7</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <_Modal
        title={message}
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        showModal={showModal}
      >
        <_Button title="Ok" onClick={handleOk} />
      </_Modal>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "7",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: "email", message: "Введите корректный email" },
            { required: true, message: "Введите email" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[{ required: true, message: "Пароль" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Повторите пароль"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Повторите пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Логин"
          rules={[{ required: true, message: "Ваш Логин", whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Тел. номер"
          rules={[{ required: true, message: "Ваш номер телефона" }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="intro"
          label="О себе"
          rules={[{ required: true, message: "Коротко о себе" }]}
        >
          <Input.TextArea showCount maxLength={150} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});
export default FormRegistartion;
