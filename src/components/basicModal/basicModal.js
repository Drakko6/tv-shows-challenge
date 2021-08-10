import { Modal, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./basicModal.scss";

const BasicModal = ({ show, children, onClose }) => {
  return (
    <Modal open={show} onClose={() => onClose()} className="basic-modal">
      <Paper className="children-container">
        <div className="close-container">
          <CloseIcon className="close-icon" onClick={() => onClose()} />
        </div>
        {children}
      </Paper>
    </Modal>
  );
};

export default BasicModal;
