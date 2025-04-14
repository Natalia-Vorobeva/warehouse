import { useState } from 'react';
import './CardProduct.scss';

function CardProduct({
	dataSlim,
	product, 
	indicators, 
	onClick,
	months
 }) {
	const [link, setLink] = useState('')
	function onClick(el) {
		setLink(el)
	}

	return (
		<>
			<div className="statistics__product-breadcrumb">
				<p className="statistics__title">
					{product}
				</p>

				{
					indicators.map((el, index) => {
						return <li key={index} onClick={() => onClick(el)} className="statistics__item">
							<a className={`statistics__${el}`} href="#">{el}</a>
						</li>
					})
				}
			</div>
			<div className="statistics__max">
				{/* {dataSlim} */}
			</div>
			<div className="statistics__result">
				{
					link === 'Выпуск' &&
					<> 
					<div className="statistics__release">
						Выпуск
					</div>
					<div className="statistics__table">
						<div className="statistics__years">2025</div>
						<div className="statistics__months">
							{
								months.map((el) => {
									return <p className="statistics__month">{el}</p>
								})
							}
						</div>
						<div className="statistics__data">

						</div>

					</div>
					</>
				}
				{
					link === 'Отходы' && <div className="statistics__waste">отходы</div>

				}
			</div>


		</>
	);
}

export default CardProduct;