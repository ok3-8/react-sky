
type KeyCode = {
  key: string
  code: number
}

type Pipe = {
  value: string
  keyCode: number,
  format: string
}

type rePipe = {
  value: string
  isAllow: boolean
}

const allowInput: KeyCode[] = [
    { key: "backspace", code: 8 },
    { key: "left arrow", code: 37 },
    { key: "up arrow", code: 38 },
    { key: "right arrow", code: 39 },
    { key: "down arrow", code: 40 },
    { key: "delete", code: 46 },
    { key: "0", code: 48 },
    { key: "1", code: 49 },
    { key: "2", code: 50 },
    { key: "3", code: 51 },
    { key: "4", code: 52 },
    { key: "5", code: 53 },
    { key: "6", code: 54 },
    { key: "7", code: 55 },
    { key: "8", code: 56 },
    { key: "9", code: 57 },
    { key: "b", code: 66 },
    { key: "k", code: 75 },
    { key: "m", code: 77 },
    { key: "t", code: 84 },
    { key: "add", code: 107 },
    { key: "add", code: 180 },
    { key: "subtract", code: 109 },
    { key: "subtract", code: 189 },
    { key: "period", code: 110 },
    { key: "period", code: 190 },
];


function pipe({value, keyCode, format}: Pipe): rePipe {

  // 非允许输入
  // 不能输入两个点
  if( !isAllowInput(keyCode) || /[^0-9,-\.bkmt]/g.test(value) || /.*\..*\..*/g.test(value) ) { 
    return {
      value,
      isAllow: false
    } 
  };

  // 获取format长度限制， 包括正整数和小数点的时候
  const _format = formatInfo(format);

  // 最后一个是点的话，直接等待下一个输入
  let hasLastSpot: string = "";
  if(_format!.decimal !== 0 && /\.{1}/g.test(value) && /\.$/g.test(value)) { 
    value = value.replace(/\./g, "");
    hasLastSpot = ".";
  };

  // [-+]
  // number.replace(/"-"+|"+"+/g, "");
  // number = "-" + number;
  if(/\+/g.test(value) || /.*\-.*\-.*/g.test(value)) {
    value = value.replace(/\+|\-/g, "");
  };

  // [-]
  let hasSubtract: string = "";
  if(/-/g.test(value)) { 
    value = value.replace(/-/g, ""); 
    hasSubtract = "-";
  };

  if(value === "") value = "0";

  // 232,434.53434 => number  :   inputValueToNumber(); // hasTODO
  value = inputValueToNumber(value);

  // [kmbt]
  if(/k|K|m|M|b|B|t|T/g.test(value)) {
    value =  kmbtBinary(value);
  };

  // 长度限制， 包括正整数和小数点的时候
  // "5,0.[000]" | "12" | "0.[000]" | "0,0.[000]"
  value = lengthLimit(value, format);

  // number for format
  value = numberToFormat(value);

  return {
    value: hasSubtract + value + hasLastSpot,
    isAllow: true
  }

};

// length have limit
// "5,0.[000]" | "12" | "0.[000]" | "0,0.[000]"
function lengthLimit (value: string, format: string): string {

  const _format = formatInfo(format);

  let dianloaction = value.indexOf(".");

  let integer = "";
  let decimal = "";

  if( dianloaction === -1 ) {
    integer = value;
  }else {
    integer = value.slice(0, dianloaction);
    decimal = value.slice(dianloaction + 1);
  };
  
  integer = integer.length <= _format!.integer ? integer : integer.substr(0, _format!.integer);
  decimal = decimal.length <= _format!.decimal ? decimal : decimal.substr(0, _format!.decimal);

  if(integer === "") integer = "0";

  value = dianloaction === -1 ? integer : integer + "." + decimal;

  return value ;

}

function kmbtBinary(value: string): string {

  let binary: string = "";
  
  /k|K/g.test(value) ? binary = "000" : "";
  /m|M/g.test(value) ? binary = "000000" : "";
  /b|B/g.test(value) ? binary = "000000000" : "";
  /t|T/g.test(value) ? binary = "000000000000" : "";

  let dianloaction = value.indexOf(".");
  value =  dianloaction === -1 ? value + binary : value.slice(0, dianloaction) + binary + value.slice(dianloaction);
  value = value.replace(/k|K|m|M|b|B|t|T/g, "");

  return value

}


function inputValueToNumber(value: string): string {

  if(value ==='') return "0";
  value = value.replace(/^0+|,/g, "").replace(/^\./, "0.");

  return value;
};


function isAllowInput(keyCode: number): boolean {
  return allowInput.some(function(item: KeyCode){
     return item.code === keyCode
  });
}

// "5,0.[000]" | "12" | "0.[000]" | "0,0.[000]"
function formatInfo(value: string) {

  let _return = {
    integer: 0,
    decimal: 0
  }  

  if(value === '') {
    console.warn(`MoneyInput component "format" attributes can't be empty! e.g.: "5,0.[000]" | "12" | "0.[000]"`);
    return ;
  };

  const commaSplit = value.indexOf(","); 
  const splitArr = value.split(",");
  const lBrackets = value.indexOf("["); 
  const rBrackets = value.indexOf("]"); 

  // "5,0.[000]" | "0,0.[000]"
  if(commaSplit !== -1 && lBrackets !== -1) {
    _return = {
      integer: +splitArr[0],
      decimal: (rBrackets - lBrackets) - 1
    }   
  };

  // "12"
  if(commaSplit === -1 && lBrackets === -1) {
    _return = {
      integer: +splitArr[0],
      decimal: 0
    }   
  };

  // "0.[000]"
  if(commaSplit === -1 && lBrackets !== -1) {
    _return = {
      integer: 0,
      decimal: (rBrackets - lBrackets) - 1
    }   
  };

  return _return;
};

// input keydown value to format
// value: input value + keydown code
// (12345 | 0.123 | 123456.789) to (12,345 | 0.123 | 123,456.789)
function numberToFormat (value: string): string {

  // return (value).toLocaleString('en-US'); // 小数点过长有bug

  if(value ==='') return '0';

  const commaSplit = value.indexOf("."); 
  const splitArr = value.split(".");

  let integer: string = '0';
  let decimal: string = '';

  // 12345
  if(commaSplit === -1) {
    integer = splitArr[0];
    decimal = '';
  };

  // 0.123 | 123456.789
  if(commaSplit !== -1) {
    integer = splitArr[0];
    decimal = splitArr[1];
  };

  let result = '';
  while (integer.length > 3) {
      result = ',' + integer.slice(-3) + result;
      integer = integer.slice(0, integer.length - 3);
  }
  if (integer) { result = integer + result; }

  return result + (decimal ?  "." + decimal : "") ;

}

// input value format to number
// 去掉逗号；在数字前面不能输入0；.1234；
const formatToNumber = (value: string): string => {

  if(value === "") return "0";

  if(/[^0-9,-\.]/g.test(value)) {
    console.warn(`MoneyInput component value contains illegal input!`);
    return "0";
  };

  let hasSubtract: string = "";

  if(/-/g.test(value)) { 
    value = value.replace(/-/g, ""); 
    hasSubtract = "-";
  };
  
  value = value
    .replace(/^0+|,|\.$/g, "")
    .replace(/^\./, "0.");

  return hasSubtract + value;
}

export default {
  pipe,
  formatToNumber
};
