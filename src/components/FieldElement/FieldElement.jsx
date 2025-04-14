// import styled from "styled-components";
// import { animated } from "react-spring";

import Bookmark from "../Bookmark/Bookmark";

// import './FieldElement.scss';

function FieldElement({
	text,
	className,
	subtext
}) {

	return (
		<div className={className}>
			<Bookmark text={text} subtext={subtext} />
		</div>
	);
}


export default FieldElement;