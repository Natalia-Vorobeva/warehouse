import { useEffect, useState, useRef } from 'react';
import { userDefinedFunctionsSelectors } from '../../store/userDefinedFunctions/userDefinedFunctionsSelectors.js'

import AddButton from '../AddButton/AddButton';
import './PopupUserBlock.scss';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';

function PopupUserBlock({
	isOpen,
	onClose,
	onClick,
	onAddComment,
}) {

	const dataInfoPopupBlock = useSelector(userDefinedFunctionsSelectors.getDataInfoPopupBlock)
	// нужен динамический класс
	// или style в теге для props: w, h, aspect-ratio

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
		}
	}

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
		}
	}

	const [values, setValues] = useState('')

	const handleChange = (e) => {
		const target = e.target
		const value = target.value
		setValues(e.target.value)
	}

	const form = document.getElementById('formInfoPopup')

	function handleSubmit(e) {
		e.preventDefault()
		onAddComment(values)
		onClose()
		form.reset();
	}

	return (
		<div
			className={`popup-user-block ${isOpen ? "popup-user-block_opened" : ""}`}>
			<form
				action='#'
				noValidate
				id='formInfoPopup'
				name='info-user-block'
				onSubmit={(e) => {
					handleSubmit(e)
				}}
				className="popup-user-block__container">
				<AddButton className={'popup-user-block__close'} onClick={onClose} />
				<h3 className="popup-user-block__title">{dataInfoPopupBlock.tooltip}</h3>
				<div className="popup-user-block__data">
					<div className="popup-user-block__data-width">Ширина: {dataInfoPopupBlock.w} см</div>
					<div className="popup-user-block__data-depth">Длина: {dataInfoPopupBlock.depth} см </div>
				</div>
				<div className="popup-user-block__comment">
					<span className="popup-user-block__comment_span">Комментарий:</span>
					<div className="popup-user-block__comment_text">{dataInfoPopupBlock.comment}</div>
					<div className="popup-user-block__comment_data">
						<div className="popup-user-block__comment_more">
							{dataInfoPopupBlock.more}
						</div>
						<p className={"popup-user-block__comment_del"}
							onClick={onClick}
						>+</p>
					</div>
				</div>
				<textarea
					id="comment-input"
					name='comment'
					type="text"
					placeholder='Комментарий'
					value={values.more}
					onChange={(e) => {
						handleChange(e)
					}}
					className="popup-user-block__input-comment"
				/>
				<Button
					name="button3"
					className="popup-user-block__button"
				/>
			</form>
		</div>
	);
}

export default PopupUserBlock;