import { createSlice } from '@reduxjs/toolkit'
// import { initialState } from './initialState'

const reportSlice = createSlice({
	name: 'userDefinedFunctionsSlice',
	initialState: {
		isOpenPopupNewBlock: false,
		isOpenInfoPopupBlock: false,
		dataInfoPopupBlock: {}
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
			console.log('%cstate.dataInfoPopupBlock', 'color: purple', state.dataInfoPopupBlock)
		}	

	}
})

export const {
	setIsOpenPopupNewBlock, setIsOpenInfoPopupBlock, setDataInfoPopupBlock

} = reportSlice.actions
export default reportSlice.reducer


// const formEntrySlice = createSlice({
//   name: 'formEntry',
//   initialState: {
//     chapter: false,
//   },
//   reducers: {
//     handleClickEntry: state => {
//       state.formView = 'entry'
//     },
//     handleClickRecovery: state => {
//       state.formView = 'recovery'
//     },
//     handleClickRegistration: state => {
//       state.formView = 'registration'
//     },
//   },
// })

// export const { handleClickEntry, handleClickRecovery, handleClickRegistration } = formEntrySlice.actions
// export default formEntrySlice.reducer