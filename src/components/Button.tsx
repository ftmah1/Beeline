import styles from '../styles/Button.module.scss';

interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

function Button({ text, color, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles['button-container']}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
