
## 怎么成为一个前端全栈打杂工



### webapp

- 布局和适配（flex\grid）
- 框架
- 库
- 调试
- 测试用例

### react

- 基础（基本、router、redux、hook）
- 第三方库(tools、ui)
- 脚手架
- react native
- nuxt.js
- ts
- 调试

### node 

- 基础
- 事件流
- 爬虫
- Redis
- MongoDB
- https
- 鉴权（jwt\session）
- v8
- 中间件
- koa
- 邮件服务
- 即时通讯
- 日志服务

### 接口、自动化测试

- 接口
- mock数据
- 监控
- 集成测试

### 前端工程化

- webpack\gulp\yoeman
- git
- trello\ambition\jira
- showdoc\md
- 流程

### 持续集成

- docker
- Nginx
- caddy
- harbor、rancher
- Jenkins
- travics cl
- 接口数据安全
- 跨平台

### 跨平台

- 小程序
- 混合开发

### 其它

- vscode
- 规范
- npm
- 浏览器

---

### 高阶组件

就是用函数代替了基本类型在函数中的使用。（可以理解为因为函数具备可以`传参`和`运行`的能力）


- 代理高阶组件
- 继承高阶组件
- 反向高阶组件

react 周边技术
react 核心代码
react 性能测试


---

在B站补充，搜索：`数据结构`、`前端全栈`的课程

剑指Offer javascript
https://github.com/14glwu/FEInterviewBox
https://www.nowcoder.com/discuss/49349

node\python\go\C++

服务器、安全、设计模式



### 数据结构和算法

二分查找比较优先

- 数组结构算法

插入和删除 最好性能，因为底层刻录分配内存的时候。优点数组可以通过下标操作。

线性结构

#### 栈结构

栈和队列是受限制的线性结构

函数调用栈 

栈的实现有两种：基于数组、基于链表。

栈的常规操作：

- push(element)
- pop()
- peek()
- isEmpty()
- size()
- toString()

```js
/**
* Stack 类
*/
class Stack {
     constructor() {
        this.data = []; // 对数据初始化
        this.top = 0; // 初始化栈顶位置
     }
     
     // 入栈方法
     push() {
        const args = [...arguments];
        args.forEach(arg => this.data[this.top++] = arg);
        return this.top;
     }
     
     // 出栈方法
     pop() {
        if (this.top === 0) throw new Error('The stack is already empty!');
        const peek = this.data[--this.top];
        this.data = this.data.slice(0, -1);
        return peek;
     }
     
     // 返回栈顶元素
     peek() {
        return this.data[this.top - 1];
     }
     
     // 返回栈内元素个数
     size() {
        return this.top;
     }
     
     // 清除栈内所有元素
     clear() {
        this.top = 0;
        return this.data = [];
     }
     
     // 判断栈是否为空
     isEmpty() {
        return this.top === 0;
     }

     print() { //打印栈所有元素
        console.log(this.items.toString())
      }

     toString() {
        return this.items.toString()
     }

}

// 实例化
const stack = new Stack();
```

但是这里的data和top会被直接访问，会污染。

```js
let Stack = (function () {
  const items = new WeakMap()
  class Stack {
    constructor() {
        items.set(this, [])
    }
    push(element) {
        let s = items.get(this)
        s.push(element)
    }

    pop() {
        let s = items.get(this)
        let r = s.pop()
        return r
    }
    // 其他方法
  }
  return Stack
})();


```

https://www.jianshu.com/p/73264cf49e00
https://www.jianshu.com/p/7462856a93a8

#### 队列结构

first in first out, 受限的线性结构


enqueue()     入队
dequeue()     出队
front()          返回队首
back()          返回队尾
toString()      返回所有队列中所有元素
length()        返回队列的长度
clear()          清空队列

```js
while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      // 把队列的第一个人放入队尾循环队列
      queue.enqueue(queue.dequeue());
    }
}
```

#### 优先级队列

就是入队的时候，进行个规则
是否（就是出队的时候，进行个规则）

```js
enQueue = function (element, priority) {
    //创建对象
    var qElement = new QueueElement(element,priority)
    //判断队列是否为空
    if(this.items.length == 0){
       this.items.push(qElement)
    }else {
        var added = false;
        for(var i = 0; i < this.items.length;i++){
            if(qElement.priority < this.items[i].priority){
                //插入到当前位置
                this.items.splice(i,0,qElement)
                added = true;
                break;
            }
        }
        if(!added){
            this.items.push(qElement)
        }
    }
}
```

#### 堆



#### 链表 LinkedList


数组需要申请一段连续内存空间，插入和删除需要其他位移。（js Array 内部做了这些东西）
数组优点就是可以直接可以通过下标操作，（因为数组是一段连续内存空间）

链表内存不必连续内存空间，每个元素靠节点和指针下一个元素形成。

常见操作：

append(element)：向链表尾部添加一个新的项；
removeAt(position)：从链表的特定位置移除一项；
insert(position, element)：向链表的特定位置插入一个新的项；
indexOf(element)：返回元素在链表中的索引，如果链表中没有该元素则返回-1；
remove(element)：从链表中移除一项；
isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0，则返回false；
size()：返回链表包含的元素个数，与数组的length属性类似；
toString()：由于列表中的使用了Node类，就需要重写继承自JavaScript对象默认的toStringfang方法，只让其输出元素值


增删改查

#### 双向链表

就是为了解决链表的单一性查找而升级的。

无非就是在之前的节点上加个prev的指针指向上一个节点。

就是内存会大一点。

#### 集合

无序的、不能重复的

es6的 Set()\Map()



#### 字典

key是不可以重复的，value可以重复
key是无序的


#### 哈希表

注* 散列表（Hash table，也叫哈希表），是根据关键字（Key value）而直接访问在内存存储位置的数据结构。

基于数组，通过改变下标来处理。
key的唯一的。
性能非常不错。

哈希表最大的特点是可以快速定位到要查找的数据，查询的时间复杂度接近O(1)。


#### 树




#### 附加

排序算法
时间复杂度
内存机制

无论怎样，得了解数组和对象、还有函数在内存的表达。

《重温JavaScript底层基础，把基石打的牢固扎实点》



讲究 效率、熟练、应用


## 对象

Object.create(null);


## 数据结构与算法 目录

### 基础算法

- 字符串类

原型API灵活运用
字符串与数组的变换
类型转换&位运算

- 数组类

数学组合实现
卡牌分组算法
抽象设计挖掘规律
二进制编码技巧

- 正则类

基本用法
高级模式匹配
实现自定义正则规则

- 排序类

冒泡&选择排序
排序的复杂度
魔改排序解难题

- 递归类

动画演示递归的原理
递归的思路与规律
应用分析与实现


### 数据结构

- 堆

从零实现堆结构
复杂的堆应用（超级丑数）

- 栈

数组与栈
栈在数学运算中的应用
矩阵与栈

- 队列

从零实现队列结构
队列的扩展
队列的应用实现

- 链表

零实现链表结构
链表的排序
链表的环形结构

- 矩阵

螺旋矩阵
矩阵的旋转

- 二叉树

从零实现二叉树结构
对称二叉树
二叉搜索树


### 进价算法

- 贪心算法

经典算法的规律总结
贪心算法的技巧实现

- 动态规划

动态规划的原理揭秘
不同路径问题的巧实现




## 参考


https://github.com/14glwu/FEInterviewBox  
https://www.nowcoder.com/discuss/49349




















