import { useState, useEffect } from 'react'

import Main from './pages/Main/Main'
import Signin from './pages/Signin/Signin'

import './assets/styles/GlobalStyle.scss'
import './App.scss'

import { db } from './constants/db.js'


localStorage.setItem('key', '123');
localStorage.setItem('products', JSON.stringify(db));

function App() {

	const [items, setItems] = useState([]);

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem('products'));
		if (items) {
			setItems(items);
		}
	}, []);

	/* настройка авторизации */

	const [btn, setBtn] = useState(true)

	function onClickButton() {
		setBtn(!btn)
	}
	function onClickButtonOut() {
		setBtn(!btn)
	}

	/* настройки режима разработчика */


	// ссылка на режим разработчика

	const [devMode, setDevMode] = useState(false)

	function onClickFooterLinkToDev() {
		setDevMode(!devMode)
	}

	return (
		<div className='app'>
				<div className="app__pages">
					{
						btn
							?
							<Signin btn={btn} handleClickButton={onClickButton} />
							:
							<></>
					}

					<Main devMode={devMode} onClickFooterLinkToDev={onClickFooterLinkToDev} db={items} btn={btn} handleClickButton={onClickButtonOut} />
				
				</div>
		</div>
	)
}

export default App
