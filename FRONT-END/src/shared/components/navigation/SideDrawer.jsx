import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";
const SidebarDrawer = ({ show, closeDrawer, children }) => {
  const content = (
    <CSSTransition
      in={show}
      classNames="side-in-left"
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <aside className={`sidebar-drawer`} >
        <i className="close-btn" onClick={closeDrawer}>
          +
        </i>
        {children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("sideDrawer"));
};
export default SidebarDrawer;
