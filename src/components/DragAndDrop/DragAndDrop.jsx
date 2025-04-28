import { useEffect, useState } from "react";

import './DragAndDrop.scss';
import { useSelector, useDispatch } from "react-redux";

import { movementSelectors } from '../../store/movement/movementSelectors.js'
import { setCreate, setXTranslate, setYTranslate, setIsDragging } from "../../store/movement/movementSlice";

const DragAndDrop = ({ children, handleMouseUp, setAciveClick, activeClick,
	setSeveral, several
}) => {
	const isDragging = useSelector(movementSelectors.getIsDragging)
	const xTranslate = useSelector(movementSelectors.getXTranslate)
	const yTranslate = useSelector(movementSelectors.getYTranslate)

	const [initialMousePosition, setInitialMousePosition] = useState({})
	const [idNew, setIdNew] = useState('')
	const [isNew, setIsNew] = useState('')
	const [attrData, setAttrData] = useState(null)
	const create = useSelector(movementSelectors.getCreate)
	const upClass = useSelector(movementSelectors.getUpClass)
	const dispatch = useDispatch()

	const onMouseDown = ({ clientX, clientY }) => {
		setInitialMousePosition({ x: clientX, y: clientY })
		dispatch(setIsDragging(true))
	}
	useEffect(() => {
		const onMouseMove = (e) => {
			dispatch(setXTranslate(xTranslate + e.clientX - initialMousePosition.x))
			dispatch(setYTranslate(yTranslate + e.clientY - initialMousePosition.y))
		}
		if (isDragging) {
			window.addEventListener("mousemove", onMouseMove)
		}
		return () => window.removeEventListener("mousemove", onMouseMove)
	}, [isDragging, initialMousePosition])

	useEffect(() => {
		const onMouseUp = (e) => {
			// console.log('%cMouseEvent', 'color: #bb9333', isDragging, create)

			if (isDragging) {
				e.preventDefault()
				handleMouseUp(e)
			}
			// if (create) {
			// 	handleMouseUp(e)
			// } else {
			// dispatch(setXTranslate(0))
			// dispatch(setYTranslate(0))
			// dispatch(setIsDragging(false))
			// dispatch(setCreate(false))
			// }
			// console.log('%cMouseEvent', 'color: #bb9333', MouseEvent, isDragging, create)
			// setXTranslate(0)
			// setYTranslate(0)
			// dispatch(setIsDragging(false))
			// dispatch(setCreate(false))
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
				{children}
			</div>
			{/* <div className="sections__tooltip">
				<div className="sections__tooltip-id">
					{idNew}
				</div>
				<div className="sections__tooltip-id">
				
				</div>
			</div> */}
		</>
	);
};

export default DragAndDrop
