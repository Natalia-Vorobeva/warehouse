import { useState } from 'react';
import Aside from '../../components/Aside/Aside';
import Field from '../../components/Field/Field';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './Main.scss';

function Main({ handleClickButton, btn, db }) {

	const [visibleAside, setVisibleAside] = useState(false)

	function handleVisibleAside() {
		setVisibleAside(!visibleAside)
	}
	return (
		<div className="main">
			<Header btn={btn} handleClickButton={handleClickButton} btnText='ВЫХОД' />

			<div className={`main__base ${visibleAside ? "main__base_grid-with-aside" : "main__base_grid-without-aside"} `}>
				<Field />
				<Aside db={db} visibleAside={visibleAside} handleClickButtonAside={handleVisibleAside} />
			</div>
			<Footer />

		</div>
	);
}

export default Main;