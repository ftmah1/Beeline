import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import UsersPage from '../pages/UsersPage';
import * as useApiModule from '../hooks/useApi';
import UserTable from '../components/UserTable';

describe('UsersPage', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('renders loading placeholder initially', async () => {
    // Mock the implementation of useApi function
    const mockUseApi = jest.spyOn(useApiModule, 'useApi');
    mockUseApi.mockReturnValue({
      loading: true,
      data: null,
      error: false,
      fetchData: jest.fn(),
      setData: jest.fn(),
    });
    render(<UsersPage />);
    await waitFor(() => {
      const loadingPlaceholder = screen.getByText('Loading....');
      expect(loadingPlaceholder).toBeInTheDocument();
    });
  });

  it('renders users successfully', async () => {
    // Mock the implementation of useApi function
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
    const mockUseApi = jest.spyOn(useApiModule, 'useApi');
    mockUseApi.mockReturnValue({
      loading: false,
      data: mockUsers,
      error: false,
      fetchData: jest.fn(),
      setData: jest.fn(),
    });
    //Render the component
    render(<UsersPage />);

    // Wait for the user data to appear and then perform your assertions
    await waitFor(() => {
      // Assert user names
      expect(screen.getByText('User 1')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('User 2')).toBeInTheDocument();

      // Assert user company names
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Company 1')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Company 2')).toBeInTheDocument();

      // You can add more assertions as needed for other user data
    });
  });

  it('renders error', async () => {
    // Mock the implementation of useApi function
    const mockUseApi = jest.spyOn(useApiModule, 'useApi');
    mockUseApi.mockReturnValue({
      loading: false,
      data: null,
      error: true,
      fetchData: jest.fn(),
      setData: jest.fn(),
    });

    // Render the component
    render(<UsersPage />);

    // Wait for the error message to appear and then perform your assertions
    await waitFor(() => {
      const error = screen.getByText('sorry something went wrong');
      expect(error).toBeInTheDocument();
    });
  });

  it('tests if remove user is invoked', async () => {
    // Mock the implementation of useApi function
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
    const mockUseApi = jest.spyOn(useApiModule, 'useApi');
    mockUseApi.mockReturnValue({
      loading: false,
      data: mockUsers,
      error: false,
      fetchData: jest.fn(),
      setData: jest.fn(),
    });
    const mockHandleRemoveUser = jest.fn();
    render(<UsersPage />, {
      wrapper: () => (
        <UserTable users={mockUsers} onRemoveUser={mockHandleRemoveUser} />
      ),
    });

    const removeButton = screen.getAllByText(/Remove user/i)[0];
    fireEvent.click(removeButton);
    expect(mockHandleRemoveUser).toBeCalledTimes(1);
  });
});
