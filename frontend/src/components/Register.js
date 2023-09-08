//компонент регистрации 
import React from "react";
import Header from "./Header";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

//передаем функцию сабмита
const Register = ({ handleSubmit }) => {
	return (
		<div>
			<Header linkTitle={"Войти"} linkTo={"/sign-in"} />
			<AuthForm
				onSubmit={handleSubmit}
				title={"Регистрация"}
				buttonSubmitText={"Зарегистрироваться"}
			>
				<p className="auth-form__footer">
					Уже зарегистрированы?
					<Link
						to="/sign-in"
						style={{ textDecoration: "none" }}
						className="button_condition_hover"
					>
						<span style={{ margin: 0, color: "white", marginLeft: 4 }}>
							{" "}
							Войти
						</span>
					</Link>
				</p>
			</AuthForm>
		</div>
	);
};

export default Register;
