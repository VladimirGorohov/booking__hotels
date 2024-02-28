import { makeAutoObservable } from "mobx";

//Список отелей

class Hotels {
  hotelsAll = [];

  constructor() {
    makeAutoObservable(this);
  }

  addHotels(hotels) {
    this.hotelsAll = hotels;
  }
}
export default new Hotels();
