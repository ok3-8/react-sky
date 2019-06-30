import _extends from "@babel/runtime/helpers/extends";
import { withStyles as withStylesWithoutDefault } from '@material-ui/styles';
import defaultTheme from './defaultTheme';

function withStyles(stylesOrCreator, options) {
  return withStylesWithoutDefault(stylesOrCreator, _extends({
    defaultTheme
  }, options));
}

export default withStyles;

// export default withStylesWithoutDefault(stylesOrCreator, _extends({
//     defaultTheme
//   }, options));


// withStylesWithoutDefault(styles, _extends({ defaultTheme }, {name: 'MuiButton'}))

//  (Button);

//  export default withStyles(styles, { name: 'MuiAppBar' })(AppBar);
// //这里的作用是什么?
// withStyles 是一个 HOC 组件，会为你的 AppBar 组件根据当前的 theme 来添加样式。核心功能就是为子组件提供了一个 classes props，这样你就可以在外部对 class name 进行修改。
// 在你这个例子中，就会将第一个参数 styles 的样式，覆盖掉原来主题中的 MuiAppBar 样式。


// https://segmentfault.com/q/1010000012687223
