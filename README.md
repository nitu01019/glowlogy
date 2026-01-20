# Glowlogy - Spa & Wellness Platform

A production-ready website for massage, spa, and wellness services built with React and Firebase.

## 🌟 Features

- **Modern React Frontend** - Built with React 19 and Vite for optimal performance
- **Firebase Backend** - Fully integrated Firebase (Auth, Firestore, Storage)
- **Responsive Design** - Mobile-first, works on all devices
- **Skeleton Loading** - Smooth loading states for better UX
- **Lazy Loading** - Code splitting for faster initial load
- **Premium UI** - Elegant spa/wellness themed design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd Desktop/Glowlogy

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common utility components
│   ├── layout/         # Header, Footer, Layout
│   ├── sections/       # Page sections (Hero, Services, etc.)
│   └── ui/             # UI primitives (Button, Input, Skeleton)
├── config/             # Configuration files
│   └── firebase.js     # Firebase configuration
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication context
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # Firebase service layer
│   ├── authService.js      # Authentication
│   ├── bookingService.js   # Bookings
│   ├── contactService.js   # Contact/Newsletter
│   ├── locationService.js  # Locations
│   └── servicesService.js  # Spa services
├── styles/             # Global styles
│   ├── variables.css   # CSS custom properties
│   └── global.css      # Global styles
└── utils/              # Utility functions
    ├── constants.js    # App constants
    └── helpers.js      # Helper functions
```

## 🔥 Firebase Setup

The project is pre-configured with Firebase. The configuration is in `src/config/firebase.js`.

### Firebase Services Used:
- **Authentication** - User sign up, login, Google OAuth
- **Firestore** - Database for bookings, services, locations
- **Storage** - File/image storage
- **Analytics** - Usage analytics (production)

### Firestore Collections:
- `users` - User profiles
- `bookings` - Appointment bookings
- `services` - Spa services catalog
- `serviceCategories` - Service categories
- `locations` - Spa locations
- `inquiries` - Contact form submissions
- `newsletter` - Newsletter subscriptions
- `feedback` - Customer feedback

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, services, testimonials |
| Services | `/services` | All spa services with category filter |
| About | `/about` | Company story, values, team |
| Contact | `/contact` | Contact form and info |
| Locations | `/locations` | All spa locations |
| Book | `/book` | Multi-step booking form |
| Membership | `/membership` | Membership plans |

## 🎨 Design System

### Colors
- Primary: `#8B5A2B` (Warm Brown)
- Secondary: `#F5E6D3` (Cream)
- Text: `#2D2D2D`
- Background: `#FDFBF8`

### Typography
- Headings: Playfair Display (Serif)
- Body: Inter (Sans-serif)

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

The project is ready to deploy to:
- Firebase Hosting
- Vercel
- Netlify
- Any static hosting

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 📞 Support

For questions or support, contact: info@glowlogy.com

---

Built with ❤️ by Glowlogy Team
