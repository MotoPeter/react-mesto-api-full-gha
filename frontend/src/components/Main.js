import React from "react";
import plus from "../images/plus.svg";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
	onEditAvatar,
	onEditProfile,
	onAddPlace,
	handleCardClick,
	handleCardLike,
	cards,
	handleCardDel,
}) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<img
					src={`${currentUser.avatar}`}
					className="profile__avatar"
					alt="аватар"
				/>
				<button
					className="profile__avatar-button"
					onClick={onEditAvatar}
				></button>
				<div className="profile__info">
					<div className="profile__text">
						<h1 className="profile__name">{currentUser.name}</h1>
						<p className="profile__ocupation">{currentUser.about}</p>
					</div>
					<button
						type="button"
						className="profile__edit-button button button_condition_hover"
						onClick={onEditProfile}
					></button>
				</div>
				<button
					type="button"
					className="profile__add-button button button_condition_hover"
					onClick={onAddPlace}
				>
					<img src={plus} alt="плюс." className="profile__add-button-image" />
				</button>
			</section>
			<section className="grid-places">
				{cards.map((card) => (
					<Card
						key={card._id}
						card={card}
						handleCardClick={handleCardClick}
						onCardLike={handleCardLike}
						onCardDel={handleCardDel}
					/>
				))}
			</section>
		</main>
	);
}

export default Main;
