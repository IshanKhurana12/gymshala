import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
        setFilteredUsers(data); // Initialize filteredUsers with all users
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  // Check authentication and fetch users when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login'); // Redirect to /login if not authenticated
      } else {
        fetchUsers();
      }
    };

    checkAuth();
  }, [navigate]);

  const handleFilterChange = (e) => {
    const filterValue = e.target.value.trim();
    if (filterValue === '') {
      setFilteredUsers(users); // Show all users if input is empty
    } else {
      const filtered = users.filter((user) =>
        user.number.toString().includes(filterValue)
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <>
      <div
        style={{
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#000', // Black background
          color: '#fff', // White text
        }}
      >
        <input
          type="text"
          placeholder="Filter by phone number"
          style={{
            marginBottom: '20px',
            padding: '10px',
            width: '100%',
            border: '1px solid #FFD700', // Yellow border
            borderRadius: '5px',
            backgroundColor: '#fff', // White background
            color: '#000', // Black text
          }}
          onChange={handleFilterChange}
        />
        <h1
          style={{
            textAlign: 'center',
            color: '#FFD700', // Yellow text
          }}
        >
          User List
        </h1>
        {filteredUsers.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                style={{
                  background: '#333', // Dark gray background
                  margin: '10px 0',
                  padding: '10px',
                  border: '1px solid #FFD700', // Yellow border
                  borderRadius: '5px',
                  color: '#fff', // White text
                }}
              >
                <strong>Name:</strong> {user.name} <br />
                <strong>Mobile Number:</strong> {user.number} <br />
                <strong>Address:</strong> {user.address} <br />
                <strong>Membership:</strong> {user.membership} Days <br />
                <strong>Joining Date:</strong>{' '}
                {new Date(user.created_at).toLocaleString()} <br />
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', color: '#FFD700' }}>
            No users found.
          </p>
        )}
      </div>
    </>
  );
}

export default App;
