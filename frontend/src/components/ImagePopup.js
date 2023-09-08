import React from "react";

function ImagePopup({ card, onClose }) {
  
	React.useEffect(() => {
		if (!card) return;

		function handleESC(e) {
			if (e.key === "Escape") {
				onClose();
			}
		}

		document.addEventListener("keydown", handleESC);

		return () => document.removeEventListener("keydown", handleESC);
	}, [card]);

	function clickClosePopap(e) {
		//  //если область клика содержит дочерний элемент - открытый попап
		if (e.target.classList.contains("popup_openend")) {
			onClose();
		}
	}
	return (
		<div
			className="popup popup_value_img popup_openend"
			onClick={clickClosePopap}
		>
			<div className="popup__img">
				<button
					type="button"
					onClick={onClose}
					className="popup__close popup__close_value_img button button_condition_hover"
				></button>
				<figure className="figure popup__figure">
					<img src={card.link} className="figure__img" alt={card.name} />
					<figcaption className="figure__caption">{card.name}</figcaption>
				</figure>
			</div>
		</div>
	);
}

export default ImagePopup;
