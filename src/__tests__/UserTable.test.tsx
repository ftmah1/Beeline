import { fireEvent, render, screen } from '@testing-library/react';
import UserTable from '../components/UserTable';

describe('Users Table', () => {
  it('renders table successfully and tests if onRemoveUser handler has been called', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'User 1',
        company: { name: 'Company 1' },
        address: { street: 'Street 1', suite: 'Suite 1' },
        phone: '111-111-1111',
        email: 'user1@example.com',
      },
      {
        id: 2,
        name: 'User 2',
        company: { name: 'Company 2' },
        address: { street: 'Street 2', suite: 'Suite 2' },
        phone: '222-222-2222',
        email: 'user2@example.com',
      },
    ];
    const onRemoveUser = jest.fn(() => {});
    render(<UserTable users={mockUsers} onRemoveUser={onRemoveUser} />);
    const removeButton = screen.getAllByText(/Remove user/i)[0];
    fireEvent.click(removeButton);
    // Assert user names
    expect(screen.getByText('User 1')).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText('User 2')).toBeInTheDocument();
    expect(onRemoveUser).toHaveBeenCalledWith(1);
  });
});
