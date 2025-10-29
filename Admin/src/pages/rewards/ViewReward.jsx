import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Edit, ImageIcon } from 'lucide-react';
import { rewardApi } from '@/api/rewards';

export default function ViewReward() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: reward, isLoading, error } = useQuery({
    queryKey: ['reward', id],
    queryFn: () => rewardApi.getById(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !reward) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Reward not found</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/rewards')}
            className="text-secondary-600 hover:text-secondary-900"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold">Reward Details</h1>
        </div>
        <Link
          to={`/rewards/edit/${id}`}
          className="bg-gradient-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-medium transition-all"
        >
          <Edit size={20} />
          Edit
        </Link>
      </div>

      <div className="bg-gradient-card rounded-lg shadow-soft p-6 max-w-2xl">
        <div className="space-y-4">
          {/* Reward Image Section */}
          <div>
            <label className="block text-sm font-medium text-secondary-500 mb-2">Reward Image</label>
            <div className="w-[300px] h-[200px] bg-secondary-100 rounded-lg flex items-center justify-center overflow-hidden border border-secondary-200">
              {reward.imageUrl ? (
                <img 
                  src={reward.imageUrl} 
                  alt={reward.rewardName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-secondary-400">
                  <ImageIcon size={48} className="mb-2" />
                  <span className="text-sm">No image available</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-500">Reward ID</label>
            <p className="mt-1 text-lg">{reward.rewardId}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-500">Reward Name</label>
            <p className="mt-1 text-lg">{reward.rewardName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-500">Rank</label>
              <p className="mt-1 text-lg">{reward.rank}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-500">Level</label>
              <p className="mt-1">
                <span className={`px-3 py-1 rounded text-sm font-medium ${
                  reward.level === 'Platinum' ? 'bg-purple-100 text-purple-800' :
                  reward.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                  reward.level === 'Silver' ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {reward.level}
                </span>
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-500">Points Required</label>
            <p className="mt-1 text-lg">{reward.pointsRequired}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-500">Description</label>
            <p className="mt-1 text-lg">{reward.description || 'N/A'}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-500">Redeemed</label>
              <p className="mt-1">
                <span className={`px-3 py-1 rounded text-sm ${
                  reward.redeemed ? 'bg-green-100 text-green-800' : 'bg-secondary-100 text-secondary-800'
                }`}>
                  {reward.redeemed ? 'Yes' : 'No'}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-500">Status</label>
              <p className="mt-1">
                <span className={`px-3 py-1 rounded text-sm ${
                  reward.activeStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {reward.activeStatus ? 'Active' : 'Inactive'}
                </span>
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-500">Created Date</label>
            <p className="mt-1 text-lg">{new Date(reward.createdDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
