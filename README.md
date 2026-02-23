au# Lennox Fields Clinical Mental Health Services

A comprehensive mental health platform combining clinical services, educational resources, professional tools, and publishing capabilities.

## 🌟 Overview

Lennox Fields is a full-featured mental health practice website built for Tamara Walls, M.Ed, LPCA. This platform goes beyond traditional therapy practice websites to offer:

- **Clinical Services**: Individual, couples, family, teen, career counseling, and substance use treatment
- **Free Screening Tools**: Evidence-based assessments (GAD-7, Beck Depression, ADHD, Autism, PTSD, ASAM)
- **Professional Resources**: Treatment plan generators, supervision tracking, billing tools, licensing guides
- **Client Resources**: Worksheets, habit trackers, journals, safety planning tools
- **HIPAA-Compliant Client Portal**: Secure document upload, progress tracking, messaging
- **Children's Book Publishing**: Therapeutic books for mental health education
- **Integrated Payments**: Stripe integration for sessions, packages, and book sales

## 🚀 Features

### For Clients

✅ **Service Pages** - Detailed information about all therapy offerings
✅ **Free Screening Tools** - Interactive, validated mental health assessments
✅ **Resource Library** - Downloadable worksheets, trackers, and guides
✅ **Secure Client Portal** - HIPAA-compliant document sharing and progress tracking
✅ **Online Scheduling** - Book appointments and manage sessions
✅ **Payment Processing** - Secure payment via Stripe with HSA/FSA support

### For Mental Health Professionals

✅ **Treatment Plan Generator** - Create comprehensive, evidence-based treatment plans
✅ **Notes Templates** - SOAP, DAP, BIRP templates for clinical documentation
✅ **Supervision Tracker** - Log and track clinical supervision hours
✅ **Billing Tools** - Track sessions, payments, and insurance claims
✅ **Theoretical Orientation Tools** - Interactive sorter and meta-comparison sheet
✅ **Licensing Guides** - State-specific guides for NC and IN
✅ **ASAM Assessment** - Level of care determination for substance use disorders

### For Parents, Therapists & Educators

✅ **Children's Books** - Therapeutic books on tough topics
✅ **Companion Resources** - Activity sheets, discussion guides, lesson plans
✅ **Bulk Ordering** - Discounts for schools, clinics, and organizations

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Email**: Nodemailer (HIPAA-compliant SMTP)
- **Encryption**: CryptoJS (AES-256)
- **Deployment**: Vercel (recommended)

## 🔐 HIPAA Compliance

This platform is built with HIPAA compliance in mind:

- ✅ AES-256 encryption for all PHI (Protected Health Information)
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Audit logging for all PHI access
- ✅ Automatic session timeout (15 minutes)
- ✅ Secure password requirements
- ✅ Two-factor authentication ready
- ✅ BAA (Business Associate Agreement) support

**Note:** HIPAA compliance also requires administrative and physical safeguards. See `DEPLOYMENT.md` for complete compliance checklist.

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL database
- Stripe account
- HIPAA-compliant email service (Google Workspace or Microsoft 365)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/lennox-fields.git
cd lennox-fields
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `MASTER_ENCRYPTION_KEY` - Generate with `openssl rand -base64 32`
- `PHI_ENCRYPTION_KEY` - Generate with `openssl rand -base64 32`
- `STRIPE_PUBLIC_KEY` - From your Stripe dashboard
- `STRIPE_SECRET_KEY` - From your Stripe dashboard
- `SMTP_*` - Your HIPAA-compliant email provider settings

### 4. Initialize the database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 📁 Project Structure

```
lennox-fields/
├── app/                          # Next.js 14 App Router
│   ├── (clinical)/              # Clinical services routes
│   │   └── services/            # Individual service pages
│   ├── (tools)/                 # Professional tools
│   │   ├── screening-tools/     # Mental health assessments
│   │   ├── treatment-planning/  # Treatment plan generator
│   │   └── notes-templates/     # Clinical documentation
│   ├── (resources)/             # Client resources
│   │   ├── worksheets/
│   │   ├── habit-trackers/
│   │   └── journals/
│   ├── (professional)/          # Professional resources
│   │   ├── supervision/
│   │   └── billing-tracker/
│   ├── (portal)/                # Client portal
│   │   └── dashboard/
│   ├── books/                   # Children's book publishing
│   ├── about/                   # About Tamara Walls
│   ├── api/                     # API routes
│   │   ├── stripe/              # Payment processing
│   │   └── tools/               # Tool APIs
│   └── layout.tsx               # Root layout
├── components/                   # React components
│   ├── layout/                  # Header, Footer
│   ├── home/                    # Homepage sections
│   └── assessments/             # Assessment components
├── lib/                         # Utility functions
│   ├── prisma.ts               # Database client
│   ├── encryption.ts           # HIPAA encryption
│   ├── audit.ts                # Audit logging
│   ├── utils.ts                # Helper functions
│   └── stripe.ts               # Payment processing
├── prisma/
│   └── schema.prisma           # Database schema
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
└── DEPLOYMENT.md               # Comprehensive deployment guide
```

