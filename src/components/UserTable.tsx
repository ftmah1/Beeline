import styles from '../styles/UserTable.module.scss';
import Button from './Button';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
  };
}

interface UserTableProps {
  users: User[];
  onRemoveUser: (userId: number) => void;
}

function UserTable({ users, onRemoveUser }: UserTableProps) {
  return (
    <div className={`${styles['table-container']}`}>
      <div className={styles['table-scroll']}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
                <td>{user.address.suite + ' ' + user.address.street}</td>
                <td>
                  <Button
                    onClick={() => onRemoveUser(user.id)}
                    color="blue"
                    text="Remove user"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
