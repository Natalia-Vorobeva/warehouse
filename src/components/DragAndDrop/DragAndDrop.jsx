import { useEffect, useState } from "react";

import './DragAndDrop.scss';
import { useSelector, useDispatch } from "react-redux";
import { movementSelectors } from '../../store/movement/movementSelectors.js'
import { handleCreate, setCurrentId, setUpClass, setIsDragging, setElement } from "../../store/movement/movementSlice";

const DragAndDrop = ({ children, handleMouseUp }) => {
	const isDragging = useSelector(movementSelectors.getIsDragging)
	// const element = useSelector(movementSelectors.getElement)
	const currentId = useSelector(movementSelectors.getCurrentId)
	const [xTranslate, setXTranslate] = useState(0)
	const [yTranslate, setYTranslate] = useState(0)
	const [initialMousePosition, setInitialMousePosition] = useState({})
	const [idNew, setIdNew] = useState('')
	const [isNew, setIsNew] = useState('')
	const [attrData, setAttrData] = useState(null)
	const create = useSelector(movementSelectors.getCreate)
	const upClass = useSelector(movementSelectors.getUpClass)
	const dispatch = useDispatch()

	// function onUp(e) {
	// 	handleMouseUp(e)
	// }
	// function onUp(e) {
	// 	handleMouseUp(e)
	// }


	const onMouseDown = ({ clientX, clientY }) => {
		setInitialMousePosition({ x: clientX, y: clientY })
		dispatch(setIsDragging(true))
	}
	useEffect(() => {
		const onMouseMove = (e) => {
			setXTranslate(xTranslate + e.clientX - initialMousePosition.x)
			setYTranslate(yTranslate + e.clientY - initialMousePosition.y)
		}
		if (isDragging) {
			window.addEventListener("mousemove", onMouseMove)
		}
		return () => window.removeEventListener("mousemove", onMouseMove)
	}, [isDragging, initialMousePosition])

	useEffect(() => {
		const onMouseUp = (e) => {
			if (isDragging) {
				e.preventDefault()
				dispatch(setCurrentId(e.target.id))
				dispatch(setUpClass(true))
				handleMouseUp(e)
			}
			setXTranslate(0)
			setYTranslate(0)			
			dispatch(setIsDragging(false))
			dispatch(handleCreate(false))
		}
		window.addEventListener('mouseup', onMouseUp) 			
	
		return (() => window.removeEventListener("mouseup", onMouseUp)
	)
	}, [isDragging])

	return (
		<>
			<div className="drag-and-drop"
				style={{ transform: `translate(${xTranslate}px,${yTranslate}px)` }}
				onMouseDown={onMouseDown}
			>
				{/* {" "} */}
				{children}
			</div>
			<div className="sections__tooltip">
				<div className="sections__tooltip-id">
					{idNew}
				</div>
				<div className="sections__tooltip-id">
				</div>
			</div>
		</>
	);
};

export default DragAndDrop
