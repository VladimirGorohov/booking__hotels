import React from "react";
import _Button from "../UI/Button/Button";
import _Modal from "../UI/Modal/Modal";
import _Input from "../UI/Input/Input";
import FormEntry from "../UI/FormEntry/FormEntry";
import FormRegistraion from "../UI/FormRegistration/FormRegistration";
import statusUser from "../../store/statusUser";
import autorizedUser from "../../store/autorizedUser";
import { useState } from "react";
import { Divider } from "antd";
import { Link } from "react-router-dom";
import { SettingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

import classes from "./Header.module.css";

const _Header = observer(() => {
  const [isModalEntryOpen, setIsModalEntryOpen] = useState(false);
  const [isModalRegistraionOpen, setIsModalRegistraionOpen] = useState(false);

  const handleCancelEntry = () => {
    setIsModalEntryOpen(false);
  };
  const handleCancelRegistraion = () => {
    setIsModalRegistraionOpen(false);
  };

  const clickBtnRegistration = () => {
    setIsModalEntryOpen(false);
    setIsModalRegistraionOpen(true);
  };

  const exit = () => {
    statusUser.changeAutorised(false);
    setIsModalEntryOpen(false);
  };

  return (
    <>
      <_Modal
        title="Вход в аккаунт"
        open={isModalEntryOpen}
        setIsModalOpen={setIsModalEntryOpen}
        onOk={handleCancelEntry}
        onCancel={handleCancelEntry}
      >
        <FormEntry
          handleCancelEntry={handleCancelEntry}
          onCancel={handleCancelEntry}
        />
        <_Button title="Регистрация" onClick={clickBtnRegistration} />
      </_Modal>
      <_Modal
        title="Регистрация"
        open={isModalRegistraionOpen}
        setIsModalOpen={setIsModalRegistraionOpen}
        onOk={handleCancelRegistraion}
        onCancel={handleCancelRegistraion}
      >
        <FormRegistraion closeRegistration={handleCancelRegistraion} />
      </_Modal>
      <header className={classes.header}>
        <div className={classes.header__wrap}>
          <Link to="/">
            <h1 className={classes.header__title}>
              Сервис бронирования отелей
            </h1>
          </Link>
          <div>
            {statusUser.autorised === true ? (
              <div className={classes.header__autorized}>
                <p className={classes.header__name}>
                  Здравствуйте, {autorizedUser.user.nickname}
                </p>
                {}
                <Link to="/account">
                  <_Button title="Личный кабинет" />
                </Link>
                <Link to="/">
                  <_Button title="Выход" onClick={exit} />
                </Link>
                <Link to="/settings">
                  <SettingOutlined
                    style={{ fontSize: "30px", color: "white" }}
                  />
                </Link>
              </div>
            ) : (
              <div onClick={() => setIsModalEntryOpen(true)}>
                <_Button title="Регистрация и Вход" />
              </div>
            )}
          </div>
        </div>
      </header>
      <Divider />
    </>
  );
});

export default _Header;
