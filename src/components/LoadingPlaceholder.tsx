import logo from '../logo.svg';
import styles from '../styles/LoadingPlaceHolder.module.scss';

const LoadingPlaceholder = () => {
  return (
    <div className={`${styles.App}`}>
      <header className={`${styles['App-header']}`}>
        <img src={logo} className={`${styles['App-logo']}`} alt="logo" />
        <p>Loading....</p>
      </header>
    </div>
  );
};

export default LoadingPlaceholder;
