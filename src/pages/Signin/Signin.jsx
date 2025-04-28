// import { useState } from 'react';

import { useState } from 'react';
import Button from '../../components/Button/Button';
import './Signin.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authSelectors } from '../../store/auth/authSelectors';
import { 
	setIsOpenPopupAuth, setBtnAuth 
} from '../../store/auth/authSlice.js'

function Signin() {
	
	const dispatch = useDispatch()
	// const isOpenPopupAuth = useSelector(authSelectors.getIsOpenPopupAuth)
	const btnAuth = useSelector(authSelectors.getBtnAuth)

	return (
		<div className={`signin ${btnAuth ? '' : 'signin_opacity'}`}>
			{
				btnAuth
					?
					<Button 
					handleClickButton={() => {
						dispatch(setIsOpenPopupAuth(true))
						dispatch(setBtnAuth(false))
					}} 
					// handleClickButton={handleClickButton} 
					className='' btnText='ВХОД' />
					:
					<></>
			}

		</div>
	);
}

export default Signin;