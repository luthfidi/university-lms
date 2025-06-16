# University.com LMS

A comprehensive, modern Learning Management System (LMS) designed for educational institutions. This platform features two integrated modules: **LMS** for learning activities and **My University** for academic administration, providing a complete educational ecosystem for students, lecturers, and administrators.

## 🚀 Features

### Dual Module Architecture
- **LMS Module**: Complete learning management with courses, materials, forums, assessments, attendance tracking
- **My University Module**: Academic administration including KRS management, academic history, financial management, and student services

### Multi-Role Support
- **Student Role**: Access courses, submit assignments, participate in forums, view grades, manage KRS
- **Lecturer Role**: Manage courses, create assessments, track attendance, grade submissions
- **Admin Role**: System administration, user management, academic period management, reporting

### Key Components

#### Learning Management System (LMS)
- **Course Management**: Comprehensive course creation and management tools
- **Interactive Forums**: Discussion boards for each course with thread management
- **Assessment System**: Quizzes, assignments, and exams with multiple question types
- **Attendance Tracking**: Digital attendance with QR codes and WiFi-based check-in
- **Gradebook**: Detailed grade tracking with component-based grading
- **Announcements**: System-wide and course-specific announcements
- **Scheduling**: Integrated calendar and timetable management

#### University Administration (My University)
- **KRS Management**: Course registration system with credit limits and prerequisites
- **Academic History**: Complete transcript and academic progress tracking
- **Financial Management**: Tuition fee tracking, payment history, scholarship management
- **Profile & Documents**: Student profile management with document upload system
- **Academic Analytics**: Performance tracking and graduation projections

## 🛠 Tech Stack

### Frontend Framework
- **React.js** (v18.2.0) with Vite for fast development
- **TypeScript** (v5.3.3) for type safety and better development experience
- **React Router** (v6.22.1) for client-side routing

### UI Framework & Styling
- **Chakra UI** (v2.8.2) - Modern, accessible component library
- **Framer Motion** (v11.0.5) - Smooth animations and transitions
- **React Icons** (v5.0.1) - Comprehensive icon library

### State Management & Data Fetching
- **Zustand** (v4.4.7) - Lightweight state management
- **TanStack Query** (v5.17.9) - Server state management and caching
- **React Hook Form** (v7.50.1) with **Zod** (v3.22.4) - Form handling and validation

### Charts & Visualizations
- **Recharts** (v2.15.1) - Charts for academic analytics
- **FullCalendar** (v6.1.10) - Calendar and scheduling components

### Development Tools
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📦 Installation

### Prerequisites
- **Node.js** (v20.11.1 or higher)
- **npm** (v10.2.4 or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/luthfidi/university-lms.git
   cd university-lms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```


## 🔧 Configuration

### Theme Customization
The application uses a custom Chakra UI theme located in `src/theme/index.ts`. You can customize:
- Color schemes (primary, secondary, accent colors)
- Typography (fonts, sizes)
- Component styles
- Breakpoints for responsive design

## 🎯 Key Features Demo

### For Students
- **Dashboard**: Personalized overview of courses, assignments, and announcements
- **Course Access**: View materials, participate in discussions, submit assignments
- **Assessment Taking**: Interactive quizzes and assignment submissions
- **Grade Tracking**: Real-time grade updates and academic progress
- **KRS Management**: Course registration with intelligent validation
- **Financial Overview**: Tuition tracking and payment management

### For Lecturers
- **Course Management**: Create and organize course content and materials
- **Assessment Creation**: Build quizzes, assignments, and exams
- **Student Monitoring**: Track attendance, participation, and progress
- **Grading Tools**: Efficient grading workflows with rubrics
- **Analytics**: Detailed insights into class performance

### For Administrators
- **System Overview**: Dashboard with institution-wide statistics
- **User Management**: Manage students, lecturers, and staff accounts
- **Academic Periods**: Configure semesters and academic calendars
- **Financial Reports**: Comprehensive financial tracking and reporting
- **System Configuration**: Platform-wide settings and customization

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach with adaptive layouts
- Touch-friendly interfaces for mobile and tablet users
- Progressive enhancement for desktop experiences

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support

### Modern Interface
- Clean, intuitive design following modern UI principles
- Consistent component library with Chakra UI
- Smooth animations and micro-interactions
- Dark mode support

## 📊 Performance

- Code splitting for optimal bundle sizes
- Lazy loading of components and routes
- Optimized images and assets
- Efficient state management
- Service worker for offline capabilities (planned)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

## 📚 API Integration

The frontend is designed to integrate with a RESTful API. Key endpoints include:

- `/api/auth/*` - Authentication endpoints
- `/api/courses/*` - Course management
- `/api/assessments/*` - Assessment system
- `/api/users/*` - User management
- `/api/academic/*` - Academic records
- `/api/financial/*` - Financial operations

## 🔄 State Management

### Zustand Stores
- **authStore**: User authentication and session management
- **courseStore**: Course data and enrollment information
- **assessmentStore**: Assessment and grade data
- **notificationStore**: System notifications and alerts

### React Query
- Server state caching and synchronization
- Automatic refetching and invalidation
- Optimistic updates for better UX
- Error handling and retry logic

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core LMS functionality
- ✅ University administration features
- ✅ Role-based access control
- ✅ Responsive design

### Phase 2 (Planned)
- 📱 Mobile application (React Native)
- 🔔 Real-time notifications (WebSocket)
- 📊 Advanced analytics and reporting
- 🎥 Video conferencing integration
- 📝 Advanced content authoring tools

### Phase 3 (Future)
- 🤖 AI-powered features (auto-grading, recommendations)
- 🌐 Multi-language support
- 📱 Progressive Web App (PWA)
- 🔌 Third-party integrations (Google Classroom, Zoom)
- ☁️ Cloud storage integration

## 🙏 Acknowledgements

- [Chakra UI](https://chakra-ui.com/) for the amazing component library
- [React Icons](https://react-icons.github.io/react-icons/) for comprehensive icon set
- [Recharts](https://recharts.org/) for beautiful charts and visualizations
- [React Hook Form](https://react-hook-form.com/) for efficient form handling
- [Zustand](https://github.com/pmndrs/zustand) for lightweight state management

---

**Built with ❤️ for modern education**