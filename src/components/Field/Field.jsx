// import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reportSelectors } from '../../store/report/reportSelectors.js'

import FieldElement from '../FieldElement/FieldElement'

import './Field.scss'
import Form from '../Form/Form'
import Grid from '../Grid/Grid'
import { useState } from 'react'
import DraggableComponent from '../DraggableComponent/DraggableComponent'
import ContextMenu from '../ContextMenu/ContextMenu'
import Sections from '../Sections/Sections'
import Workshop from '../Workshop/Workshop'
import FieldElementContent from '../FieldElementContent/FieldElementContent.jsx'

function Field({
	devMode,
	dataProductsAndWaste
}) {

	const chapter = useSelector(reportSelectors.getChapter)
	const [scaleUp, setScaleUp] = useState(true)
	const [gridStyleLeft, setGridStyleLeft] = useState('')
	const [gridStyleRight, setGridStyleRight] = useState('')
	const [gridStyleBottom, setGridStyleBottom] = useState('')

	function toggleScaleUp(data) {
		if (data == 'Склад профиля' || data === 'Склад мех. обработки' || data === 'Склад алюминия' || data.includes('Отходы')) {
			if (gridStyleLeft == '') {
				setGridStyleLeft('_style-left')
				setGridStyleRight('')
				setGridStyleBottom('')
			} else {
				setGridStyleLeft('')
			}
		} else if (data.includes('Приемка-s') || data.includes('выдача-s') || data.includes('Негабарит')) {
			if (gridStyleBottom == '') {
				setGridStyleBottom('_style-bottom')
				setGridStyleLeft('')
				setGridStyleRight('')
			} else {
				setGridStyleBottom('')
			}
		} else if (data.includes('Приемка-m') || data.includes('выдача-m')) {
			if (gridStyleRight == '') {
				setGridStyleRight('_style-right')
				setGridStyleLeft('')
				setGridStyleBottom('')
			} else {
				setGridStyleRight('')
			}
		}
	}
	function toggleScale() {
		setScaleUp(!scaleUp)
		setGridStyleLeft('')
		setGridStyleRight('')
		setGridStyleBottom('')
	}

	return (
		<div className="field">
			{
				!devMode
					?
					<div className="field__container">
						{
							chapter
								?
								<Workshop dataProductsAndWaste={dataProductsAndWaste} />
								:
								<div className="field__field-storage">
									{scaleUp
										?
										<div className={`field__storage field__storage${gridStyleLeft}${gridStyleRight}`}>

											<div className="field__col-1">
												<FieldElementContent
													name='Отходы'
													toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__placement" text="Отходы" />
												<FieldElementContent
													name='Склад алюминия'
													toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__placement" text="Склад" subtext=" алюминия" />
												<FieldElementContent
													name='Склад мех. обработки'
													toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__placement" text="Склад" subtext=" мех.обработки" />
												<FieldElementContent
													name='Склад профиля'
													toggleScaleUp={toggleScaleUp} className="field__placement" optionalClassName='' text="Склад" subtext=" профиля" />
											</div>
											<div className={`field__warehouse field__warehouse${gridStyleBottom}`}>
												<Sections toggleScale={toggleScale} />
												<div className="field__container-bottom">
													{/* <FieldElement toggleScaleUp={toggleScaleUp} className="field__delivery" optionalClassName='center' text="выдача-s" /> */}
													<FieldElementContent
														name='Выдача-s'
														toggleScaleUp={toggleScaleUp} className="field__delivery" optionalClassName='center' text="Выдача-s" />
													{/* <FieldElement toggleScaleUp={toggleScaleUp} className="field__acceptance" optionalClassName='center' text="Приемка-s" /> */}
													<FieldElementContent
														name='Приемка-s'
														toggleScaleUp={toggleScaleUp} className="field__acceptance" optionalClassName='center' text="Приемка-s" />
													<FieldElementContent
														name='Негабарит'
														id='informatted' toggleScaleUp={toggleScaleUp} optionalClassName='center' className="field__unformatted" text="Негабарит" />
													{/* <FieldElement id='informatted' toggleScaleUp={toggleScaleUp} optionalClassName='center' className="field__unformatted" text="Негабарит" /> */}
												</div>
											</div>
											<div className="field__col-2">
												{/* <FieldElement toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__acceptance" text="Приемка-m" /> */}
												<FieldElementContent
													// name='Приемка-m'
													toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__acceptance" text="Приемка-m" />
												{/* <FieldElement toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__delivery" text="выдача-m" /> */}
												<FieldElementContent
													// name='Выдача-m'
													toggleScaleUp={toggleScaleUp} optionalClassName='' className="field__delivery" text="Выдача-m" />
											</div>
										</div>
										:
										<Sections toggleScale={toggleScale} />
									}
								</div>

						}
					</div>

					:
					<div className="field__dev">
						<Grid
						/>
					</div>
			}
		</div >
	);
}

export default Field;

{/* <div className={`field__pallet `}>
	<div className={`${indicator}`}></div>
</div> */}
{/* <DraggableComponent className="draggable-component"/> */ }

{/* разметка поля user field - зона хранения*/ }
{/* <div className="field__lines">
							{
								data.map(function (item, index) {
									return <p
										key={index}
										// возвращает индекс
										onClick={() => handleClick(item.id)}
										// style={{ color: 'red' }}
										className={`field__line ${item.expanded ? 'size' : ''}`}>{item.name}</p>
								}
								)
							}

						</div> */}
{/* <div className="field__sections">
							{
								data.map(function (item, index) {
									return <p
										key={index}
										className={`field__section field__section_${item.expanded ? 'size' : ''}`}
										// возвращает индекс
										onClick={() => handleClick(item.id)}>
									</p>
								}
								)
							}
						</div> */}

{/* <div className="field__user"> */ }

{/* <div className={`field__pallet `}>
	<div className={`${indicator}`}></div>
</div> */}
{/* <DraggableComponent className="draggable-component"/> */ }

{/* разметка поля user field - зона хранения*/ }
{/* <div className="field__lines">
							{
								data.map(function (item, index) {
									return <p
										key={index}
										// возвращает индекс
										onClick={() => handleClick(item.id)}
										// style={{ color: 'red' }}
										className={`field__line ${item.expanded ? 'size' : ''}`}>{item.name}</p>
								}
								)
							}

						</div> */}
{/* <div className="field__sections">
							{
								data.map(function (item, index) {
									return <p
										key={index}
										className={`field__section field__section_${item.expanded ? 'size' : ''}`}
										// возвращает индекс
										onClick={() => handleClick(item.id)}>
									</p>
								}
								)
							}
						</div> */}