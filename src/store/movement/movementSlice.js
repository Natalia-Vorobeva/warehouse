import { createSlice } from '@reduxjs/toolkit'
// import { initialState } from './initialState'
// import { initialState } from './initialState'

const movementSlice = createSlice({
	name: 'movement',
	initialState: {
		create: false,
		currentId: '',
		isDragging: false,
		// пока не нужен upClass
		upClass: false,
		// element: {},
		fillField: {

		},
	},


	reducers: {
		handleCreate: (state, action) => {
			state.create = action.payload
		},
		// посмотреть, где нужно, а где нет currentId -
		// section, draganddrop
		setCurrentId: (state, action) => {
			state.currentId = action.payload			
		},
		setIsDragging: (state, action) => {
			state.isDragging = action.payload
		},
		setUpClass: (state, action) => {
			state.upClass = action.payload
		},
		// setElement: (state, action) => {
		// 	state.element = action.payload
		// 	console.log('%cstate.currentid', 'color: purple', state.element)
		// },
		handleUpClass: (state, action) => {

		},
		handleFillField: (state, action) => {
			state.fillField = action.payload
			// console.log('%cstate.fillField', 'color: purple', state.fillField )
		}
	}
})

export const {
	handleCreate,
	handleFillField,
	setIsDragging,
	setCurrentId,
	setUpClass,
	setElement
} = movementSlice.actions
export default movementSlice.reducer


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