import styles from "./Btn.module.scss";

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'round';
}

const Btn: React.FC<BtnProps> = ({ children, onClick, variant = 'primary' }) => {
  let btnClass = '';
  if (variant === 'primary') {
    btnClass = styles.primary;
  } else if (variant === 'secondary') {
    btnClass = styles.secondary;
  } else if (variant === 'round') {
    btnClass = styles.round;
  }

  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  )
}

export default Btn
