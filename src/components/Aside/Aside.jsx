import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { reportSelectors } from '../../store/report/reportSelectors.js'

import {
	handleClickWarehouseButton,
	handleClickWorkshopButton
} from '../../store/report/reportSlice.js'


// import InputFieldDB from '../InputFieldDB/InputFieldDB';

import arrayFieldBlocks from "../../constants/arrayFieldBlocks.js"

import imgSearch from "../../assets/images/search.png"

// import 
import './Aside.scss';
import AddButton from '../AddButton/AddButton.jsx';
import Button from '../Button/Button.jsx';
import Image from '../Image/Image.jsx';
import Tooltip from '../Tooltip/Tooltip.jsx';

function Aside({
	handleClickButtonAside,
	visibleAside,
	db,
	devMode,
	setIdElement,
}) {

	const dispatch = useDispatch()
	const chapter = useSelector(reportSelectors.getChapter)
	const handleClickWarehouse = () => dispatch(handleClickWarehouseButton())
	const handleClickWorkshop = () => dispatch(handleClickWorkshopButton())


	// option select в режиме user
	const options = ["Option 1", "Option 2", "Option 3", "Option 4"]

	return (
		<div className="aside">
			{/* <InputFieldDB db={db} /> */}
			<div className='aside__aside-arrow' onClick={handleClickButtonAside}>
				{devMode ? "" : visibleAside ? "→" : "←"}
			</div>
			<div className={`aside__switch ${visibleAside ? 'aside__switch_style_flex' : ''}`}>
				<div onClick={() => handleClickWarehouse()} className={`aside__button aside__button_warehouse-switch_${!chapter ? "disabled" : ''}`}>С</div>
				<div onClick={() => handleClickWorkshop()} className={`aside__button aside__button_workshop-switch_${chapter ? "disabled" : ''}`}>Ц</div>
			</div>
			{
				!devMode && !visibleAside
					?
					<>
						<div className="aside__menu-zone">

						</div>
						<div className="aside__menu">
							<div className="aside__item">
								<Image className='image__search' src={imgSearch} />
							</div>
						</div>
					</>
					:

					devMode
						?
						<></>
						:
						<div className="aside__select">
							{/* изменить стиль в popup входа на выпадающий список */}
							<select className="aside__search" id="aside-select">
								{
									options.map((item, index) => (
										<option className="aside__option" key={index} value={item}>{item}</option>
									))
								}
							</select>
							<span className="focus"></span>
						</div>
			}

			{
				devMode
					?
					<div className="aside__blocks">
						{
							arrayFieldBlocks.map(obj => {
								return (
									<div
										key={obj.id}
										className="aside__block">
										<div onClick={() =>
											setIdElement(obj.id)}
											className={obj.block}></div>
										<Tooltip />
									</div>
								)
							})
						}
						<AddButton onClick={() =>
							setIdElement('1000')} className="aside__block" />
					</div>
					:
					<></>

			}
		</div>
	)
}

export default Aside;