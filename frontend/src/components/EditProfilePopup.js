import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  //контент значения данных пользователя
	const currentUser = React.useContext(CurrentUserContext);
  //котнент переменной состояния загрузки и функции закрытия попапа
  const value = React.useContext(AppContext)

  const {values, handleChange, setValues} = useForm({});


  //обновлени данных пользователя в зависимости от изменения значения и открытия-закрытия попапа
	React.useEffect(() => {		
    setValues(currentUser)
	}, [currentUser, isOpen]);

  //отправка обновленных данных пользователя на сервер
	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser(values);
	}

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="user-edit"
			buttonSubmitText={!value.isLoading ? "Сохранить" : "Сохранение"}
			isOpen={isOpen}
			onClose={value.closeAllPopups}
			onSubmit={handleSubmit}
			children={
				<fieldset className="popup__fieldset">
					<label className="popup__label">
						<input
							id="name-input"
							name="name"
							value={values.name || ""}
							placeholder="Имя"
							required
							autoComplete="off"
							className="popup__input popup__input-first popup__input_data_name"
							type="text"
							minLength="2"
							maxLength="40"
							onChange={handleChange}
						/>
						<span className="name-input-error popup__input-error"></span>
					</label>
					<label className="popup__label">
						<input
							id="ocupation-input"
							name="about"
							value={values.about || ""}
							placeholder="Род занятий"
							required
							autoComplete="off"
							className="popup__input popup__input-second popup__input_data_ocupation"
							type="text"
							minLength="2"
							maxLength="200"
							onChange={handleChange}
						/>
						<span className="ocupation-input-error popup__input-error"></span>
					</label>
				</fieldset>
			}
		></PopupWithForm>
	);
}

export default EditProfilePopup;
