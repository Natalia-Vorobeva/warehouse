const getChapter = state => state.report.chapter
const getDashboard = state => state.report.dashboard
const getTitle = state => state.report.title
const getChartTabs = state => state.report.chartTabs
const getStatisticsTabs = state => state.report.statisticsTabs
const getStatisticsChartComponent = state => state.report.chartComponent
const getStatisticsComponent = state => state.report.statisticsComponent

export const reportSelectors = {
	getChapter,
	getDashboard,
	getTitle,
	getChartTabs,
	getStatisticsTabs,
	getStatisticsChartComponent,
	getStatisticsComponent
}