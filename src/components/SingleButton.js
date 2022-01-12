
import './styles/SingleButton.css';

const SingleButton = ({ className, value, onClick }) => {
    return (
      <button className={className} onClick={onClick}>
        {value}
      </button>
    );
  };
  
  export default SingleButton;
