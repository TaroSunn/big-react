import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ReactElement,
	ElementType
} from 'shared/ReactTypes';
// jsx 或者 craeteElement 方法返回的是一种 ReactElement的数据结构
/**
 *
 * @param type 类型
 * @param key 组件的key
 * @param ref 组件的ref
 * @param props 组件的props
 */

const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElement {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'test' // 自定义了一个属性，与react项目相区分
	};
	return element;
};

/**
 * example
 * <div id="test">123</div> =>
 *
 * import { jsx as _jsx } from "react/jsx-runtime";
 * _jsx("div", {
 *  id: "test",
 *  children: "123"
 * });
 * 可以看出jsx的第一个参数是 type, 第二个是属性，后面的参数这是children
 * config 中的 key prop 比较特殊需要单独处理
 *
 */

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	// 遍历config上的所有属性
	for (const prop in config) {
		const val = config[prop];
		// 处理key
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		// 处理ref
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 判断是不是config自己prop而不是原型上的,原型上的就不赋值了
		if ({}.hasOwnProperty.call(config, prop)) {
			// 如果是自己的prop的话赋值即可
			props[prop] = val;
		}
	}
	// 处理maybeChildren
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		// 可能有两种情况
		// 1. 只有一个child
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			// 2. 多个child
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, props, ref);
};

export const jsxDEV = jsx;
