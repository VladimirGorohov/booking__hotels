import { makeAutoObservable } from "mobx";

//Статус Авторизован/нет

class StatusUser {
  autorised = false;

  hotelsAll = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeAutorised = (status) => {
    this.autorised = status;
  };
}

export default new StatusUser();
