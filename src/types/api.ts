export interface User {
  full_name: string;
  email: string;
  created_at: string;
}

export interface UserStats {
  daily_users: number;
  weekly_users: number;
  monthly_users: number;
}

export interface SubscriberTiers {
  free: number;
  basic: number;
  premium: number;
  pro: number;
}

export interface UserChanges {
  new_users: number;
  cancelled_users: number;
}
