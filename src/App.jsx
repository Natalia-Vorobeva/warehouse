import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userDefinedFunctionsSelectors } from './store/userDefinedFunctions/userDefinedFunctionsSelectors.js'
import { setIsOpenInfoPopupBlock, setDataInfoPopupBlock } from './store/userDefinedFunctions/userDefinedFunctionsSlice.js'

import { authSelectors } from './store/auth/authSelectors.js'
import { setIsLoggedIn, setBtnAuth, setIsOpenPopupAuth } from './store/auth/authSlice.js'

import Main from './pages/Main/Main'
import Signin from './pages/Signin/Signin'
import PopupAuth from './components/PopupAuth/PopupAuth.jsx'
import DragAndDrop from './components/DragAndDrop/DragAndDrop.jsx'

import { LIMIBERBLOCKS, LIMITERDELETEBLOCK } from './constants/limiterBlocks'
import { dbUsers } from './constants/dbUsers.js'
import { db } from './constants/db.js'
import dataBlockUser from './constants/dataBlockUser.js'
import elementsFieldDev from './constants/elementsFieldDev.js'
import './assets/styles/GlobalStyle.scss'
import './App.scss'

// import { handleOpenDashboard } from './store/report/reportSlice.js'
// import { getTitle } from './store/report/reportSelectors.js'

import * as api from './utils/api.js'
// const title = useSelector(reportSelectors.getTitle)
	// const handleIsOpenDashboard = () => dispatch(handleOpenDashboard(title))

