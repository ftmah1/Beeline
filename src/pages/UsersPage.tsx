import { useState } from 'react';
import styles from '../styles/UsersPage.module.scss';
import Button from '../components/Button';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import UserTable, { User } from '../components/UserTable';
import WarningMessage from '../components/WarningMessage';
import { useApi } from '../hooks/useApi';
import { USER_API_URL } from '../apiUrls';

function UsersPage() {
  const [warning, setWarning] = useState<string>('');

  const {
    loading,
    data: users,
    setData: setUsers,
    error,
    fetchData: fetchUsers,
  } = useApi<User[]>(USER_API_URL);

  const handleRemoveUser = (userId: number) => {
    const updatedUsers = users?.filter((user) => user.id !== userId);
    if (updatedUsers) setUsers(updatedUsers);
  };

  const handleReloadUsers = () => {
    if (users?.length === 0) {
      setWarning('');
      fetchUsers();
    } else {
      setWarning('Cannot reload while users exist.');
    }
  };

  const handleClearUsers = () => {
    setWarning('');
    setUsers([]);
  };

  return (
    <div>
      {!!warning && <WarningMessage message={warning} />}
      {!!loading && <LoadingPlaceholder />}
      {!loading && !error && !!users && (
        <div>
          <div className={`${styles['buttons-count-container']}`}>
            <div className={`${styles.count}`}>
              <h2>Total Users: {users ? users.length : 0}</h2>
            </div>
            <Button
              text="Reload Users"
              color="green"
              onClick={handleReloadUsers}
            />
            <Button text="Clear Users" color="red" onClick={handleClearUsers} />
          </div>
          <UserTable users={users} onRemoveUser={handleRemoveUser} />
        </div>
      )}
      {!!error && <p>sorry something went wrong</p>}
    </div>
  );
}

export default UsersPage;
