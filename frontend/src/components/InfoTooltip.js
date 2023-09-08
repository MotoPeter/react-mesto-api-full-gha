import React from "react";

const InfoTooltip = ({ title, name, isOpen, onClose, imgSrc, imgAlt }) => {
	function clickClosePopap(e) {
		//  //если область клика содержит дочерний элемент - открытый попап
		if (e.target.classList.contains("popup_openend")) {
			onClose();
		}
	}

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

	return (
		<div
			className={`popup ${isOpen} popup_value_${name}`}
			onClick={clickClosePopap}
		>
			<div className="tooltip">
				<button
					type="button"
					className="popup__close button button_condition_hover"
					onClick={onClose}
				></button>
				<img className="tooltip__img" src={imgSrc} alt={imgAlt}></img>
				<h3 className="tooltip__title">{title}</h3>
			</div>
		</div>
	);
};

export default InfoTooltip;
