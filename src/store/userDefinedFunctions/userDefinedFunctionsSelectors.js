const getIsOpenPopupNewBlock = state => state.userDefinedFunctions.isOpenPopupNewBlock
const getIsOpenInfoPopupBlock = state => state.userDefinedFunctions.isOpenInfoPopupBlock
const getDataInfoPopupBlock = state => state.userDefinedFunctions.dataInfoPopupBlock


export const userDefinedFunctionsSelectors = {
	getIsOpenPopupNewBlock,
	getIsOpenInfoPopupBlock,
	getDataInfoPopupBlock
}