import { useState } from 'react';
import Aside from '../../components/Aside/Aside';
import Field from '../../components/Field/Field';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Main.scss';

function Main({
	
	handleClickButton, 
	db,
	onClickFooterLinkToDev,
	devMode,
	dbBlocks,
	handleOpenPopup,
	onClosePopupNewBlock,
	handleSubmit,
	disableNewBlock,
	isOpenNewBlock,
	handleDeleteBlock,
	handleInfoBlock,
	handleCloseInfoPopupUser,
	handleSubmitAddMoreInfoPopup,
	handleAddMoreInfoPopup,
	className,
	setBlockUserValues,
	setIdElement,
	elementsFieldDev,
	dataProductsAndWaste
}) {

	const [visibleAside, setVisibleAside] = useState(false)

	function handleVisibleAside() {
		setVisibleAside(!visibleAside)
	}



	return (
		<div className="main">
			<Header 			

				handleClickButton={handleClickButton}
				btnText='ВЫХОД'
				isOpenNewBlock={isOpenNewBlock}
				onClosePopupNewBlock={onClosePopupNewBlock}
				dbBlocks={dbBlocks}
				disableNewBlock={disableNewBlock}
				handleDeleteBlock={handleDeleteBlock}
				handleOpenPopup={handleOpenPopup}
				handleSubmit={handleSubmit}
				handleInfoBlock={handleInfoBlock}
				handleCloseInfoPopupUser={handleCloseInfoPopupUser}
				handleSubmitAddMoreInfoPopup={handleSubmitAddMoreInfoPopup}
				handleAddMoreInfoPopup={handleAddMoreInfoPopup}
				className={className}
				setBlockUserValues={setBlockUserValues}
			/>

			<div className={`main__base ${devMode ? "main__base_grid-to-dev" : visibleAside ? "main__base_grid-with-aside" : "main__base_grid-without-aside"} `}>
				<Field
					devMode={devMode}
					elementsFieldDev={elementsFieldDev}
					dataProductsAndWaste={dataProductsAndWaste}

				/>
				<Aside devMode={devMode}
					db={db} visibleAside={visibleAside}
					handleClickButtonAside={handleVisibleAside}
					setIdElement={setIdElement}
				/>
			</div>
			<Footer onClick={onClickFooterLinkToDev} />

		</div>
	);
}

export default Main;