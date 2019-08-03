import React, { ReactNode, useState, ReactElement }  from 'react';
import numberFormat from './format';

import './style.less';


type State = {
    value?: string
}


const Input: React.FC = () => {

    const inputRef = React.createRef<HTMLInputElement>();

    const [state, setState] = useState<State>({
        value: "123456"
    });
   
    // "5,0.[000]" | "12" | "0.[000]" | "0,0.[000]"
    const format = "8,0.[000]";
    

    let isAllowInput: boolean = false;
    let inputValue: string | undefined = state.value;
    let keyCode: number;
    

    function handelChange(e: React.ChangeEvent<HTMLInputElement>) {

       // console.log("handelChange");

        //inputRef.current

        // console.log(inputRef);
        // console.log('state', state);

        // console.log(numberFormat.formatInfo("5,0.[000]"));


        let input = e.currentTarget;

        const cops = numberFormat.getCursortPosition(input);
        
        console.log("cops:", cops);

        isAllowInput && setState({
           value: inputValue
        });
        setTimeout(()=>{
            numberFormat.setCaretPosition(input, cops);
        }, 0)
        

    }
    function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {

      // console.log("handleKeydown");
        // console.log(e.currentTarget);
      //  console.log(e.key);
      // console.log(e.keyCode);
       // console.log("handleKeydown");


        keyCode = e.keyCode;

      //  isAllowInput = numberFormat.isAllowInput(e.keyCode);


       // isAllowInput = numberFormat.allowInputPipe(e.keyCode);

    }

    function handelInput(e: React.KeyboardEvent<HTMLInputElement>) {

        const { value } = inputRef.current!;

       // console.log("handelInput", value, keyCode);
        // console.log(e);
        // console.log(e.key);
        // console.log(e.keyCode);
        // console.log("handelInput");



       const rePipe = numberFormat.pipe({value, keyCode, format});
       isAllowInput = rePipe.isAllow;
       inputValue = rePipe.value;

    }

    function handleButtonClick() {
        // setState({
        //     value: Math.random() * 10 + ''
        //  });

        // numberFormat.setCaretPosition(inputRef, 3);
    }

    function handelClick(e: React.MouseEvent<HTMLElement>){
        // numberFormat.getCursortPosition(inputRef);
        //console.log(e.currentTarget);
        //numberFormat.setCaretPosition(e.currentTarget, 3);
    }

    return (
        <div className="input">
            <input ref={inputRef} value={state.value} onChange={handelChange} onKeyDown={handleKeydown} onClick={handelClick} onInput={handelInput} />
            <button onClick={handleButtonClick}>click to change input value!</button>
        </div>
    )
}

export default Input;