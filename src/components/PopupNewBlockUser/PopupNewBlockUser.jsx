import { useEffect, useState } from 'react';
import Popup from '../Popup/Popup';

import { setIsOpenPopupNewBlock } from '../../store/userDefinedFunctions/userDefinedFunctionsSlice'
import './PopupNewBlockUser.scss';
import { useDispatch, useSelector } from 'react-redux';

function PopupNewBlockUser({
	title,
	btnText,
	handleSubmit,
	type,
	isOpenPopup,
	onClosePopupNewBlock,
	setBlockUserValues
}) {

	const dispatch = useDispatch()
	// const isPopupNewBlock = useSelector(userDefinedFunctionsSelectors.getIsPopupNewBlock)

	const [values, setValues] = useState({
		// ! разобраться с типами значений
		tooltip: '',
		width: '',
		height: '',
		depth: '',
		checked: false
	})

	const [isSubscribed, setIsSubscribed] = useState('disabled')
	const handleChangeText = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value
		setValues({ ...values, tooltip: value })
	}

	const handleChange = (e) => {
		const target = e.target
		const name = target.name
		const value = target.value.replace(/[^\.0-9]/g, '')
		// setErrors({...errors, [name]: target.validationMessage });
		// setIsValid(target.closest('form').checkValidity())		
		setValues({ ...values, [name]: value })
	}
	function toggleChange(e) {
		setValues({ ...values, checked: !values.checked })
	}
	useEffect(() => {
		// todo
		// !разобраться с типами значиний values 
		(values.widht || values.height) == ''
			?
			setIsSubscribed('disabled')
			:
			setIsSubscribed('')
		setBlockUserValues(values)
	}, [values])

	function onClosePopupNewBlock() {
		dispatch(setIsOpenPopupNewBlock(false))
	}

	return (
		<Popup
			name='new-block-user'
			isOpen={isOpenPopup}
			title={title}
			onSubmit={handleSubmit}
			btnText={btnText}
			onClose={onClosePopupNewBlock}
			type={type}
			disabled={isSubscribed}
		>
			<div className="popup-new-block-user__input-container">
				<input
					type="text"
					value={values.tooltip}
					onInput={(e) => handleChangeText(e)}
					id="tooltip-block"
					placeholder="Название"
					className="popup-new-block-user__input-new"
					name="tooltip"
				/>
				<div className="popup-new-block-user__size">
					<div className="popup-new-block-user__param popup-new-block-user__param_width">
						<p className="popup-new-block-user__name-input">Ширина, см</p>
						<input
							type="text"

							// todo
							// !разобраться с типами значиний values 

							value={values.width}
							onInput={(e) => handleChange(e)}
							id="width-block"
							placeholder=""
							className="popup-new-block-user__input popup-new-block-user__width-input"
							name="width"
						/>
					</div>
					<div className="popup-new-block-user__param popup-new-block-user__param_depth">
						<p className="popup-new-block-user__name-input">Длина, см</p>
						<input
							type="text"
							value={values.depth}
							onInput={(e) => handleChange(e)}
							id="depth-block"
							placeholder=""
							className="popup-new-block-user__input popup-new-block-user__depth-input"
							name="depth"
						/>

					</div>
					<div className="popup-new-block-user__param popup-new-block-user__param_height">
						<p className="popup-new-block-user__name-input">Высота, см</p>
						<input
							type="text"
							id="height-block"
							placeholder=""
							className="popup-new-block-user__input popup-new-block-user__width-input"
							value={values.height}
							onInput={(e) => handleChange(e)}
							name="height"
						/>
					</div>
				</div>
				<div className="popup-new-block-user__checkbox">
					<label htmlFor="checkbox">Паллет</label>
					<input
						type="checkbox" id="checkbox"
						name="checked"
						className="popup-new-block-user__input-checkbox"
						onChange={(e) => toggleChange(e)}
					/>
				</div>
				<span className="username-input-error popup-auth__input-error"></span>
			</div>
		</Popup >
	);
}

export default PopupNewBlockUser;