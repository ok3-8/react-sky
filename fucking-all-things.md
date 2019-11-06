# 我也不知道这是什么

## git

- git commit info 要双引号
- 使用命令 git branch -a 查看所有分支
- git push origin --delete Chapater6 可以删除远程分支 Chapater6
- git branch -d Chapater8 可以删除本地分支（在主分支中）

一 配置git 使其对文件名大小写敏感: 
git config core.ignorecase false

## git 只合并某一个分支的某个 commit

第一种情况：只合并一个 commit

git checkout develop-hbb
git cherry-pick 7c32be61
以上，7c32be61 是 develop 上的一个 fix bug 的 commit，上面就是将这个 commit 合并到 develop-hbb 上

第二种情况：合并连续的多个 commit 到指定的分支上

比如在 develop 分支上有 7c32be61 到 54dfef55 的连续的 10 个 commit，54dfef55 是后面的提交。先在要将这 10 个 commit 合并到 develop-hbb 分支上

1）首先基于 develop 分支创建一个临时分支 temp，并指明新分支的最后一个 commit

git checkout -b temp 54dfef55
2）将 temp 分支上的从 7c32be61 到最后一个 commit，也就是 54dfef55 的 commit 合并到 develop-hbb 上

git rebase --onto develop-hbb 7c32be61^

## Git 回滚代码到某个 commit

回退命令：

\$ git reset --hard HEAD^  回退到上个版本  
\$ git reset --hard HEAD~3 回退到前 3 次提交之前，以此类推，回退到 n 次提交之前  
\$ git reset --hard commit_id 退到/进到 指定 commit 的 SHA 码  

强推到远程：

\$ git push origin HEAD --force

## Utility room

carbon.now.sh //代码截图工具  
app.liuchengtu.com //流程图

接口分离工具 swagger/mock

### 代码大全 2

第2版的《代码大全》是著名IT畅销书作者史蒂夫·迈克康奈尔11年前的经典著作的全新演绎：第2版不是第一版的简单修订增补，而是完全进行了重写；增加了很多与时俱进的内容。史蒂夫·迈克康奈尔（Steve McConnell）被公认为软件开发社区中的首要作者和发言人之一。他是Construx Software公司的首席软件工程师。他所编著的图书包括曾被《软件开发》杂志授予优异产品震撼大奖的《代码大全》和《快速软件开发》，以及《软件项目生存指南》和《专业软件开发》等等。

### 代码整洁之道

《代码整洁之道(英文版)》提出一种观念：代码质量与其整洁度成正比。干净的代码，既在质量上较为可靠，也为后期维护、升级奠定了良好基础。作为编程领域的佼佼者，《代码整洁之道(英文版)》作者给出了一系列行之有效的整洁代码操作实践。这些实践在《代码整洁之道(英文版)》中体现为一条条规则（或称“启示”），并辅以来自现实项目的正、反两面的范例。只要遵循这些规则，就能编写出干净的代码，从而有效提升代码质量。

软件质量，不但依赖于架构及项目管理，而且与代码质量紧密相关。这一点，无论是敏捷开发流派还是传统开发流派，都不得不承认。

《代码整洁之道(英文版)》阅读对象为一切有志于改善代码质量的程序员及技术经理。书中介绍的规则均来自作者多年的实践经验，涵盖从命名到重构的多个编程方面，虽为一“家”之言，然诚有可资借鉴的价值。

# vocabulary

inspect 英[ɪnˈspekt]
vt. 视察; 检查，检验;
vi. 进行检查; 进行视察;

flat 平面
misunderstood 误解
patterns 模式
process 处理
platform 平台
cheat sheet 备忘单

# code list

