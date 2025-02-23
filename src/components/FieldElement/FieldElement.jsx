// import styled from "styled-components";
// import { animated } from "react-spring";

// import './FieldElement.scss';

function FieldElement({
	text,
	className
}) {

	return (
		<div className={className}>
			{text}
		</div>
		// <div className={className} {...props}>
		// 	{text}{label}
		// </div>
	);
}


export default FieldElement;