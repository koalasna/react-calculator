// This is the frame that holds all children components in place.
// With it's help we later be able to center the whole app afterward

import "./styles/Wrapper.css";

const Wrapper = ({ children }) => (
    <div className="wrapper">{children}</div>
);

export default Wrapper;
