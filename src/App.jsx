import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import Main from './pages/Main/Main'
import Signin from './pages/Signin/Signin'
import PopupAuth from './components/PopupAuth/PopupAuth.jsx'

import dataBlockUser from './constants/dataBlockUser.js'
import { LIMIBERBLOCKS, LIMITERDELETEBLOCK } from './constants/limiterBlocks'
import { dbUsers } from './constants/dbUsers.js'
import { db } from './constants/db.js'
import elementsFieldDev from './constants/elementsField.js'

import './assets/styles/GlobalStyle.scss'
import './App.scss'

import * as api from './utils/api.js'
import DragAndDrop from './components/DragAndDrop/DragAndDrop.jsx'

// localStorage.setItem('products', JSON.stringify(db))
// localStorage.setItem('users', JSON.stringify(dbUsers))
// localStorage.setItem('blocksUser', JSON.stringify(dataBlockUser))
// localStorage.setItem('elementsFieldDev', JSON.stringify(elementsFieldDev))

function App() {
	const [stateUser, setStateUser] = useState(dbUsers)
	const [dbBlocksAct, setDbBlocksAct] = useState([])
	const [elementsFieldDev, setElementsFieldDev] = useState([])

	const [products, setProducts] = useState([])
	const [users, setUsers] = useState([])
	const [isLoggedIn, setIsLoggedIn] = useState(true)
	const [btnAuth, setBtnAuth] = useState(true)
	const [isOpenPopupAuth, setIsOpenPopupAuth] = useState(false)
	const [isOpenNewBlock, setIsOpenNewBlock] = useState(false)
	const [disableNewBlock, setDisableNewBlock] = useState("")
	const [idCounter, setIdCounter] = useState(null)
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [dataInfoPopupBlock, setDataInfoPopupBlock] = useState({})
	const [isOpenInfoPopupBlock, setIsOpenInfoPopupBlock] = useState(false)
	const [dataProductsAndWaste, setDataProductsAndWaste] = useState({})

	//  режим dev
	const [devMode, setDevMode] = useState(false)
	// элемент в aside в режиме dev
	const [idElement, setIdElement] = useState(null)

	const dispatch = useDispatch()

	useEffect(() => {
		let dbProducts = JSON.parse(localStorage.getItem('products'))
		let dbUsers = JSON.parse(localStorage.getItem('users'))
		let dbBlocksUser = JSON.parse(localStorage.getItem('blocksUser'))
		let dbElementsField = JSON.parse(localStorage.getItem('elementsFieldDev'))
		if (dbProducts) {
			setProducts(dbProducts)
		}
		if (dbUsers) {
			setUsers(dbUsers)
		}
		if (dbBlocksUser) {
			setDbBlocksAct(dbBlocksUser)
		}
		if (dbElementsField) {
			setElementsFieldDev(dbElementsField)
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
			setBtnAuth(false)
		}
	}, [isLoggedIn]);

	function handleSubmit(e) {
		e.preventDefault()
		setIsOpenPopupAuth(!isOpenPopupAuth)
		setIsLoggedIn(!isLoggedIn)
	}
	function onClickButtonAuth() {
		setIsOpenPopupAuth(!isOpenPopupAuth)
	}
	function onClickButtonOut() {
		setIsLoggedIn(false)
		setBtnAuth(!btnAuth)
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
		setIsOpenPopup(true)
		setIsOpenInfoPopupBlock(false)
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
	// todo добавление tooltip в объект (дополнить объект данными)
	// то есть привести в порядок объекты в массиве
	const [blockUserValues, setBlockUserValues] = useState({})

	/* добавить новый блок */
	function handleAddNewBlock() {

		// setIsOpenInfoPopupBlock(false)
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
		setIsOpenInfoPopupBlock(false)
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
	function onClosePopupNewBlock() {
		setIsOpenPopup(false)
	}

	function handleInfoBlock(id) {
		const dataPopup = dbBlocksAct.find(el => el.id == id)
		setIsOpenInfoPopupBlock(true)
		setDataInfoPopupBlock(dataPopup)
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
		setIsOpenInfoPopupBlock(false)
	}

	/* настройки режима разработчика */

	function onClickFooterLinkToDev() {
		setDevMode(!devMode)
	}

	// перенос блоков из header block-user в field-sections
	const [create, setCreate] = useState(false)

	return (
		<div className='app'>
			{/* <DragAndDrop>
				<div>I am draggable🙂</div>
			</DragAndDrop> */}
			<div className="app__pages">
				{
					!isLoggedIn && btnAuth
						?
						<Signin btn={btnAuth} handleClickButton={onClickButtonAuth} />
						:
						<></>
				}
				{
					isOpenPopupAuth
						?
						<PopupAuth
							isOpen={isOpenPopupAuth}
							onClose={onClickButtonAuth}
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
					btn={btnAuth}
					handleClickButton={onClickButtonOut}
					isOpenNewBlock={isOpenNewBlock}
					dbBlocks={dbBlocksAct}
					disableNewBlock={disableNewBlock}
					handleAddNewBlock={handleAddNewBlock}
					isOpenPopup={isOpenPopup}
					handleOpenPopup={handleOpenPopup}
					handleDeleteBlock={handleDeleteBlock}
					handleSubmit={handleSubmitPopupBlockUser}
					onClosePopupNewBlock={onClosePopupNewBlock}
					handleInfoBlock={handleInfoBlock}
					isOpenInfoPopupBlock={isOpenInfoPopupBlock}
					dataInfoPopupBlock={dataInfoPopupBlock}
					handleCloseInfoPopupUser={handleCloseInfoPopupUser}
					handleAddMoreInfoPopup={handleAddMoreInfoPopup}
					className={disableNewBlock}
					setBlockUserValues={setBlockUserValues}
					setIdElement={setIdElement}
					elementsFieldDev={elementsFieldDev}
					create={create}
					setCreate={setCreate}
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