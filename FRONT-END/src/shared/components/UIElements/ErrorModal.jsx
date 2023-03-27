import Button from "../FormElement/Button";
import Modal from "./Modal";

const ErrorModal = ({ error, onClear }) => {
  return (
    <Modal
      headerTitle="An error has occured!"
      show={!!error}
      footerContent={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};
export default ErrorModal;
