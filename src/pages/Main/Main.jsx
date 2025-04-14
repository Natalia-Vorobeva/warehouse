import { useState } from 'react';
import Aside from '../../components/Aside/Aside';
import Field from '../../components/Field/Field';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Main.scss';

function Main({
	handleClickButton, btn, db,
	onClickFooterLinkToDev,
	devMode,
	dbBlocks,
	handleOpenPopup,
	onClosePopupNewBlock,
	isOpenPopup,
	handleSubmit,
	disableNewBlock,
	isOpenNewBlock,
	handleDeleteBlock,
	handleInfoBlock,
	dataInfoPopupBlock,
	isOpenInfoPopupBlock,
	handleCloseInfoPopupUser,
	handleSubmitAddMoreInfoPopup,
	handleAddMoreInfoPopup,
	className,
	setBlockUserValues,
	setIdElement,
	elementsFieldDev,
	create,
	setCreate,
	dataProductsAndWaste
}) {

	const [visibleAside, setVisibleAside] = useState(false)

	function handleVisibleAside() {
		setVisibleAside(!visibleAside)
	}



	return (
		<div className="main">
			<Header btn={btn}
				handleClickButton={handleClickButton}
				btnText='ВЫХОД'
				isOpenNewBlock={isOpenNewBlock}
				onClosePopupNewBlock={onClosePopupNewBlock}
				dbBlocks={dbBlocks}
				disableNewBlock={disableNewBlock}
				handleDeleteBlock={handleDeleteBlock}
				isOpenPopup={isOpenPopup}
				handleOpenPopup={handleOpenPopup}
				handleSubmit={handleSubmit}
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

			<div className={`main__base ${devMode ? "main__base_grid-to-dev" : visibleAside ? "main__base_grid-with-aside" : "main__base_grid-without-aside"} `}>
				<Field
					devMode={devMode}
					elementsFieldDev={elementsFieldDev}
					create={create}
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