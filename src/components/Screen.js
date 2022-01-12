// Screen will display the calculated values. It is located at the top of the Wrapper

import { Textfit } from 'react-textfit';
import './styles/Screen.css'

const Screen = ({value }) => {

  // jos value on "" niin näytä 0
  if(value === "")
    value = 0;
  

  return(
      <Textfit className="screen" mode="single" max={70}>
        {value}
      </Textfit> 
    );
  }
  
export default Screen;
