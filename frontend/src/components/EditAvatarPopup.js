import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
	const avatarRef = React.useRef("");
	const value = React.useContext(AppContext);

	React.useEffect(() => {
		avatarRef.current.value = "";
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
	}

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="avatar"
			buttonSubmitText={!value.isLoading ? "Сохранить" : "Сохранение"}
			isOpen={isOpen}
			onClose={value.closeAllPopups}
			onSubmit={handleSubmit}
			children={
				<fieldset className="popup__fieldset">
					<input
						type="url"
						name="avatar"
						id="avatar-input"
						placeholder="Ссылка на картинку"
						className="popup__input popup__input_data_avatar"
						required
						ref={avatarRef}
					/>
					<span className="avatar-input-error popup__input-error"></span>
				</fieldset>
			}
		/>
	);
}

export default EditAvatarPopup;
