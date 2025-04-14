import { useEffect, useRef, useState, useCallback } from 'react';

function useDragging({ref}) {
	
	const [isDragging, setIsDragging] = useState(false)
	// console.log('%cDATA', 'color: purple', isDragging)
	const [pos, setPos] = useState({ x: 0, y: 0 })

	// console.log('%cDATA', 'color: purple', pos)

	function onMouseMove(e) {
		console.log('%cDonMouseMove', 'color: purple')
		if (!isDragging) return
		setPos({
			x: e.x - ref.current.offsetWidth / 2,
			y: e.y - ref.current.offsetHeight / 2,
		});
		e.stopPropagation()
		e.preventDefault()
	}

	function onMouseUp(e) {
		console.log('%cDonMouseUp', 'color: purple')
		// setIsDragging(false)
		e.stopPropagation()
		e.preventDefault()
	}

	function onMouseDown(e) {
		const rect = ref.current.getBoundingClientRect()
		console.log('%cDonMouseDown-rect', 'color: purple', rect)
		if (e.button !== 0) return
		setIsDragging(true)

		setPos({
			x: e.x - ref.current.offsetWidth / 2,
			y: e.y - ref.current.offsetHeight / 2,
		})
		e.stopPropagation()
		e.preventDefault()
	}

	// When the element mounts, attach an mousedown listener
	useEffect(() => {
		ref.current.addEventListener("mousedown", onMouseDown);

		return () => {
			ref.current.removeEventListener("mouseDown", onMouseDown);
		};
	}, [ref.current])

	// Everytime the isDragging state changes, assign or remove
	// the corresponding mousemove and mouseup handlers
	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mouseup", onMouseUp)
			document.addEventListener("mousemove", onMouseMove)
		} else {
			document.removeEventListener("mouseup", onMouseUp)
			document.removeEventListener("mousemove", onMouseMove)
		}
		return () => {
			document.removeEventListener("mouseup", onMouseUp)
			document.removeEventListener("mousemove", onMouseMove)
		};
	}, [isDragging])

	return [ pos.x, pos.y, isDragging]
}

export default useDragging