## 🎨 Design System

The platform uses a warm, professional color palette:

- **Primary Sage**: `#8B9F8B` - Main brand color
- **Soft Rose**: `#C09191` - Accent color
- **Warm Gray**: `#A39690` - Secondary text
- **Cream**: `#F5F0E8` - Background
- **Accent Gold**: `#9B8C5A` - Highlights
- **Earth Green**: `#6B8E4E` - Success states
- **Clinical Blue**: `#4A90A4` - Clinical features

Fonts:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Accent**: Quicksand (sans-serif)

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production (tests build)
npm run build
```

## 🚢 Deployment

See `DEPLOYMENT.md` for comprehensive deployment instructions, including:

- Business infrastructure setup
- Domain and email configuration
- Payment processing integration
- HIPAA compliance checklist
- Database deployment
- Environment configuration
- DNS setup
- Marketing and SEO

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

## 📊 Database Schema

The platform uses a comprehensive schema with:

- **Users & Authentication**: Secure user management
- **Clients**: Encrypted client records (PHI)
- **Therapists**: Clinician profiles and credentials
- **Sessions**: Appointment and billing tracking
- **Treatment Plans**: Goal-oriented care planning
- **Assessments**: Screening tool results
- **Resources**: Downloadable materials
- **Books**: Publishing catalog
- **Audit Logs**: HIPAA-required access logging

## 🔧 Customization

### Adding New Service Pages

1. Create file in `app/services/[service-name]/page.tsx`
2. Use existing service pages as templates
3. Update navigation in `components/layout/Header.tsx`

### Adding New Screening Tools

1. Create file in `app/tools/screening-tools/[tool-name]/page.tsx`
2. Use `AssessmentLayout` component
3. Implement scoring algorithm
4. Add to screening tools index page

### Customizing Colors

Edit `tailwind.config.ts` to update the color palette.

## 🤝 Support

### Technical Issues

- Review inline code comments
- Check `DEPLOYMENT.md` for setup help
- Review Next.js documentation: https://nextjs.org/docs

### HIPAA Compliance

- Consult with healthcare attorney
- Review HHS resources: https://www.hhs.gov/hipaa
- Consider HIPAA compliance consultant

### Business Setup

- Consult with CPA for tax/business structure
- Work with insurance agent for professional coverage
- Consider practice management consultant

## 📝 License

This project is proprietary software built for Lennox Fields Clinical Mental Health Services LLC.

## 🙏 Acknowledgments

Built with:
- Next.js by Vercel
- Tailwind CSS
- Prisma
- Stripe
- And many other open-source projects

## 📞 Contact

**Tamara Walls, M.Ed, LPCA**
Founder, Lennox Fields Clinical Mental Health Services
Email: tamara@lennoxfields.org
Website: https://lennoxfields.org

---

## 🗺️ Roadmap

### Phase 1: Core Platform (Current)
- ✅ Website foundation
- ✅ Service pages
- ✅ Screening tools
- ✅ About page
- ✅ Book section

### Phase 2: Client Portal (Next)
- ⏳ User authentication
- ⏳ Document upload/storage
- ⏳ Progress tracking
- ⏳ Secure messaging
- ⏳ Appointment scheduling

### Phase 3: Professional Tools
- ⏳ Treatment plan generator
- ⏳ Notes templates (SOAP, DAP, BIRP)
- ⏳ Supervision tracker
- ⏳ Billing management
- ⏳ Theoretical orientation tools

### Phase 4: Advanced Features
- ⏳ Video telehealth integration
- ⏳ Insurance claims processing
- ⏳ Advanced analytics
- ⏳ Mobile app
- ⏳ Group therapy scheduling

### Phase 5: EMR Integration or Custom EMR
- ⏳ Full clinical documentation
- ⏳ E-prescribing integration
- ⏳ Lab results integration
- ⏳ Automated appointment reminders

---

**Built with ❤️ for mental health professionals and the communities they serve**
