import { useState } from 'react';
import Popup from '../Popup/Popup';

import './PopupAuth.scss';
import { authSelectors } from '../../store/auth/authSelectors.js'
import { useSelector } from 'react-redux';

import { setIsOpenPopupAuth } from '../../store/auth/authSlice.js'

function PopupAuth({
	onLogin,
	handleSubmit
}) {
	
	const isOpenPopupAuth = useSelector(authSelectors.getIsOpenPopupAuth)
	const [values, setValues] = useState({
		username: '',
		pass: ''
	});

	const handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		setValues({ ...values, [name]: value });
		isOpenPopupAuth 
		? 
		setValues({ ...values, [name]: value }) 
		:
		// ! что есть initialStateValues
		setValues(initialStateValues) 
		// setErrors({...errors, [name]: target.validationMessage });
		// setIsValid(target.closest('form').checkValidity());
	}
	function onClose() {
		dispatch(setIsOpenPopupAuth(false))
	}

	return (
		<Popup
			name='auth'
			isOpen={isOpenPopupAuth}
			title='Авторизация'
			onChange={onLogin(values)}
			onSubmit={handleSubmit}
			onClose={onClose}
		>
			<div className="popup-auth__input-container">
				<input
					type="text"
					id="username-input"
					placeholder="Имя"
					className="popup-auth__input popup-auth__input_data_name"
					name="username" minLength="2" maxLength="40"
					value={values.name}
					onInput={(e) => handleChange(e)}
				/>
				<span className="username-input-error popup-auth__input-error"></span>

				<input type="password" id="pass-input" placeholder="Пароль"
					className="popup-auth__input popup-auth__input_data_pass"
					name="pass" minLength="2" maxLength="40"
					value={values.pass}
					onInput={(e) => handleChange(e)}
				/>
				<span className="username-input-error popup-auth__input-error"></span>
			</div>
		</Popup>
	)
}

export default PopupAuth;