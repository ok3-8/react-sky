
import {MouseEvent, Component} from 'react';
import * as React from 'react';

type Props = {
	onClick(e: MouseEvent<HTMLElement>): void;
	color?: 'blue' | 'green' | 'red';
	type?: 'button' | 'submit';
}
class Button extends Component<Props> {
	static defaultProps = {
		color: 'blue',
		type: 'button'
	};
	render() {
		const {onClick: handleClick, color, type, children} = this.props;
		return (
			<button
				type={type}
				style={{color}}
				onClick={handleClick}
			>
				{children}
			</button>
		);
	}
}
export default Button;



// 可以通过分离 Props 提取出 color 和 type 的属性，然后用类型交叉把默认值映射为可选值。后面这步通过 TS 标准库中 Partial 类型来快速实现。









































