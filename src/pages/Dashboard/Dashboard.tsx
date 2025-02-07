import { useState, useEffect } from 'react';
import { Users, BarChart3, Users2, UserPlus } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { UsersTable } from './components/UsersTable';
import { fetchUsers, fetchUserStats, fetchSubscriberTiers, fetchUserChanges } from '../../lib/api';
import type { User, UserStats, SubscriberTiers, UserChanges } from '../../types/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [tiers, setTiers] = useState<SubscriberTiers | null>(null);
  const [changes, setChanges] = useState<UserChanges | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, statsData, tiersData, changesData] = await Promise.all([
          fetchUsers(),
          fetchUserStats(),
          fetchSubscriberTiers(),
          fetchUserChanges(),
        ]);
        
        setUsers(usersData);
        setStats(statsData);
        setTiers(tiersData);
        setChanges(changesData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      }
    };

    loadData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', icon: Users2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
                  ${activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && stats && changes && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Daily Users"
                value={stats.daily_users}
                icon={<Users className="w-6 h-6" />}
              />
              <StatsCard
                title="Weekly Users"
                value={stats.weekly_users}
                icon={<Users className="w-6 h-6" />}
              />
              <StatsCard
                title="Monthly Users"
                value={stats.monthly_users}
                icon={<Users className="w-6 h-6" />}
              />
              <StatsCard
                title="New Users (Last Week)"
                value={changes.new_users}
                icon={<UserPlus className="w-6 h-6" />}
                trend={{
                  value: ((changes.new_users - changes.cancelled_users) / changes.new_users) * 100,
                  isPositive: changes.new_users > changes.cancelled_users
                }}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">User List</h2>
                <UsersTable users={users} />
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && tiers && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(tiers).map(([tier, count]) => (
                <StatsCard
                  key={tier}
                  title={`${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan`}
                  value={count}
                  icon={<Users2 className="w-6 h-6" />}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
