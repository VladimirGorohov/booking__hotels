import _Button from "../UI/Button/Button";
import _Image from "../UI/Image/image";
import _Rate from "../UI/Rate/Rate";
import { infoHotels } from "../../API/hotels";

import classes from "./SelectedHoteList.module.css";
import { observer } from "mobx-react-lite";
import { observe } from "mobx";

const SelectedHotelList = ({ hotels, setIsModalOpen, bookingClick }) => {
  const infoHotel = (id) => {
    infoHotels(id);
    setIsModalOpen(true);
  };

  const disabled = true;

  return (
    <>
      {hotels.map((el) => (
        <div className={classes.select__hotels_el}>
          <_Image width={250} src={el.foto[0]} style={{}} />

          <div style={{ textAlign: "left" }}>
            <h2>{el.name}</h2>
            <_Rate value={el.star} disabled={disabled} />
            <p style={{ marginTop: "10px" }}>Город: {el.city}</p>
            <p>Цена: {el.price}руб/сут.</p>
          </div>

          <p className={classes.select__hotels_el_disc}>{el.disc}</p>
          <div>
            <_Button
              title="Забронировать"
              onClick={() => bookingClick(el.id)}
              style={{ marginRight: "15px" }}
            />
            <_Button title="Подробнее" onClick={() => infoHotel(el.id)} />
          </div>
        </div>
      ))}
    </>
  );
};
export default SelectedHotelList;
