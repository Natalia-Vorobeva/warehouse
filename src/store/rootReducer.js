import { combineReducers } from '@reduxjs/toolkit'
import calculatorSlice from './calculator/calculatorSlice'
import formEntrySlice from './formEntry/formEntrySlice'
import authSlice from './auth/authSlice'
import orderSlice from './order/orderSlice'
import formOrderValidationSlice from './formOrderValidation/formOrderValidation'

export const rootReducer = combineReducers({
  auth: authSlice,
})