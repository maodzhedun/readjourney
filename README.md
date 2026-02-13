
```markdown
# 📚 Read Journey

## Project Overview

This project is the frontend part of **Read Journey**, a web application for book lovers that helps track reading progress, discover new books, and manage personal reading library.

The application allows users to browse recommended books, add them to their personal library, track reading progress with detailed statistics, and receive insights on reading speed and time estimates.

Built with **Next.js**, **TypeScript**, **Zustand**, **TanStack Query**, and **Axios**.

## Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://www.linkedin.com/in/your-profile/)
- Email: your.email@gmail.com

## Live Demo

- [Live site on Vercel](https://your-project.vercel.app)

## Pages

### Home (`/`)

- Redirects to recommended page for authenticated users.

### Authentication

#### Register (`/register`)

- User registration with form validation.
- Name, email, and password fields.
- Redirect to recommended after successful registration.

#### Login (`/login`)

- User authentication.
- Email and password fields.
- Redirect to recommended page after successful login.

### Recommended Books (`/recommended`)

- Displays catalog of recommended books.
- Filtering by title and author.
- Pagination.
- Add books to personal library.
- Book cards showing cover, title, author, total pages.

### My Library (`/library`)

- Personal book collection.
- Filter by status: Unread, In-progress, Done.
- Remove books from library.
- Start reading functionality.

### Reading (`/reading`)

- Detailed reading interface for selected book.
- Reading progress tracker:
  - Start/stop reading session
  - Log page progress
- Reading statistics:
  - Progress percentage
  - Pages read
- Reading diary with session history.

## Features

- **User Authentication**: Secure registration and login with HTTP-only cookies.
- **Book Discovery**: Browse recommended books with filtering options.
- **Personal Library**: Manage books in three categories (unread, in-progress, done).
- **Reading Tracker**: Start/stop sessions, track page progress.
- **Reading Statistics**: Visual representation of progress.
- **Responsive Design**: Optimized for desktop, tablet, and mobile.
- **Form Validation**: React Hook Form with Yup validation.
- **Toast Notifications**: User feedback with react-hot-toast.

## Technologies Used

| Technology | Purpose |
|------------|---------|
| Next.js 15 | App Router, API Routes, Middleware |
| React 19 | UI Components |
| TypeScript | Type safety |
| Zustand | Client state (auth) |
| TanStack Query | Server state, caching, SSR prefetch |
| Axios | HTTP requests |
| React Hook Form | Form management |
| Yup | Schema validation |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| react-hot-toast | Toast notifications |

## API Endpoints

**Authentication:**
- \`POST /users/signup\` - User registration
- \`POST /users/signin\` - User login
- \`POST /users/signout\` - User logout
- \`GET /users/current\` - Get current user

**Books:**
- \`GET /books/recommend\` - Get recommended books (with filtering & pagination)
- \`POST /books/add\` - Add book to library
- \`POST /books/add/:id\` - Add recommended book by ID
- \`DELETE /books/remove/:id\` - Remove book from library
- \`GET /books/own\` - Get user's library

**Reading:**
- \`POST /books/reading/start\` - Start reading session
- \`PATCH /books/reading/finish\` - Finish reading session
- \`DELETE /books/reading/:bookId/:readingId\` - Delete reading entry

## Project Structure

\`\`\`
/app
  /(auth)              # Public routes
    /login
    /register
  /(private)           # Protected routes
    /recommended
    /library
    /reading
  /api                 # API Routes (proxy to backend)
/components
  /AuthProvider        # Auth state provider
  /Header              # Navigation header
  /Dashboard           # Sidebar widgets
  /books               # Book components
  /reading             # Reading components
  /forms               # Form components
  /modals              # Modal dialogs
  /ui                  # Base UI components
/hooks                 # Custom React hooks
/services              # API client functions
/store                 # Zustand store
/types                 # TypeScript definitions
/utils                 # Utilities and constants
\`\`\`

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/read-journey.git
cd read-journey

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
\`\`\`

## Environment Variables

Create a \`.env.local\` file:

\`\`\`env
NEXT_PUBLIC_API_URL=https://readjourney.b.goit.study/api
\`\`\`

## Key Features Implementation

### Authentication Flow
- JWT token stored in HTTP-only cookies
- Protected routes with Next.js middleware
- Persistent authentication state with Zustand

### Data Fetching Strategy
- Server-side prefetching with React Query
- Client-side caching and deduplication
- Optimistic UI updates

### Responsive Design
| Device | Width | Layout |
|--------|-------|--------|
| Mobile | 320-767px | Burger menu, 2-col grid |
| Tablet | 768-1439px | Burger menu, 4-col grid |
| Desktop | 1440px+ | Full nav, 5-col grid |

## Design System

| Color | HEX | Usage |
|-------|-----|-------|
| Primary | \`#f9f9f9\` | Text, buttons |
| Secondary | \`#1f1f1f\` | Cards, blocks |
| Background | \`#141414\` | Page background |
| Muted | \`#686868\` | Secondary text |
| Accent | \`#e90516\` | Errors, delete |
| Success | \`#30b94d\` | Done status |
| Info | \`#4f92f7\` | In-progress status |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

---

**Note**: This is a learning project demonstrating modern web development practices with Next.js, TypeScript, and React ecosystem tools.
\`\`\`