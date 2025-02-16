import Button from '../../components/Button/Button';

import './Header.scss';

function Header({ handleClickButton, btn }) {

	return (
		<div className="header">
			{
				!btn
					?
					<Button handleClickButton={handleClickButton} btnText='ВЫХОД' />
					:
					''
			}
		</div>
	);
}

export default Header;