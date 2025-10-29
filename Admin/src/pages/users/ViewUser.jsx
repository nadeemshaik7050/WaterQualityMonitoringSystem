import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/users';
import { toast } from 'sonner';

export const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: userApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted successfully');
      navigate('/users');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: userApi.toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User status updated');
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-red-600 p-4">User not found</div>;
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/users')}
            className="text-secondary-600 hover:text-secondary-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">User Details</h1>
        </div>
        <Link
          to={`/users/edit/${id}`}
          className="bg-gradient-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-medium transition-all"
        >
          <Edit size={20} />
          Edit
        </Link>
      </div>

      <div className="bg-gradient-card rounded-lg shadow-soft p-6 max-w-2xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
            <p className="text-lg">{user.username}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Citizen ID</label>
            <p className="text-lg">{user.citizenId}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
            <p className="text-lg">{user.gender}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Age</label>
            <p className="text-lg">{user.age}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Points</label>
            <p className="text-lg font-semibold text-blue-600">{user.points}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Total Reviews</label>
            <p className="text-lg">{user.totalReviews}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Joined Date</label>
            <p className="text-lg">{user.joinedDate}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
              user.activeStatus 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {user.activeStatus ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="pt-6 border-t flex space-x-4">
          <Link
            to={`/users/${id}/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit User
          </Link>
          <button
            onClick={() => toggleStatusMutation.mutate(id)}
            disabled={toggleStatusMutation.isPending}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition disabled:opacity-50"
          >
            {user.activeStatus ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};
