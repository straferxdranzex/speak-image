import { useState, useEffect } from "react";
import { Users, BarChart3, Users2, UserPlus, LogOut } from "lucide-react";
import { StatsCard } from "./Components/StatsCard";
import { UsersTable } from "./Components/UsersTable";
import { fetchUsers, fetchUserStats, fetchSubscriberTiers, fetchUserChanges } from "../../lib/api";
import type { User, UserStats, SubscriberTiers, UserChanges } from "../../types/api";

export default function AdminDashboard() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const correctPassword = "openuse1!"; 

  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAccess");
    if (storedAuth === "granted") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      localStorage.setItem("adminAccess", "granted");
      setIsAuthenticated(true); // ✅ Just update state, no reload needed
    } else {
      alert("Incorrect password! Try again.");
      setEnteredPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAccess");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form onSubmit={handlePasswordSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Enter Admin Password</h2>
          <input
            type="password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 text-gray-900 dark:text-white"
            placeholder="Enter password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  // Dashboard state
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [tiers, setTiers] = useState<SubscriberTiers | null>(null);
  const [changes, setChanges] = useState<UserChanges | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, statsData, tiersData, changesData] = await Promise.all([
          fetchUsers(`?_=${Date.now()}`),
          fetchUserStats(`?_=${Date.now()}`),
          fetchSubscriberTiers(`?_=${Date.now()}`),
          fetchUserChanges(`?_=${Date.now()}`),
        ]);

        setUsers(usersData);
        setStats(statsData);
        setTiers(tiersData);
        setChanges(changesData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };

    loadData();
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: Users2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
                  ${activeTab === id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:border-gray-300"
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
          {activeTab === "overview" && stats && changes && (
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
                  isPositive: changes.new_users > changes.cancelled_users,
                }}
              />
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">User List</h2>
                <UsersTable users={users} />
              </div>
            </div>
          )}

          {activeTab === "subscriptions" && tiers && (
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
