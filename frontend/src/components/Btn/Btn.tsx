import styles from "./Btn.module.scss";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Btn: React.FC<Props> = ({ children, onClick, variant = 'primary' }) => {
  const btnClass = variant === 'primary' ? styles.primary : styles.secondary;

  return (
    <button onClick={onClick} className={btnClass}>
      {children}
    </button>
  )
}

export default Btn
