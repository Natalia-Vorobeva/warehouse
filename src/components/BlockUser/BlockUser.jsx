import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { movementSelectors } from '../../store/movement/movementSelectors.js'
import { setCreate } from '../../store/movement/movementSlice.js'
import { setIsOpenPopupNewBlock, setIsOpenInfoPopupBlock } from '../../store/userDefinedFunctions/userDefinedFunctionsSlice'
import { userDefinedFunctionsSelectors } from '../../store/userDefinedFunctions/userDefinedFunctionsSelectors.js'

import PopupUserBlock from '../PopupUserBlock/PopupUserBlock'
import AddButton from '../AddButton/AddButton'
import Tooltip from '../Tooltip/Tooltip'
import PopupNewBlockUser from '../PopupNewBlockUser/PopupNewBlockUser'

import './BlockUser.scss'
import './BlockUserDataStyle.scss'


function BlockUser({
	onClosePopupNewBlock,
	handleDeleteBlock,
	dbBlocks,
	disableNewBlock,
	handleSubmit,
	handleInfoBlock,
	className,
	type,
	handleCloseInfoPopupUser,
	handleSubmitAddMoreInfoPopup,
	handleAddMoreInfoPopup,
	setBlockUserValues
}) {

	const dispatch = useDispatch()
	const isOpenPopupNewBlock = useSelector(userDefinedFunctionsSelectors.getIsOpenPopupNewBlock)
	const isOpenInfoPopupBlock = useSelector(userDefinedFunctionsSelectors.getIsOpenInfoPopupBlock)
	// const handleIsOpenDashboard = () => dispatch(setCreate(title))
	const euroRef = useRef(null)
	function handleClickEuro(e) {
		// dispatch(setCreate())
		const id = e.target.id
		// Не забудь изменить на false? когда поставишь на поле
		// дальше перетаскивание
	}
	// 	function handleClickInfoPopup(id) {
	// console.log('%cDATA', 'color: purple', id)
	// }

	function handleOpenPopupNewBlock() {
		dispatch(setIsOpenPopupNewBlock(true))
		dispatch(setIsOpenInfoPopupBlock(false))
	}

	return (
		<div className="block-user">
			<div className="block-user__list">
				{
					dbBlocks.map((item) => (
						<div key={item.id} className='block-user__item'>
							<div className="block-user__overlay"></div>
							<div className={`block-user__standard block-user__standard_type_${item.type} ${item.class}`}>
								<div className="block-user__overlay"></div>
							<div ref={euroRef} id='europallet' onClick={() => dispatch(setCreate(true))} className={`block-user__col-1 block-user__col-1_type}`}>
							{/* <div ref={euroRef} id='europallet' onClick={() => dispatch(setCreate(true))} className={`block-user__col-1 block-user__col-1_type_${item.type} ${item.class}`}> */}
								
							</div>
							<div className={`block-user__col-2 block-user__col-2`}>
							{/* <div className={`block-user__col-2 block-user__col-2_type_${item.type}`}> */}
								<p
									onClick={() => handleDeleteBlock(item.id)}
									className='block-user__delete'>
									{item.button}
								</p>
								<p className="block-user__info"
									onClick={() => handleInfoBlock(item.id)} >
									🛈
								</p>
							</div>
							{/* <Tooltip text={item.tooltip} /> */}
							</div>
						</div>
					)
					)
				}
			</div>
			<PopupUserBlock
				onSubmit={handleSubmitAddMoreInfoPopup}
				onAddComment={handleAddMoreInfoPopup}
				isOpen={isOpenInfoPopupBlock}
				onClose={handleCloseInfoPopupUser}
			/>
			<AddButton
				disableNewBlock={disableNewBlock}
				onClick={handleOpenPopupNewBlock}
				className={`block-user__add ${className}`} />
			<PopupNewBlockUser
				title={"Новый "}
				btnText='Сохранить'
				type="submit"
				onClosePopupNewBlock={onClosePopupNewBlock}
				isOpenPopup={isOpenPopupNewBlock}
				handleSubmit={handleSubmit}
				setBlockUserValues={setBlockUserValues}
			/>
		</div>
	);
}

export default BlockUser;