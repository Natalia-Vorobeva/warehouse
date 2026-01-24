import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Sections from '../../components/Sections/Sections';
import './Main.scss';

// Main.jsx
function Main({
  dbBlocks,
  handleOpenPopup,
  handleSubmit,
  disableNewBlock,
  handleDeleteBlock,
  handleInfoBlock,
  handleCloseInfoPopupUser,
  handleAddMoreInfoPopup,
  handleCloseNewBlockPopup, // ← Добавляем
  className,
	isOpenNewBlock,
  elementsField
}) {

  return (
    <div className="main">
      <Header
        dbBlocks={dbBlocks}
				isOpenPopup={isOpenNewBlock}
				onClose={handleCloseNewBlockPopup}
        disableNewBlock={disableNewBlock}
        handleDeleteBlock={handleDeleteBlock}
        handleOpenPopup={handleOpenPopup}
        handleSubmit={handleSubmit}
        handleInfoBlock={handleInfoBlock}
        handleCloseInfoPopupUser={handleCloseInfoPopupUser}
        handleAddMoreInfoPopup={handleAddMoreInfoPopup}
        handleCloseNewBlockPopup={handleCloseNewBlockPopup} // ← Передаем дальше
        className={className}
      />
      <div className="main__base">
        <Sections />
      </div>
      <Footer/>
    </div>
  );
}

export default Main;