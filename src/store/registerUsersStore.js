import { makeAutoObservable } from "mobx";

//Зарегестрированные юзеры

class RegisterUsersStore {
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  addUser(user) {
    this.users.push(user);
  }

  changeUserStore(user) {
    this.users = user;
  }
}

export default new RegisterUsersStore();
