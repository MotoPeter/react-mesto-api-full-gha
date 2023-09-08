import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from "./ProtectedRoute";
import * as mestoAuth from "../utils/mestoAuth.js";
import imgOk from "../images/img-ok.png";
import imgNone from "../images/img-none.png";

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = useState([]);
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	//переменная состояния загрузки
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();

	// функция, которая принимает функцию запроса
	function handleSubmit(request) {
		// изменяем текст кнопки до вызова запроса
		setIsLoading(true);
		request()
			// закрывать попап нужно только в `then`
			.then(closeAllPopups)
			// в каждом запросе нужно ловить ошибку
			.catch(console.error)
			// в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
			.finally(() => setIsLoading(false));
	}

	useEffect(() => {
		tokenCheck();
	}, []);

	const tokenCheck = () => {
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			mestoAuth
				.getContent(token)
				.then((res) => {
					if (res) {
            setCurrentUser(res);
						setIsLoggedIn(true);
						navigate("/", { replace: true });
					}
				})
				.catch(console.error);
		}
	};

	function handleCardLike(card) {
    console.log(card.likes, currentUser._id);
		const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(isLiked)
		api
			.changeLikeCardStatus(card, !isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch(console.error);
	}

	function handleCardDel(card) {
		api
			.deleteCard(card)
			.then((res) => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch(console.error);
	}

  useEffect(() => {
     if (isLoggedIn) {
    	Promise.all([api.getInitialCards()])
    		.then(([initialCards]) => {
    			setCards(initialCards.reverse());
    		})
    		.catch(console.error);
     }
    }, [isLoggedIn] );

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(null);
		setIsInfoTooltipPopup(false);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleUpdateUser({ name, about }) {
		function makeRequest() {
			return api.editProfile({ name, about }).then(setCurrentUser);
		}
		handleSubmit(makeRequest);
	}

	function handleUpdateAvatar({ avatar }) {
		function makeRequest() {
			return api.editAvatar({ avatar }).then(setCurrentUser);
		}
		handleSubmit(makeRequest);
	}

	function handleAddPlaceSubmit({ name, link }) {
		function makeRequest() {
			return api.addNewCard({ name, link }).then((newCard) => {
				setCards([newCard, ...cards]);
			});
		}
		handleSubmit(makeRequest);
	}

	const handleRegistrSubmit = (formValue) => {
		const { password, email } = formValue;
		mestoAuth
			.register(password, email)
			.then((res) => {
				setIsRegister(true);
				tooltipOpen();
				inCaseRegister();
			})
			.catch((err) => {
				setIsRegister(false);
				tooltipOpen();
				console.log(err);
			})
			.finally(() => {
				tooltipOpen();
			});
	};

	const handleLoginSubmit = (formValue) => {
		const { password, email } = formValue;
		mestoAuth
			.authorization(password, email)
			.then((data) => {
				if (data.token) {
					localStorage.setItem("token", data.token);
          console.log(localStorage.getItem("token"));
					tokenCheck();
				}
			})
			.catch(console.error);
	};

	const inCaseRegister = () => {
		navigate("/sign-in", { replace: true });
	};

	const tooltipOpen = () => {
		setIsInfoTooltipPopup(true);
	};

	useEffect(() => {
		if (isInfoTooltipPopup)
			setTimeout(() => {
				closeAllPopups();
			}, 2000);
	}, [isInfoTooltipPopup]);

	const handleExit = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		setCurrentUser({})
    setCards([]);
		setCurrentUser({})
		navigate("/sign-in", { replace: true });
	};

	return (
		<AppContext.Provider value={{ isLoading, closeAllPopups }}>
			<CurrentUserContext.Provider value={currentUser}>
				<div className="page">
					<Routes>
						<Route
							path="/sign-up"
							element={<Register handleSubmit={handleRegistrSubmit} />}
						/>
						<Route path="*" element={<Login />} />
						<Route
							path="/sign-in"
							element={<Login handleLoginSubmit={handleLoginSubmit} />}
						/>
						<Route
							path="/"
							element={
								<ProtectedRouteElement loggedIn={isLoggedIn}>
									<>
										<Header
											linkTitle={"Выйти"}
											linkTo={"/sign-in"}
											handleExit={handleExit}
										>
											{currentUser.email}
										</Header>
										<Main
											onEditAvatar={handleEditAvatarClick}
											onEditProfile={handleEditProfileClick}
											onAddPlace={handleAddPlaceClick}
											handleCardClick={handleCardClick}
											handleCardLike={handleCardLike}
											cards={cards}
											handleCardDel={handleCardDel}
										/>
										<Footer />
									</>
								</ProtectedRouteElement>
							}
						/>
					</Routes>

					<EditProfilePopup
						//открытие попапа
						isOpen={isEditProfilePopupOpen && "popup_openend"}
						//обновление данных пользователя на сервере
						onUpdateUser={handleUpdateUser}
					/>

					<AddPlacePopup
						isOpen={isAddPlacePopupOpen && "popup_openend"}
						onAddPlace={handleAddPlaceSubmit}
					/>

					<PopupWithForm
						title="Вы уверены?"
						name="delete-place"
						buttonSubmitText="Да"
						onClose={closeAllPopups}
					/>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen && "popup_openend"}
						onUpdateAvatar={handleUpdateAvatar}
					/>

					{selectedCard && (
						<ImagePopup card={selectedCard} onClose={closeAllPopups} />
					)}

					<InfoTooltip
						title={
							isRegister
								? "Вы успешно зарегистрировались!"
								: "Что то пошло не так! Попробуйте еще раз!"
						}
						imgAlt={isRegister ? "галочка" : "крестик"}
						imgSrc={isRegister ? imgOk : imgNone}
						onClose={closeAllPopups}
						isOpen={isInfoTooltipPopup && "popup_openend"}
						name={"infoTooltip"}
					/>
				</div>
			</CurrentUserContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