function App() {	

	const dispatch = useDispatch()
	const isLoggedIn = useSelector(authSelectors.getIsLoggedIn)
	const btnAuth = useSelector(authSelectors.getBtnAuth)
	const isOpenPopupAuth = useSelector(authSelectors.getIsOpenPopupAuth)
	const dataInfoPopupBlock = useSelector(userDefinedFunctionsSelectors.getIsOpenInfoPopupBlock)
	const [stateUser, setStateUser] = useState(dbUsers)
	const [dbBlocksAct, setDbBlocksAct] = useState([])
	const [elementsField, setElementsField] = useState([])
	const [products, setProducts] = useState([])
	// const [products, setProducts] = useState([])
	const [users, setUsers] = useState([])
	const [isOpenNewBlock, setIsOpenNewBlock] = useState(false)
	const [disableNewBlock, setDisableNewBlock] = useState("")
	const [idCounter, setIdCounter] = useState(null)
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [dataProductsAndWaste, setDataProductsAndWaste] = useState({})
	// todo добавление tooltip в объект (дополнить объект данными)
	// то есть привести в порядок объекты в массиве
	const [blockUserValues, setBlockUserValues] = useState({})

	//  режим dev
	const [devMode, setDevMode] = useState(false)
	// элемент в aside в режиме dev
	const [idElement, setIdElement] = useState(null)
	console.log('%cDATA', 'color: purple', localStorage.hasOwnProperty('products'))
	
	useEffect(() => {
		if (localStorage.hasOwnProperty('products')===false) {
			localStorage.setItem('products', JSON.stringify(db))
			let dbProducts = JSON.parse(localStorage.getItem('products'))
			setProducts(dbProducts)
		} else {
			let dbProducts = JSON.parse(localStorage.getItem('products'))
			if (dbProducts) {
				setProducts(dbProducts)
			}
		}
		if (localStorage.hasOwnProperty('users')===false) {
			localStorage.setItem('users', JSON.stringify(dbUsers))
		} else {
			let dbUsers = JSON.parse(localStorage.getItem('users'))
			if (dbUsers) {
				setUsers(dbUsers)
			}
		}
		if (localStorage.hasOwnProperty('blocksUser')===false) {
			localStorage.setItem('blocksUser', JSON.stringify(dataBlockUser))
		} else {
			let dbBlocksUser = JSON.parse(localStorage.getItem('blocksUser'))
			if (dbBlocksUser) {
				setDbBlocksAct(dbBlocksUser)
			}
		}
		if (localStorage.hasOwnProperty('elementsFieldDev')===false) {
			localStorage.setItem('elementsFieldDev', JSON.stringify(elementsFieldDev))			
		} else {
			let dbElementsField = JSON.parse(localStorage.getItem('elementsFieldDev'))
			if (dbElementsField) {
				setElementsField(dbElementsField)
			}
		}
	}, [])

	// получаем отчет json
	useEffect(() => {
		api.fetchData().then(data => {
			setDataProductsAndWaste(data)
		})
	}, [])

	//! Общие данные 1 элемент dataProductsAndWaste
	// 	let c = 'Наименование цикла'
	// let s = 'Суммарные значения'
	// const [objSum, setObjSum] = useState(null)
	// const [keys, setKeys] = useState([])

	// 	let obj = Object.values(dataProductsAndWaste)[0]
	// 	.filter(function (item) {
	// 		return item['Наименование цикла'] == s
	// 	})
	// const o = obj[0]
	// let key = Object.keys(o)
	// setKeys(key)
	// setObjSum(obj)

	// !Экструзия

	// *все по экструзии

	// function sum() {
	// 	let obj = Object.values(dataProductsAndWaste)[0]
	// 		.filter(function (item) {
	// 			return item['Наименование цикла'] == s
	// 		})
	// 	const o = obj[0]
	// 	let key = Object.keys(o)
	// 	setKeys(key)
	// 	setObjSum(obj)
	// }
	// sum()


	// Авторизация 

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(setBtnAuth(false))
		}
	}, [isLoggedIn]);

	function handleSubmit(e) {
		e.preventDefault()
		dispatch(setIsOpenPopupAuth(false))
		dispatch(setIsLoggedIn(true))
	}
	function onClickButtonOut() {
		dispatch(setIsLoggedIn(false))
		dispatch(setBtnAuth(true))
		localStorage.setItem('users', JSON.stringify(stateUser))
	}
	function handleLogin(values) {
		const objUser = {}
		const obj = stateUser.filter(n => {
			if (n.username == values.username && n.pass == values.pass) {
				Object.assign(objUser, n)
				return
			}
			else {
				// console.log('%cDATA', 'color: purple', "error")
				return
			}
		})
		const idUser = objUser.id
		let el = stateUser.map((item) => {

			if (item.id === idUser) {
				item.permission = true
				return
			}
			return item
		})
		// todo доработать localstorage - false и true 
		// ! signOut

		localStorage.setItem('users', JSON.stringify(el))
	}

	// Добавляем новый блок
	useEffect(() => {
		setIdCounter(dbBlocksAct.length)
	}, [dbBlocksAct])

	function handleOpenPopup() {
		// setIsOpenPopup(true)
		dispatch(setIsOpenInfoPopupBlock(false))
	}

	useEffect(() => {
		arrayIndex()
	}, [])

	// function Ids() {
	// 	const dataBlocks = JSON.parse(localStorage.getItem('blocksUser'))
	// 	const ids = dataBlocks.map(obj => {
	// 		return obj.id;
	// 	})
	// 	const max = Math.max(...ids)
	// 	return setIdCounter(max)
	// }
	function arrayIndex() {
		setIdCounter(dbBlocksAct.length)
	}
	useEffect(() => {
		if ((idCounter + 1) !== LIMIBERBLOCKS) {
			setDisableNewBlock('')
		} else {
			setIsOpenPopup(false)
			return setDisableNewBlock('disable')
		}
	}, [idCounter])

	/* добавить новый блок */
	function handleAddNewBlock() {

		let array = dbBlocksAct
		array.push(
			{
				id: idCounter + 1,
				type: !blockUserValues.checked ? 'pallet' : 'no-pallet',
				pallet: !blockUserValues.checked,
				w: blockUserValues.widht,
				h: blockUserValues.height,
				// если высота не указана, то она больше максимальной
				// установить максимальную высоту
				// todo настроить кнопку неактивно disabled
				// w и h - это string или number
				// решить вопрос высотой: установить максимально допустимую

				depth: blockUserValues.depth,
				standard: false,
				comment: '',
				more: '',
				class: `block-user__item block-user__standart-${idCounter + 1}`,
				tooltip: blockUserValues.tooltip,
				button: '+',
			}
		)
		setDbBlocksAct(array)
		setIdCounter(idCounter + 1)
		setIsOpenNewBlock(false)
		setIsOpenPopup(false)
		localStorage.setItem('blocksUser', JSON.stringify(dbBlocksAct))
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
	function handleSubmitPopupBlockUser(e) {
		e.preventDefault()
		handleAddNewBlock()
		setIsOpenPopup(false)
	}

	function handleInfoBlock(id) {
		const dataPopup = dbBlocksAct.find(el => el.id == id)
		dispatch(setIsOpenInfoPopupBlock(true))
		dispatch(setDataInfoPopupBlock(dataPopup))
		console.log('%cDATA', 'color: purple', dataPopup)
	}

	let i = dataInfoPopupBlock

	function handleAddMoreInfoPopup(values) {
		i.more = values
		const dataApi = JSON.parse(localStorage.getItem('blocksUser'))
		const newData = dataApi.map(item => {
			if (item.id == i.id) {
				return { ...item, more: values }
			} else {
				return item
			}
		})
		localStorage.setItem('blocksUser', JSON.stringify(newData))
		setDbBlocksAct(JSON.parse(localStorage.getItem('blocksUser')))
	}

	function handleCloseInfoPopupUser() {
		dispatch(setIsOpenInfoPopupBlock(false))
	}

	/* настройки режима разработчика */
	function onClickFooterLinkToDev() {
		setDevMode(!devMode)
	}

	return (
		<div className='app'>
			{/* <DragAndDrop>
				<div>I am draggable🙂</div>
			</DragAndDrop> */}
			<div className="app__pages">
				{
					isLoggedIn === false && btnAuth === true
						?
						<Signin />
						:
						<></>
				}
				{
					isLoggedIn === false && isOpenPopupAuth === true
						?
						<PopupAuth
							buttonText='Войти'
							onLogin={handleLogin}
							handleSubmit={handleSubmit}
							dbusers={users}
						/>
						:
						<></>
				}


				<Main
					devMode={devMode}
					onClickFooterLinkToDev={onClickFooterLinkToDev}
					db={products}
					handleClickButton={onClickButtonOut}
					isOpenNewBlock={isOpenNewBlock}
					dbBlocks={dbBlocksAct}
					disableNewBlock={disableNewBlock}
					handleAddNewBlock={handleAddNewBlock}
					handleOpenPopup={handleOpenPopup}
					handleDeleteBlock={handleDeleteBlock}
					handleSubmit={handleSubmitPopupBlockUser}
					handleInfoBlock={handleInfoBlock}
					handleCloseInfoPopupUser={handleCloseInfoPopupUser}
					handleAddMoreInfoPopup={handleAddMoreInfoPopup}
					className={disableNewBlock}
					setBlockUserValues={setBlockUserValues}
					setIdElement={setIdElement}
					elementsField={elementsField}
					dataProductsAndWaste={dataProductsAndWaste}
				/>
			</div>
		</div >
	)
}

export default App

// 1. Создать контекст для хранения роли пользователя. React Context API позволяет хранить глобальное состояние, доступное во всех компонентах приложения. В контексте можно хранить информацию о текущем пользователе и его правах доступа. 1
// 2. Создать компоненты-защитники для управления доступом. Они проверяют роль пользователя и рендерят дочерний компонент только в случае совпадения роли. Например, если в приложении есть панель управления, доступная только администраторам, её можно обернуть в компонент-защитник, указав роль «admin». 1
// 3. Использовать пакет react-aclify. Он предоставляет набор инструментов для списка контроля доступа (ACL) в приложениях на React. С помощью компонента CanAccess можно контролировать видимость частей приложения на основе ролей и разрешений пользователя. 2
// 4. Применить флаги функций. С их помощью можно активировать определённые функции для конкретных пользователей. Для управления флагами функций можно использовать, например, сервис SwitchFeat.