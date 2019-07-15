
```js

private inputRef =  React.createRef<HTMLInputElement>();

this.inputRef.current!.value;


handleFocus = (): void => {
    const { onFocus } = this.props;
    if (onFocus) onFocus(this.inputRef);
}


JSX:

onChange={this.handleChange}
onFocus={this.handleFocus}
onBlur={this.handleBlur}

ref={this.inputRef}
```



React + TypeScript 组件引用的传递
继续到组件的情况，当需要引用的元素在另一个组件内部时，还是通过 React.forwardRef()。

这是该方法的签名：

function forwardRef<T, P = {}>(Component: RefForwardingComponent<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
可以看到，方法接收两个类型参数，T 为需要引用的元素类型，我们示例中是 HTMLInputElement，P 为组件的 props 类型。

所以添加引用传递后，FancyInput 组件在 TypeScript 中的版本应该长这样：

const FancyInput = React.forwardRef<HTMLInputElement, {}>((props, ref) => {
  return <input type="text" ref={ref} className="fancy-input" />;
});
使用组件：

class App extends Component<{}, {}> {
  private inputRef = React.createRef<HTMLInputElement>();

  componentDidMount() {
    this.inputRef.current!.focus();
  }

  render() {
    return (
      <div className="App">
        <FancyInput ref={this.inputRef} />
      </div>
    );
  }
}




##  参考：

我的开发之路系列 - React学习指南
https://www.kancloud.cn/xiaoyulive/react/497890

[React项目总结] 基于 webpack 搭建前端工程基础篇
https://github.com/chenbin92/react-redux-webpack-starter/issues/1


Create a rollup.config.js
https://github.com/Microsoft/TypeScript-Babel-Starter


webpack Parcel rollup

css-in-js
postcss in react

研究一下numeral.js的@types的d.ts的声明文件是怎么处理的
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types
https://microsoft.github.io/TypeSearch/

https://github.com/semlinker/awesome-typescript

https://ts.xcatliu.com/basics/declaration-files

npm install -g typings
dts-gen

- Numeral.js & accounting.js
- Day.js & Moment.js
- money.js & currency.js

npm install xxx // core
npm install @types/xxx // 声明

```js

function identity<T>(arg: T): T {
  return arg;
}

const userName = identity<string>('Peng Jie');
const age = identity<number>(25);

console.log(userName); // Peng Jie
console.log(age); // 25

// ===================

type StaticValue = number | string | boolean | undefined;

interface State {
    [key: string]: StaticValue;
}

type State = {
    get(key: string): StaticValue;
    set(key: string, value: StaticValue): void;
} & {
    [key: string]: StaticValue;
}

// ==============

function getBy<T, P extends keyof T>(model: T[], prop: P, value: T[P]): T | null {
    return model.filter(item => item[prop] === value)[0] || null
}

const result = getBy(students, "age", "17")
// Error: Argument of type '"17"' is not assignable to parameter of type 'number'.

const anotherResult = getBy(students, "hasScar", "true")
// Error: Argument of type '"true"' is not assignable to parameter of type 'boolean'.

const yetAnotherResult = getBy(students, "name", "Harry")
// That's cool



Array.prototype.getBy = function <T, P extends keyof T>(
    this: T[],
    prop: P,
    value: T[P]
): T | null {
  return this.filter(item => item[prop] === value)[0] || null;
};
// Error: Property 'getBy' does not exist on type 'any[]'.

const bestie = students.getBy("name", "Ron");
// Error: Property 'getBy' does not exist on type 'Student[]'.

const potionsTeacher = (teachers as any).getBy("subject", "Potions")
// No error... but at what cost?



// ============

// interface type 其实就是个对象配对。

Welcome ({ group, page, name }: { group: string, page: string, name: string}): JSX.Element



import * as React from 'react'

interface IProps {
  text: string
}

export const MyComponent: React.FunctionComponent<IProps> = ({ text }: IProps): JSX.Element =>
<div>{text}</div>


```


#### Basic Hooks

- useState
- useEffect
- useContext

#### Advanced Hook

- useReducer
- useCallback
- vuseMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

## input 事件


### 没有进行任何输入时，不会触发change

在这种情况下，输入框并不会触发change事件，但一定会触发blur事件。在判断表单的修改状态时，这种差异会非常有用，通过change事件能轻易地找到哪些字段发生了变更以及其值的变更轨迹。

### 输入后值并没有发生变更

这种情况是指，在没有失焦的情况下，在输入框内进行返回的删除与输入操作，但最终的值与原值一样，这种情况下，keydown、input、keyup、blur都会触发，但change依旧不会触发。

1. keydown事件发生时，输入值并没有发生变化，所以keydown可用于阻止某些输入字符的显示。 
2. input事件发生时，无法获取到keyCode值，并且紧随在keydown事件之后。 
3. keyup事件最后发生，一次键盘敲入事件彻底完成。 
4. change事件只会发生在输入完成后，也就是输入框失去焦点之前。


// focus、keydown、input、keyup、change、blur

https://www.cnblogs.com/llauser/p/6715409.html
https://blog.csdn.net/yiifaa/article/details/52372022





## 一步一步可登天造极

一、安装路由 react-router-dom 5.x

```js
npm install react-router-dom -S
npm install @types/react-router-dom -D
```

URL: https://reacttraining.com/react-router/web/guides/quick-start

`react-router` 和 `react-router-dom` 区别：

React-router提供了一些router的核心api，包括Router, Route, Switch等，但是它没有提供dom操作进行跳转的api。

React-router-dom提供了BrowserRouter, HashRouter, Route, Link等api,我们可以通过dom的事件控制路由。例如点击一个按钮进行跳转，大多数情况下我们是这种情况，所以在开发过程中，我们更多是使用React-router-dom。

通过 npm 安装 react-router-dom 时发现其依赖 react-router，也就是说不需要显示安装 react-router。

```js
// 1
import { Swtich, Route, Router, HashHistory, Link } from 'react-router-dom';

// 2
import { Switch, Route, Router } from 'react-router';
import { HashHistory, Link } from 'react-router-dom';
```

- match  
- location  
- history

```js
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface defaultProps {
  age: number
  name: string
};

type routesProps = {
  id: number
};

type Props = defaultProps & RouteComponentProps<routesProps>

// type routesProps = {
//   id: number
// };

// interface Props extends RouteComponentProps<routesProps> {
//   age: number
//   name: string
// }

const App = (props: Props) => {
  console.log(props)
  console.log(props.match)
  console.log(props.location)
  console.log(props.history)
  return (
    <>
       <div></div>
    </>
  );
}

export default App;

```


## 使用 React hook 用法

函数式编程，你不需要定义constructor，render，定义class





React项目从Javascript到Typescript的迁移经验总结
https://segmentfault.com/a/1190000019075274

about TS:

https://www.pluralsight.com/guides/composing-react-components-with-typescript  

https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/

https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb

https://areknawo.com/

https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4


http://www.jsontots.com/
http://www.json2ts.com/

https://medium.com/iqoqo-engineering/two-advanced-techniques-to-make-you-a-typescript-wizard-df42e00b1cf8

https://www.robinwieruch.de/react-function-component/  
https://github.com/rwieruch/blog_robinwieruch_content/blob/master/react-function-component.md

https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c

https://gist.github.com/treyhuffine

https://gitconnected.com/learn/react










