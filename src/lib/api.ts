const API_BASE_URL = 'https://api.speakimage.ai/admin';

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function fetchUserStats(): Promise<UserStats> {
  const response = await fetch("/api/user-stats", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch user stats");
  return response.json();
}

export async function fetchSubscriberTiers(): Promise<SubscriberTiers> {
  const response = await fetch("/api/subscriber-tiers", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch subscriber tiers");
  return response.json();
}

export async function fetchUserChanges(): Promise<UserChanges> {
  const response = await fetch("/api/user-changes", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch user changes");
  return response.json();
}
