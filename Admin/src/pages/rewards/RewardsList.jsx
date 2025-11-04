import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Eye, Edit, Power } from 'lucide-react';
import { rewardApi } from '@/api/rewards';
import { useDebounce } from '@/hooks/useDebounce';
import toast from 'react-hot-toast';

export default function RewardsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const debouncedSearch = useDebounce(searchQuery, 300);

    const queryClient = useQueryClient();


  //   Get all rewards once
  const { data, isLoading, error } = useQuery({
    queryKey: ['rewards'],
    queryFn: rewardApi.getAll,
  });

  const allRewards = data?.result || [];

  //   Frontend filter (case-insensitive)
  const filteredRewards = allRewards.filter((reward) =>
    reward.rewardName.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  //   Pagination logic (still works)
  const totalPages = Math.ceil(filteredRewards.length / pageSize);
  const paginatedRewards = filteredRewards.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );


const handleToggleStatus = async (rewardId) => {
  const result = await rewardApi.toggleRewardStatus(rewardId);

  if (result.success) {
    toast.success("Reward status updated successfully!");
    queryClient.invalidateQueries(["rewards"]);
  } else {
    toast.error(`Failed to toggle reward status: ${result.message}`);
  }
};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading rewards</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-secondary-800">
          Rewards Management
        </h1>
        <Link
          to="/rewards/create"
          className="bg-gradient-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:shadow-medium transition-all duration-200"
        >
          <Plus size={20} />
          Create Reward
        </Link>
      </div>

      {/*   Search input (filters frontend data) */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search rewards..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0); // reset to first page on search
          }}
          className="w-full md:w-96 px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white shadow-soft"
        />
      </div>

      {/*   Table */}
      <div className="bg-gradient-card rounded-lg shadow-soft overflow-hidden border border-secondary-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Reward Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Min Points
                </th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Max Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {paginatedRewards.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-secondary-500"
                  >
                    No rewards found
                  </td>
                </tr>
              ) : (
                paginatedRewards.map((reward) => (
                  <tr
                    key={reward.rewardId ?? "NA"}
                    className="hover:bg-secondary-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reward.rewardName ?? "NA"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reward.minPoints ?? "NA"}
                    </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                      {reward.maxPoints ?? "NA"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          !reward.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {!reward.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/rewards/${reward.rewardId}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/rewards/edit/${reward.rewardId}`}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(reward.rewardId)}
                          className="text-orange-600 hover:text-orange-900"
                          title="Toggle Status"
                        >
                          <Power size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/*   Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-secondary-200">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 border border-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-secondary-700">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
              }
              disabled={currentPage >= totalPages - 1}
              className="px-4 py-2 border border-secondary-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
