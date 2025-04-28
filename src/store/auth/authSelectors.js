// const getSignInError = state => state.auth.signInError
// const getSignInStatus = state => state.auth.signInStatus
// const getSignUpError = state => state.auth.signUpError
// const getSignUpStatus = state => state.auth.signUpStatus
// const getIsAuth = state => state.auth.isAuth
const getIsLoggedIn = state => state.auth.isLoggedIn
const getBtnAuth = state => state.auth.btnAuth
const getIsOpenPopupAuth = state => state.auth.isOpenPopupAuth

export const authSelectors = {
	getBtnAuth,
	getIsLoggedIn,
	getIsOpenPopupAuth
}