//импорт функции проверки ответа от сервера
import { checkResponse } from "./checkResponse";
import { BASE_URL } from "../utils/constants";

//передача на сервер данных регистрации - емаил и пароль
export const register = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	}).then(checkResponse); //передача функции проверки ответа
};

//запрос на сервер при авторизации - пароль и емаил
export const authorization = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	}).then(checkResponse);
};

//запрос на сервер проверки токена
export const getContent = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	}).then(checkResponse);
};
