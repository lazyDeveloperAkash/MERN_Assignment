import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const Dashboard = () => {
  const { user, signout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">User Dashboard</h2>
          <p className="text-gray-600">Welcome, <span className="text-indigo-600 font-semibold">{user.email}</span></p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
