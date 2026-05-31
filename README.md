# FuerZA 💪

**Social Media & Fitness Tracking App for the Latin Community**

FuerZA is a comprehensive fitness and lifestyle platform designed specifically for the Latin community. Share your fitness journey, support others with positive vibes, discover exercises and routines, and connect with coaches and fitness professionals—all in one place.

## 🌟 Features

### Phase 1: Core Foundation
- **User Authentication** - Sign up, login, and manage profiles
- **Activity Feed** - Post fitness updates and achievements
- **Community Vibes** - React, comment, and support others
- **Basic Tracking** - Log workouts and track progress

### Phase 2: Community & Routines
- **Exercise Library** - Browse and discover exercises
- **Create Routines** - Build custom workout routines
- **Share Workouts** - Share routines with the community
- **Progress Analytics** - Visualize your fitness journey

### Phase 3: Marketplace
- **Fitness Marketplace** - Buy/sell/trade fitness services and equipment
- **Coaches Directory** - Find certified fitness coaches
- **Nutrition Plans** - Access diet and nutrition services
- **Equipment Listings** - Buy/sell fitness equipment

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (React, TypeScript)
- **Backend**: Next.js API Routes (Node.js)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (Frontend) + Railway/Supabase (Backend/DB)
- **Real-time**: Socket.io (future)

## 📁 Project Structure

```
FuerZA/
├── apps/
│   ├── web/                    # Next.js frontend & API
│   │   ├── app/
│   │   │   ├── api/           # API routes
│   │   │   ├── (auth)/        # Auth pages
│   │   │   ├── (app)/         # Main app pages
│   │   │   └── layout.tsx
│   │   ├── components/        # Reusable React components
│   │   ├── lib/              # Utilities, helpers
│   │   ├── public/           # Static files
│   │   ├── styles/           # Global styles
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── mobile/               # (Future) React Native app
├── packages/
│   ├── database/            # Prisma schema & migrations
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── auth/                # Authentication logic
│   ├── types/               # Shared TypeScript types
│   └── utils/               # Shared utilities
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   └── ISSUE_TEMPLATE/
├── docker-compose.yml       # Local PostgreSQL setup
├── .env.example            # Environment variables template
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or use Docker)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/allancranford-ai/FuerZA.git
   cd FuerZA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start PostgreSQL**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Core Tables
- **users** - User accounts and profiles
- **posts** - Fitness updates and achievements
- **reactions** - Likes, comments on posts
- **exercises** - Exercise library
- **routines** - Workout routines
- **routine_exercises** - Exercises in routines
- **workouts** - User workout logs
- **workout_exercises** - Exercises completed in workouts
- **marketplace_listings** - Coaches, diets, equipment for sale
- **follows** - User follow relationships

## 🔐 Authentication Flow

- Email/Password signup and login
- JWT token-based authentication
- NextAuth.js for session management
- Future: Social login (Google, Facebook)

## 📱 API Endpoints (MVP)

### Auth
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get post details
- `POST /api/posts/:id/reactions` - React to post

### Exercises
- `GET /api/exercises` - List exercises
- `GET /api/exercises/:id` - Exercise details

### Workouts
- `POST /api/workouts` - Log workout
- `GET /api/workouts` - User's workout history

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📈 Development Roadmap

See [GitHub Projects](https://github.com/allancranford-ai/FuerZA/projects) for detailed roadmap and progress.

### Phase 1 (Weeks 1-3)
- [ ] User authentication system
- [ ] User profiles
- [ ] Activity feed
- [ ] Post creation and reactions
- [ ] Basic workout tracking

### Phase 2 (Weeks 4-6)
- [ ] Exercise library
- [ ] Routine creation and sharing
- [ ] Workout logging
- [ ] Progress visualization
- [ ] Follow system

### Phase 3 (Weeks 7-10)
- [ ] Marketplace listings
- [ ] Coach directory
- [ ] Search and filtering
- [ ] Notifications
- [ ] Advanced analytics

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT - See [LICENSE](./LICENSE) file for details.

## 💬 Community

Join our community and be part of FuerZA:
- **Issues**: Report bugs and suggest features
- **Discussions**: Share ideas and get help
- **Discord**: [Coming soon]

## 📞 Support

For questions or support, open an issue or contact us at support@fuerza.app

---

**¡Vamos a transformar vidas juntos! Let's transform lives together!** 💪
