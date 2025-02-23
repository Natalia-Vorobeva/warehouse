import Button from '../../components/Button/Button';

import './Header.scss';

function Header({ handleClickButton, btn }) {

	return (
		<div className="header">
			<div className="header__signal">☼</div>
			<div className="header__button">
				{
					!btn
						?
						<Button handleClickButton={handleClickButton} btnText='ВЫХОД' />
						:
						''
				}
			</div>

		</div>
	);
}

export default Header;