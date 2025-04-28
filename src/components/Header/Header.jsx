import { useSelector, useDispatch } from 'react-redux'
import { reportSelectors } from '../../store/report/reportSelectors.js'
import { authSelectors } from '../../store/auth/authSelectors.js'


import Button from '../../components/Button/Button';
import Grid from '../../components/Grid/Grid';
import BlockUser from '../BlockUser/BlockUser';

import './Header.scss';

function Header({	

	handleClickButton, 
	dbBlocks,
	disableNewBlock,
	onClosePopupNewBlock,
	handleOpenPopup,
	handleDeleteBlock,
	handleSubmit,
	handleInfoBlock,
	handleCloseInfoPopupUser,
	handleSubmitAddMoreInfoPopup,
	handleAddMoreInfoPopup,
	className,
	setBlockUserValues,
}) {

	const chapter = useSelector(reportSelectors.getChapter)
	const btnAuth = useSelector(authSelectors.getBtnAuth)

	return (
		<div className="header">
			{!chapter ?
				<div className="header__content">
					<div className="header__menu">
						<div className="header__signal">☼</div>
						<div className="header__ruler">┄</div>
						<div className="header__remark">▼</div>
					</div>
					<BlockUser
						disableNewBlock={disableNewBlock}
						dbBlocks={dbBlocks}
						onClosePopupNewBlock={onClosePopupNewBlock}
						handleDeleteBlock={handleDeleteBlock}
						handleSubmit={handleSubmit}
						handleOpenPopup={handleOpenPopup}
						handleInfoBlock={handleInfoBlock}
						handleCloseInfoPopupUser={handleCloseInfoPopupUser}
						handleSubmitAddMoreInfoPopup={handleSubmitAddMoreInfoPopup}
						handleAddMoreInfoPopup={handleAddMoreInfoPopup}
						className={className}
						setBlockUserValues={setBlockUserValues}
					/>
				</div>
				:
				null
			}

			<div className="header__button">
				{
					!btnAuth
						?
						<Button 
						handleClickButton={handleClickButton} 
						btnText='ВЫХОД' />
						:
						<Button className={"button__opacity"} />
				}
			</div>
		</div>
	);
}

export default Header;