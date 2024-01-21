
import "./css/image-modal.scss"

export const ImageModal = ({ isOpen, onClose, children,imageId }) => {
    console.log(imageId)
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <div className="navigation">
            <h1>Preview Id: {imageId}</h1>
            <span className="close-button" onClick={onClose}>
                &times;
            </span>
        </div>
       
        {children}
      </div>
    </div>
  );
};

