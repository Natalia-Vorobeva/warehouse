import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './initialState'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		// !!! изменить is Loggedin на false
		isLoggedIn: true,
		btnAuth: true,
		isOpenPopupAuth: false,

	},
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload
		},
		setBtnAuth: (state, action) => {
			state.btnAuth = action.payload
		},
		setIsOpenPopupAuth: (state, action) => {
			state.isOpenPopupAuth = action.payload
		},
		// resetSignUpError: state => {
		//   state.signUpError = null
		//   state.signUpStatus = 'initial'
		// },
		// setUser: (state, action) => {
		//   state.user = action.payload
		// },
	},
})

export const { setIsLoggedIn, setBtnAuth, setIsOpenPopupAuth } = authSlice.actions

export default authSlice.reducer