import { useState } from 'react';
import './Accordion.scss';

function Accordion({ data }) {
	console.log('%cDATA', 'color: purple', data)
	const [activeIndex, setActiveIndex] = useState(null);

	const handleToggle = (index) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	}

	let content = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
	];

	return (
		<div className="accordion">
			<div className="accordion__container">
				{content.map((item, index) => (
					<div className="accordion__wrapper" key={index}>
						<button
							className={`accordion__toggle ${activeIndex === index ? "accordion__toggle_active" : ""}`}
							onClick={() => handleToggle(index)}
						>
							<p className="accordion__item">{item}</p>
							{index === activeIndex ? (
								<>
									<i className="fas fa-minus icon">&#10531;&#8657;&#10515;</i>
								</>
							) : (
								<>
									<i className="fas fa-plus icon">&#10533;&#8659;&#10514;</i>
								</>
							)}
						</button>
						<div
							className={`accordion__content ${activeIndex === index ? "accordion__content_active" : ""}`}
						
						>
							{/* <p>
								{index === 0
									? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta aliquam facere adipisci quod mollitia, aut nemo deleniti fugiat et, corrupti sequi. Omnis dolorem quos eligendi placeat soluta sint corrupti quod."
									: index === 1
										? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores error doloremque, quibusdam qui necessitatibus autem aperiam reprehenderit? Ipsum maiores dolore inventore ea. Accusantium fuga eius laboriosam iusto blanditiis doloremque ullam?"
										: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae consectetur officiis labore commodi sunt ex praesentium dolor magnam asperiores reiciendis. Minus magnam nesciunt aliquid eos ipsam sequi recusandae quos incidunt."}
							</p> */}
						</div>
					</div>
				))}
			</div>
		</div>

	);
}

export default Accordion;