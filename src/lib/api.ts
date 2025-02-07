const API_BASE_URL = 'https://api.speakimage.ai/admin';

export const fetchUsers = async () => {
  const response = await fetch(${API_BASE_URL}/get-users);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchUserStats = async () => {
  const response = await fetch(${API_BASE_URL}/user-stats);
  if (!response.ok) throw new Error('Failed to fetch user stats');
  return response.json();
};

export const fetchSubscriberTiers = async () => {
  const response = await fetch(${API_BASE_URL}/subscriber-tiers);
  if (!response.ok) throw new Error('Failed to fetch subscriber tiers');
  return response.json();
};

export const fetchUserChanges = async () => {
  const response = await fetch(${API_BASE_URL}/user-changes);
  if (!response.ok) throw new Error('Failed to fetch user changes');
  return response.json();
};
