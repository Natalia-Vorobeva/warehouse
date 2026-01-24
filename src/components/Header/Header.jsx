import BlockUser from '../BlockUser/BlockUser';
import './Header.scss';

// Header.js
function Header({
  dbBlocks,
  disableNewBlock,
  handleOpenPopup,
  handleDeleteBlock,
  handleSubmit,
  handleInfoBlock,
  handleCloseInfoPopupUser,
  handleAddMoreInfoPopup,
  handleCloseNewBlockPopup, // ← Получаем
  className,
}) {

  return (
    <div className="header">
      <div className="header__content">
        <div className='rack'>
          <p className='item'></p>
          <p className='item'></p>
        </div>
        <BlockUser
          disableNewBlock={disableNewBlock}
          dbBlocks={dbBlocks}
          handleDeleteBlock={handleDeleteBlock}
          handleSubmit={handleSubmit}
          handleOpenPopup={handleOpenPopup}
          handleInfoBlock={handleInfoBlock}
          handleCloseInfoPopupUser={handleCloseInfoPopupUser}
          handleAddMoreInfoPopup={handleAddMoreInfoPopup}
          handleCloseNewBlockPopup={handleCloseNewBlockPopup} // ← Передаем дальше
          className={className}
        />
      </div>
    </div>
  );
}

export default Header;