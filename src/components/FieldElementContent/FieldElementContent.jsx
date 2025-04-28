import FieldElement from '../FieldElement/FieldElement';
import './FieldElementContent.scss';

function FieldElementContent({
	name,
	toggleScaleUp,
	optionalClassName,
	className,
	text,
	subtext
}) {
	const unit = 10

	return (
		<FieldElement
			toggleScaleUp={toggleScaleUp}
			optionalClassName={optionalClassName}
			className={className}
			text={text}
			subtext={subtext}
		>
			<div className="field-element-content">
				<div className="field-element-content__placement">
					{unit ? Array.from({ length: unit })
						.map((_, index) => {
							return (
								<div
									// ref={refUnit}
									// data-free
									className="field-element-content__unit"
									key={`${index}/rows-1-${index}`}
									id={`${name}/rows-1-${index}`}
								// onClick={(e) => handleClick(e)}

								>
								</div>
							)
						})
						: null}
					{unit ? Array.from({ length: unit })
						.map((_, index) => {
							return (
								<div
									// ref={refUnit}
									// data-free
									className="field-element-content__unit"
									key={`${index}/rows-2-${index}`}
									id={`${name}/rows-2-${index}`}
								// onClick={(e) => handleClick(e)}

								>
								</div>
							)
						})
						: null}
				</div>
				<div className="field-element-content__context-menu">
					menu
				</div>
			</div>
		</FieldElement>

	);
}

export default FieldElementContent;