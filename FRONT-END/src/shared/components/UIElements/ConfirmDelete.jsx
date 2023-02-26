import { CSSTransition } from "react-transition-group";
import Button from "../FormElement/Button";
import BackDrop from "./BackDrop";

import "./ConfirmDelete.css";

const ConfirmDelete = ({ show, onCancel, onConfirm, message }) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={100}
      classNames="confirm-delete"
    >
      <BackDrop onClick={onCancel} className={"confirm-delete__container"}>
        <div
          className="confirm-delete__box"
          onClick={(e) => e.stopPropagation()}
        >
          <p>{message}</p>
          <div className="confirm-delete__actions">
            <Button danger onClick={onConfirm}>
              Delete
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </BackDrop>
    </CSSTransition>
  );
};

export default ConfirmDelete;
