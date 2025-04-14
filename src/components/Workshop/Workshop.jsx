import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Workshop.scss'
import Dashboard from '../Dashboard/Dashboard'
import { reportSelectors } from '../../store/report/reportSelectors.js'
import { handleOpenDashboard } from '../../store/report/reportSlice.js'

function Workshop({ dataProductsAndWaste }) {
	const areasSouth = {
		warehouse: 'Склад',
		mechanicalWarehouse: 'Мех.обработка(склад)',
		injection: 'Литьё',
		mechanical: 'Мех.обработка',
		cnc: 'ЧПУ'
	}
	const areasEquator = {
		millingMachine: 'Фреза',
		processing: 'Обработка',
		assembling: 'Сборка',
		painting: 'Покраска'
	}
	const areasNorth = {
		cutting: 'Резка',
		extrusion: 'Экструзия',
		lasers: 'Лазеры',
		flexible: 'Гибка',
		welding: 'Сварка'
	}

	const dispatch = useDispatch()
	const isOpenDashboard = useSelector(reportSelectors.getDashboard)

	return (
		<div className="workshop">
			{
				isOpenDashboard
					? <Dashboard dataProductsAndWaste={dataProductsAndWaste} />
					:
					<div className="workshop__contaiter">
						<div className="workshop__grid">
							<div className="workshop__row-south">
								{
									Object.entries(areasSouth).map(([key, value]) => {
										let exception = ""
										key == 'mechanicalWarehouse' ? exception = 'mechanical' : key
										return (
											<div key={key} onClick={() => dispatch(handleOpenDashboard(value))}
												className={`workshop__${exception || key}`}
											>{value}</div>
										)
									})
								}
							</div>
							<div className="workshop__row-equator">
								{
									Object.entries(areasEquator).map(([key, value]) => {
										let exception = ""
										key == 'millingMachine' ? exception = 'milling-machine' : key
										return (
											<div key={key} onClick={() => dispatch(handleOpenDashboard(value))}
												className={`workshop__${exception || key}`}
											>{value}</div>
										)
									})
								}
							</div>
							<div className="workshop__row-north">
								{
									Object.entries(areasNorth).map(([key, value]) => {
										return (
											<div key={key} onClick={() => dispatch(handleOpenDashboard(value))}
												className={`workshop__${key}`}
											>{value}</div>
										)
									})
								}
							</div>
						</div>
					</div>
			}
		</div>
	)
}

export default Workshop