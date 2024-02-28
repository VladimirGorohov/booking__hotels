import _Button from "../../UI/Button/Button";
import SelectedHotels from "../SelectedHotels/SelectedHotels";
import hotelsJson from "../../../system/hotels.json";
import _Carousel from "../../UI/Carousel/Carousel";
import hotels from "../../../store/hotels";
import { hotelsList } from "../../../API/hotels";
import { observer } from "mobx-react-lite";

import classes from "./Home.module.css";

const handleClick = () => {
  hotelsList(hotelsJson).then((data) => {
    hotels.addHotels(data);
  });
};

const Homepage = observer(() => {
  return (
    <div className={classes.home}>
      <h1 className={classes.home__header}>Подбор отеля по вашим параметрам</h1>
      {hotels.hotelsAll.length == 0 ? (
        <>
          <_Button
            title="Подобрать отель"
            onClick={handleClick}
            className={classes.home__btn}
          />
        </>
      ) : (
        <SelectedHotels />
      )}
    </div>
  );
});

export default Homepage;
