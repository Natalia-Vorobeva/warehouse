import React, { useEffect } from 'react';

import AddButton from '../AddButton/AddButton';
import Button from '../Button/Button';

import './Popup.scss';

function Popup({
	title, btnText, name,
	isOpen, onClose, children,
	onSubmit,
	type,
	disabled
}) {
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
			onClose();
		};
	};

	function mouseDownClose(evt) {
		if (evt.target.classList.contains('popup__container')) {
			onClose();
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
							// disabled={disabled}
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