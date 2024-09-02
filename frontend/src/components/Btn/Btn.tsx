import styles from "./Btn.module.scss";

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Btn: React.FC<BtnProps> = ({ children, onClick, variant = 'primary' }) => {
  const btnClass = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  )
}

export default Btn
