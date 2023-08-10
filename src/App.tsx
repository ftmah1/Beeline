import styles from './styles/App.module.scss';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <div>
      <h1 className={`${styles['header-style']}`}>User Management System</h1>
      <UsersPage />
    </div>
  );
}

export default App;
