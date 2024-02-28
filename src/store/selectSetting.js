import { makeAutoObservable } from "mobx";

//Найтроки фильтра

class SelectSetting {
  setting = {};

  constructor() {
    makeAutoObservable(this);
  }

  addInfo(setting) {
    this.setting = { ...setting };
  }
}

export default new SelectSetting();
