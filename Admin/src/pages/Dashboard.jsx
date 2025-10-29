import { Link } from 'react-router-dom';
import { Users, Award, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'bg-blue-500',
      link: '/users'
    },
    {
      title: 'Total Rewards',
      value: '45',
      icon: Award,
      color: 'bg-green-500',
      link: '/rewards'
    },
    // {
    //   title: 'Active Users',
    //   value: '1,089',
    //   icon: Activity,
    //   color: 'bg-purple-500',
    //   link: '/users'
    // },
    // {
    //   title: 'Total Points Earned',
    //   value: '125,840',
    //   icon: TrendingUp,
    //   color: 'bg-orange-500',
    //   link: '/users'
    // },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Citizen Water Quality Monitoring Platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
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

        {/* <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Reward redeemed</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Water quality test submitted</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">User points updated</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
