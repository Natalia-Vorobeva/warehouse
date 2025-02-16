// const getSignInError = state => state.auth.signInError
// const getSignInStatus = state => state.auth.signInStatus
// const getSignUpError = state => state.auth.signUpError
// const getSignUpStatus = state => state.auth.signUpStatus
const getIsAuth = state => state.auth.isAuth
const getUser = state => state.auth.user
// const getUserError = state => state.auth.userError
// const getUserStatus = state => state.auth.userStatus

export const authSelectors = {
	// getSignInError,
	// getSignInStatus,
	// getSignUpError,
	// getSignUpStatus,
	// getUserError,
	// getUserStatus,
	getIsAuth,
	getUser,
}