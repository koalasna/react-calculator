import React from 'react';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import Buttons from './components/Buttons';
import SingleButton from './components/SingleButton';
import Calculations from './components/Calculations';
import Paragraph from './components/Paragraph';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

/* 
    KORJAA
    - tulos + lauseke CHECK
    - tarkista signswitch CHECK
    - percent DO THIS
*/

const App = () => {
  
  const {numClickHandler, commaClickHandler, 
    signClickHandler, equalsClickHandler, 
    invertClickHandler, percentClickHandler,
    resetClickHandler, exp
   } = Calculations();

  return (
    <Wrapper>
      <Screen value={exp}/>
      <Buttons>
      {btnValues.flat().map((btn, i) => {
          return (
            <SingleButton
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={ 
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </Buttons>
    <Paragraph />
    </Wrapper>  
  );
};

export default App;

/*
REFERENCES 

https://www.sitepoint.com/react-tutorial-build-calculator-app/

*/
