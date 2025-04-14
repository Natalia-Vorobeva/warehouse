import './Chart.scss'
import { useSelector, useDispatch } from 'react-redux'
// import { handleClickCharts } from '../../store/report/reportSlice.js'
import { reportSelectors } from '../../store/report/reportSelectors.js'


function Chart({ chart, chartIceberg, chartTLine }) {

	const dispatch = useDispatch()
	const chartTabs = useSelector(reportSelectors.getChartTabs)
	// const handleIsOpenDashboard = () => dispatch(handleClickCharts(title))

	return (
		<div className="chart">
			initialChart
			{
				chartTabs.chart ? <div className="statistics">chart</div> : null
			}
			{
				chartTabs.iceberg ? <div className="iceberg">chart-iceberg</div> : null
			}
			{
				chartTabs.tline &&
				<div className="tline">tline</div>
			}

		</div>
	);
}

export default Chart;