import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-gray-500 dark:text-gray-300">{title}</div>
        <div className="text-gray-600 dark:text-gray-400">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-3xl font-semibold text-gray-900 dark:text-white">
          {value}
        </div>
        {trend && (
          <div className={`text-sm mt-2 ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
}

