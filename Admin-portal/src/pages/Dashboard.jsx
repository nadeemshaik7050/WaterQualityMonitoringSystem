import { Link, useNavigate } from 'react-router-dom';
import { Users, Award, Crown } from 'lucide-react';
import RewardsBarChart from '../components/global/RewardsBarChart';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/users';
import { rewardApi } from '../api/rewards';
import { GenderBarChart } from '../components/global/GenderBarChart';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // ✅ Queries
  const { data: userCount, isLoading } = useQuery({
    queryKey: ["userCount"],
    queryFn: userApi.getCount,
  });

  const { data: getMaxPointsUsers } = useQuery({
    queryKey: ["getMaxPointsUsers"],
    queryFn: userApi.getMaxPointsUsers,
  });

  const { data: rewardCount } = useQuery({
    queryKey: ["rewardCount"],
    queryFn: rewardApi.getCountRewards,
  });

  const { data: genderCount } = useQuery({
    queryKey: ["genderCount"],
    queryFn: userApi.getGenderCount,
  });

  //  Extract max points user info safely
  const topUser = getMaxPointsUsers?.result?.[0];
  const topUserId = topUser?.citizenId;

  //  Function to handle tile click
  const handleMaxUserClick = async () => {
    if (!topUserId) {
      toast.error("No top user data found.");
      return;
    }

    try {
      // Pre-fetch user details using React Query
      await queryClient.fetchQuery({
        queryKey: ["userById", topUserId],
        queryFn: () => userApi.getById(topUserId),
      });

      // Navigate to that user's details page
      navigate(`/users/${topUserId}`);
    } catch (error) {
      toast.error("Failed to fetch user details.");
      console.error(error);
    }
  };

  //  Stats cards
  const stats = [
    {
      title: "Total Users",
      value: isLoading ? "..." : userCount ?? 0,
      icon: Users,
      color: "bg-blue-500",
      onClick: () => navigate("/users"),
    },
    {
      title: "Total Rewards",
      value: rewardCount ?? 0,
      icon: Award,
      color: "bg-green-500",
      onClick: () => navigate("/rewards"),
    },
    {
      title: "Max Points User",
      value: topUser?.userName ?? "NA",
      subValue: topUser?.totalPoints ?? 0,
      icon: Crown,
      color: "bg-purple-600",
      onClick: handleMaxUserClick, // 👈 integrated
    },
    {
      title: "Gender Distribution",
      value: `Male: ${genderCount?.male ?? 0}`,
      subValue: `Female: ${genderCount?.female ?? 0}`,
      icon: Users,
      color: "bg-yellow-700",
      onClick: () => navigate("/users"),
    },
  ];

  // UI rendering
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Citizen Water Quality Monitoring Platform</p>
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={stat.onClick}
            className="cursor-pointer bg-slate-100 rounded-lg shadow p-6 hover:bg-blue-100 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`${stat.color} p-3 rounded-lg text-white flex-shrink-0`}>
                <stat.icon size={26} />
              </div>
              <h3 className="text-gray-700 text-lg font-semibold">{stat.title}</h3>
            </div>

            {stat.title !== "Gender Distribution" ? (
              <>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                {stat.subValue && <p className="text-gray-500">{stat.subValue}</p>}
              </>
            ) : (
              <div className="mt-2">
                <GenderBarChart
                  male={genderCount?.male ?? 0}
                  female={genderCount?.female ?? 0}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom section: actions + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 border">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/users/create"
              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors"
            >
              + Add New User
            </Link>
            <Link
              to="/rewards/create"
              className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors"
            >
              + Create New Reward
            </Link>
            <Link
              to="/users"
              className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors"
            >
              View All Users
            </Link>
            <Link
              to="/rewards"
              className="block px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 font-medium transition-colors"
            >
              View All Rewards
            </Link>
          </div>
        </div>

        {/* Rewards chart */}
        <RewardsBarChart />
      </div>
    </div>
  );
}
