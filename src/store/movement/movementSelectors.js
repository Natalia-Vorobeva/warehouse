const getCreate = state => state.movement.create
const getCurrentId = state => state.movement.currentId
const getFillField = state => state.movement.fillField
const getIsDragging = state => state.movement.isDragging
const getUpClass = state => state.movement.upClass
// const getElement = state => state.movement.element


export const movementSelectors = {
	getCreate,
	getCurrentId,
	getFillField,
	getIsDragging,
	getUpClass,
	// getElement
}