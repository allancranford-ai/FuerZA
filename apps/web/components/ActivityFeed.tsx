'use client';

import { useEffect, useState } from 'react';
import CreatePostForm from '@/components/CreatePostForm';
import PostCard from '@/components/PostCard';

interface Post {
  id: string;
  content: string;
  image?: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  reactions: Array<{
    id: string;
    userId: string;
    type: string;
  }>;
}

export default function ActivityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts?page=1');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Create Post */}
      <CreatePostForm onPostCreated={fetchPosts} />

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading your feed...</p>
        </div>
      )}

      {/* Posts Feed */}
      {!loading && posts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-lg mb-4">No posts yet! 📝</p>
          <p className="text-gray-500">Be the first to share your fitness journey with the community!</p>
        </div>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} onReactionAdded={fetchPosts} />
      ))}
    </div>
  );
}
