import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth/authSelectors'
import { 
	setIsOpenPopupAuth 
} from '../../store/auth/authSlice.js'

import AddButton from '../AddButton/AddButton';
import Button from '../Button/Button';

import './Popup.scss';

function Popup({
	title, btnText, name,
	children,
	onSubmit,
	isOpen,
	onClose,
	type,
	disabled
}) {

	const dispatch = useDispatch()

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleEscClose)
		}
		return () => {
			document.removeEventListener('keydown', handleEscClose)
		}
	}, [isOpen]);

	function handleEscClose(evt) {
		if (evt.key === 'Escape') {
			dispatch(setIsOpenPopupAuth(false))
		};
	};

	function mouseDownClose(evt) {
		if (evt.target.classList.contains('popup__container')) {
			dispatch(setIsOpenPopupAuth(false))
		};
	}

	

	return (
		<div className={`popup popup_form_${name} ${isOpen ? "popup_opened" : ""}`}
			onMouseDown={mouseDownClose}>
			<div className="popup__container">
				<form
					action="#"
					noValidate
					name={name}
					onSubmit={onSubmit}
					className={`form popup__content popup__content_form_${name}`}>
					<h3 className="popup__title">{title}</h3>
					{
						children
					}
					{
						<Button
							type={type || "submit"}
							className={`button__save ${disabled}`}
							name="button2"
							btnText={btnText || 'Вход'}
						/>
					}
					<div className="popup__close" type="button" name="button1">
						<AddButton 
						onClick={onClose} 
						className='add-button__close-popup' />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Popup;