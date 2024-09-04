import styles from "./Modal.module.scss"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
        { children }
      </div>
    </div>
  )
}

export default Modal
