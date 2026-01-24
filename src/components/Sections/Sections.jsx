import { useEffect, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSelector, useDispatch } from 'react-redux'

import { movementSelectors } from '../../store/movement/movementSelectors.js'
import {
	setCreate,
	setIsDragging,
	setIdPackNew,
	setXTranslate,
	setYTranslate
} from '../../store/movement/movementSlice.js'
import {
	CATALOG,
	ROWS,
	UNIT,
	LEVEL,
	REVERSEDlEVEL
} from '../../constants/dataSection.js'

import DragAndDrop from '../DragAndDrop/DragAndDrop.jsx'

import copyImg from '../../assets/images/copy.png'
import './Sections.scss'

function Sections() {
	const refRows = useRef(null)
	const refUnit = useRef(null)
	const newObjRef = useRef(null)
	const ref = useRef(null)

	const dispatch = useDispatch()
	const isDragging = useSelector(movementSelectors.getIsDragging)
	const create = useSelector(movementSelectors.getCreate)
	const idPackNew = useSelector(movementSelectors.getIdPackNew)

	const [width, setWidth] = useState(window.innerWidth)
	const [idPack, setIdPack] = useState([])
	const [idsPack, setIdsPack] = useState('')
	const [selectedObject, setSelectedObject] = useState([])
	const [idsSelectedObject, setIdsSelectedObject] = useState('')
	const [currentPlace, setCurrentPlace] = useState({})
	const [sizeUnit, setSizeUnit] = useState({
		width: 0,
		height: 0
	})
	const [pack, setPack] = useState([])
	const [copy, setCopy] = useState(false)
	const [several, setSeveral] = useState(false)

	// Отключение контекстного меню
	useEffect(() => {
		const handleContextMenu = (e) => {
			e.preventDefault()
		}
		document.addEventListener('contextmenu', handleContextMenu)
		return () => {
			document.removeEventListener('contextmenu', handleContextMenu)
		}
	}, [])

	useEffect(() => {
		const handleResize = (event) => {
			setWidth(event.target.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		if (refUnit.current) {
			const { width, height } = refUnit.current.getBoundingClientRect()
			setSizeUnit({ width, height })
		}
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [width])

	useEffect(() => {
		if (idPackNew.length === 0 && pack.length > 0) {
			dispatch(setIdPackNew([...pack]))
		} else if (pack.length > 0) {
			dispatch(setIdPackNew([...idPackNew, ...pack]))
		}
	}, [pack, dispatch])

	useEffect(() => {
		let arr = []
		idPack.forEach(item => {
			arr.push(item.id)
		})
		let myArr = arr.join(', ')
		setIdsPack(myArr)
	}, [idPack])

	useEffect(() => {
		let arr = []
		selectedObject.forEach(item => {
			arr.push(item.id)
		})
		let myArr = arr.join(', ')
		setIdsSelectedObject(myArr)
	}, [selectedObject])

	function handleClick(e) {
		e.preventDefault()
		const data = e.target
		if (isDragging === false) {
			if (data.dataset.free == 'true') {
				let obj = {}
				obj['id'] = data.id
				setCurrentPlace(obj)
				// если желтая
				if (data.className.includes('unit-active')) {
					// удаляем класс и из списка желтых
					data.classList.remove("unit-active")
					setIdPack(idPack.filter(i => i.id !== data.id))
				} else {
					// если свободная и не желтая, делаем желтой 
					data.className += " unit-active"
					if (idPack.length === 0) {
						setIdPack([...idPack, obj])
					} else if (!idPack.find(i => i.id == data.id)) {
						setIdPack([...idPack, obj])
					}
				}
			} else if (data.dataset.free == 'false') {
				// если красная 
				if (data.className.includes('unfree')) {
					let selectedObj = {}
					selectedObj['id'] = data.id
					data.classList.remove("unfree")
					//  делаем коричневой
					data.className += " unit-no-free"
					if (selectedObject.length === 0) {
						setSelectedObject([...selectedObject, selectedObj])
					} else if (!selectedObject.find(i => i.id == data.id)) {
						setSelectedObject([...selectedObject, selectedObj])
					}
				} else {
					data.classList.remove("unit-no-free")
					setSelectedObject(selectedObject.filter(i => i.id !== data.id))
					data.className += " unfree"
				}
			}
		}
	}

	function handleMouseUp(e) {
		e.preventDefault()
		const data = e.target
		if (isDragging === true) {
			let obj = {}
			obj['id'] = data.id
			setCurrentPlace(obj)
			if (data.className.includes('sections__unit')) {
				if (!data.className.includes('unfree')) {
					data.dataset.free = !data.dataset.free
					data.className += " unfree"
					if (idPackNew.length === 0) {
						dispatch(setIdPackNew([...idPackNew, obj]))
					} else {
						dispatch(setIdPackNew([...idPackNew, obj]))
					}
				}
			} else {
				dispatch(setXTranslate(0))
				dispatch(setYTranslate(0))
				dispatch(setIsDragging(false))
				dispatch(setCreate(false))
				setCurrentPlace({})
			}
		}
		dispatch(setXTranslate(0))
		dispatch(setYTranslate(0))
		dispatch(setIsDragging(false))
		dispatch(setCreate(false))
	}

	function stateIdPackNew(obj) {
		setPack([...pack, obj])
	}

	function handleMouseUpSeveral(e) {
		e.preventDefault()
		const data = e.target
		let obj = {}
		obj['id'] = data.id
		if (isDragging === true) {
			setCurrentPlace(obj.id.length === 1 ? '' : obj)
			if (data.className.includes('sections__unit')) {
				if (!data.className.includes('unfree')) {
					data.dataset.free = !data.dataset.free
					data.className += " unfree"
					stateIdPackNew(obj)
				} else {
					return
				}
			} else {
				dispatch(setXTranslate(0))
				dispatch(setYTranslate(0))
				dispatch(setIsDragging(false))
				dispatch(setCreate(false))
			}
		} else {
			dispatch(setXTranslate(0))
			dispatch(setYTranslate(0))
			dispatch(setIsDragging(false))
			dispatch(setCreate(false))
		}
	}

	const onClickCopy = () => {
		setCopy(true);
		setTimeout(() => setCopy(false), 1000);
	}

	function closeNewObj() {
		dispatch(setCreate(false))
		dispatch(setIsDragging(false))
	}

	return (
		<div className="sections">
			<div className="sections__wrapper">
				{/* Контекстное меню внутри компонента */}
				<div className="sections__context-menu">
					<div className="sections__creation">
						<div className="sections__new-wrapper">
							<div className="sections__new-object">
								{!create && !isDragging && (
									<p className="sections__new-info">новый</p>
								)}
								{create && (
									<div onClick={closeNewObj} className="sections__delete">+</div>
								)}
								<DragAndDrop handleMouseUp={several ? handleMouseUpSeveral : handleMouseUp}>
									<div
										ref={ref}
										style={{
											position: "absolute",
											width: sizeUnit.width,
											height: sizeUnit.height,
											x: 0,
											y: 0
										}}
										className={`sections__pallet ${!create ? '' : 'sections__pallet_active'}`}
									/>
								</DragAndDrop>
							</div>
						</div>
						<button
							onClick={() => setSeveral(!several)}
							className={`sections__multi-button ${several ? 'sections__multi-button_active' : ''}`}
						>
							📦
						</button>
					</div>

					<p className="sections__current-place">{currentPlace.id}</p>
					<div className="sections__place-window">
						<div className="sections__place-warehouse">
							{idPack.map((el) => {
								return `  ${el.id} `
							})}
						</div>
						<CopyToClipboard text={`Выделенные свободные ячейки ${idsPack}`}>
							<div onClick={onClickCopy} className={`sections__copy ${copy ? 'copied' : ''}`}>
								<img className={`sections__copy-img ${copy ? 'sections__copied' : ''}`} src={copyImg} alt="copy" />
							</div>
						</CopyToClipboard>
						<span className={`sections__copied ${copy ? '' : 'copied'}`}>✔</span>
					</div>
					<div className="sections__place-window">
						<div className="sections__place-warehouse sections__place-warehouse_selected">
							{selectedObject.map((el) => {
								return `  ${el.id} `
							})
							}
						</div>
						<CopyToClipboard text={`Выделенные объекты: ${idsSelectedObject}`}>
							<div onClick={onClickCopy} className={`sections__copy ${copy ? 'copied' : ''}`}>
								<img className={`sections__copy-img ${copy ? 'sections__copied' : ''}`} src={copyImg} alt="copy" />
							</div>
						</CopyToClipboard>
						<span className={`sections__copied ${copy ? '' : 'copied'}`}>✔</span>
					</div>
				</div>

				<div className="sections__catalog">
					{
						CATALOG.map((item, index) => {
							const iLevel = index % 2
							return <div key={index} className="sections__row">
								<div className="sections__levels">
									{iLevel === 0 ?
										REVERSEDlEVEL.map((item, index) => {
											return <div key={`${index}/levelreversed`} className="sections__level">{item}</div>
										})
										:
										LEVEL.map((item, index) => {
											return <div key={`${index}/level`} className="sections__level">{item}</div>
										})
									}
								</div>
							</div>
						})
					}
				</div>
				<div className="sections__container">
					{ROWS
						? Array.from({ length: ROWS }).map((_, index) => {
							let i = CATALOG[index]
							let levelUnit = (index + 2) % 2
							return (
								<div ref={refRows} key={CATALOG[index]} id={CATALOG[index]} data-free className="sections__rows" >
									<span className="sections__rows-name"></span>
									<span className="sections__rows-name"></span>
									<span className="sections__rows-name"></span>
									<span key={`${index}/level`} className="sections__rows-name">{i}</span>
									{UNIT ? Array.from({ length: UNIT, i, levelUnit })
										.map((_, index) => {
											return (
												<div
													ref={refUnit}
													data-free
													className="sections__unit"
													onClick={(e) => handleClick(e)}
													id={`${i}${levelUnit === 0 ? 4 : 1}-${index + 1}`} key={`${i}${levelUnit === 0 ? 4 : 1}-${index + 1}`} >
												</div>
											)
										})
										: null}
									{UNIT ? Array.from({ length: UNIT, i, levelUnit })
										.map((_, index) => {
											return (
												<div
													ref={refUnit}
													data-free
													className="sections__unit"
													onClick={(e) => handleClick(e)}
													id={`${i}${levelUnit === 0 ? 3 : 2}-${index + 1}`} key={`${i}${levelUnit === 0 ? 3 : 2}-${index + 1}`} ></div>
											)
										})
										: null}
									{UNIT ? Array.from({ length: UNIT, i, levelUnit })
										.map((_, index) => {
											return (
												<div
													ref={refUnit}
													data-free
													className="sections__unit"
													onClick={(e) => handleClick(e)}
													id={`${i}${levelUnit === 0 ? 2 : 3}-${index + 1}`} key={`${i}${levelUnit === 0 ? 2 : 3}-${index + 1}`} ></div>
											)
										})
										: null}
									{UNIT ? Array.from({ length: UNIT, i, levelUnit })
										.map((_, index) => {
											return (
												<div
													ref={refUnit}
													data-free
													className="sections__unit"
													onClick={(e) => handleClick(e)}
													id={`${i}${levelUnit === 0 ? 1 : 4}-${index + 1}`} key={`${i}${levelUnit === 0 ? 1 : 4}-${index + 1}`} ></div>
											)
										})
										: null}
								</div>
							)
						})
						: null
					}
				</div>
			</div>
		</div >
	)
}

export default Sections