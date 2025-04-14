import { useEffect, useRef, useCallback, useState } from 'react'
import { useSprings } from "react-spring"


import BlockDev from '../BlockDev/BlockDev';
import useDraggable from '../../hooks/useDraggable';

import './DraggableComponent.scss';

function DraggableComponent({}) {

	const parentRef = useRef(null)

	const {
		handleMouseDown,
		handleMouseMove,
		handleMouseUp,
		movingBlockIndex,
		block: movingBlock
	} = useDraggable({
		parentRef
	})


	const [elementsFieldDev, setElementsFieldDev] = useState(JSON.parse(localStorage.getItem('elementsFieldDev')))

	// получаем общее количество el, существующих в field
	function objectLength(elementsFieldDev) {
		let result = 0;
		for (let obj in elementsFieldDev) {
			if (elementsFieldDev.hasOwnProperty(obj)) {
				result++;
			}
		}

		return result;
	}
	// получаем количество el со статусом row и column в массиве elem field
	function objectColumnAndRow(elementsFieldDev) {
		let counter = {
			row: 0,
			column: 0
		}
		elementsFieldDev.forEach(el => {
			if (el.position === 'row') {
				counter.row++
				return
			} else {
				counter.column++
				return
			}
		})
		return counter
	}
	let dataRow = objectColumnAndRow(elementsFieldDev)
	console.log('%cDATA', 'color: purple', dataRow)

	const blockInRow = dataRow.column
	let totalBlocks = objectLength(elementsFieldDev)
	const immediateMotionsProsp = {
			x: true,
			y: true
		}
		const getBlockCoordinates = (index) => {
			const col = Math.floor(index % blockInRow)
			const row = Math.floor(index / blockInRow)
			// здесь расчет ширины колонки
			
			return { x: col * 115 + col * 8, y: 115 * row + row * 8 }
		}
		const getColor = (i) => {
			const colors = [
				"linear-gradient(135deg, #f6d365 0%, #fda085 70%)",
				"linear-gradient(135deg, #6a3b6f 0%, #50272c 100%)",
				"linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
				"linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)"
			]
	
			return colors[i % 4];
		}
		const blocks = useRef(new Array(totalBlocks).fill(0).map((_, i) => i))

		const bgColors = useRef(blocks.current.map((i) => getColor(i)))
			
		const initialCoordinates = useRef(
			blocks.current.map((i) => getBlockCoordinates(i))
			
		)
		// console.log('%cinitialCoordinates', 'color: purple', initialCoordinates)
		const animate = useCallback(
			(index) => {
				// the index in order of id
				// index в порядке следования id
				const blockIndex = blocks.current.indexOf(index)
				// the block coordinates of other elementsField
				// координаты блока других блоков
				const blockCoordinate = initialCoordinates.current[blockIndex]
				// console.log('%cDATA', 'color: purple', blockCoordinate, initialCoordinates)
				return {
					x: index === movingBlockIndex ? movingBlock.x : blockCoordinate.x,
					y: index === movingBlockIndex ? movingBlock.y : blockCoordinate.y,
					scale: index === movingBlockIndex ? 1.1 : 1,
					zIndex: index === movingBlockIndex ? 10 : 1,
					immediate:
						movingBlockIndex === index
							? (n) => immediateMotionsProsp[n]
							: undefined
				};
			},
			[movingBlock, initialCoordinates, movingBlockIndex]
		)

		const [springs, api] = useSprings(blocks.current.length, animate)

	useEffect(() => {
		// we will save the actual id/index in movingBlockIndex
		// мы сохраним фактический id/index в индексе движущегося блока
		// Временное значение
		// const oldPosition = -1
		const oldPosition = blocks.current.indexOf(movingBlockIndex)
		if (oldPosition !== -1) {
			// coordinate travelled by the block from it's last position
			// координата, пройденная блоком от его последней позиции
			const coordinatesMoved = {
				// remember the grid generator function above ?
				// I created an array "initialCoordinates" using it for quick access
				// помните функцию генератора сетки, описанную выше
				// Я создал массив "начальные координаты", используя его для быстрого доступа
				x: movingBlock.x - initialCoordinates.current[oldPosition].x,
				y: movingBlock.y - initialCoordinates.current[oldPosition].y
			};

			// As we have width and height constant, for every block movement
			// in y direction we are actually moving 3 block in row.
			// we are ignoring the padding here, as its impact is so less
			// that you will not even notice
			// Поскольку ширина и высота у нас постоянные, при каждом перемещении блока
			// в направлении y мы фактически перемещаем 3 блока подряд.
			// мы игнорируем отступы, так как их влияние настолько незначительно
			//, что вы даже не заметите
			let y = Math.round(coordinatesMoved.y / 120)
			if (Math.abs(y) > 0.5) {
				y = y * blockInRow;
			}

			const x = Math.round(coordinatesMoved.x / 120)

			const newPosition = y + x + oldPosition
			// there will be cases when block is not moved enough
			// будут случаи, когда блок будет перемещен недостаточно
			if (newPosition !== oldPosition) {
				let newOrder = [...blocks.current]
				// swaping
				// замена местами
				const [toBeMoved] = newOrder.splice(oldPosition, 1)
				newOrder.splice(newPosition, 0, toBeMoved)
				blocks.current = newOrder
			}
		}

		// telling the spring to animate again
		// приказывая весне снова ожить

		api.start(animate);
	}, [api, animate, initialCoordinates, movingBlock, movingBlockIndex])


	return (
		<div className="draggable-component" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
			<div ref={parentRef}>
			{/* width={blockInRow * 120 + (blockInRow - 1) * 8} */}
			{springs.map((style, index) => {
					const blockIndex = blocks.current.indexOf(index)
					return (
						<BlockDev
						className={''}
							background={bgColors.current[index]}
							key={index}
							label={index}
							style={style}
							onMouseDown={(e) =>
								handleMouseDown(
									e,
									initialCoordinates.current[blockIndex],
									index
								)
							}
						/>
					)
				})}
			</div>
		</div>
	)
}


export default DraggableComponent;