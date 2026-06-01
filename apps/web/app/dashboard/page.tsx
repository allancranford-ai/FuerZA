import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-red-600">FuerZA</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.user?.name}!</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="md:col-span-3 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Bienvenido a FuerZA! 💪
            </h2>
            <p className="text-gray-600 mb-4">
              You're all set! Your account is ready and authentication is working.
            </p>
            <p className="text-gray-600">
              Next steps: Create your first post, log a workout, or start following the community.
            </p>
          </div>

          {/* Feature Cards (Coming Soon) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 Activity Feed</h3>
            <p className="text-gray-600 text-sm">Share your fitness journey with the community.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🏋️ Workouts</h3>
            <p className="text-gray-600 text-sm">Log and track your workout progress.</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">👥 Community</h3>
            <p className="text-gray-600 text-sm">Connect and support other fitness enthusiasts.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
