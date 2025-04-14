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

function Field({ devMode, elementsFieldDev, create,
	dataProductsAndWaste }) {

	const chapter = useSelector(reportSelectors.getChapter)

	// const layout = [
	// 	{ i: "a", x: 0, y: 0, w: 2, h: 1 },
	// 	{ i: "b", x: 2, y: 0, w: 2, h: 1 },
	// 	{ i: "c", x: 4, y: 0, w: 2, h: 1 },
	// 	{ i: "d", x: 6, y: 0, w: 2, h: 1 },
	// 	{ i: "e", x: 0, y: 2, w: 2, h: 1 }
	// ];
	// const [indicator, setIndicator] = useState('field__pallet_indicator')
	// console.log('%cDATA', 'color: purple', indicator)


	const [scaleUp, setScaleUp] = useState(true)

	function toggleScaleUp() {
		setScaleUp(!scaleUp)
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
										<div className="field__storage">
											<div className="field__col-1">
												<FieldElement className="field__placement bookmark__placement" text="Склад" subtext=" профиля" />
												<FieldElement className="field__placement" text="Склад " subtext=" мех.обработки" />
												<FieldElement className="field__placement" text="Склад" subtext=" алюминия" />
												{/* <FieldElement className="field__acceptance" text="Приемка" />
												<FieldElement className="field__delivery" text="Выдача" /> */}
											</div>
											<div className="field__warehouse">
												<Sections create={create} toggleScaleUp={toggleScaleUp} />
												<div className="field__container-bottom">
												<FieldElement className="field__acceptance" text="Приемка" />
												<FieldElement className="field__delivery" text="Выдача" />
												<FieldElement className="field__unformatted" text="Негабарит" />

												</div>
											</div>
											<div className="field__col-2">
												<FieldElement className="field__acceptance" text="Приемка" />
												<FieldElement className="field__delivery" text="Выдача" />
											</div>


										</div>
										:
										<Sections toggleScaleUp={toggleScaleUp} />
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