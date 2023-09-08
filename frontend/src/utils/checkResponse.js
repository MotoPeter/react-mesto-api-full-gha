//функция проверки ответа от сервера
export function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}
