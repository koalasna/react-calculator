// This component stores calculation functions in order to keep them separated from App.js

import { useState } from 'react';

const Calculations = () => {


  // let -> const
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
    startOver: true
  }); 

  // state for the expression in order to have it visible on screen
  let [exp, setExp] = useState('');

const toLocaleString = (num) =>
String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

  // handler for numeric buttons
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    console.log('STAROVER: ', calc.startOver)

  if(calc.startOver){  //kaikki tyhjiä
    console.log('tyhjennetään näyttö ja muu')
    setCalc({
      ...calc,
      startOver: false
    });
    setExp(exp = ""); // tyhjennetään näyttö
  }

      if (removeSpaces(calc.num).length < 16) {
        setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
        startOver: false
      });
      setExp(
        calc.num === 0 && value === "0"
            ? exp = "0"
            : exp.length>1    // ettei ala nollasta
            ? exp += value
            : removeSpaces(calc.num) % 1 === 0
            ? exp = "" + toLocaleString(Number(removeSpaces(calc.num + value)))
            : exp = "" + toLocaleString(calc.num + value)
            
        ); // poista ehkä
    }
      console.log('EXP ', exp)
  };
  
  // handler for the comma button
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
    setExp(exp += value); // poista ehkä
  };

  // handler for the sign button
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    console.log('signklik so ', calc.startOver)
    console.log('signklik num res ', calc.num, calc.res)
    
    if(!calc.sign.length || (calc.res && calc.startOver)){//LISÄÄN TÄNNE ETTÄ + VALUE     
          console.log('signklik value: ', value)
          setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
            startOver: false
          });
          setExp(exp += value); // poista ehkä 
    }
  };

  // handler for equals -button
  const equalsClickHandler = () => {  // tee tää erilliseen funktioon
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
        startOver: true
      }); 
      // tää on vaikee  T O I M I I 
      setExp(
        calc.num === "0" && calc.sign === "/"
            ? exp = "Can't divide with 0"
            : exp = "" + toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              )
      );
    }
    console.log('CALC num res sign so', calc.num, calc.res, calc.sign, calc.startOver)
  };

  // handler for the invert -button
  const invertClickHandler = () => {

    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });

    setExp(
      calc.num !== 0
      ? exp = "" + toLocaleString(removeSpaces(calc.num) * -1) 
      : exp = "" + toLocaleString(removeSpaces(calc.res) * -1) 
    );
  };

  // handler for the percent -button
  const percentClickHandler = () => {

    console.log('PERC num res sign so', calc.num, calc.res, calc.sign, calc.startOver)

    /*
    if(calc.startOver){           // jatka tästä
      setCalc({
        ...calc,

      })
    } */ 

    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });

    setExp( // TOIMII
      exp = "" + num
    );

  };

  // handler for resetting 
  const resetClickHandler = () => {
    console.log('RESET clicked')
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
      startOver: true
    });
    setExp( exp = "");
  };

  return {numClickHandler, commaClickHandler, 
    signClickHandler, equalsClickHandler, 
    invertClickHandler, percentClickHandler,
    resetClickHandler, exp
   }
}

export default Calculations;

/*
REFERENCES 

https://sairys.medium.com/react-separating-responsibilities-using-hooks-b9c90dbb3ab9

*/