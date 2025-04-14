import { combineReducers } from '@reduxjs/toolkit'
// import calculatorSlice from './calculator/calculatorSlice'
// import formEntrySlice from './formEntry/formEntrySlice'
import authSlice from './auth/authSlice'
import reportSlice from './report/reportSlice'
import movementSlice from './movement/movementSlice'
// import formOrderValidationSlice from './formOrderValidation/formOrderValidation'

export const rootReducer = combineReducers({
  auth: authSlice,
	report: reportSlice,
	movement: movementSlice
})