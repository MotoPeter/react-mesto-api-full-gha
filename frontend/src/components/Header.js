//компонент заголовка
import React from "react";
//импорт картинки логотипа
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

//принимает пропсы заголовок ссылки, ссылка 
function Header({ linkTitle, linkTo, ...props }) {
	return (
		<header className="header">
			<img src={logo} alt="логотип." className="header__logo logo" />
      {/*//если есть пропс чилдрен, вставляется в этот див, если нет див пустой*/}
			<div className="header__user-name">{props.children}</div>
      {/*//кнопка перехода по ссылке или срабатывания функции выхода*/}
			<button onClick={props.handleExit} className="header__button">
        {/*//ссылка*/}
				<Link
					to={`${linkTo}`}
					style={{ textDecoration: "none" }}
					className="button_condition_hover"
				>
					<p className="header__link">{linkTitle}</p>
				</Link>
			</button>
		</header>
	);
}

export default Header;
