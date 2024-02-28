import _Button from "../UI/Button/Button";
import _Select from "../UI/Select/Select";
import _DatePicker from "../UI/DatePicker/DatePicker";
import _Rate from "../UI/Rate/Rate";
import hotels from "../../store/hotels";
import { filterCityAndStar } from "../../API/hotels";
import { observer } from "mobx-react-lite";

import { useEffect, useState } from "react";
import dayjs from "dayjs";

const SelectHotels = observer(
  ({ setIntervalDate, city, setCity, setPerson }) => {
    const dateFormat = "DD-MM-YYYY";

    const optionsCity = [
      { value: "Все города", label: "Все города" },
      { value: "Москва", label: "Москва" },
      { value: "Екатеринбург", label: "Екатеринбург" },
      { value: "Краснодар", abel: "Краснодар" },
    ];

    const optionsStar = [
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, abel: "5" },
      { value: "Все", abel: "Все" },
    ];

    const optionsPerson = [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
    ];

    const optionsPrice = [
      { value: "По возвростанию", label: "По возростанию" },
      { value: "По убыванию", label: "По убыванию" },
    ];
    const [star, setStar] = useState("Все");
    const [sortPrice, setSortPrice] = useState("");

    useEffect(() => {
      filterCityAndStar(city, star, sortPrice).then((resp) =>
        hotels.addHotels(resp)
      );
    }, [city, star, sortPrice]);

    return (
      <div>
        <_Select
          defaultValue="Выберите город"
          options={optionsCity}
          onChange={setCity}
          width="180px"
        />
        <_Select
          defaultValue="Кол-во звезд"
          options={optionsStar}
          onChange={setStar}
          width="180px"
        />
        <_Select
          defaultValue="Цена"
          options={optionsPrice}
          onChange={setSortPrice}
          width="180px"
        />
        <_Select
          defaultValue="Кол-во гостей"
          options={optionsPerson}
          onChange={setPerson}
          width="180px"
        />

        <_DatePicker
          format={dateFormat}
          defaultValue={[
            dayjs("01-01-2024", dateFormat),
            dayjs("01-01-2024", dateFormat),
          ]}
          onChange={(values) => {
            setIntervalDate(
              values.map((item) => {
                return item.format("DD-MM-YYYY");
              })
            );
          }}
        />
      </div>
    );
  }
);

export default SelectHotels;
