# Ebola Emergency Support Application Platform

A modern, full-stack web application built with Next.js 16 for processing Ebola treatment and emergency financial assistance applications.

## 🚀 Live Demo

**Public URL**: Will be available after Vercel deployment

## ✨ Features

### Public Features
- ✅ Multi-step application form with progress tracking
- ✅ Real-time form validation with Zod
- ✅ Country/location selection with API integration
- ✅ Ebola-specific questions and eligibility screening
- ✅ Application status checking
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Professional healthcare imagery

### Admin Dashboard
- ✅ Secure admin authentication
- ✅ Application management dashboard
- ✅ Status workflow (Pending → Under Review → Approved/Rejected)
- ✅ Add notes and review comments
- ✅ Search and filter applications
- ✅ Statistics and analytics
- ✅ Export capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Version Control**: GitHub

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/ebola-emergency-nextjs.git
cd ebola-emergency-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
DATABASE_URL=your_postgresql_connection_string_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The application automatically creates the required tables:

```sql
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL,
  ready_to_proceed BOOLEAN NOT NULL,
  first_time_applicant BOOLEAN NOT NULL,
  heard_about_funds TEXT NOT NULL,
  other_source TEXT,
  occupation TEXT NOT NULL,
  other_occupation TEXT,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT,
  phone_number TEXT,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  town TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  reviewed_at TEXT,
  reviewed_by TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## 👤 Admin Access

Default admin credentials:
- **Username**: `admin`
- **Password**: `ebola2026admin`

⚠️ **Important**: Change the admin password in production!

## 📱 Application Flow

### User Journey
1. **Welcome Screen** - Introduction and eligibility check
2. **Personal Information** - Name, age, contact details
3. **Location Details** - Country, state, town
4. **Review & Submit** - Summary and confirmation
5. **Success Page** - Application ID and next steps

### Admin Workflow
1. **Login** - Secure authentication
2. **Dashboard** - View statistics and recent applications
3. **Applications List** - Search, filter, and manage
4. **Application Details** - Review and update status
5. **Approval/Rejection** - Add notes and change status

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |

## 📁 Project Structure

```
ebola-emergency-nextjs/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── dashboard/page.tsx
│   │   │   └── login/page.tsx
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   └── applications/
│   │   ├── apply/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   └── lib/
│       ├── db.ts
│       └── utils.ts
├── public/
│   └── images/
└── package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For support, email: support@ebola-emergency.org

## 🙏 Acknowledgments

- World Health Organization (WHO) for healthcare guidelines
- Unsplash for free healthcare imagery
- OpenWHO for design inspiration
- Vercel for hosting platform
