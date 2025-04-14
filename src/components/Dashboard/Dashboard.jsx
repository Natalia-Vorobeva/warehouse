import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reportSelectors } from '../../store/report/reportSelectors.js'
import {
	handleOpenDashboard,
	handleClickCharts,
	handleClickStatistics,
	setChartComponent,
	setStatisticsComponent
} from '../../store/report/reportSlice.js'
import './Dashboard.scss'
import Chart from '../Chart/Chart'
import Statistics from '../Statistics/Statistics'

function Dashboard({ setIsOpenDashboard, dataProductsAndWaste, children }) {
	const subIceberg = 'Айсберг'
	const subSlim = 'Слим'
	const subOptima = 'Оптима'
	const subElegant = 'Элегант'
	const subModern = 'Модерн'
	// const listIceberg = keys.filter(str => str.includes(subIceberg))
	// const listSlim = keys.filter(str => str.includes(subSlim))
	// const listOptima = keys.filter(str => str.includes(subOptima))
	// const listElegant = keys.filter(str => str.includes(subElegant))
	// const listModern = keys.filter(str => str.includes(subModern))

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
	const title = useSelector(reportSelectors.getTitle)
	const chartComponent = useSelector(reportSelectors.getStatisticsChartComponent)
	const statisticsComponent = useSelector(reportSelectors.getStatisticsComponent)
	const [lineChart, setLineChart] = useState('')
	const [lineStatistics, setLineStatistics] = useState('')
	// sum()
	const dispatch = useDispatch()

	function handleClickChart(link) {
		dispatch(setChartComponent())
		dispatch(handleClickCharts(link))
		setLineChart(link)
		setLineStatistics('')
	}
	function handleClickStatistic(link) {
		dispatch(setStatisticsComponent())
		dispatch(handleClickStatistics(link))
		setLineChart('')
		setLineStatistics(link)
	}

	return (
		<div className="dashboard">
			<div className="dashboard__wrapper">
				<div className="dashboard__close" onClick={() => dispatch(handleOpenDashboard(''))}>
					<h3 className="dashboard__title">{title}</h3>
					<div className="dashboard__block-close">
						<marquee className="dashboard__marquee">
							<span className="dashboard__marquee-span">
								&#128642;
							</span> Что ни день, то
							<span className="dashboard__marquee-span">🚃</span>
							<span className="dashboard__marquee-span">🚃</span>
							<span className="dashboard__marquee-span">🚃</span>
							хороших новостей
						</marquee>
						{/* <span className="dashboard__marquee-span">	🚃</span> */}
						{/* <span className="dashboard__span"></span> */}
					</div>
					<p className="dashboard__img">close</p>
				</div>
				<div className="dashboard__container">
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
				</div>
			</div>
		</div >
	);
}


export default Dashboard;