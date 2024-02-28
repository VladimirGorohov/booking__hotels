import { makeAutoObservable } from "mobx";

//Инфо по выбранному отелю

class SelectedHotelInfo {
  info = {};

  constructor() {
    makeAutoObservable(this);
  }

  addInfo(hotel) {
    this.info = { ...hotel };
  }
}

export default new SelectedHotelInfo();
