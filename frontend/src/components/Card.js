import React from "react";
import like from "../images/like.svg";
import trash from "../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, handleCardClick, onCardLike, onCardDel }) {
	const currentUser = React.useContext(CurrentUserContext);

	const isOwn = card.owner === currentUser._id;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = card.likes.some((i) => i === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = `place__like button button_condition_hover ${
		isLiked && "place__like_active"
	}`;

	const cardClick = () => {
		handleCardClick(card);
	};

	const cardLikeClick = () => {
		onCardLike(card);
	};

	const cardDelClick = () => {
		onCardDel(card);
	};

	return (
		<article className="place">
			<button
				type="button"
				className="button place__image-button popup__save_condition_hover"
				onClick={cardClick}
			>
				<img src={`${card.link}`} alt={card.name} className="place__image" />
			</button>
			<div className="place__text">
				<h2 className="place__title">{card.name}</h2>
				<div className="like">
					<button
						onClick={cardLikeClick}
						type="button"
						className={cardLikeButtonClassName}
					>
						<img src={like} alt="лайк." />
					</button>
					<span className="place__like-sum">
						{card.likes.length !== 0 && card.likes.length}
					</span>
				</div>
			</div>
			{isOwn && (
				<button
					type="button"
					className="place__trash button button_condition_hover"
					onClick={cardDelClick}
				>
					<img src={trash} alt="кнопка удаления." />
				</button>
			)}
		</article>
	);
}

export default Card;
