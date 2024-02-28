import { message } from "antd";
import autorizedUser from "../store/autorizedUser";
import registerUsersStore from "../store/registerUsersStore";

//Регистрация

export const registerUser = async (user) => {
  const users = registerUsersStore?.users;
  const data = await Promise.resolve({ ...user, id: new Date() });
  const registerUser = users?.find((el) => el?.nickname === user?.nickname);
  let resolve = { status: 200, data: {} };
  if (registerUser === undefined) {
    registerUsersStore?.addUser(data);
    resolve = {
      status: 200,
      id: new Date(),
      message: "Вы успешно зарегестрированиы",
      data: {},
    };
  } else
    resolve = {
      status: 300,
      id: new Date(),
      message: "Такой пользователь уже есть",
      data: {},
    };
  return Promise.resolve({ resolve });
};

//Авторизация

export const autorisationUser = async (login) => {
  const users = registerUsersStore?.users;
  const autorisedUser = users?.find((user) => user?.nickname === login?.login);
  let resolve = {
    status: 200,
    message: "Выуспешно зарегестрированы",
    data: {},
  };
  if (autorisationUser === undefined) {
    resolve = { status: 300, message: "Такого пользователя нет" };
  } else if (autorisedUser?.password !== login?.password) {
    resolve = { status: 301, message: "Неверный пароль" };
  }
  return Promise.resolve({
    ...resolve,
    data: {
      nickname: autorisedUser?.nickname,
      email: autorisedUser?.email,
      phone: autorisedUser?.phone,
      intro: autorisedUser?.intro,
    },
  });
};

//Изменение данных юзера

export const changeAutorisedData = async (changeData) => {
  const autorized = autorizedUser.user;
  const registeredUsers = registerUsersStore.users;
  const changeUsersdata = registeredUsers.reduce((acc, user) => {
    if (autorized.nickname === user.nickname) {
      return [
        ...acc,
        {
          ...user,
          status: changeData.status,
          email: changeData.email,
          phone: changeData.phone,
          intro: changeData.intro,
        },
      ];
    }
    return [...acc, { ...user }];
  }, []);
  return changeUsersdata;
};
