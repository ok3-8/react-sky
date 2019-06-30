import React from 'react';
import logo from './logo.svg';
import './App.css';

import NumberFormat from 'react-number-format';

import { Button, Input, TextField,FormControl, Select, InputLabel, InputAdornment, MenuItem, Checkbox } from 'mui';


const textStyles = {
  padding: '20px',
  borderRadius: '5px',
  backgroundColor: "#fff"
};

function handClik(){
  // alert(5555)
}


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}



function App() {
  const [values, setValues] = React.useState({
      age: '',
      name: 'hai',
      numberformat: '1320',
    });

  function handleChange(event) {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
    }

  const thandleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  }; 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={textStyles}>
          <Button variant="contained" onClick={handClik} color="primary">
            我就是 npm link 过来的 mui => Button
          </Button>
          <br />
          <Input value="Input" />
          <br />
           <Input
          id="adornment-amount"
          value="5555"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
          <br />
          <TextField
            id="standard-name"
            label="Name"
            value="TextField"
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Name"
            value=""
            margin="normal"
          />
          <br />

          <FormControl>
        <InputLabel htmlFor="age-simple">Age</InputLabel>
        <Select
          value={values.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
          <br />

          <Checkbox
            value="checkedA"
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />
        </div>
        <div style={textStyles}>
          <TextField
            label="react-number-format"
            value={values.numberformat}
            onChange={thandleChange('numberformat')}
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumberFormatCustom,
              startAdornment: <InputAdornment position="start">$</InputAdornment>
            }}
            
          />

        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
