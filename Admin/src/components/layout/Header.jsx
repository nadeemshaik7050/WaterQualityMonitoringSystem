import { Link } from 'react-router-dom';
import KeycloakService from '@/lib/keycloak/service';

export const Header = () => {
  const handleLogout = () => {
    KeycloakService.doLogout();
  };

  const username = KeycloakService.getUsername() || 'Admin';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">💧</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-800">Practice Portal</span>
            <span className="text-xs text-gray-500">Admin Dashboard</span>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">👤 {username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm border border-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
