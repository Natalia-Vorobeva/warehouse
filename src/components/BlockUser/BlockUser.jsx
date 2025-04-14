import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { movementSelectors } from '../../store/movement/movementSelectors.js'
import { handleCreate } from '../../store/movement/movementSlice.js'

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
	isOpenPopup,
	handleOpenPopup,
	handleSubmit,
	handleInfoBlock,
	className,
	type,
	dataInfoPopupBlock,
	isOpenInfoPopupBlock,
	handleCloseInfoPopupUser,
	handleSubmitAddMoreInfoPopup,
	handleAddMoreInfoPopup,
	setBlockUserValues
}) {

const dispatch = useDispatch()
const create = useSelector(movementSelectors.getCreate)
// const handleIsOpenDashboard = () => dispatch(handleOpenDashboard(title))
	const euroRef = useRef(null)
	function handleClickEuro(e) {
		dispatch(handleCreate())
		const id = e.target.id
		// Не забудь изменить на false? когда поставишь на поле
		// дальше перетаскивание
	}

	return (
		<div className="block-user">
			<div className="block-user__list">
				{
					dbBlocks.map((item) => (
						<div key={item.id} className={item.class}>
							<div ref={euroRef} id='europallet' onClick={() => dispatch(handleCreate(true))} className={`block-user__col-1 block-user__col-1_type_${item.type} ${item.class}`}>
								<div className="block-user__position"></div>
							</div>
							<div className={`block-user__col-2 block-user__col-2_type_${item.type}`}>
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
							<Tooltip text={item.tooltip} />
						</div>
					)
					)
				}
			</div>
			<PopupUserBlock
				onSubmit={handleSubmitAddMoreInfoPopup}
				onAddComment={handleAddMoreInfoPopup}
				isOpen={isOpenInfoPopupBlock}
				dataInfoPopupBlock={dataInfoPopupBlock}
				onClose={handleCloseInfoPopupUser}
			/>
			<AddButton
				disableNewBlock={disableNewBlock}
				onClick={handleOpenPopup}
				className={`block-user__add ${className}`} />
			<PopupNewBlockUser
				title={"Новый "}
				btnText='Сохранить'
				type="submit"
				onClosePopupNewBlock={onClosePopupNewBlock}
				isOpenPopup={isOpenPopup}
				handleSubmit={handleSubmit}
				setBlockUserValues={setBlockUserValues}
			/>
		</div>
	);
}

export default BlockUser;