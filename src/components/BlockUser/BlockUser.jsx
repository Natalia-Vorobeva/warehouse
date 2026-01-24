import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCreate } from '../../store/movement/movementSlice.js'
import { setIsOpenPopupNewBlock, setIsOpenInfoPopupBlock } from '../../store/userDefinedFunctions/userDefinedFunctionsSlice'
import { userDefinedFunctionsSelectors } from '../../store/userDefinedFunctions/userDefinedFunctionsSelectors.js'

import PopupUserBlock from '../PopupUserBlock/PopupUserBlock'
import AddButton from '../AddButton/AddButton'
import PopupNewBlockUser from '../PopupNewBlockUser/PopupNewBlockUser'

import './BlockUser.scss'
import './BlockUserDataStyle.scss'

// BlockUser.js
function BlockUser({
  handleDeleteBlock,
  dbBlocks,
  disableNewBlock,
  handleSubmit,
  handleInfoBlock,
  className,
  handleCloseInfoPopupUser,
  handleAddMoreInfoPopup,
  handleCloseNewBlockPopup, // ← Получаем
}) {

  const dispatch = useDispatch()
  const isOpenPopupNewBlock = useSelector(userDefinedFunctionsSelectors.getIsOpenPopupNewBlock)
  const isOpenInfoPopupBlock = useSelector(userDefinedFunctionsSelectors.getIsOpenInfoPopupBlock)

  const euroRef = useRef(null)

  function handleOpenPopupNewBlock() {
    dispatch(setIsOpenPopupNewBlock(true))    // ← Открываем попап добавления
    dispatch(setIsOpenInfoPopupBlock(false))  // ← Закрываем попап информации
  }

  return (
    <div className="block-user">
      <div className="block-user__header">
        <div className="block-user__list">
          {
            dbBlocks.map((item, index) => (
              <div key={item.id} className='block-user__item' data-standard={index < 4}>
                <div className="block-user__overlay"></div>
                <div className={`block-user__standard block-user__standard_type_${item.type} ${item.class}`}>
                  <div className="block-user__overlay"></div>
                  <div ref={euroRef} id='europallet' onClick={() => dispatch(setCreate(true))} className={`block-user__col-1 block-user__col-1_type}`}>
                  </div>
                  <div className={`block-user__col-2 block-user__col-2`}>
                    <p
                      onClick={() => handleDeleteBlock(item.id)}
                      className='block-user__delete'>
                      {item.button}
                    </p>
                    <p className="block-user__info"
                      onClick={() => handleInfoBlock(item.id)}>
                      🛈
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
          <AddButton
            disableNewBlock={disableNewBlock}
            onClick={handleOpenPopupNewBlock}
          />
        </div>
        <div className="block-user__title-wrapper">
          <h1 className="block-user__title">warehouse</h1>
        </div>
      </div>

      {/* Popup информации о блоке - открывается по клику на 🛈 */}
      <PopupUserBlock
        onAddComment={handleAddMoreInfoPopup}
        isOpen={isOpenInfoPopupBlock}
        onClose={handleCloseInfoPopupUser}
      />

      {/* Popup добавления нового блока - открывается по клику на AddButton */}
      <PopupNewBlockUser
        title={"Новый "}
        btnText='Сохранить'
        isOpenPopup={isOpenPopupNewBlock}
        handleSubmit={handleSubmit}
        onClose={handleCloseNewBlockPopup} // ← Добавляем onClose
      />
    </div>
  );
}

export default BlockUser;