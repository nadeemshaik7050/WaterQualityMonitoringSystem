import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../api/users';
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
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-red-600 p-4 text-center">
        User not found
      </div>
      <span className="text-gray-400 text-center">
        User is currently disabled, kindly enable to view details
      </span>
    </div>
  );
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
      <p className="text-lg">{user.userName ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
      <p className="text-lg">{user.email ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
      <p className="text-lg">{user.firstName ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
      <p className="text-lg">{user.lastName ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
      <p className="text-lg capitalize">{user.gender?.toLowerCase() ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
      <p className="text-lg">{user.role ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Joined Date</label>
      <p className="text-lg">{user.joinedDate ?? "NA"}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Points</label>
      <p className="text-lg font-semibold text-blue-600">{user.points ?? 0}</p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Reviews Given</label>
      <p className="text-lg">{user.numberOfReviewsGiven ?? 0}</p>
    </div>

     <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">Citizen Id</label>
      <p className="text-lg">{id}</p>
    </div>
  </div>
</div>

    </div>
  );
};
