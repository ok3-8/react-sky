# material ui

基本目录  
多包packages  
lerna  
demo和api的分类  
核心代码和icon、CSS、插件  
props和state的设计  
event的设计  
主题色彩怎么配置  
CSS-in-JS怎么应用  

使用了哪些站外库

和elem的不一样  

一个基本组件结构（button、Input、textField、select）  
选择和切换组件（radio、CheckBox、switch、slider）  
大组件（form、table）

----
依赖组件是一个个的零件  
组合组件和义务组件   
nav dropdown steps dialog  
card timeline data loading  
...
----

有哪些技巧和函数可以单独拿出来分享   
甚至有哪些设计模式和高阶函数

管理迭代和升级  
对于组件单元测试  
和TS怎么结合  

# 开始

### Button

```js
import xxx
const styles = theme => ({ "css object" });
const Button = React.forwardRef(function Button(props, ref) {
   const {} = props;
   return React.createElement() || reader(){ JSX };
});

Button.propTypes = { "api type" }

export default withStyles(styles, {name: 'MuiButton'})(Button);

```

关注点：withStyles  

知识点：

jss

React.forwardRef();  
React.useEffect();  
React.useRef()  
React.useImperativeHandle();  

import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";

import PropTypes from 'prop-types';
import clsx from 'clsx';

mui/styles: less scss
clsx: classname的表达式


### 组件与组件关系

Button => ButtonBase

```js
return React.createElement(
      ButtonBase, 
      _extends(
        {
          className: className,
          component: component,
          disabled: disabled,
          focusRipple: !disableFocusRipple,
          focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
          ref: ref,
          type: type
        }, 
        other
      ), 
      React.createElement("span", {className: classes.label}, children)
  );
```
Button => ButtonGroup  
Input => InputBase  
Select => SelectInput  

就是一个组件能拆就拆，多个类型或者分层分功能。  
说白了就是抽离那些共性。  
尽最大的耦合度（高内聚低耦合什么的）  

碎片化，零件化。  
可组装、可组织、可配置。    


### 分三条线探索（基础组件）

button: 按钮 （ButtonBase、ButtonGroup、Button）  
input: 输入框 （InputBase、InputAdornment、InputLabel、Input）  
TextField    
select：选择框 （Select、SelectInput）  


### Button点击波纹效果

focus/ripple logic.  

ButtonBase => porps.Ripple

- centerRipple = false  
- disableRipple = false  
- focusRipple = false

- disableTouchRipple = false
- TouchRippleProps = {}

知道Ripple的控制和入口
```js
React.createElement(
  type,
  [props],
  [...children]
)

!disableRipple && !disabled ? 
React.createElement(
    NoSsr, 
    null, 
    React.createElement(
        TouchRipple, 
        _extends({
            ref: rippleRef,
            center: centerRipple
        }, TouchRippleProps)
    )
) 
: null
```

看实现源码，理清原理：  

Component： NoSsr、TouchRipple

<span>
    <span></span> 
</span>

this.start 
this.stop 

event.clientX
event.clientY
const rect = element.getBoundingClientRect(); 

border-radius: 50%;
background-color: currentColor;

import { Transition } from 'react-transition-group';


### 事件 event

input select    
单向数据流：   

value={values.name}   
input={}   
onChange={handleChange('name')}   

是不是组件一定要注册事件才能用，还是说这些是React可以提供了？？




### 枚举（类型、事件、字典、...）


### CSS-in-JS 

关注点分离 => 关注点混合   
JSX JSS   

你可能会问，它们与"CSS 预处理器"（比如 Less 和 Sass，包括 PostCSS）有什么区别？回答是 CSS in JS 使用 JavaScript 的语法，是 JavaScript 脚本的一部分，不用从头学习一套专用的 API，也不会多一道编译步骤。
 
polished.js v3.4.1   
A lightweight toolset for writing styles in JavaScript.

它将一些常用的 CSS 属性封装成函数，用起来非常方便，充分体现使用 JavaScript 语言写 CSS 的优势。
polished.js还有一个特色：所有函数默认都是柯里化的，因此可以进行函数组合运算，定制出自己想要的函数


# withStyles CSS-in-JS

