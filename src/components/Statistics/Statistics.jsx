import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleOpenDashboard, handleClickCharts } from '../../store/report/reportSlice.js'
import { reportSelectors } from '../../store/report/reportSelectors.js'
import './Statistics.scss'
import CardProduct from '../CardProduct/CardProduct'

function Statistics({
	dataProductsAndWaste,
	statistics,
	statisticsIceberg,
	statisticsTLine,
	line,
	listIceberg,
	listSlim,
	listOptima,
	listElegant,
	listModern,
	objSum,
	lineStatistics
}) {

	const statisticsTabs = useSelector(reportSelectors.getStatisticsTabs)
	console.log('%cDATAstatisticsTabs', 'color: purple', statisticsTabs)



	// console.log('%cDATA', 'color: purple', dataProductsAndWaste)
	// todo продолжаем рендерить общие данные в статистике, см. выше

	const productNames = ['Слим', 'М-Элегант', 'S-Элегант', 'Модерн', 'Оптима']
	const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
	const indicators = ['Выпуск', 'Отходы']
	const [productName, setProductName] = useState('')

	function handleClickBreadcrumb(el) {
		setProductName(el)
	}

	let dataSlim = [
		{
			info:
				["Максимум - 150м/ч", "3,02 метра - 150грамм"]
		},
		{
			reason:
				["Обрыв", "Обслуживание", "Авария"]
		}
	]
	// todo закинуть функцию в собрание интересных функций
	
	// todo

	//  код нужно сократить
	// breadcrumb вынести в отдельный компонент
	return (
		<div className="statistics">
			{
				lineStatistics === "statistics" || lineStatistics === "tline"
					?
					<ul className="statistics__breadcrumb">
						{
							lineStatistics === "statistics" ? "" : lineStatistics === "tline" ? "T-линия" : ""
						}
						{
							lineStatistics === "statistics" ? <li onClick={() => handleClickBreadcrumb("Айсберг")} className="statistics__item">
								<a className={`statistics__iceberg`} href="#">Айсберг</a>
							</li>
								:
								""
						}
						{
							productNames.map((el, index) => {
								return <li key={index} onClick={() => handleClickBreadcrumb(el)} className="statistics__item">
									<a className={`statistics__${el}`} href="#">{el}</a>
								</li>
							})
						}
					</ul>
					// здесь место для линии айсберга - статистика - хлебные крошки
					: ''
			}

			{
				statisticsTabs.statistics ? <div className="statistics">
					<h5 className="statistics__subtitle">
						Общая статистика
					</h5>
					{/* {
						objSum.map((el, index) => {
							console.log('%cel', 'color: purple', el[index].key)
							return <div key={index} className="statistics__general">
								<div className="statistics__general-key">{el.key}</div>
								<div className="statistics__general-value">{el.value}</div>
							</div>
						})
					} */}

					{/* {
        Object.entries(objSum).map(([key,value]) => {
            return (
                <div>{key} : {value.toString()}</div>
            )
        })
    } */}

				</div> : null
			}
			{
				statisticsTabs.iceberg ? <div className="statistics__iceberg">
					stat-iceberg
					<div className="statistics__title">{productName}</div>
				</div> : null
			}
			{
				statisticsTabs.tline &&
				<div className="statistics__tline">
					{/* Сделать, чтобы просто подставлять цифры */}
					<CardProduct
						dataSlim={dataSlim}
						productName={productName}
						indicators={indicators}
						onClick={handleClickBreadcrumb}
						months={months}
					/>
				</div>
			}

		</div>
	)
}

export default Statistics



{/* <li className="statistics__item">
<a className="statistics__slim" href="#">Слим</a>
</li>
<li className="statistics__item">
<a className="statistics__link statistics__m-elegant" href="#">М-Элегант</a>
</li>
<li className="statistics__item">
<a className="statistics__s-elegant" href="#">S-Элегант</a>
</li>
<li className="statistics__item">
<a className="statistics__modern" href="#">Модерн</a>
</li>
<li className="statistics__item">
<a className="statistics__optima" href="#">Оптима</a>
</li> */}