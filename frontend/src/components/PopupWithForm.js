import React from "react";

function PopupWithForm({
	title,
	name,
	buttonSubmitText,
	isOpen,
	onClose,
	onSubmit,
	children,
}) {
	React.useEffect(() => {
		if (!isOpen) return;

		function handleESC(e) {
			if (e.key === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleESC);

		return () => document.removeEventListener("keydown", handleESC);
	}, [isOpen]);

	function clickClosePopap(e) {
		if (e.target.classList.contains("popup_openend")) {
			onClose();
		}
	}

	return (
		<div
			className={`popup ${isOpen} popup_value_${name}`}
			onClick={clickClosePopap}
		>
			<div className="popup__container">
				<button
					type="button"
					className="popup__close button button_condition_hover"
					onClick={onClose}
				/>
				<h3 className="popup__title">{title}</h3>
				<form className="popup__form" name={name} onSubmit={onSubmit}>
					{children}
					<button
						type="submit"
						value="сохранить"
						className="popup__save button popup__save_condition_hover"
					>
						{buttonSubmitText}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
