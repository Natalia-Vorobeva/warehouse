

import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';

import './Input.scss';

function Input({
	className,
	spanClassName,
	type,
	id,
	placeholder,
	minLength,
	maxLength,
	name,
	value,
	onChange,
	setInput
}) {

	// function handleLogin(values) {

	// 	users.filter(n => {
	// 		if (n.username == values.username && n.pass == values.pass) {
	// 			setStateUser(n)
	// 			const idUser = stateUser.id
	// 			users.find((i) => {
	// 				if (i.id == idUser) {
	// 					i.permission = true
	// 				}
	// 				localStorage.setItem('users', JSON.stringify(users));
	// 				setIsOpenPopupAuth(!isOpenPopupAuth)					
	// 				setIsLoggedIn(!isLoggedIn)
	// 			})
	// 			// function handleSignOut(evt) {
	// // 	localStorage.setItem('products', JSON.stringify(db));
	// // 	}

	// 			return
	// 		}
	// 		else {
	// 			console.log('%cDATA', 'color: purple', "error")
	// 			return
	// 		}

	// 	})

	// }


	return (
		<>
			<input type={type} id={id} placeholder={placeholder}
				className={className}
				name={name} minLength={minLength}
				maxLength={maxLength}
				autoComplete="off"
				required
				value={value}
				onInput={(e) => {
					// setInput(e.target.value)
					// console.log('%cDATA', 'color: purple', e.target.id)
					setInput({[e.target.name]: e.target.value} )
					// console.log('%cDATA', 'color: purple', this.e.target.name, e.target.value)

				}
					// onInput={e => setInputChange(e.target.value)
					// handleChangeInput(input)
				}

			/>
			<span className={spanClassName}></span>
		</>

	);
}

export default Input;