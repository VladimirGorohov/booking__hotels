import { makeAutoObservable } from "mobx";

//История бронирования отелей

class HistoryBookingHotels {
  history = [];

  constructor() {
    makeAutoObservable(this);
  }

  addHotel(data) {
    this.history.push(data);
  }

  changeDataHotels(data) {
    this.history = data;
  }

  removeHistory() {
    this.history = [];
  }
}

export default new HistoryBookingHotels();
