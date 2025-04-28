const getCreate = state => state.movement.create
const getCurrentId = state => state.movement.currentId
const getFillField = state => state.movement.fillField
const getIsDragging = state => state.movement.isDragging
const getUpClass = state => state.movement.upClass
const getIdPackNew = state => state.movement.idPackNew
const getXTranslate = state => state.movement.xTranslate
const getYTranslate = state => state.movement.yTranslate


export const movementSelectors = {
	getCreate,
	getXTranslate,
	getYTranslate,
	getIdPackNew,
	getFillField,
	getIsDragging,
	getUpClass,
	// getElement
}