cheat sheet
husky 或者 pre-commit  
lerna  
随机数(看 mock 源码)
lodash
mock 正则表达式 get 请求  
axios 拦截和过滤
debug chrome
import 文件所有目录
组件的 Class 是否为全局来考虑
mixin
render
tisk / task
provide / inject
Vue Patterns (https://learn-vuejs.github.io/vue-patterns/)




## 探讨框架底层

[深度解析`create-react-app`源码](https://segmentfault.com/a/1190000012952498)  
源码分析和实现  

注重框架和思维  
还有底层的实现
每个功能和常数的完整状态和结构
设计模式、优化和测试
还有自动化工具和封装

## 面试知识点

- React 中 keys 的作用是什么？
- react 生命周期函数
- shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）
- 为什么虚拟 dom 会提高性能?(必考)
- react diff 原理（常考，大厂必考）
- React 中 refs 的作用是什么？
- 类组件(Class component)和函数式组件(Functional component)之间有何不同
- 展示组件(Presentational component)和容器组件(Container component)之间有何不同
- 回调渲染模式（Render Callback Pattern）
- (组件的)状态(state)和属性(props)之间有何不同
- 何为受控组件(controlled component)
- 何为高阶组件(higher order component)
- 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象
- 除了在构造函数中绑定 this，还有其它方式吗
- (在构造函数中)调用 super(props) 的目的是什么
- 应该在 React 组件的何处发起 Ajax 请求
- 描述事件在 React 中的处理方式。
- 和 cloneElement 有什么区别？
- React 中有三种构建组件的方式
- react 组件的划分业务组件技术组件？
- 简述 flux 思想
- 了解 redux 么，说一下 redux 
- redux 有什么缺点

其它

- React Hooks
- super(props),为什么有它，它做了什么，实现的内机制是怎样的，未来有优化吗
- 定规定则(自定义组件首字母大写)
- setSate(Hook\this\class\state\复用性\数据状态的设计模式)
- 组件(各种组件)
- React.Component(this\机制)
- ES6和React, 使用灵活ES6来写React
- render 解析DOM结构的机制
- Context API
- 了解React新特性
- create-react-app
- react(使用Class类和Function、各种组件、JS操作DOM)而Vue把DOM和数据清晰分离，JS就简单针对数据操作,Vue喜欢一个文件一个组件(.vue文件中，就是三大节点<template><script><style>,而且script中就单纯的一个生命周期)。
- React Fiber (渲染核心\version16)

装饰器（高阶组件）  
函数式组件和类组件
无状态组件（Function）还是有状态组件（Class）

缓存 React 事件监听器来提高性能
从React 渲染原理到性能优化（一）
如何掌握高级react设计模式: Context API【译】
React 16 加载性能优化指南
React设计模式与最佳实践

## input 标签内容改变的触发事件

1. onchange 事件与 onpropertychange 事件的区别：

onchange 事件在内容改变（两次内容有可能相等）且失去焦点时触发；onpropertychange 事件是实时触发，每增加或删除一个字符就会触发，通过 js 改变也会触发该事件，但是该事件是 IE 专有。

2. oninput 事件与 onpropertychange 事件的区别：

oninput 事件是 IE 之外的大多数浏览器支持的事件，在 value 改变时实时触发，但是通过 js 改变 value 时不会触发；onpropertychange 事件是任何属性改变都会触发，而 oninput 却只在 value 改变时触发，oninput 要通过 addEventListener()来注册，onpropertychange 注册方法与一般事件相同。

3. oninput 与 onpropertychange 失效的情况：

oninput 事件：

（1）当脚本中改变 value 时，不会触发；

（2）从浏览器的自动下拉提示中选取时，不会触发；

onpropertychange 事件：

当 input 设置为 disable=true 后，不会触发。

https://blog.csdn.net/yiifaa/article/details/52372022  
输入框事件监听(一)：keydown、keyup、input

http://www.runoob.com/jsref/event-oninput.html

https://segmentfault.com/a/1190000017498971

### cleave input

el-input components(elementUI components)
cleave.js(https://nosir.github.io/cleave.js/)
vue-bulma/cleave(Vue Cleave component is based on cleave.js for Vue)
vue-cleave-component(Vue.js component for Cleave.js)
vee-validate(https://baianat.github.io/vee-validate/)


## 参考

https://learnreact.design/
https://itnext.io/
https://github.com/FAQGURU/FAQGURU+
https://github.com/webproblem/learning-article
https://juejin.im/post/5c061ed2f265da61357258ee

reactjs-interview-questions https://github.com/sudheerj/reactjs-interview-questions

前端开发：如何写一手漂亮的 Vue http://www.jianshu.com/p/a496343dd12a
You-Dont-Know-JS 中文版 https://github.com/kujian/You-Dont-Know-JS/
探索 ES6 https://www.gitbook.com/book/wizardforcel/exploring-es6
精心收集的 95 个超实用的 JavaScript 代码片段（ ES6+ 编写） https://www.css88.com/archives/8748
进阶系列目录 https://github.com/yygmind/blog
Vue.js 技术揭秘 https://ustbhuangyi.github.io/vue-analysis
[web前端教程分享：常见 React 面试题](https://github.com/nanhupatar/FEGuide/blob/master/框架/react.md)
React Router: Declarative Routing for React.js https://reacttraining.com/react-router/web/guides/quick-start
React 中文索引 http://nav.react-china.org/

[前端早读课mp](http://mp.sohu.com/profile?xpt=ZmV6YW9kdWtlQHNvaHUuY29t&_f=index_pagemp_1)

掌握react，这一篇就够了 https://segmentfault.com/a/1190000016281174

年终回顾，为你汇总一份「前端技术清单」https://juejin.im/post/5bdfb387e51d452c8e0aa902  
ES6面试、复习干货知识点汇总（全）https://juejin.im/post/5c061ed2f265da61357258ee
如何用 es6+ 写出优雅的 js 代码 https://juejin.im/post/5c0a2c14e51d45676c472f5b

漫淡终端技术未来 https://blog.fundebug.com/2018/12/14/about-the-future-of-frontend/
2019年 React 新手学习指南 – 从 React 学习线路图说开去 https://www.css88.com/archives/10111
重拾React: React 16.0 https://juejin.im/post/5c0c7504518825501076b49f

https://github.com/yygmind/blog
《JavaScript 设计模式与开发实践》
https://github.com/sunzhaoye/blog/issues/16
