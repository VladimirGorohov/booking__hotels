import autorizedUser from "../../../store/autorizedUser";
import registerUsersStore from "../../../store/registerUsersStore";
import _Button from "../../UI/Button/Button";
import _Modal from "../../UI/Modal/Modal";
import _Input from "../../UI/Input/Input";
import _TextArea from "../../UI/TextArea/TextArea";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { changeAutorisedData } from "../../../API/users";

import classes from "./SettingsAccount.module.css";

const SettingsAccount = observer(() => {
  const autorized = autorizedUser.user;
  const [email, setEmail] = useState(autorized.email);
  const [phone, setPhone] = useState(autorized.phone);
  const [intro, setIntro] = useState(autorized.intro);
  const [message, setMessage] = useState("");
  const [isModalEntryOpen, setIsModalEntryOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const clickChangeData = () => {
    setDisabled(false);
  };

  const handleCancelEntry = () => {
    setIsModalEntryOpen(false);
  };

  let newData = {
    email: email,
    phone: phone,
    intro: intro,
    status: 200,
  };

  const onSubmitData = (e) => {
    changeAutorisedData(newData).then((resp) => {
      registerUsersStore.changeUserStore(resp);
      setDisabled(true);
    });
  };

  return (
    <>
      <_Modal
        title={message}
        open={isModalEntryOpen}
        setIsModalOpen={setIsModalEntryOpen}
        onOk={handleCancelEntry}
        onCancel={handleCancelEntry}
      >
        <_Button title="Ok" onClick={handleCancelEntry} />
      </_Modal>
      <div className={classes.data}>
        <h1>Ваши данные, {autorized.nickname}</h1>
        <div>
          Ваш email:{" "}
          <_Input
            disabled={disabled}
            placeholder="введите новый email"
            defaultValue={autorized.email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.settigs__input}
          />
        </div>
        <div>
          Ваш телефон:{" "}
          <_Input
            disabled={disabled}
            placeholder="введите новый телефон"
            defaultValue={autorized.phone}
            onChange={(e) => setPhone(e.target.value)}
            className={classes.settigs__input}
          />
        </div>
        <div>
          О вас:{" "}
          <_Input
            disabled={disabled}
            placeholder="Коорото о себе"
            defaultValue={autorized.intro}
            onChange={(e) => setIntro(e.target.value)}
            className={classes.settigs__input}
          />
        </div>
        {disabled === true ? (
          <_Button title="Изменить" onClick={clickChangeData} />
        ) : (
          <_Button title="Сохранить изменения" onClick={onSubmitData} />
        )}
      </div>
    </>
  );
});

export default SettingsAccount;
