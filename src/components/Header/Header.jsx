import { useSelector, useDispatch } from 'react-redux'	
import { reportSelectors } from '../../store/report/reportSelectors.js'

import Button from '../../components/Button/Button';
import Grid from '../../components/Grid/Grid';
import BlockUser from '../BlockUser/BlockUser';

import './Header.scss';

function Header({
	handleClickButton, btn,
	isOpenNewBlock,
	dbBlocks,
	disableNewBlock,
	onClosePopupNewBlock,
	isOpenPopup,
	handleOpenPopup,
	handleDeleteBlock,
	handleSubmit,
	handleInfoBlock,
	dataInfoPopupBlock,
	isOpenInfoPopupBlock,
	handleCloseInfoPopupUser,
	handleSubmitAddMoreInfoPopup,
	handleAddMoreInfoPopup,
	className,
	setBlockUserValues,
	setCreate
}) {

	const chapter = useSelector(reportSelectors.getChapter)

	return (
		<div className="header">
			{!chapter ? 
			<div className="header__content">			
			<div className="header__menu">
			<div className="header__signal">☼</div>
			<div className="header__ruler">┄</div>
			<div className="header__remark">▼</div>
			<div className="header__remark">select по зонам 100%</div>
		</div>
		<BlockUser
			disableNewBlock={disableNewBlock}
			dbBlocks={dbBlocks}
			isOpen={isOpenNewBlock}
			onClosePopupNewBlock={onClosePopupNewBlock}
			handleDeleteBlock={handleDeleteBlock}
			handleSubmit={handleSubmit}
			isOpenPopup={isOpenPopup}
			handleOpenPopup={handleOpenPopup}
			handleInfoBlock={handleInfoBlock}
			dataInfoPopupBlock={dataInfoPopupBlock}
			isOpenInfoPopupBlock={isOpenInfoPopupBlock}
			handleCloseInfoPopupUser={handleCloseInfoPopupUser}
			handleSubmitAddMoreInfoPopup={handleSubmitAddMoreInfoPopup}
			handleAddMoreInfoPopup={handleAddMoreInfoPopup}
			className={className}
			setBlockUserValues={setBlockUserValues}
			setCreate={setCreate}
		/>
		</div>
		:
		null
			}
			
			<div className="header__button">
				{
					!btn
						?
						<Button handleClickButton={handleClickButton} btnText='ВЫХОД' />
						:
						<Button className={"button__opacity"} />
				}
			</div>
		</div>
	);
}

export default Header;