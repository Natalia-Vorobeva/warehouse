import { useEffect, useRef, useCallback, useState, useLayoutEffect } from 'react'
import { useSprings } from "react-spring"
import styled from "styled-components";
// import styled from "styled-components"

import elementsFieldDev from '../../constants/elementsField';

import BlockDev from '../BlockDev/BlockDev'

import useDraggable from '../../hooks/useDraggable'

import './Grid.scss'

const Wrapper = styled.div`
  ${({ width }) => width && `width: ${width}%;`} 	
  border: 1px solid red;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

function Grid({ }) {
	const [elementsFieldDev, setElementsFieldDev] = useState(JSON.parse(localStorage.getItem('elementsFieldDev')))
	const [width, setWidth] = useState(window.innerWidth)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	// получаем данные и размеры блоков
	const [counterDataColRow, setCounterDataColRow] = useState({})
	const [sizeBlocks, setSizeBlocks] = useState([])
	const [xy, setXy] = useState([])
	console.log('%cxy', 'color: purple', sizeBlocks)

	useEffect(() => {
		const handleResize = (event) => {
			setWidth(event.target.innerWidth)
		};

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		};
	}, [width])
	useLayoutEffect(() => {
		if (parentRef.current) {
			setDimensions({
				width: parentRef.current.offsetWidth,
				height: parentRef.current.offsetHeight
			})
		}
	}, [width])
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
	useEffect(() => {
		let block = []
		elementsFieldDev.forEach((el) => {
			let obj = {
				width: dimensions.width * el.wPercent / 100,
				height: dimensions.height * el.hPercent / 100
			}
			block.push(obj)
			setSizeBlocks(block)
		},)
	}, [dimensions])
	useEffect(() => {
		let coord = []
		let clipboardWidth = 0
		let clipboardHeight = 0

		elementsFieldDev.forEach((el) => {
			let obj = {
				x: clipboardWidth,
				y: clipboardHeight
			}
			clipboardWidth = dimensions.width * el.wPercent / 100
			clipboardHeight = dimensions.height * el.hPercent / 100
			coord.push(obj)
		})
		setXy(coord)
	}, [dimensions])
	useEffect(() => {
		let counter = {
			x: 0,
			y: 0,
			percw: 0,
			perch: 0,
			width: 0,
			height: 0,
			column: 0,
			row: 0
		}
		elementsFieldDev.forEach((el) => {
			if (el.position === 'row') {
				counter.row++
				counter.percw += el.wPercent
				counter.perch += el.hPercent
				counter.x += (dimensions.width * el.wPercent / 100)
				counter.y += dimensions.height * el.hPercent / 100
				return
			} else {
				counter.column++
				counter.percw += el.wPercent
				counter.perch += el.hPercent
				counter.x += (dimensions.width * el.wPercent / 100)
				counter.y += dimensions.height * el.hPercent / 100
			}
			setCounterDataColRow(counter)
		})
	}, [dimensions])

	// получаем общее количество el, существующих в field
	// function objectLength(elementsFieldDev) {
	// 	let result = 0;
	// 	for (let obj in elementsFieldDev) {
	// 		if (elementsFieldDev.hasOwnProperty(obj)) {
	// 			result++;
	// 		}
	// 	}
	// 	return result;
	// }

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
	
	let totalBlocks = elementsFieldDev.length
	const immediateMotionsProsp = {
		x: true,
		y: true
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
	const getBlockCoordinates = (index) => {
		const col = Math.floor(index % blockInRow)
		const row = Math.floor(index / blockInRow)
		// let xx = xy.map((i) => i.x)
		let a = sizeBlocks.map(i => i.width)

		// здесь расчет ширины колонки
		return { x: col * a, y: 200 * row }
		// return { x: col * a[index], y: a[index] * row }
	}
	const blocks = useRef(new Array(totalBlocks).fill(0).map((_, i) => i))
	const bgColors = useRef(blocks.current.map((i) => getColor(i)))	
	
	// const blockInRow = elementsFieldDev.length
	// const [counterDataColRow, setCounterDataColRow] = useState({})
	// const [sizeBlocks, setSizeBlocks] = useState([])
	// const [xy, setXy] = useState([])
	// console.log('%cDATA', 'color: purple', counterDataColRow)	

	function getCoordinates(i, index) {
		// let fish = [ "piranha", "barracuda", "koi", "eel" ];
		// Splice a new item number into index position 1
		let x = xy.splice(index, i, xy[index]);
		return x

		// [ 'piranha', 'manta ray', 'barracuda', 'koi', 'eel' ]
		// const col = counterDataColRow.column
		// const row = 1
		// i = {
		// 	x:  xy[i].x,
		// 	y: xy[i].y
		// }
		// let data = xy
		// console.log('%c xy[i].x', 'color: purple',  data[i])
		// let xcoord = data[i].x
		// let ycoord = data[i].y
		// console.log('%cDATA', 'color: purple', i, xy[i].x, x, sizeBlocks)
		// data.map(item => {
		// 	console.log('%cDATAitem', 'color: purple', item)
		// 	return item})
		// 	return data
		//  return { x: 20, y: 50}
		// console.log('%cDATA', 'color: purple', i)


		// return {
		// 	x: xcoord,
		// 	y: y
		// }
	}
	
	
	const initialCoordinates = useRef(
		blocks.current.map((i) => getBlockCoordinates(i))
	)
	
	// console.log('%cinitialCoordinates', 'color: purple', initialCoordinates)

	// const [counterDataColRow, setCounterDataColRow] = useState({})
	// const [sizeBlocks, setSizeBlocks] = useState([])
	// const [xy, setXy] = useState([])
	// console.log('%ccounterDataColRow, sizeBlocks, xy', 'color: purple', counterDataColRow, sizeBlocks, xy)

	const animate = useCallback(
		(index) => {
			// const blockIndex = xy.indexOf(index) 
			const blockIndex = blocks.current.indexOf(index)

			// index в порядке следования id
			// the block coordinates of other elementsField
			// координаты блока других elementsField
			const blockCoordinate = initialCoordinates.current[blockIndex] // the block coordinates of other 


			return {
				x: index === movingBlockIndex ? movingBlock.x : blockCoordinate.x,
				y: index === movingBlockIndex ? movingBlock.y : blockCoordinate.y,
				scale: index === movingBlockIndex ? 1.1 : 1,
				zIndex: index === movingBlockIndex ? 10 : 1,
				immediate:
					movingBlockIndex === index
						? (n) => immediateMotionsProsp[n]
						: undefined
			}
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
				y = y * counterDataColRow;
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
		<div className="grid" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
			<Wrapper className="grid__wrapper" ref={parentRef} >
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
			</Wrapper>
		</div>
	)
}


export default Grid;