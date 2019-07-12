
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

// keyof and in

interface iPeople {
  name: string;
  age: number
}

type T = keyof iPeople // -> "name" | "age"

type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }

// 对象
this.setState({

})

// 函数，一般是用于在setState之前做一些操作
this.setState(
  () => {
    // TODO
    console.log('')
    return {
      a:300
    }
  }
)

// 第二个参数，一般是用于在setState之后做一些操作
this.setState({
  a:300
}, () => {
  // TODO
})


// 看提示
// 鼠标移上去 和 点击方法跳转
// 看提示

// function components 111

interface IProps {
	age: string
}
const Func = ( { age }: IProps ) => {
	return (
		<>
		{ age }
		</>
	)
}

// function components 222

interface IProps {
	age: string
}
const Func2: React.FunctionComponent<IProps> = ( { age } ) => {
	// const [age, setAge] = React.useState<string>(age);
	return (
		<>
		{ age }
		</>
	)
}

// 事件

e: React.FromEevent<HTMLInputElement>
e.currentTarget.value

const { name, value }: {name: string, value: number | string} = e.currentTarget;
const { name, value }: {name: keyof IState, value: number | string} = e.currentTarget;


this.setState({
	[name]: value
})

interface IState {
   [key: string]: number | string;
}

[
	0, 0, 0
	0, 0, 0
	0, 0, 0
]

1 2 3


//  ==========

enum Player {
	None = 0,
	One = 1,
	Two = 2
}

interface IState {
	board: Player[]
}

state = {
	board: [Player.None, Player.One]
}


//  ==========
dva umi


PlayerWoner: Player | NoMen


// ============


@types/react-router 必须安装


interface Props extends RouteComponentProps { }

export default withRouter(Index);

以上组件之后,你便可使用this.props.hoisty.push() js 跳转 和 <Link /> 组件中实现跳转

interface RouterInfo {
	id: any
}
interface Props extends RouteComponentProps <RouterInfo >{ }










