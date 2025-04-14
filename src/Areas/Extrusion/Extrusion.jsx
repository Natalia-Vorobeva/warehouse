import { useSelector, useDispatch } from 'react-redux'
import { reportSelectors } from '../../store/report/reportSelectors.js'
import { handleClickCharts, setChartComponent } from '../../store/report/reportSlice.js'

import Dashboard from '../../components/Dashboard/Dashboard'
import './Extrusion.scss';

function Extrusion() {
	const dispatch = useDispatch()
	const chartComponent = useSelector(reportSelectors.getStatisticsChartComponent)
	const statisticsComponent = useSelector(reportSelectors.getStatisticsComponent)
	const [lineChart, setLineChart] = useState('')
	const [lineStatistics, setLineStatistics] = useState('')

	const linksChart = {
		chart: 'График',
		iceberg: 'Айсберг',
		tline: 'T-линия',
		third: 'Третья'
	}
	const linksStatistics = {
		statistics: 'Статистика',
		iceberg: 'Айсберг',
		tline: 'T-линия',
		third: 'Третья'
	}

	function handleClickChart(link) {
		dispatch(setChartComponent())
		dispatch(handleClickCharts(link))
		setLineChart(link)
		setLineStatistics('')
		console.log('%cDATA', 'color: purple', link)
	}

		function handleClickStatistic(link) {
			dispatch(setStatisticsComponent())
			dispatch(handleClickStatistics(link))
			setLineChart('')
			setLineStatistics(link)
		}

	return (
		// <div className="extrusion">
		<Dashboard  >
			<div className="extrusion">
			<p>child</p>
			
			
			
			{/* <div className="dashboard__chart">
				{
					Object.entries(linksChart).map(([key, value]) => {
						return (
							<div key={key} onClick={() => handleClickChart(key)}
								className={`workshop__${key}`}
							>{value}</div>
						)
					})
				}
			</div>
			<div className="dashboard__aside">

				<div className="dashboard__chart">
					{
						Object.entries(linksChart).map(([key, value]) => {
							// console.log('%cDkey', 'color: purple', key)
							return (
								<div key={key} onClick={() => handleClickChart(key)}
									className={`workshop__${key}`}
								>{value}</div>
							)
						})
					}
				</div>
				<div className="dashboard__statistics">
					{
						Object.entries(linksStatistics).map(([key, value]) => {
							// console.log('%cDkey', 'color: purple', key)
							return (
								<div key={key} onClick={() => handleClickStatistic(key)}
									className={`workshop__${key}`}
								>{value}</div>
							)
						})
					}
				</div>
			</div>
			<div className="dashboard__field">
				{
					chartComponent ?
						<Chart
							dataProductsAndWaste={dataProductsAndWaste}
							lineChart={lineChart}
						/>
						:
						statisticsComponent &&
						<Statistics
							dataProductsAndWaste={dataProductsAndWaste}
							lineStatistics={lineStatistics}
						/>
				}
			</div>
			{
				chartComponent ?
					<Chart
						dataProductsAndWaste={dataProductsAndWaste}
						lineChart={lineChart}
					/>
					:
					statisticsComponent &&
					<Statistics
						dataProductsAndWaste={dataProductsAndWaste}
						lineStatistics={lineStatistics}
					/>
			} */}
			</div>
		</Dashboard >
	)
}

export default Extrusion;