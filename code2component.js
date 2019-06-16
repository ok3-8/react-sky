import React from "react";
import ReactDOM from "react-dom";
import { transform } from "babel-standalone";
import Button from "@material-ui/core/Button";

import "./styles.css";

function code2Component() {
  const mdCode = `
        render() {
          return (
            <div>
              <Button>Default Button</Button>
              <Button variant="outlined" color="primary">Primary Button</Button>
              <Button variant="outlined" color="secondary">Secondary Button</Button>
            </div>
          )
        }
    `;

  const code = transform(
    `
        class Demo extends React.Component {
          ${mdCode}
        }
        ReactDOM.render(<Demo />, document.getElementById('demo'))
      `,
    {
      presets: ["es2015", "react"]
    }
  ).code;

  const func = new Function("React", "ReactDOM", "Button", code);

  func(React, ReactDOM, Button);
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div id="demo" />
    </div>
  );
}

setTimeout(() => {
  code2Component();
}, 800);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
