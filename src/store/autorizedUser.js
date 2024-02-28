import { makeAutoObservable } from "mobx";

//Авторизованный юзер

class AutorizedUser {
  user = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUser(data) {
    this.user = data;
  }
}

export default new AutorizedUser();
