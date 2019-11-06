# 利用Jest为React做点有意义的事情

Jest 是facebook推出的一款测试框架,集成了 Mocha,chai,jsdom,sinon等功能。
本文表面是介绍了使用Jest针对React组件做单元测试，实际着手研究Jest配套和在VSCode上怎么debug。
从而可以利用这个去剖析React Fiber的核心代码流程机制。

## 认识 Jest

准备个 JS 的测试用例，比如 sum.test.js 测试总和。

![sum.test.js](./images/sum.test.js.png)

当运行`npm run jest`时：

![sum.test.js](./images/sum.test.js.pass.png)

我们从上面的代码看`expect(sum(1, 2)).toBe(3);`;

`expect(arg)`这个就是返回“期望”的对象，而`toBe(arg)`就是匹配器。

那我们看看除了两个货还有那些API，列出来我们过目一下。

对于`toBe(arg)`匹配器，我们从官网查看一下，列出几个。

在测试中，你有时需要区分 undefined、 null，和 false，但有时你又不需要区分。 Jest 让你明确你想要什么。

- toBeNull 只匹配 null
- toBeUndefined 只匹配 undefined
- toBeDefined 与 toBeUndefined 相反
- toBeTruthy 匹配任何 if 语句为真
- toBeFalsy 匹配任何 if 语句为假

数字的匹配器

- toBeGreaterThan(number); // 大于
- toBeGreaterThanOrEqual(number); // 大于等于
- toBeLessThan(number); // 小于
- toBeLessThanOrEqual(number); // 小于等于
- toBe(number); // 等于
- toEqual(number); // 等于
  
toBe and toEqual are equivalent for numbers

对于比较浮点数相等，使用 toBeCloseTo 而不是 toEqual，因为你不希望测试取决于一个小小的舍入误差。

expect(0.1 + 0.2).toBe(0.3);        // 这句会报错，因为浮点数有舍入误差
expect(0.1 + 0.2).toBeCloseTo(0.3); // 这句可以运行

正则表达式匹配器

expect('Christopher').toMatch(/stop/);

