import { useCallback, useEffect, useRef, useState } from 'react'
import { movementSelectors } from '../../store/movement/movementSelectors.js'

import { CATALOG, ROWS, UNIT, LEVEL, REVERSEDlEVEL } from '../../constants/dataSection.js'

import scaleUp from '../../assets/images/icon-scale-up.png'

import './Sections.scss'
// import useDraggable from '../../hooks/useDraggable.js'
// import useDragging from '../../hooks/useDragging.js'
import { useSelector, useDispatch } from 'react-redux'
import { handleCreate, setIsDragging } from '../../store/movement/movementSlice.js'

import DragAndDrop from '../DragAndDrop/DragAndDrop.jsx'
import Bookmark from '../Bookmark/Bookmark.jsx'



function Sections({ toggleScaleUp }) {

	const isDragging = useSelector(movementSelectors.getIsDragging)
	const dispatch = useDispatch()
	const create = useSelector(movementSelectors.getCreate)
	const currentId = useSelector(movementSelectors.getCurrentId)
	const upClass = useSelector(movementSelectors.getUpClass)
	const [width, setWidth] = useState(window.innerWidth)
	const [idEl, setIdEl] = useState(null)
	const [idPack, setIdPack] = useState([])
	const [currentPlace, setCurrentPlace] = useState({})
	// текущий размер unit для изменения размера перетаскиваемого объекта
	const [sizeUnit, setSizeUnit] = useState({
		width: 0,
		height: 0
	})
	document.oncontextmenu = function (e) {
		e.preventDefault()
	}

	const refRows = useRef(null)
	const refUnit = useRef(null)
	// div new-object для initialCoord
	const newObjRef = useRef(null)
	// Передвигаемый объект
	const ref = useRef(null)

	useEffect(() => {
		const handleResize = (event) => {
			setWidth(event.target.innerWidth)
		}
		window.addEventListener('resize', handleResize)
		const { width, height } = refUnit.current.getBoundingClientRect()
		setSizeUnit({ width, height })
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [width])

	function handleClick(e) {
		e.preventDefault()
		const data = e.target
		if (isDragging === false) {

			if (data.dataset.free == 'true') {
				if (data.className.includes('sections__unit_active')) {
					data.classList.remove("sections__unit_active")
				} else {
					data.className += " sections__unit_active"
				}
			} else if (data.dataset.free == 'false') {
				if (data.className.includes('unfree')) {
					data.classList.remove("unfree")
					data.className += " sections__unit_no-free"
				} else {
					data.classList.remove("sections__unit_no-free")
					data.className += " unfree"
				}
			}
			let obj = {}
			obj['id'] = data.id
			setCurrentPlace(obj)
			idPack.length === 0
				?
				setIdPack([...idPack, obj])
				:
				!idPack.find(i => i.id == data.id) ?
					setIdPack([...idPack, obj])
					:
					setIdPack(idPack.filter(i => i.id !== data.id))
		}
	}

	function handleMouseUp(e) {
		e.preventDefault()
		const data = e.target
		if (data.className.includes('sections__unit')) {
			if (!data.className.includes('unfree')) {
				data.dataset.free = !data.dataset.free
				return data.className += " unfree"
			} else { return }
		} else { return }
	}

	function handleDoubleClick(e) {
		e.preventDefault()
		console.log('%cDATA', 'color: purple', e)
	}

	// todo 				{/* Сделать окно для занятых ячеек, по аналогии с sections__place-warehouse */}
	//  todo создать массив несвободных ячеек и отпавлять их localStorage? получать при перезагрузке и добавлять классы

	return (
		<div className="sections">
			<div className="sections__context-menu">
				<div className="sections__scale-up">
					<img onClick={toggleScaleUp} src={scaleUp} alt="Полноэкранный режим" className="sections__scale-up-img" />
				</div>
				<p className="sections__current-place">{currentPlace.id}</p>
				<div className="sections__place-warehouse">
					{idPack.map((el) => {
						return `  ${el.id} `
					})}
				</div>
				<div id="base" ref={newObjRef} className="sections__new-object">
					{/* todo реализовать возможность добавлять поддоны с умножением, 
					во избежание постоянного кликанья */}
					{create &&
						<div onClick={() => {
							dispatch(handleCreate(false))
							dispatch(setIsDragging(false))
						}
						}
							className="sections__delete">+</div>
					}
					<DragAndDrop
						handleMouseUp={handleMouseUp}>
						<div
							ref={ref}
							style={{
								position: "absolute",
								width: sizeUnit.width,
								height: sizeUnit.height,
								x: 0,
								y: 0
							}}
							className={`sections__new-pallet-euro ${!create ? '' : 'sections__new-pallet-euro_active'}
						 `}
						>
						</div>
					</DragAndDrop>
				</div>
				<Bookmark text='Склад' />
			</div >
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
			{/* Пересмотреть рендер units по статье  */}
			{/* https://habr.com/ru/articles/810205/     - о нативных и систетических обработчиках */}
			<div className="sections__container">
				{ROWS
					? Array.from({ length: ROWS }).map((_, index) => {
						let i = CATALOG[index]
						let levelUnit = (index + 2) % 2
						// let l = 
						return (
							<div ref={refRows} key={CATALOG[index]} id={CATALOG[index]} data-free className="sections__rows" >
								<span key={`${index}/level`} className="sections__rows-name">{i}</span>
								{UNIT ? Array.from({ length: UNIT, i, levelUnit })
									.map((_, index) => {
										// console.log('%clevel', 'color: purple', levelUnit)
										// <p className="sections__rows-name">{i}</p>
										return (
											<div
												ref={refUnit}
												data-free
												className="sections__unit"

												onClick={(e) => handleClick(e)}
												onDoubleClick={(e) => handleDoubleClick(e)}
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
											// id={`${i}2-${index + 1}`} key={`${i}2-${index + 1}`} ></div>
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
											// id={`${i}3-${index + 1}`} key={`${i}3-${index + 1}`}></div>
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
											// id={`${i}4-${index + 1}`} key={`${i}4-${index + 1}`}>
											// </div>
										)
									})
									: null}
							</div>
						)
					})
					: null
				}
			</div>
		</div >
	)
}

export default Sections