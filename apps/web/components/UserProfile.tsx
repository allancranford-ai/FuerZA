'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  createdAt: string;
  _count: {
    posts: number;
    workouts: number;
    followers: number;
    following: number;
  };
}

export default function UserProfile() {
  const params = useParams();
  const { data: session } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const userId = params.id as string;

  useEffect(() => {
    fetchUserProfile();
    checkFollowStatus();
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsOwnProfile(session?.user?.id === userId);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFollowStatus = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/follow`);
      if (response.ok) {
        const data = await response.json();
        setFollowing(data.following);
      }
    } catch (error) {
      console.error('Failed to check follow status:', error);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        setFollowing(data.following);
        // Refetch to update counts
        fetchUserProfile();
      }
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-12 text-gray-600">User not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-8 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.name?.[0] || 'U'}
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 mb-3">@{user.email.split('@')[0]}</p>
              {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
              <p className="text-xs text-gray-500">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Follow/Edit Button */}
          {!isOwnProfile && session && (
            <button
              onClick={handleFollow}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                following
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          )}
          {isOwnProfile && (
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{user._count.posts}</p>
          <p className="text-gray-600 text-sm">Posts</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{user._count.workouts}</p>
          <p className="text-gray-600 text-sm">Workouts</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{user._count.followers}</p>
          <p className="text-gray-600 text-sm">Followers</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{user._count.following}</p>
          <p className="text-gray-600 text-sm">Following</p>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Posts</h2>
        <p className="text-gray-600 text-center py-8">Recent posts coming soon! 🚀</p>
      </div>
    </div>
  );
}
