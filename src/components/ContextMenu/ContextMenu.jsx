import scaleUp from '../../assets/images/icon-scale-up.png'

import './ContextMenu.scss'

function ContextMenu({ className, onHandleScaleUp }) {

	return (
		<div className={`${className}__context-menu`}>
			<div className="context-menu__scale-up">
				<img onClick={onHandleScaleUp} src={scaleUp} className="scale-up__scale-up-img" />
			</div>
		</div>
	);
}

export default ContextMenu;