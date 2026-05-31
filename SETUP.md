# FuerZA Development Setup Guide

Welcome to the FuerZA project! This guide will help you get started with local development.

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- Docker & Docker Compose ([Download](https://www.docker.com/products/docker-desktop/))
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/allancranford-ai/FuerZA.git
   cd FuerZA
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start PostgreSQL**
   ```bash
   docker-compose up -d
   ```

5. **Set up the database**
   ```bash
   cd packages/database
   npm run db:generate
   npm run db:migrate
   cd ../..
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Root Level
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report

### Database
- `npm run db:migrate` - Create and apply database migrations
- `npm run db:push` - Push schema to database
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio GUI

## Project Structure

```
FuerZA/
├── apps/web/                 # Next.js app (frontend + API)
│   ├── app/                  # Next.js app directory
│   │   ├── api/             # API routes
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   ├── lib/                 # Utilities
│   ├── public/              # Static assets
│   └── styles/              # Global styles
├── packages/
│   ├── database/            # Prisma schema & migrations
│   │   └── schema.prisma    # Database schema
│   ├── auth/                # Auth utilities (coming soon)
│   ├── types/               # Shared TypeScript types
│   └── utils/               # Shared utilities
├── .github/workflows/       # CI/CD workflows
├── docker-compose.yml       # Docker PostgreSQL setup
├── .env.example            # Environment template
└── package.json            # Root package.json
```

## Development Workflow

### Creating a Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code
   - Create/update tests
   - Update documentation if needed

3. **Run tests and linter**
   ```bash
   npm run lint
   npm run test
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: description of your feature"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open Pull Request**
   - Go to GitHub and create a PR against `develop` branch
   - Describe your changes
   - Link any related issues

## Database Management

### Viewing Your Database

```bash
# Open Prisma Studio (GUI for your database)
npm run db:studio
```

### Creating a Migration

```bash
cd packages/database
npx prisma migrate dev --name your_migration_name
cd ../..
```

### Resetting Database (Development Only)

```bash
cd packages/database
npx prisma migrate reset
cd ../..
```

## API Development

API routes are in `apps/web/app/api/`. Each route is defined in its own folder with a `route.ts` file.

Example: Create `apps/web/app/api/posts/route.ts`
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from posts API' });
}

export async function POST(req: Request) {
  const data = await req.json();
  // Handle POST request
  return NextResponse.json({ success: true }, { status: 201 });
}
```

## Frontend Development

Components are in `apps/web/components/`. Create reusable React components here.

Example: Create `apps/web/components/Button.tsx`
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button 
      className="px-4 py-2 bg-primary text-white rounded hover:bg-red-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

## Styling

We use Tailwind CSS. All styling is done with Tailwind utility classes.

- **Colors**: Primary (#FF6B6B), Secondary (#4ECDC4), Accent (#FFE66D)
- **Custom styles**: Edit `apps/web/tailwind.config.ts`
- **Global styles**: Edit `apps/web/app/globals.css`

## Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker ps

# Restart PostgreSQL
docker-compose restart postgres

# Check connection string in .env.local
DATABASE_URL="postgresql://fuerza_user:fuerza_password@localhost:5432/fuerza_dev"
```

### Port Already in Use
```bash
# If port 3000 is in use, specify a different port
PORT=3001 npm run dev

# If port 5432 (PostgreSQL) is in use
docker-compose stop
# Kill process on port 5432 or change docker-compose.yml
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm run install:all
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Need Help?

- Check existing [GitHub Issues](https://github.com/allancranford-ai/FuerZA/issues)
- Create a new issue with your question
- Join our community discussions

---

Happy coding! Let's build FuerZA together! 💪
