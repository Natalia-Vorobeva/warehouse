import styled from "styled-components";
import { animated } from "react-spring";

import './BlockDev.scss';

function BlockDev({

	className,
	...props
}) {

	const BlockWrapper = styled(animated.div)`
  position: absolute;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 120px;
  background: red;
  flex-shrink: 0;
  margin-bottom: 8px;
  margin-right: 8px;
  ${({ background }) => background && `background: ${background};`}
`;

// const StyledText = styled("p")`
//   color: white;
//   font-weight: 600;
//   font-size: 24px;
// `;

	return (
		<BlockWrapper className={className} {...props}>
			{/* <StyledText>
				{label}
			</StyledText> */}
		</BlockWrapper>
	);
}

export default BlockDev;