css的不足   
样式与状态相关的情况越来越多，需要动态、能直接访问组件state的css。   
一切样式都是全局，产生的各种命名的痛苦，BEM等命名规则能解决一部分问题，但当你使用三方插件时却无法避免命名冲突。

Vue怎么解决   
scoped 属性   
动态css的语法 v-bind class style   

react中使用css的标准   
是否解决了React开发的痛点：局部css，动态css？   
是否支持所有css甚至是sass用法？伪类,嵌套，动画，媒体查询？  
是否兼容你需要使用的第三方UI库？  
是否能和纯css，或者是其他css框架很好共存，以备遇到特殊情况可以有方案B？  
性能？大小？  

前端之巅: 探索ReactJS中的CSS架构  

inline style  
styled-components

https://www.npmtrends.com/styled-components-vs-radium-vs-glamorous-vs-jss-vs-aphrodite-vs-emotion

https://github.com/dt-fe/weekly/issues/12

https://zhuanlan.zhihu.com/p/20495964

```js
export default withStyles(styles, {name: 'MuiButton'})(Button);
```

withStyles 是一个 HOC 组件，会为你的 AppBar 组件根据当前的 theme 来添加样式。核心功能就是为子组件提供了一个 classes props，这样你就可以在外部对 class name 进行修改。  

在你这个例子中，就会将第一个参数 styles 的样式，覆盖掉原来主题中的 MuiAppBar 样式。   

先说下 Material-UI 中默认支持的样式吧，使用的是 CSS-In-JS 方案，也就是 JSS, 而你写的样式都是 Object, 所以，需要把你的对象 JSS to classes，就是 JSS 利用你的 object 生成样式，并且把所有的 classnames 成为一个对象为 classes 通过 props 传递给你的下一级组件。

const styles = { root: { width: '100%' } };  
-> CSS :  

ComponentName-root_0 { width: 100%; };   
-> classes  

const classes = { root: 'ComponentName-root_0' };   
withStyles(stypes) 步骤完成你的完整代码是：withStyles(stypes)(Component) 如下(withStyles(stypes) 代码如下)：  
 
return (Component) => (props) => (<Component {...props} classes={classes} />);


withStyles的作用会把css-in-js形式的js对象转为真正的css，如：  

const styles = (theme) => ({
  testhaha: { height: 140 },
  root: { height: 840 },
})
转成css后：   

.test1-testhaha-1{
    height: 140px
}
.test1-root-2{
    height: 840px
}   
ps. 这里的test1前缀，是可以自定义的，自定义方法在后面   
好了，转换之后，样式class名整个不一样了，我要写JSX的，我怎么知道该往JSX里的className="???"填什么？  

答案是：withStyles(styles,{name:'test1'})(Connections)中，Connections是下面的class对象，它的构造函数就能接收到经过转换的样式class名，方法：

class Connections extends Component {
  constructor (props) {
      super(props)
      console.log('classes', props.classes) // 下面有写这个打印的内容
  }
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
          <p className={classes.testhaha}></p>
      </div>
    )
  }
}
上面props.classes内容会是：

 {
   testhaha: 'test1-testhaha-1',
   root: 'test1-root-2',
 }
 
相信看到这个打印内容，以及被转换后的css-in-js，就知道它们之间的关联了吧   

Material UI 的所有样式均采用了 CSS in JS 来做，这意味着所有的样式都是    inline（内联）的，有着非常高的优先级。好在，Material UI 中大部分组件都暴露了 style 甚至 childComponentStyle 这样的“接口”（即 props）供你使用，具体可以参见官方文档。   

另外，对于少数 Material UI 没有做好接口又非要 override 的情况，可以强行用选择器 + !important 侵入，但是非常不推荐。   

@material-ui/styles  

参考： https://segmentfault.com/q/1010000012687223
https://zhuanlan.zhihu.com/p/32898912
https://zhuanlan.zhihu.com/p/47201472
https://www.zhihu.com/question/51040975

# 脚手架

1、create-react-app webpack.config.json
2、babel 7+
3、TS

how to set webpack config?
how to develop & build ?
how to use ts?

webpack4+babel7+react16.8

# 其它

npm npx 改版   
推包 npm publish  

create react app 原理   

juejin 上的 搜索 react 的很多好文章  









