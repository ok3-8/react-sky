

## HTML 属性

```html
    <div value="" data-index="" ></div>
    <input format="" />
```

typescript不允许随便写HTML的属性，如果要自定义属性，需要加上data-*

typings/index.d.ts
```js
import * as React from 'react';

declare module 'react' {
     interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        format?: string;
        element?: string;
        modifiers?: string;
    }
}
```

## input 在react是怎么触发 onChange()



## mac下安装react开发工具 — React Devtools

https://www.jianshu.com/p/2a33667fb6a8

安装react-deltools  
npm install -g react-devtools  
安装完成后在命令行中执行react-devtools即可启动此工具：  
react-devtools   














