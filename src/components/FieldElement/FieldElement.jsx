import Bookmark from "../Bookmark/Bookmark"
import scaleUp from '../../assets/images/icon-scale-up.png'

import './FieldElement.scss';
import { Children } from "react";

function FieldElement({
	children,
	text,
	className,
	subtext,
	toggleScaleUp,
	optionalClassName
}) {


	return (
		<div className={`${className} field-element`}>
			<Bookmark className={optionalClassName} onClick={toggleScaleUp} text={text} subtext={subtext} />
			{
				children
			}			
		</div>
	);
}


export default FieldElement;