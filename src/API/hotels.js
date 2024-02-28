import moment from "moment";
import historyBooking from "../store/historyBooking";
import hotels from "../store/hotels";
import selectedHotelInfo from "../store/selectedHotelInfo";
import hotelsJson from "../system/hotels.json";

//Получение списка отелей

export const hotelsList = async (hotel) => {
  const data = await Promise.resolve(hotel);
  return data;
};

//Фильтрация Отелей

export const filterCityAndStar = async (city, stars, paramSort) => {
  let selectCity = hotelsJson;
  if (city !== "Все города") {
    const dataCity = await Promise.resolve(city);
    selectCity = hotelsJson.filter((el) => el.city === dataCity);
  }
  if (stars !== "Все") {
    const data = await Promise.resolve(stars);
    selectCity = selectCity?.filter((el) => el.star === stars);
  }
  if (paramSort !== "") {
    const data = await Promise.resolve(paramSort);
    if (data === "По убыванию") {
      selectCity = selectCity.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        if (a.price === b.price) {
          return 0;
        }
      });
    }
    if (data === "По возвростанию") {
      selectCity = selectCity.sort((a, b) => {
        if (a.price > b.price) {
          return 1;
        }
        if (a.price < b.price) {
          return -1;
        }
        if (a.price === b.price) {
          return 0;
        }
      });
    }
  }

  return selectCity;
};

//Получени инфо по отелю

export const infoHotels = async (id) => {
  const selectHotel = hotels.hotelsAll.find((el) => el.id === id);
  selectedHotelInfo.addInfo(selectHotel);
};

//Получение истории бронирование

export const historyBookingHotels = async (id) => {
  const bookingHotel = hotels.hotelsAll.find((el) => el.id === id);
  let resolve = {
    id: bookingHotel.id,
    status: 200,
    message: "Бронь подтверждена!",
    data: {
      id: bookingHotel.id,
      name: bookingHotel.name,
      city: bookingHotel.city,
      price: bookingHotel.price,
      star: bookingHotel.star,
      time: moment().format(),
    },
  };
  if (bookingHotel.status === "свободно") {
    resolve = { ...resolve };
  } else if (bookingHotel.status === "занято") {
    resolve = {
      ...resolve,
      status: 201,
      message: "Отменено, отель занят!",
    };
  }
  return Promise.resolve({ ...resolve });
};

//Получение измененной истории бронирования

export const changeDataHistoryBooking = async (
  id,
  person,
  intervalDateChange
) => {
  const changeDataHotels = historyBooking.history.reduce((acc, hotel) => {
    if (hotel.id === id) {
      return [
        ...acc,
        {
          ...hotel,
          person: person,
          intervalDate: intervalDateChange,
          data: hotel.data,
          message: "Изменено",
        },
      ];
    }
    return [...acc, { ...hotel }];
  }, []);
  return Promise.resolve(changeDataHotels);
};
