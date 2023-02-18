import "./BackDrop.css";
import ReactDom from 'react-dom'
const BackDrop = ({ children, onClick }) => {
  const content = (
    <div className="backdrop" onClick={onClick}>
      {children}
    </div>
  );
  return ReactDom.createPortal(content,document.getElementById('backdrop__hook'))
};
export default BackDrop;
