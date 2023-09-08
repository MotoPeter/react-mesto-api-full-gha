import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function AddPlacePopup({ isOpen,  onAddPlace }) {

  //контекст состояния загрузки и функциизакрытия попапа
  const value = React.useContext(AppContext)

  //переменная состояния новой карточки
	const [newPlace, setNewPlace] = React.useState({
		name: "",
		link: "",
	});

  //создание новой карточки в зависимости от открытия-закрытия попапа
	React.useEffect(() => {
		setNewPlace({
			name: "",
			link: "",
		});
	}, [isOpen]);

  //функция получения данныз из импутов
	const handleChange = (e) => {
		const { name, value } = e.target;

    //запись данных в новую карточку
		setNewPlace({
      //добавление данных в массив
			...newPlace,
      //имя инпута - его значение
			[name]: value,
		});
	};

  //при сабмите отправка данных на сервер
	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({
			name: newPlace.name,
			link: newPlace.link,
		});
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="place-add"
			buttonSubmitText={!value.isLoading ? "Создать" : "Сохранение"}
			isOpen={isOpen}
			onClose={value.closeAllPopups}
			onSubmit={handleSubmit}
		>
			<fieldset className="popup__fieldset">
				<label className="popup__label">
					<input
						id="place-input"
						name="name"
						placeholder="Название"
						autoComplete="off"
						className="popup__input popup__input_data_location popup__input-first"
						type="text"
						required
						minLength="2"
						maxLength="30"
						value={newPlace.name || ""}
						onChange={handleChange}
					/>
					<span className="place-input-error popup__input-error"></span>
				</label>
				<label className="popup__label">
					<input
						id="link-input"
						name="link"
						placeholder="Ссылка на картинку"
						autoComplete="off"
						className="popup__input_data_link-foto popup__input"
						type="url"
						required
						value={newPlace.link || ""}
						onChange={handleChange}
					/>
					<span className="link-input-error popup__input-error"></span>
				</label>
			</fieldset>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
