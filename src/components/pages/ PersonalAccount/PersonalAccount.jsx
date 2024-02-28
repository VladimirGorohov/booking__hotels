import historyBooking from "../../../store/historyBooking";
import _Button from "../../UI/Button/Button";
import dayjs from "dayjs";
import _Modal from "../../UI/Modal/Modal";
import _Select from "../../UI/Select/Select";
import _DatePicker from "../../UI/DatePicker/DatePicker";
import _Rate from "../../UI/Rate/Rate";
import { changeDataHistoryBooking } from "../../../API/hotels";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import classes from "./PersonalAccount.module.css";
import { Link } from "react-router-dom";

const PersonalAccount = observer(() => {
  const [intervalDateChange, setIntervalDateChange] = useState("");
  const [person, setPerson] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dateFormat = "DD-MM-YYYY";

  const optionsPerson = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const changeDataBooking = () => {
    setDisabled(!disabled);
  };

  const saveChangeBookingClick = (id) => {
    changeDataHistoryBooking(id, person, intervalDateChange).then((resp) => {
      historyBooking.changeDataHotels(resp);
      setDisabled(!disabled);
    });
  };

  return (
    <div className={classes.personal}>
      <h1>История бронирования:</h1>
      {historyBooking.history.map((hotel) => (
        <div className={classes.personal__item}>
          <h3>
            Статус бронирования :<br />
            <span className={classes.personal__item_text}>{hotel.message}</span>
          </h3>
          <h3>
            Название:
            <br />
            <span className={classes.personal__item_text}>
              {hotel?.data?.name}
            </span>
          </h3>
          <_Rate value={hotel?.data?.star} disabled={true} />
          <p>
            Количество гостей:{" "}
            <_Select
              defaultValue={hotel.person}
              options={optionsPerson}
              onChange={setPerson}
              style={{ width: "50px" }}
              disabled={disabled}
            />
          </p>
          <p>
            Дата пребывания:{" "}
            <_DatePicker
              disabled={disabled}
              defaultValue={[
                dayjs(hotel.intervalDate[0], dateFormat),
                dayjs(hotel.intervalDate[1], dateFormat),
              ]}
              format={dateFormat}
              onChange={(values) => {
                setIntervalDateChange(
                  values.map((item) => {
                    return item.format("DD-MM-YYYY");
                  })
                );
              }}
            />
          </p>

          {disabled === true ? (
            <_Button
              title="Изменить"
              onClick={() => changeDataBooking(hotel)}
            />
          ) : (
            <_Button
              title="Сохранить изменения"
              onClick={() => saveChangeBookingClick(hotel.id)}
            />
          )}
        </div>
      ))}
      {historyBooking.history.length ? (
        <_Button
          title="Очистить историю"
          onClick={() => historyBooking.removeHistory()}
        />
      ) : (
        <Link to="/">
          <_Button title="К выбору отеля" />
        </Link>
      )}
    </div>
  );
});

export default PersonalAccount;
