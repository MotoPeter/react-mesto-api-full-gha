import React from "react";
import { useForm } from "../hooks/useForm";

const AuthForm = ({ onSubmit, title, buttonSubmitText, ...props }) => {
	
  const {values, handleChange, setValues} = useForm({});

	const onSubmitAuthForm = (e) => {
		e.preventDefault();
		onSubmit(values);
	};

	return (
		<form className="auth-form" name={"name"} onSubmit={onSubmitAuthForm}>
			<h2 className="auth-form__title">{title}</h2>
			<input
				className="auth-form__input"
				name="email"
				id="email"
				type="email"
				placeholder="Email"
				value={values.email || ""}
				minLength="5"
				maxLength="50"
				required
				autoComplete="off"
				onChange={handleChange}
			/>
			<input
				className="auth-form__input"
				styles={{ marginTop: 30 }}
				name="password"
				id="password"
				type="password"
				placeholder="Пароль"
				value={values.password || ""}
				minLength="4"
				maxLength="20"
				required
				autoComplete="off"
				onChange={handleChange}
			/>
			<button
				className="auth-form__button button_condition_hover"
				type="submit"
			>
				{buttonSubmitText}
			</button>
			{props.children}
		</form>
	);
};

export default AuthForm;
