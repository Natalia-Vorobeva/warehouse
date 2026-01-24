import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userDefinedFunctionsSelectors } from './store/userDefinedFunctions/userDefinedFunctionsSelectors.js'
import { setIsOpenInfoPopupBlock, setDataInfoPopupBlock, setIsOpenPopupNewBlock } from './store/userDefinedFunctions/userDefinedFunctionsSlice.js'

import { LIMIBERBLOCKS, LIMITERDELETEBLOCK } from './constants/limiterBlocks'
import dataBlockUser from './constants/dataBlockUser.js'
import elementsFieldDev from './constants/elementsFieldDev.js'
import './assets/styles/GlobalStyle.scss'
import './App.scss'

import Main from './pages/Main/Main'

function App() {
	const dispatch = useDispatch()
	const dataInfoPopupBlock = useSelector(userDefinedFunctionsSelectors.getDataInfoPopupBlock)
	const [dbBlocksAct, setDbBlocksAct] = useState([])
	const [elementsField, setElementsField] = useState([])
	const [isOpenNewBlock, setIsOpenNewBlock] = useState(false)
	const [disableNewBlock, setDisableNewBlock] = useState("")
	const [idCounter, setIdCounter] = useState(null)

	useEffect(() => {
		if (localStorage.hasOwnProperty('blocksUser') === false) {
			localStorage.setItem('blocksUser', JSON.stringify(dataBlockUser))
		} else {
			let dbBlocksUser = JSON.parse(localStorage.getItem('blocksUser'))
			if (dbBlocksUser) {
				setDbBlocksAct(dbBlocksUser)
			}
		}
		if (localStorage.hasOwnProperty('elementsFieldDev') === false) {
			localStorage.setItem('elementsFieldDev', JSON.stringify(elementsFieldDev))
		} else {
			let dbElementsField = JSON.parse(localStorage.getItem('elementsFieldDev'))
			if (dbElementsField) {
				setElementsField(dbElementsField)
			}
		}
	}, [])

	// Добавляем новый блок
	useEffect(() => {
		setIdCounter(dbBlocksAct.length)
	}, [dbBlocksAct])

	function handleOpenPopup() {
		dispatch(setIsOpenInfoPopupBlock(false))
	}

	useEffect(() => {
		arrayIndex()
	}, [])

	function arrayIndex() {
		setIdCounter(dbBlocksAct.length)
	}

	useEffect(() => {
		if ((idCounter + 1) !== LIMIBERBLOCKS) {
			setDisableNewBlock('')
		} else {
			return setDisableNewBlock('disable')
		}
	}, [idCounter])

	/* добавить новый блок */
	function handleAddNewBlock(blockValues) {
		let array = [...dbBlocksAct]

		const blockType = blockValues.type || (!blockValues.isPallet ? 'pallet' : 'no-pallet');
		const isPalletBool = blockValues.type === 'pallet' || !blockValues.isPallet;

		array.push({
			id: idCounter + 1,
			type: blockType, // используем вычисленный тип
			pallet: isPalletBool, // true для паллета, false для "не паллет"
			w: blockValues.width,
			h: blockValues.height,
			depth: blockValues.depth,
			standard: false,
			comment: '',
			more: '',
			class: `block-user__item block-user__standart-${idCounter + 1}`,
			tooltip: blockValues.tooltip,
			button: '+',
		})

		setDbBlocksAct(array)
		setIdCounter(idCounter + 1)
		localStorage.setItem('blocksUser', JSON.stringify(array))

		// Закрываем попап добавления
		dispatch(setIsOpenPopupNewBlock(false))
	}

	/* удалить блок */
	function handleDeleteBlock(id) {
		dispatch(setIsOpenInfoPopupBlock(false))
		const dataApi = JSON.parse(localStorage.getItem('blocksUser'))
		if (id <= LIMITERDELETEBLOCK) {
			return
		} else {
			const newPack = dataApi.filter(el => el.id != id)
			localStorage.setItem('blocksUser', JSON.stringify(newPack))
			newPack.forEach((item, i) => {
				item.id = i + 1;
			})
			localStorage.setItem('blocksUser', JSON.stringify(newPack));
			setDbBlocksAct(JSON.parse(localStorage.getItem('blocksUser')))
		}
		arrayIndex()
	}

	function handleSubmitPopupBlockUser(blockValues) {
		console.log('Полученные данные из попапа:', blockValues);
		console.log('isPallet:', blockValues.isPallet);
		console.log('type:', blockValues.type);

		handleAddNewBlock(blockValues);
	}

	function handleInfoBlock(id) {
		const dataPopup = dbBlocksAct.find(el => el.id == id)
		dispatch(setIsOpenInfoPopupBlock(true))      // Открываем попап информации
		dispatch(setDataInfoPopupBlock(dataPopup))
		dispatch(setIsOpenPopupNewBlock(false))      // Закрываем попап добавления, если открыт
	}

	// let i = dataInfoPopupBlock

	function handleAddMoreInfoPopup(values) {
		if (dataInfoPopupBlock) {
			const dataApi = JSON.parse(localStorage.getItem('blocksUser'))
			const newData = dataApi.map(item => {
				if (item.id == dataInfoPopupBlock.id) {
					return { ...item, more: values }
				} else {
					return item
				}
			})
			localStorage.setItem('blocksUser', JSON.stringify(newData))
			setDbBlocksAct(JSON.parse(localStorage.getItem('blocksUser')))
		}
	}

	function handleCloseInfoPopupUser() {
		dispatch(setIsOpenInfoPopupBlock(false))
		dispatch(setDataInfoPopupBlock(null))
	}

	function handleCloseNewBlockPopup() {
		dispatch(setIsOpenPopupNewBlock(false))
	}

	return (
		<div className='app'>
			<div className="app__pages">
				<Main
					dbBlocks={dbBlocksAct}
					disableNewBlock={disableNewBlock}
					handleOpenPopup={handleOpenPopup}
					handleDeleteBlock={handleDeleteBlock}
					handleSubmit={handleSubmitPopupBlockUser}
					handleInfoBlock={handleInfoBlock}
					handleCloseInfoPopupUser={handleCloseInfoPopupUser}
					handleAddMoreInfoPopup={handleAddMoreInfoPopup}
					handleCloseNewBlockPopup={handleCloseNewBlockPopup} // ← Добавляем
					className={disableNewBlock}
					elementsField={elementsField}
				/>
			</div>
		</div>
	)
}

export default App