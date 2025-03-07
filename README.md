# University.com LMS

A modern Learning Management System (LMS) for educational institutions, featuring two integrated modules: LMS for learning activities and My University for academic administration.

## Features

- **Dual Module System**:

  - **LMS Module**: Courses, materials, forums, assessments, attendance, etc.
  - **My University Module**: KRS management, academic history, financials, etc.

- **Multi-role Access**:

  - Student Role
  - Lecturer Role
  - Admin Role

- **Key Components**:
  - Modern responsive UI with Chakra UI
  - Role-based navigation
  - Dashboard analytics
  - Course management
  - KRS (course registration) system
  - Grade management
  - Attendance tracking
  - Forum discussions

## Tech Stack

- **Frontend**:
  - React.js (Vite) v18.2.0
  - TypeScript v5.3.3
  - Chakra UI v2.8.2
  - React Router v6.22.1
  - TanStack Query v5.17.9
  - Zustand v4.4.7
  - React Hook Form v7.50.1 with Zod v3.22.4

## Getting Started

### Prerequisites

- Node.js (v20.11.1 or higher)
- npm (v10.2.4 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/university-lms.git
   cd university-lms
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

### Project Structure

```
src/
├── assets/            # Static assets
├── components/        # Shared UI components
│   ├── atoms/         # Basic building blocks
│   ├── molecules/     # Groups of atoms
│   ├── organisms/     # Complex UI components
│   └── templates/     # Page layouts
├── config/            # App configuration
├── features/          # Feature modules
│   ├── auth/          # Authentication
│   ├── lms/           # LMS module features
│   └── university/    # University module features
├── hooks/             # Custom React hooks
├── layouts/           # Page layouts
├── mocks/             # Mock data
├── routes/            # Routing configuration
├── services/          # API services
├── store/             # State management
├── theme/             # Theme configuration
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Login Credentials

For demo purposes, you can log in with the following credentials:

- **Student**:
  - Username: student
  - Password: password
- **Lecturer**:
  - Username: lecturer
  - Password: password
- **Admin**:
  - Username: admin
  - Password: password

## Features Demo

### Student Role

- View and access course materials
- Submit assignments
- Participate in forums
- Track attendance and grades
- Manage KRS (course registration)

### Lecturer Role

- Manage courses and materials
- Create and grade assessments
- Monitor student progress
- Manage attendance
- View teaching load and payroll information

### Admin Role

- User management
- System configuration
- Academic period management
- Course catalog management
- Report generation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI components from [Chakra UI](https://chakra-ui.com/)
- Form handling with [React Hook Form](https://react-hook-form.com/)