等等，就不一一列出来了；查看官网：[一些常用的匹配器](https://jestjs.io/docs/zh-Hans/using-matchers)

在编写测试时，通常需要检查值是否满足某些条件。 expect使您可以访问许多“匹配器”，从而使您可以验证不同的内容。
官网expect：[查看expect更新API](https://jestjs.io/docs/zh-Hans/expect)

## 其它API和玩意

异步请求测试
当个文件测试前后设置
文件操作测试
用户界面交互操作
数组、对象、函数测试
使用Mock数据和Mock函数
Jest封装文件的插件（对比、获取类型、验证、任务并行）

快照测试
使用了定时器函数测试
使用ES6+、Babel的配置
对话交互式测试，类似CLI

## Jest周边

配合MongoDB或DynamoDB管理Mock数据
配合Webpack管理本地资源文件
配合puppeteer前端自动化测试

## Jest配置

jest.config.js
Jest CLI
Migrating to Jest

## 跑个案例（TODO）

弄多几个测试案例
--colors
--coverage

可以交互和界面？

## VSCode上使用Jest

怎么使用 VS code 的 debug
生成`.vscode/launch.json`文件和里面的配置

这里推荐一个VsCode插件 Jest 在每个单元测试前面会有一个icon标示当前是否过测。

调试代码，像浏览器打断点
看 Jest 内部代码流程机制

react前端自动化测试: jest + enzyme 

```js
it('Should allow key property to...', () => {
    let node;
    const Component = props => (
        <div ref={c => (node = c)}>
            <div key = {props.swap ? 'apple' : 'cina'} />
            <div key = {props.swap ? 'banana' : 'apple'} />
            <div key = {props.swap ? 'cina' : 'banana'} />
        </div>            
    ); 

    const container = document.createElement('div');
    ReactDOM.reader(<Component swap={true} />, container);

    const origChildren = Array.from(node.childNodes);
    ReactDOM.reader(<Component swap={false} />, container);
        
    const newChildren = Array.from(node.childNodes);
    
    expect(origChildren[0]).toBe(newChildren[1]);    
    expect(origChildren[1]).toBe(newChildren[2]);    
    expect(origChildren[2]).toBe(newChildren[0]);    
});
```

## Jest测试React

怎么测试组件
怎么测试UI
使用Enzyme
create-react-app 的测试用例是怎样的
项目怎么写Jest配套

不使用Create React App为项目基石来测试，我们手动配置Jest。
事先我们需要安装一些npm包来完成对于的工作。

```ba
npm install jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer -D
```

在`package.json`文件应该像下面这样(`<current-version>`是当前包的最新版本号) 请添加脚本项目和 jest 配置：

```json
// package.json
  "dependencies": {
    "react": "<current-version>",
    "react-dom": "<current-version>"
  },
  "devDependencies": {
    "@babel/preset-env": "<current-version>",
    "@babel/preset-react": "<current-version>",
    // "@babel/preset-typescript": "<current-version>",
    "babel-jest": "<current-version>",
    "jest": "<current-version>"
  },
  "scripts": {
    "test": "jest" // "jest --colors --coverage"
  }
```

如果你项目使用了TypeScript的话，那就需要`@babel/preset-typescript`了。

```js
// babel.config.js
module.exports = {
  presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript'
    ]
};
```

好了，配置文件已经准备好了，我们来写个测试用例吧。

```js
// App.jsx
import React from 'react';
const App = () => {
    return (
        <div>test</div>
    )
}
export default App;
```

```js
// App.test.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

在项目目录下运行：`npm run jest`。

![react.demo.01](./images/react.demo.01.png)

基本简单相关React的测试已经完成了，bingo(`*^_^*`)

ReactDOM.render 确实可以执行一个 React 组件并将它渲染到页面中，但这种方式不利于编写测试代码。

接下来介绍一下另外两个工具库（`react-test-renderer`, `enzyme`）

### 测试渲染(`react-test-renderer`)  

三大块：

- 实用测试工具(Test Utilities)
- 浅层渲染(Shallow Renderer)
- 测试渲染(Test Renderer)

http://react.html.cn/docs/test-utils.html

### React测试工具(`enzyme`)

Enzyme 来自 airbnb 公司，是一个用于 React 的 JavaScript 测试工具，方便你判断、操纵和历遍 React Components 输出。Enzyme 的 API 通过模仿 jQuery 的 API ，使得 DOM 操作和历遍很灵活、直观。Enzyme 兼容所有的主要测试运行器和判断库。

OK, 那我们看一个Jest配合Enzyme的案例先。

科普测试类型：

- 单元测试：指的是以原件的单元为单位，对软件进行测试。单元可以是一个函数，也可以是一个模块或一个组件，基本特征就是只要输入不变，必定返回同样的输出。一个软件越容易些单元测试，就表明它的模块化结构越好，给模块之间的耦合越弱。React的组件化和函数式编程，天生适合进行单元测试
- 功能测试：相当于是黑盒测试，测试者不了解程序的内部情况，不需要具备编程语言的专门知识，只知道程序的输入、输出和功能，从用户的角度针对软件界面、功能和外部结构进行测试，不考虑内部的逻辑
- 集成测试：在单元测试的基础上，将所有模块按照设计要求组装成子系统或者系统，进行测试
- 冒烟测试：在正式全面的测试之前，对主要功能进行的与测试，确认主要功能是否满足需要，软件是否能正常运行

科普开发模式:

- TDD: 测试驱动开发，英文为Testing Driven Development，强调的是一种开发方式，以测试来驱动整个项目，即先根据接口完成测试编写，然后在完成功能是要不断通过测试，最终目的是通过所有测试。
BDD: 行为驱动测试，英文为Behavior Driven Development，强调的是写测试的风格，即测试要写的像自然语言，让项目的各个成员甚至产品都能看懂测试，甚至编写测试。
- TDD和BDD有各自的使用场景，BDD一般偏向于系统功能和业务逻辑的自动化测试设计；而TDD在快速开发并测试功能模块的过程中则更加高效，以快速完成开发为目的。


基本快照测试
有state和props的组件
生命周期（class 组件和hooks）
路由和Redux
高级组件

### 还有个`react-testing-library`

https://testing-library.com/


### Jest配合TypeScript

似乎不算完美，关于TS类型提示和代码编写都不算很友好；  
待深入研究和分析。

https://babeljs.io/docs/en/next/babel-plugin-transform-typescript.html#caveats

### Jest配合puppeteer自动化测试(TODO)

怎么自动个法？？？

### 参考

[利用 Jest 为 React 组件编写单元测试](https://baijiahao.baidu.com/s?id=1602512288163937867&wfr=spider&for=pc)
[使用Jest进行React单元测试](https://juejin.im/post/5b6c39bde51d45195c079d62)
[使用Enzyme和Jest 测试React组件(上)](https://juejin.im/post/5bc1f9ca6fb9a05cdc49b037)
[]()
[]()
[]()



## 使用VSCode看Fiber的内核机制

看 React 源码运作

Fiber是什么

Fiber的核心和优化机制是什么
怎么看Fiber API和设计思想

使用 VS code 看 Fiber 的内核机制







