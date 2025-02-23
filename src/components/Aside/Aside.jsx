import AsideGridElement from '../AsideGridElemeint/AsideGridElement';
import Button from '../Button/Button';
import InputFieldDB from '../InputFieldDB/InputFieldDB';

import './Aside.scss';

function Aside({ handleClickButtonAside, visibleAside, db, devMode }) {

	return (
		<div className="aside">
			{/* <Button className={'button__aside'} handleClickButton={handleClickButtonAside} btnText={devMode ? "" : visibleAside ? "→" : "←"} /> */}
			{/* <InputFieldDB db={db} /> */}
			<div className='aside__aside-text' onClick={handleClickButtonAside}>
				<p className='aside__aside-text-text' >
					{devMode ? "" : visibleAside ? "→" : "←"}
				</p>
			</div>

			{
				devMode
					?
					<div className="aside__blocks">
						<AsideGridElement className={"aside__block aside__block_is-main"} />
						<AsideGridElement className={"aside__block aside__block_is-horizontal-full"} />
						<AsideGridElement className={"aside__block aside__block_is-vertical-full"} />
						
						<AsideGridElement className={"aside__block aside__block_is-vertical-hulf"} />
						<AsideGridElement className={"aside__block aside__block_is-horizontal-hulf"} />
						<AsideGridElement className={"aside__block aside__block_is-horizontal-percent"} />
						<AsideGridElement className={"aside__block aside__block_is-vertical-percent"} />
					</div>
					:
					<p>!</p>
			}

			{/* Поиск
			Карточка */}
		</div>
	);
}

export default Aside;