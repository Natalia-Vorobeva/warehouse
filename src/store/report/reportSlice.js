import { createSlice } from '@reduxjs/toolkit'
// import { initialState } from './initialState'

const reportSlice = createSlice({
	name: 'report',
	initialState: {
		chapter: false,
		dashboard: false,
		title: '',
		chartComponent: false,
		statisticsComponent: false,
		chartTabs: {
			chart: false,
			iceberg: false,
			tline: false
		},
		statisticsTabs: {
			statistics: false,
			iceberg: false,
			tline: false
		}
	},
	reducers: {
		handleClickWarehouseButton: state => {
			state.chapter = false
		},
		handleClickWorkshopButton: state => {
			state.chapter = true
		},
		handleOpenDashboard: (state, action) => {
			state.dashboard = !state.dashboard
			state.title = action.payload
		},
		setChartComponent: (state, action) => {
			state.chartComponent = true
			state.statisticsComponent = false
		},
		setStatisticsComponent: (state, action) => {
			state.chartComponent = false
			state.statisticsComponent = true
		},
		handleClickCharts: (state, action) => {
			let link = action.payload
			let tabs = state.chartTabs			
			Object.keys(tabs).forEach((v) => {
			tabs[v] = false
				tabs[link] = true
			})
			state.chartTabs = tabs
		},
		handleClickStatistics: (state, action) => {
			let link = action.payload
			let tabs = state.statisticsTabs			
			Object.keys(tabs).forEach((v) => {
			tabs[v] = false
				tabs[link] = true
			})
			state.statisticsTabs = tabs
		}

	}
})

export const {
	setTitle,
	setChartComponent,
	setStatisticsComponent,
	handleClickWarehouseButton,
	handleClickWorkshopButton,
	handleOpenDashboard,
	handleClickCharts,
	handleClickStatistics,

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