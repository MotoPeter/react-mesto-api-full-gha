import React from "react";

//хук получения инпутов
export function useForm(inputValues = {}) {
	//переменная состояния значений инпутов
	const [values, setValues] = React.useState(inputValues);

	//получение значений инпутов
	const handleChange = (event) => {
		//массив значение, имя инпута из евента
		const { value, name } = event.target;
		//меняем переменную состояния добавляя в массив инпутов полученное имя и значение
		setValues({ ...values, [name]: value });
	};
	//возвращаем массив имя:значение, обработчик, функцию изменения состояния
	return { values, handleChange, setValues };
}
