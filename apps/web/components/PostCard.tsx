'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

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

interface PostCardProps {
  post: Post;
  onReactionAdded: () => void;
}

export default function PostCard({ post, onReactionAdded }: PostCardProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const likeCount = post.reactions.filter((r) => r.type === 'like').length;
  const isLiked = post.reactions.some(
    (r) => r.type === 'like' && r.userId === session?.user?.id
  );

  const handleLike = async () => {
    if (!session) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${post.id}/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'like' }),
      });

      if (response.ok) {
        onReactionAdded();
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
            {post.user.name?.[0] || 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.user.name}</p>
            <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        {session?.user?.id === post.userId && (
          <button className="text-gray-500 hover:text-gray-700 text-lg">
            •••
          </button>
        )}
      </div>

      {/* Post Content */}
      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post image"
          className="w-full rounded-lg mb-4 max-h-96 object-cover"
        />
      )}

      {/* Post Actions */}
      <div className="border-t border-b border-gray-200 py-2 mb-3 flex gap-6">
        <button
          onClick={handleLike}
          disabled={loading || !session}
          className={`flex items-center gap-2 transition ${
            isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
          } disabled:opacity-50`}
        >
          <span className="text-xl">{isLiked ? '❤️' : '🤍'}</span>
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
        >
          <span className="text-xl">💬</span>
          <span className="text-sm font-medium">Comment</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition">
          <span className="text-xl">📤</span>
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section (Coming Soon) */}
      {showComments && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="text-gray-600 text-sm">Comments coming soon! 🚀</p>
        </div>
      )}
    </div>
  );
}
