/* eslint-disable react/prop-types */
import "./popupad.css";
import Modal from "react-modal";
const PopUpAd = ({ modalIsOpen, closeModal }) => {
  Modal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      background: "transparent",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="d-flex justify-content-center mt-5">
        <div className="pop-up-card p-3 cookie">
          <span>
            Please book property carefully. Check the details and images of the
            property properly before booking any property.
            <br />
          </span>
          <a href="#">
            Learn more
            <i className="fa fa-angle-right ml-2" />
          </a>
          <div className="mt-4 text-right">
            <button
              className="btn btn-light btn-sm"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PopUpAd;
