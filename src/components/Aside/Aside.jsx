import Button from '../Button/Button';
import InputFieldDB from '../InputFieldDB/InputFieldDB';

import './Aside.scss';

function Aside({ handleClickButtonAside, visibleAside, db }) {	
		
	return (
		<div className="aside">
			<Button className={'button__aside'} handleClickButton={handleClickButtonAside} btnText={visibleAside ? "-→" : "←-"} />
			<InputFieldDB db={db} />

			{/* Поиск
			Карточка */}
		</div>
	);
}

export default Aside;