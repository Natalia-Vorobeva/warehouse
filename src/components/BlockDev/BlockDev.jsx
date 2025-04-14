import styled from "styled-components";
import { animated } from "react-spring";

import './BlockDev.scss';
import AddButton from "../AddButton/AddButton";

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

const StyledText = styled("span")`
  color: white;
  font-weight: 600;
  font-size: 24px;
`;

	return (
		<BlockWrapper className={className} {...props}>
		
			<StyledText>
				{/*add-button class не работает */}
			{/* <AddButton 
			className='block-dev' 
			/> */}
				{/* {label} */}
			</StyledText>
		
		</BlockWrapper>
	);
}

export default BlockDev;