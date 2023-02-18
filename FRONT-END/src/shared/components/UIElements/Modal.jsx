import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";
import "./Modal.css";
const Modal = (props) => {
  return (
    <>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        classNames="modal"
        timeout={200}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

const ModalOverlay = ({
  style,
  children,
  headerTitle,
  headerClassNames,
  contentClassNames,
  onSubmit,
  footerContent,
  footerClassNames,
}) => {
  const content = (
    <div className="modal" style={style}>
      <header className={`modal__header ${headerClassNames}`}>
        <h2>{headerTitle}</h2>
      </header>
      <form
        className={`modal__content ${contentClassNames}`}
        onSubmit={
          onSubmit
            ? onSubmit
            : (event) => {
                event.preventDefault();
              }
        }
      >
        {children}
        <footer className={`modal__footer ${footerClassNames}`}>
          {footerContent}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal__hook"));
};

export default Modal;
