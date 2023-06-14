// 判断当前宿主环境是否支持symbols
const supportSymbols = typeof Symbol === 'function' && Symbol.for;

// 返回 REACT_ELEMENT_TYPE
export const REACT_ELEMENT_TYPE = supportSymbols
	? Symbol.for('react.element')
	: 0xeac7;
