import { createSlice } from '@reduxjs/toolkit'

const reportSlice = createSlice({
	name: 'report',
	initialState: {
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
	handleOpenDashboard,
	handleClickCharts,
	handleClickStatistics,

} = reportSlice.actions
export default reportSlice.reducer

