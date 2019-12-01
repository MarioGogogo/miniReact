// eslint-disable-next-line no-unused-vars
function isStateLessComponent(element) {
	// body...
	return !isClass(element) && typeof element === 'function'
}

function isClass(func) {
	return typeof func === "function" && /^class\s/.test(Function.prototype.toString.call(func))
	// body...
}

function shouldAddEventListener(propety) {
	return /^on.*$/.test(propety)
}