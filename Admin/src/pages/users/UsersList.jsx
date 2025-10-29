import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, Trash2, Power } from 'lucide-react';
import { userApi } from '@/api/users';
import { useDebounce } from '@/hooks/useDebounce';

export const UsersList = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 10;
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', { pageNumber, pageSize, debouncedSearch }],
    queryFn: () => {
      if (debouncedSearch) {
        return userApi.search(debouncedSearch);
      }
      return userApi.getAll({ pageNumber, pageSize });
    },
  });

  const users = data?.result || [];
  const pagination = data?.pagination || { totalPageCount: 1, pageNumber: 0 };

  const handleToggleStatus = async (id) => {
    try {
      await userApi.toggleStatus(id);
      // Refetch data
      window.location.reload();
    } catch (error) {
      alert('Failed to toggle status: ' + error);
    }
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this user?')) return;
    
  //   try {
  //     await userApi.delete(id);
  //     window.location.reload();
  //   } catch (error) {
  //     alert('Failed to delete user: ' + error);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading users. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-secondary-800">User Management</h1>
        <Link
          to="/users/create"
          className="bg-gradient-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-medium transition-all duration-200"
        >
          <Plus size={20} />
          Create User
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-soft"
        />
      </div>

      <div className="bg-gradient-card rounded-lg shadow-soft overflow-hidden border border-secondary-100">

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Citizen ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Points</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Reviews</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-secondary-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.userId} className="hover:bg-secondary-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.citizenId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.points}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.totalReviews}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.activeStatus 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.activeStatus ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/users/${user.userId}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/users/edit/${user.userId}`}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(user.userId)}
                          className="text-orange-600 hover:text-orange-900"
                          title="Toggle Status"
                        >
                          <Power size={18} />
                        </button>
                        {/* <button
                          onClick={() => handleDelete(user.userId)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.totalPageCount > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-secondary-200">
            <button
              onClick={() => setPageNumber(p => Math.max(0, p - 1))}
              disabled={pageNumber === 0}
              className="px-4 py-2 border border-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-secondary-700">
              Page {pageNumber + 1} of {pagination.totalPageCount}
            </span>
            <button
              onClick={() => setPageNumber(p => p + 1)}
              disabled={pageNumber >= pagination.totalPageCount - 1}
              className="px-4 py-2 border border-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
