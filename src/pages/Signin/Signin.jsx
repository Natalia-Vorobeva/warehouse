// import { useState } from 'react';

import { useState } from 'react';
import Button from '../../components/Button/Button';
import './Signin.scss';

function Signin({ handleClickButton, btn }) {


	return (
		<div className={`signin ${!btn ? 'signin_opacity' : ''}`}>
			{
				btn
					?
					<Button handleClickButton={handleClickButton} btnText='ВХОД' />
					:
					''

			}

		</div>
	);
}

export default Signin;