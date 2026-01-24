import { createSlice } from '@reduxjs/toolkit'

const userDefinedFunctionsSlice = createSlice({
  name: 'userDefinedFunctions',
  initialState: {
    isOpenPopupNewBlock: false,     // ← Для попапа добавления нового блока
    isOpenInfoPopupBlock: false,    // ← Для попапа информации о блоке
    dataInfoPopupBlock: null        // ← Данные для попапа информации
  },
  reducers: {
    setIsOpenPopupNewBlock: (state, action) => {
      state.isOpenPopupNewBlock = action.payload
    },
    setIsOpenInfoPopupBlock: (state, action) => {
      state.isOpenInfoPopupBlock = action.payload
    },
    setDataInfoPopupBlock: (state, action) => {
      state.dataInfoPopupBlock = action.payload
    },
    // Дополнительный редьюсер для сброса всех состояний
    resetAllPopupStates: (state) => {
      state.isOpenPopupNewBlock = false
      state.isOpenInfoPopupBlock = false
      state.dataInfoPopupBlock = null
    }
  }
})

export const {
  setIsOpenPopupNewBlock,
  setIsOpenInfoPopupBlock,
  setDataInfoPopupBlock,
  resetAllPopupStates
} = userDefinedFunctionsSlice.actions

export default userDefinedFunctionsSlice.reducer