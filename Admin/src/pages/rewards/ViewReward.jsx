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

  <div className="bg-gradient-card rounded-lg shadow-soft p-6 max-w-4xl mx-auto mt-20">
  <div className="flex flex-col md:flex-row items-start gap-8">

    {/* Left: Reward Details */}
    <div className="w-full md:w-1/2 space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-500">Reward ID</label>
        <p className="mt-1 text-lg">{reward?.id || "NA"}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-500">Reward Name</label>
        <p className="mt-1 text-lg">{reward?.name || "NA"}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-500">Points Required</label>
        <p className="mt-1 text-lg">{reward?.points || "NA"}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-500">Description</label>
        <p className="mt-1 text-lg">{reward?.description || "N/A"}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-500">Status</label>
        <p className="mt-1">
          <span className={`px-3 py-1 rounded text-sm ${reward?.activeStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {reward?.activeStatus ? 'Active' : 'Inactive'}
          </span>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-500">Created Date</label>
        <p className="mt-1 text-lg">{reward?.creationDate || "NA"}</p>
      </div>
    </div>

    {/* Right: Reward Image */}
    <div className="w-full md:w-1/2 flex justify-center items-center">
      <div className="w-[350px] h-[280px] bg-secondary-100 rounded-lg flex items-center justify-center overflow-hidden border border-secondary-200">
        {reward?.image?.data ? (
          <img
            src={`data:image/png;base64,${reward.image.data}`}
            alt={reward.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-secondary-400">
            <ImageIcon size={48} className="mb-2" />
            <span className="text-sm">No image available</span>
          </div>
        )}
      </div>
    </div>

  </div>
</div>

    </div>
  );
}
