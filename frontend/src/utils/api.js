import { checkResponse } from "./checkResponse";
import { BASE_URL } from "./constants";

class Api {
	//в конструктор url и заголовок в виде массива - токен авторизации и тип данных
	constructor(url, checkResponse) {
		this._url = url;
		//this._headers = headers;
		this._checkResponse = checkResponse;
	}

	//универсальный метод проверки запроса
	_request(url, options) {
		return fetch(url, options).then(this._checkResponse);
	}

	//загрузка карточек с сервера
	getInitialCards() {
		console.log(localStorage.getItem("token"));
		//запрос на сервер на получение карточек
		return this._request(`${this._url}/cards`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			//получив промис проверяем статус
		});
	}

	//получение данных пользователя с сервера
	getUserInfo() {
		console.log(localStorage.getItem("token"));
		return fetch(`${this._url}/users/me`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkResponse);
	}

	//редактирование профиля на вход массив с именем и профессией
	editProfile({ name, about }) {
		return fetch(`${this._url}/users/me`, {
			//метод для частичного обновления
			method: "PATCH",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			//преобразуем в строку
			body: JSON.stringify({
				name,
				about,
			}),
			//полученный промис отправляем на проверку статуса
		}).then(this._checkResponse);
	}

	//отправка на сервер новой карточки
	addNewCard(formValues) {
		return fetch(`${this._url}/cards`, {
			//метод для отправки данных
			method: "POST",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: formValues["name"],
				link: formValues["link"],
			}),
		}).then(this._checkResponse);
	}

	//редактирование аватара
	editAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				avatar,
			}),
		}).then(this._checkResponse);
	}

	deleteCard(place) {
		return fetch(`${this._url}/cards/${place._id}`, {
			//метод для отправки данных
			method: "DELETE",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkResponse);
	}

	// Ставим лайк
	putLike(place) {
		return fetch(`${this._url}/cards/${place._id}/likes`, {
			method: "PUT",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkResponse);
	}

	// Убираем лайк
	delLike(place) {
		return fetch(`${this._url}/cards/${place._id}/likes`, {
			method: "DELETE",
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		}).then(this._checkResponse);
	}

	changeLikeCardStatus(place, isLiked) {
		if (isLiked) {
			return this.putLike(place);
		} else {
			return this.delLike(place);
		}
	}
}

//создаем элемент api
export const api = new Api(
	BASE_URL,
	//функция проверки ответа от сервера
	checkResponse
);
