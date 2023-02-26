import "./BackDrop.css";
import ReactDom from "react-dom";
const BackDrop = ({ children, onClick, className }) => {
  const content = (
    <div className={`backdrop ${className || ""}`} onClick={onClick}>
      {children}
    </div>
  );
  return ReactDom.createPortal(
    content,
    document.getElementById("backdrop__hook")
  );
};
export default BackDrop;
