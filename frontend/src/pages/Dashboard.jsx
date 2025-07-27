import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Role: {user.role}</h2>

      {user.role === 'admin' && (
        <div>
          <h3>Admin Dashboard</h3>
          {/* Admin-specific content here */}
        </div>
      )}

      {user.role === 'store_owner' && (
        <div>
          <h3>Store Owner Dashboard</h3>
          {/* Store owner content */}
        </div>
      )}

      {user.role === 'user' && (
        <div>
          <h3>User Dashboard</h3>
          {/* User content */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
