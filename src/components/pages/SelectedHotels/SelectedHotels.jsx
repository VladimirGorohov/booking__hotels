import hotels from "../../../store/hotels";
import SelectHotels from "../../SelectHotels/SelectHotels";
import _Button from "../../UI/Button/Button";
import _Image from "../../UI/Image/image";
import _Modal from "../../UI/Modal/Modal";
import _Carousel from "../../UI/Carousel/Carousel";
import selectedHotelInfo from "../../../store/selectedHotelInfo";
import SelectedHotelList from "../../SelectedHotelList/SelectedHotelList";
import statusUser from "../../../store/statusUser";
import historyBooking from "../../../store/historyBooking";
import { historyBookingHotels } from "../../../API/hotels";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import classes from "./SelectedHotels.module.css";

const SelectedHotels = observer(() => {
  const [intervalDate, setIntervalDate] = useState("");
  const [person, setPerson] = useState("");
  const [city, setCity] = useState("Все города");
  const [message, setMessage] = useState("");
  const selectHotel = selectedHotelInfo.info;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const contentStyle = {
    height: "350px",
    color: "black",
    lineHeight: "200px",
    textAlign: "center",
  };
  let dataSetting = {
    city: city,
    person: person,
    intervalDate: intervalDate,
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelInfo = () => {
    setIsModalInfoOpen(false);
  };

  const bookingClick = (id) => {
    if (!statusUser.autorised) {
      setMessage("Войдите в свой аккаунт!");
      setIsModalInfoOpen(true);
    } else if (!intervalDate) {
      setMessage("Выберите дату бронирования!");
      setIsModalInfoOpen(true);
    } else if (!person) {
      setMessage("Выберите количество гостей!");
      setIsModalInfoOpen(true);
    } else
      historyBookingHotels(id).then((resp) => {
        if (resp.status === 200) {
          historyBooking.addHotel({ ...resp, ...dataSetting });
          setMessage(resp.message);
          setIsModalInfoOpen(true);
        } else if (resp.status === 201) {
          setMessage(resp.message);
          setIsModalInfoOpen(true);
          historyBooking.addHotel({ ...resp, ...dataSetting });
        }
      });
  };

  return (
    <>
      <_Modal
        title={message}
        open={isModalInfoOpen}
        setIsModalOpen={setIsModalInfoOpen}
        onCancel={handleCancelInfo}
      >
        <_Button title="Ok" onClick={() => setIsModalInfoOpen(false)} />
      </_Modal>
      <_Modal
        title=""
        open={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onCancel={handleCancel}
      >
        <div>
          <_Carousel
            foto={selectHotel.foto}
            contentStyle={contentStyle}
            height="350px"
          />
          <h2>{selectHotel.name}</h2>
          <p>Город:{selectHotel.city}</p>
          <p>Кол-во звезд:{selectHotel.star}</p>
          <p>Цена:{selectHotel.price}</p>
          <p>Цена:{selectHotel.discription}</p>
        </div>
        <_Button title="Ok" onClick={() => setIsModalOpen(false)} />
      </_Modal>
      <SelectHotels
        intervalDate={intervalDate}
        setIntervalDate={setIntervalDate}
        person={person}
        setPerson={setPerson}
        city={city}
        setCity={setCity}
      />
      <div className={classes.select__hotels}>
        <SelectedHotelList
          hotels={hotels.hotelsAll}
          setIsModalOpen={setIsModalOpen}
          bookingClick={bookingClick}
        />
      </div>
    </>
  );
});

export default SelectedHotels;
