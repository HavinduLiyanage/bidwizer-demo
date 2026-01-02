# BidWizer - Frontend Implementation Document

## Executive Summary

**BidWizer** is a comprehensive tender management platform designed to help businesses discover, analyze, and win government and private sector tenders using AI-powered tools. This document provides a complete technical specification of the frontend implementation for a development team to build the corresponding backend services.

> [!IMPORTANT]
> This is a **frontend-only codebase with dummy/mock data**. All API calls, authentication, and data persistence are simulated. A backend implementation is required to make this application fully functional.

---

## Table of Contents

1. [Application Overview](#1-application-overview)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Key Value Propositions](#12-key-value-propositions)
2. [User Types & Roles](#2-user-types--roles)
   - 2.1 [User Roles](#21-user-roles)
   - 2.2 [Organization Structure](#22-organization-structure)
   - 2.3 [Team Members (Multi-seat Support)](#23-team-members-multi-seat-support)
3. [Authentication System](#3-authentication-system)
   - 3.1 [Registration Flow (Bidder - 3 Steps)](#31-registration-flow-bidder---3-steps)
   - 3.2 [Login System](#32-login-system)
   - 3.3 [Password Recovery](#33-password-recovery)
   - 3.4 [Session Management](#34-session-management)
4. [Subscription & Pricing System](#4-subscription--pricing-system)
   - 4.1 [Plan Tiers](#41-plan-tiers)
   - 4.2 [Plan Selection Flow](#42-plan-selection-flow)
   - 4.3 [Billing Management](#43-billing-management)
   - 4.4 [Usage Tracking](#44-usage-tracking)
5. [Bidder Features](#5-bidder-features)
   - 5.1 [Tender Discovery](#51-tender-discovery)
   - 5.2 [Tender Preview Modal (Quick Preview)](#52-tender-preview-modal-quick-preview)
   - 5.3 [Tender Detail Page](#53-tender-detail-page)
   - 5.4 [Tender Workspace Modal](#54-tender-workspace-modal)
   - 5.5 [Publisher Following](#55-publisher-following)
   - 5.6 [Followed Publishers Sidebar](#56-followed-publishers-sidebar)
6. [Publisher Features](#6-publisher-features)
   - 6.1 [Publisher Dashboard](#61-publisher-dashboard)
   - 6.2 [Create New Tender](#62-create-new-tender)
   - 6.3 [Edit Tender](#63-edit-tender)
7. [AI-Powered Features](#7-ai-powered-features)
   - 7.1 [AI Brief Generator](#71-ai-brief-generator)
   - 7.2 [Cover Letter Generator](#72-cover-letter-generator)
   - 7.3 [AI Chat (Q&A)](#73-ai-chat-qa)
   - 7.4 [AI Usage Tracking](#74-ai-usage-tracking)
8. [Data Models](#8-data-models)
   - 8.1 [Tender Model](#81-tender-model)
   - 8.2 [Publisher Model](#82-publisher-model)
   - 8.3 [Team Member Model](#83-team-member-model)
   - 8.4 [Tender Analytics](#84-tender-analytics)
9. [API Endpoints Required](#9-api-endpoints-required)
   - 9.1 [Authentication](#91-authentication)
   - 9.2 [Tenders](#92-tenders)
   - 9.3 [Publishers](#93-publishers)
   - 9.4 [AI Features](#94-ai-features)
   - 9.5 [Files](#95-files)
   - 9.6 [Organization](#96-organization)
   - 9.7 [Billing](#97-billing)
10. [File Storage Requirements](#10-file-storage-requirements)
    - 10.1 [Document Storage](#101-document-storage)
    - 10.2 [Image Storage](#102-image-storage)
11. [Email/Notification System](#11-emailnotification-system)
    - 11.1 [Required Email Templates](#111-required-email-templates)
    - 11.2 [Publisher Alerts](#112-publisher-alerts)
12. [Technical Stack](#12-technical-stack)
    - 12.1 [Frontend (Current)](#121-frontend-current)
    - 12.2 [Recommended Backend Stack](#122-recommended-backend-stack)
    - 12.3 [AI/ML Requirements](#123-aiml-requirements)

**Appendices**
- [Appendix A: Page Routes Summary](#appendix-a-page-routes-summary)
- [Appendix B: Mock Data Files](#appendix-b-mock-data-files)
- [Appendix C: Local Storage Keys](#appendix-c-local-storage-keys)
- [Appendix D: Component Reference](#appendix-d-component-reference)
- [Appendix E: Environment Variables](#appendix-e-environment-variables)
- [Appendix F: UI/UX Patterns](#appendix-f-uiux-patterns)
- [Document Metadata](#document-metadata)
- [Implementation Priority Guide](#implementation-priority-guide)

---

## 1. Application Overview

### 1.1 Purpose
BidWizer helps:
- **Bidders** (contractors, suppliers) find and analyze tender opportunities
- **Publishers** (government agencies, organizations) post and manage tenders
- Both parties leverage **AI-powered tools** for document analysis and bid preparation

### 1.2 Key Value Propositions
- Centralized tender discovery platform
- AI-powered document summarization and Q&A
- Automated cover letter generation
- Publisher following with email alerts
- Document workspace with file tree navigation

---

## 2. User Types & Roles

### 2.1 User Roles

| Role | Description | Access Level |
|------|-------------|--------------|
| **Bidder** | Companies looking to bid on tenders | View tenders, use AI tools, follow publishers |
| **Publisher** | Organizations posting tenders | Create/manage tenders, view analytics |

### 2.2 Organization Structure

Each user belongs to an **Organization** with the following properties:

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  email_verified: boolean;
  org_id?: string;
  org_name?: string;
  org_type?: "BIDDER" | "PUBLISHER";
}
```

### 2.3 Team Members (Multi-seat Support)

Organizations can have multiple team members based on their subscription plan:

```typescript
interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: string;
  role: "Owner" | "Member";
  status: "Active" | "Pending" | "Inactive";
}
```

---

## 3. Authentication System

### 3.1 Registration Flow (Bidder - 3 Steps)

#### Step 1: Account Setup
**URL:** `/register/bidder/step1`

**Fields:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| companyName | string | Yes | Min 2 chars |
| firstName | string | Yes | Min 1 char |
| lastName | string | Yes | Min 1 char |
| position | string | Yes | e.g., "CEO", "Project Manager" |
| email | email | Yes | Valid work email |
| password | string | Yes | Min 8 chars |
| confirmPassword | string | Yes | Must match password |

#### Step 2: Company Profile
**URL:** `/register/bidder/step2`

**Fields:**
| Field | Type | Required | Options |
|-------|------|----------|---------|
| companyName | string | Yes | Pre-filled from Step 1 |
| industry | select | Yes | Construction, Healthcare, IT & Technology, Manufacturing, Education, Transportation, Other |
| otherIndustry | string | Conditional | Required if industry = "Other" |
| website | url | Yes | Valid URL |
| about | textarea | Yes | Company description |

#### Step 3: Team Invitation
**URL:** `/register/bidder/step3`

**Features:**
- Displays selected plan and seat limits
- Add team members (name, email, position)
- Status tracking: Pending → Invited → Active
- Can be skipped

#### Registration Complete
**URL:** `/register/bidder/ready`

**Actions:**
- Display success message
- Redirect to login with `?registered=true` query param

### 3.2 Login System
**URL:** `/login`

**Fields:**
| Field | Type | Required |
|-------|------|----------|
| email | email | Yes |
| password | password | Yes |
| role | select | Yes (Bidder or Publisher) |

**Post-Login Routing:**
- Bidder → `/tenders`
- Publisher → `/publisher/dashboard`

### 3.3 Password Recovery
**URLs:**
- `/forgot-password` - Enter email
- `/reset-password` - Enter new password (with token)

### 3.4 Session Management

```typescript
// Token storage
localStorage.setItem("access_token", token);

// API Authorization Header
Authorization: `Bearer ${token}`
```

**Required Backend Endpoints:**
- `POST /auth/login` - Authenticate user
- `POST /auth/register` - Create user account
- `GET /auth/me` - Get current user details
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/logout` - Invalidate session

---

## 4. Subscription & Pricing System

### 4.1 Plan Tiers

| Feature | FREE | STANDARD | PREMIUM |
|---------|------|----------|---------|
| **Price (LKR/month)** | 0 | 6,000 | 10,000 |
| **Seats** | 1 | 1 | 2 |
| **AI Questions/month**     | 2 per tender  | 120 total   | 300 total   |
| **Workspace Preview**      | First 3 pages | Full access | Full access |
| **AI Brief**               | 1 per tender  | Unlimited | Unlimited |
| **Cover Letter**           | ❌           | ✅ | ✅ |
| **Publisher Follow Limit** | 0             | 5 | 10 |
| **Folder Chat**            | ❌ | ❌ | ✅ (Beta) |
| **Support**                | Email | Email + Chat | Priority (24h) |

### 4.2 Plan Selection Flow

1. User views pricing page (`/pricing`)
2. Clicks "Get started" on desired plan
3. Redirected to `/register/bidder/step1?plan=PLAN_TIER`
4. Plan stored in `localStorage` and used throughout registration

### 4.3 Billing Management
**URL:** `/company/billing`

**Features:**
- View current plan details
- Display billing history
- Upgrade/downgrade plan links

### 4.4 Usage Tracking

```typescript
interface PlanUsage {
  aiQuestionsUsed: number;
  aiQuestionsTotal: number;
  publishersFollowed: number;
  publishersLimit: number;
  seatsUsed: number;
  seatsTotal: number;
}
```

---

## 5. Bidder Features

### 5.1 Tender Discovery
**URL:** `/tenders`

#### 5.1.1 Search & Filter

| Filter | Type | Options |
|--------|------|---------|
| Search | text | Title, category, publisher, description |
| Status | toggle | Active / All |
| Sector | chips | Government, Private, International |
| Sort | dropdown | Deadline, Published date |

#### 5.1.2 Tender Card Display

Each tender card shows:
- Publisher logo and name
- Tender title
- Category badge (color-coded)
- Sector badge
- Location
- Budget range
- Deadline with countdown
- "Quick Preview" and "View Details" buttons

### 5.2 Tender Preview Modal (*Quick Preview*)

**Trigger:** "Quick Preview" button on tender card

**Content:**
- Publisher info
- Title and description
- Key details grid (publisher, location, budget, deadline)
- Document tree preview (collapsible folders)
- Contact information
- "View Full Details" CTA

### 5.3 Tender Detail Page
**URL:** `/tenders/[id]`

**Sections:**
1. **Header** - Title, category, location, status badge
2. **Project Advertisement** - Tender notice image/document
3. **Key Requirements** - Bullet list of requirements
4. **Submission Deadline** - Date with visual emphasis
5. **Estimated Value** - Budget display
6. **Contact Information** - Name, phone, email
7. **View Tender Document** - Opens workspace modal

### 5.4 Tender Workspace Modal

**Full-screen modal with 3 panels:**

#### Left Panel: File Tree
- Hierarchical document structure
- Folder expansion/collapse
- File type icons (PDF, DOCX, XLSX)
- File size display
- "My Uploads" section for user files

```typescript
interface FileNode {
  id: string;
  name: string;
  type: "folder" | "file";
  ext?: string;
  size?: string;
  path: string;
  origin?: "tender" | "upload";
  previewUrl?: string;
  children?: FileNode[];
}
```

#### Center Panel: Document Viewer
- PDF/document rendering
- Page navigation (placeholder in frontend)
- Zoom controls (placeholder)

#### Right Panel: AI Assistant
Three tabs:
1. **Brief** - Generate tender summary
2. **Release to Office Letter** - Generate cover letter
3. **Chat** - Interactive Q&A

### 5.5 Publisher Following
**URL:** `/publishers`

**Features:**
- Browse verified publishers
- Search by name, category, location
- Filter by category and sector
- Follow/unfollow publishers (limited by plan)
- Email alerts when followed publishers post new tenders

### 5.6 Followed Publishers Sidebar
**Location:** Right sidebar on `/tenders` page

**Displays:**
- List of followed publishers
- Active tender count per publisher
- New tenders this week badge
- Last posted date
- Quick unfollow option

---

## 6. Publisher Features

### 6.1 Publisher Dashboard
**URL:** `/publisher/dashboard`

#### 6.1.1 Statistics Cards

| Stat | Description |
|------|-------------|
| Total Tenders | Count of all tenders |
| Active Tenders | Count of active tenders |
| Total Views | Aggregate views across all tenders |

#### 6.1.2 Tender Management Table

**Columns:**
- Tender Details (title, category, budget)
- Status (Active/Draft/Closed)
- Published date
- Deadline
- Performance (views, interested bidders)
- Actions (Edit, Delete)

#### 6.1.3 Actions

| Action | Behavior |
|--------|----------|
| New Tender | Navigate to `/publisher/tenders/new` |
| Edit | Open edit dialog with inline form |
| Delete | Confirmation dialog with text input ("apply delete for this tender") |

### 6.2 Create New Tender
**URL:** `/publisher/tenders/new`

> [!NOTE]
> This page is desktop-only. Mobile users see a message to switch to desktop.

#### Form Sections:

**1. Tender Information**
| Field | Type | Required |
|-------|------|----------|
| title | text | Yes |
| category | select | Yes |
| description | textarea | No |

**2. Tender Advertisement Image**
| Field | Type | Required |
|-------|------|----------|
| advertisementImage | file (image) | Yes |

**3. Key Dates and Values**
| Field | Type | Required |
|-------|------|----------|
| submissionDeadline | date | Yes |
| estimatedValue | text | No |
| preBidMeetingDate | date | No |
| preBidMeetingTime | time | No |
| regionLocation | text | Yes |

**4. Contact Person Details**
| Field | Type | Required |
|-------|------|----------|
| contactPersonName | text | Yes |
| contactNumber | tel | Yes |
| contactEmail | email | Yes |
| companyWebsite | url | No |

**5. Key Requirements**
- Dynamic list with add/remove
- Enter key to add

**6. Tender Documents**
- Multiple file upload (PDF, DOC, DOCX, XLS, XLSX)
- File list with remove option

### 6.3 Edit Tender
**Location:** Dialog on dashboard

**Editable Fields:**
- Title, Category, Deadline
- Status (Draft/Active/Closed)
- Budget, Location, Type (Public/Private)
- Description

---

## 7. AI-Powered Features

### 7.1 AI Brief Generator

**Purpose:** Summarize tender documents into structured sections

**Input Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| tenderId | string | Target tender |
| scope | string | "file" \| "folder" \| "entire" |
| length | enum | "short" \| "medium" \| "long" |

**Output Structure:**
```typescript
interface BriefSection {
  title: string;
  points: string[];
}
```

**Sections Generated:**
1. Project Overview
2. Scope of Work
3. Key Requirements
4. Budget & Timeline
5. Technical Specifications (long only)

### 7.2 Cover Letter Generator

**Purpose:** Generate customized cover letters for tender bids

**Input Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| tenderId | string | Yes |
| company | string | Yes |
| tone | enum | "formal" \| "professional" \| "friendly" |
| length | enum | "concise" \| "standard" \| "detailed" |
| strengths | string | No |

**Output:** Formatted letter text with:
- Greeting
- Introduction
- Body (experience, strengths)
- Closing
- Signature block

**Actions:**
- Copy to clipboard
- Save (to be implemented in backend)

### 7.3 AI Chat (Q&A)

**Purpose:** Answer questions about tender documents with citations

**Input Parameters:**
```typescript
interface AskParams {
  tenderId: string;
  scope: "file" | "folder" | "entire";
  fileId?: string;
  folderPath?: string;
  context?: "tender" | "uploads" | "both";
  uploadedFileNames?: string[];
  question: string;
}
```

**Response Features:**
- Streaming word-by-word response
- Markdown formatting support
- Citations with document references

```typescript
interface Citation {
  docId: string;
  docName: string;
  page?: number;
  snippet: string;
}
```

**Scope Selector:**
- "This file" - Single document context
- "This folder" - Folder-level context
- "Entire tender" - All documents

**Context Source:**
- "Tender" - Tender documents only
- "Uploads" - User-uploaded documents only
- "Both" - Compare tender vs uploads

**Quick Prompts:**
- "What are the key requirements?"
- "What is the budget range?"
- "When is the submission deadline?"
- "Compare my uploads vs tender"

### 7.4 AI Usage Tracking

```typescript
function getAiUsage(): { used: number; total: number }
```

Display format: "84/120 AI credits used"

---

## 8. Data Models

### 8.1 Tender Model

```typescript
interface Tender {
  id: string;
  title: string;
  publisher: Publisher;
  category: string;
  deadline: string; // ISO date
  status: "Active" | "Closed" | "Draft";
  description: string;
  publishedDate: string; // ISO date
  budget?: string;
  type: "Public" | "Private";
  location?: string;
  sector: "Government" | "Private" | "International";
}
```

### 8.2 Publisher Model

```typescript
interface Publisher {
  id: string;
  name: string;
  logo: string; // URL
}

interface DirectoryPublisher extends Publisher {
  sector: "Government" | "Private" | "International";
  category: string;
  location: string;
  activeTenders: number;
  followers: number;
  description: string;
  verified?: boolean;
  newThisWeek: number;
  lastPosted: string;
}
```

### 8.3 Team Member Model

```typescript
interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: string;
  role: "Owner" | "Member";
  status: "Active" | "Pending" | "Inactive";
}
```

### 8.4 Tender Analytics

```typescript
interface TenderAnalytics {
  views: AnalyticsData;
  visitors: AnalyticsData;
  downloads: AnalyticsData;
  questions: AnalyticsData;
}

interface AnalyticsData {
  value: number;
  change: number; // percentage
  data: number[]; // time series
}
```

---

## 9. API Endpoints Required

### 9.1 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create new user/organization |
| POST | `/auth/login` | Authenticate user |
| GET | `/auth/me` | Get current user |
| POST | `/auth/forgot-password` | Request reset email |
| POST | `/auth/reset-password` | Reset with token |
| POST | `/auth/logout` | Invalidate session |
| POST | `/auth/invite-member` | Invite team member |

### 9.2 Tenders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tenders` | List tenders (filterable) |
| GET | `/tenders/:id` | Get tender details |
| POST | `/tenders` | Create tender (Publisher) |
| PUT | `/tenders/:id` | Update tender |
| DELETE | `/tenders/:id` | Delete tender |
| GET | `/tenders/:id/documents` | Get document tree |
| GET | `/tenders/:id/analytics` | Get tender analytics |

### 9.3 Publishers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/publishers` | List publishers (directory) |
| GET | `/publishers/:id` | Get publisher details |
| POST | `/publishers/:id/follow` | Follow publisher |
| DELETE | `/publishers/:id/follow` | Unfollow publisher |
| GET | `/publishers/following` | Get followed publishers |

### 9.4 AI Features

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/brief` | Generate tender brief |
| POST | `/ai/cover-letter` | Generate cover letter |
| POST | `/ai/chat` | Ask question (streaming) |
| GET | `/ai/usage` | Get AI usage stats |

### 9.5 Files

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tenders/:id/files` | Get file tree |
| GET | `/files/:fileId/content` | Get file content |
| POST | `/tenders/:id/upload` | Upload document |
| DELETE | `/files/:fileId` | Delete uploaded file |

### 9.6 Organization

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/organization` | Get org details |
| PUT | `/organization` | Update org profile |
| GET | `/organization/team` | Get team members |
| POST | `/organization/team` | Add team member |
| DELETE | `/organization/team/:id` | Remove team member |

### 9.7 Billing

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/billing/plan` | Get current plan |
| POST | `/billing/upgrade` | Upgrade plan |
| POST | `/billing/downgrade` | Downgrade plan |
| GET | `/billing/history` | Get billing history |

---

## 10. File Storage Requirements

### 10.1 Document Storage

**Tender Documents:**
- PDFs, DOCX, XLSX files
- Organized by tender ID
- Version tracking recommended
- Public read access (for tender documents)

**User Uploads (Workspace):**
- Per-user, per-tender uploads
- Session-based or persistent storage
- Private access

### 10.2 Image Storage

**Tender Advertisement Images:**
- JPG, PNG, GIF support
- Max size: 10MB recommended
- Thumbnail generation recommended

**Company/Publisher Logos:**
- Square images preferred
- Static hosting (CDN recommended)

---

## 11. Email/Notification System

### 11.1 Required Email Templates

| Email | Trigger | Content |
|-------|---------|---------|
| Welcome | User registers | Onboarding info |
| Email Verification | Registration | Verification link |
| Password Reset | Forgot password | Reset link |
| Team Invitation | Owner invites member | Invitation link |
| New Tender Alert | Followed publisher posts | Tender summary, CTA |
| Subscription Confirmation | Plan purchase | Receipt, plan details |

### 11.2 Publisher Alerts

When a followed publisher posts a new tender:
1. Query all users following that publisher
2. Check each user's plan allows alerts
3. Send email with tender summary
4. Include "View Tender" CTA link

---

## 12. Technical Stack

### 12.1 Frontend (Current)

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework (App Router) |
| TypeScript | Type safety |
| TailwindCSS | Styling |
| Radix UI | Accessible components |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Hook Form + Zod | Form validation |
| Axios | HTTP client |

### 12.2 Recommended Backend Stack

| Layer | Recommendation |
|-------|----------------|
| API Framework | FastAPI (Python) or Express (Node.js) |
| Database | PostgreSQL with pgvector extension |
| Cache | Redis |
| File Storage | S3-compatible (AWS S3, MinIO, etc.) |
| Search | Elasticsearch or PostgreSQL full-text |
| AI/LLM | OpenAI API or similar |
| Email | SendGrid, SES, or Resend |
| Task Queue | Celery (Python) or Bull (Node.js) |

### 12.3 AI/ML Requirements

**Document Processing:**
- PDF text extraction
- Document embedding generation (for semantic search)
- Chunk documents for context windows

**LLM Integration:**
- OpenAI GPT-4 or similar
- Streaming response support
- Context management (tender documents + user uploads)

**Vector Database:**
- Store document embeddings
- Semantic similarity search
- pgvector for PostgreSQL or Pinecone/Weaviate

---

## Appendix A: Page Routes Summary

### A.1 Public Routes (No Authentication Required)

| Route | File Location | Purpose | Key Components |
|-------|---------------|---------|----------------|
| `/` | `app/(marketing)/page.tsx` | Landing page | Hero, HowItWorks, AITools, CustomerStories |
| `/login` | `app/login/page.tsx` | User login | Email/password form, role selector |
| `/register/bidder/step1` | `app/(auth)/register/bidder/step1/page.tsx` | Account setup | Company, user details, password |
| `/register/bidder/step2` | `app/(auth)/register/bidder/step2/page.tsx` | Company profile | Industry, website, description |
| `/register/bidder/step3` | `app/(auth)/register/bidder/step3/page.tsx` | Team invitation | Add team members by plan limits |
| `/register/bidder/ready` | `app/(auth)/register/bidder/ready/page.tsx` | Registration complete | Success message, login redirect |
| `/forgot-password` | `app/forgot-password/page.tsx` | Password recovery | Email input form |
| `/reset-password` | `app/reset-password/page.tsx` | Reset password | New password form (with token) |
| `/pricing` | `app/(marketing)/pricing/page.tsx` | Pricing plans | Plan comparison, FAQs, video |

### A.2 Authenticated Routes - Bidder

| Route | File Location | Purpose | Key Components |
|-------|---------------|---------|----------------|
| `/tenders` | `app/(marketing)/tenders/page.tsx` | Tender listing | TenderCard, FilterDrawer, FollowedPublishers |
| `/tenders/[id]` | `app/(marketing)/tenders/[id]/page.tsx` | Tender details | TenderWorkspaceModal, requirements, contact |
| `/publishers` | `app/(marketing)/publishers/page.tsx` | Publisher directory | Publisher cards, follow/unfollow buttons |
| `/company/profile` | `app/(app)/company/profile/page.tsx` | Company profile edit | Logo upload, name, industry, address |
| `/company/billing` | `app/(app)/company/billing/page.tsx` | Billing management | Current plan, upgrade link, history |
| `/company/team` | `app/(app)/company/team/page.tsx` | Team management | Member list, invite, edit, remove |

### A.3 Authenticated Routes - Publisher

| Route | File Location | Purpose | Key Components |
|-------|---------------|---------|----------------|
| `/publisher/dashboard` | `app/publisher/dashboard/page.tsx` | Publisher dashboard | Stats cards, tender table, edit/delete dialogs |
| `/publisher/tenders/new` | `app/publisher/tenders/new/page.tsx` | Create new tender | Multi-section form, file uploads |

---

## Appendix B: Mock Data Files

### B.1 Core Mock Data (`lib/mock-data.ts`)

**Exported Types:**
```typescript
export interface Publisher {
  id: string;
  name: string;
  logo: string;
}

export interface Tender {
  id: string;
  title: string;
  publisher: Publisher;
  category: string;
  deadline: string;
  status: "Active" | "Closed" | "Draft";
  description: string;
  publishedDate: string;
  budget?: string;
  type: "Public" | "Private";
  location?: string;
  sector: "Government" | "Private" | "International";
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: string;
  role: "Owner" | "Member";
  status: "Active" | "Pending" | "Inactive";
}

export interface AnalyticsData {
  value: number;
  change: number;
  data: number[];
}
```

**Exported Data:**
- `mockPublishers` - 5 sample publishers
- `mockTenders` - 5 sample tenders with varied statuses
- `mockTeamMembers` - 3 sample team members
- `mockTenderAnalytics` - Analytics for tender performance

### B.2 AI Mock Functions (`lib/mocks/ai.ts`)

**Exported Types:**
```typescript
type BriefLength = "short" | "medium" | "long";

interface BriefSection {
  title: string;
  points: string[];
}

interface CoverLetterParams {
  tenderId: string;
  company: string;
  tone: "formal" | "professional" | "friendly";
  length: "concise" | "standard" | "detailed";
  strengths?: string;
}

interface Citation {
  docId: string;
  docName: string;
  page?: number;
  snippet: string;
}

interface AskParams {
  tenderId: string;
  scope: "file" | "folder" | "entire";
  fileId?: string;
  folderPath?: string;
  context?: "tender" | "uploads" | "both";
  uploadedFileNames?: string[];
  question: string;
}
```

**Exported Functions:**
| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getBrief` | `tenderId, length` | `Promise<BriefSection[]>` | Generates structured tender summary |
| `generateCoverLetter` | `CoverLetterParams` | `Promise<string>` | Generates cover letter text |
| `askQuestion` | `AskParams, onChunk` | `Promise<Citation[]>` | Streams AI response with citations |
| `getMockCitations` | `tenderId` | `Citation[]` | Returns sample citations for demo |

### B.3 File System Mock (`lib/mocks/files.ts`)

**Exported Types:**
```typescript
interface FileNode {
  id: string;
  name: string;
  type: "folder" | "file";
  ext?: string;
  size?: string;
  path: string;
  origin?: "tender" | "upload";
  previewUrl?: string;
  children?: FileNode[];
}
```

**Exported Functions:**
| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getTenderTree` | `tenderId` | `Promise<FileNode[]>` | Returns document tree for tender |
| `getFileContent` | `fileId` | `Promise<{url: string}>` | Returns file preview URL |

### B.4 Publisher Directory (`lib/publisher-directory.ts`)

**Exported Types:**
```typescript
type Sector = "Government" | "Private" | "International";

interface DirectoryPublisher extends Publisher {
  sector: Sector;
  category: string;
  location: string;
  activeTenders: number;
  followers: number;
  description: string;
  verified?: boolean;
  newThisWeek: number;
  lastPosted: string;
}
```

**Exported Data:**
- `directoryPublishers` - 7 sample publishers with full metadata
- `FOLLOWED_PUBLISHERS_STORAGE_KEY` - localStorage key constant
- `DEFAULT_FOLLOWED_PUBLISHER_IDS` - Default followed publishers

### B.5 Plan Entitlements (`lib/entitlements.ts`)

**Exported Types:**
```typescript
type PlanTier = "FREE" | "STANDARD" | "PREMIUM";

interface PlanFeatures {
  name: string;
  price: number;
  seats: number;
  monthlyAIQuestions: number;
  publisherFollowLimit: number;
  features: string[];
}
```

**Plan Configuration:**
| Plan | Price (LKR) | Seats | AI Questions | Follow Limit |
|------|-------------|-------|--------------|--------------|
| FREE | 0 | 1 | 2/tender | 0 |
| STANDARD | 6,000 | 1 | 120/month | 5 |
| PREMIUM | 10,000 | 2 | 300/month | 10 |

---

## Appendix C: Local Storage Keys

### C.1 Authentication

| Key | Type | Purpose | Set By | Cleared By |
|-----|------|---------|--------|------------|
| `access_token` | string | JWT bearer token | Login | Logout |

### C.2 Registration Flow

| Key | Type | Purpose | Set By | Cleared By |
|-----|------|---------|--------|------------|
| `bidder_step1` | JSON | Step 1 form data | Step 1 submit | Registration complete |
| `bidder_step2` | JSON | Step 2 form data | Step 2 submit | Registration complete |
| `bidder_step3` | JSON | Step 3 form data | Step 3 submit | Registration complete |
| `bidder_plan` | string | Selected plan tier | Step 1 (from URL) | Registration complete |

### C.3 User Preferences

| Key | Type | Purpose | Set By | Cleared By |
|-----|------|---------|--------|------------|
| `bidwizer_followed_publishers` | JSON array | IDs of followed publishers | Follow action | Unfollow action |

---

## Appendix D: Component Reference

### D.1 Tender Workspace Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| `TenderWorkspaceModal` | `components/tender-workspace/TenderWorkspaceModal.tsx` | Main workspace container |
| `FileTree` | `components/tender-workspace/FileTree.tsx` | Document hierarchy display |
| `DocumentViewer` | `components/tender-workspace/DocumentViewer.tsx` | PDF/document preview |
| `AiAssistantPanel` | `components/tender-workspace/AiAssistantPanel.tsx` | AI tools tabbed interface |
| `BriefTab` | `components/tender-workspace/tabs/BriefTab.tsx` | Brief generation UI |
| `CoverLetterTab` | `components/tender-workspace/tabs/CoverLetterTab.tsx` | Cover letter form |
| `ChatTab` | `components/tender-workspace/tabs/ChatTab.tsx` | Q&A chat interface |
| `AiUsageChip` | `components/tender-workspace/AiUsageChip.tsx` | Usage limit display |

### D.2 Tender Listing Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| `TenderCard` | `components/tenders/tender-card.tsx` | Individual tender display |
| `TenderPreviewModal` | `components/tenders/tender-preview-modal.tsx` | Quick preview slide-out |
| `FilterDrawer` | `components/tenders/filter-drawer.tsx` | Advanced filtering UI |
| `AnalyticsChips` | `components/tenders/analytics-chips.tsx` | Quick filter chips |
| `FollowedPublishers` | `components/tenders/followed-publishers.tsx` | Sidebar publisher list |

### D.3 Shared/Layout Components

| Component | File Path | Purpose |
|-----------|-----------|---------|
| `SiteHeader` | `components/site-header.tsx` | Main navigation header |
| `SiteFooter` | `components/site-footer.tsx` | Footer with links |
| `Header` | `components/Header.tsx` | Authenticated header |
| `Footer` | `components/Footer.tsx` | Authenticated footer |
| `Stepper` | `components/Stepper.tsx` | Registration progress |

---

## Appendix E: Environment Variables

### E.1 Required Variables

| Variable | Default | Purpose | Required |
|----------|---------|---------|----------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | Backend API base URL | Yes |

### E.2 API Client Configuration (`lib/api-client.ts`)

```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor adds Authorization header
// Response interceptor handles 401 errors
```

---

## Appendix F: UI/UX Patterns

### F.1 Color Coding by Category

| Category | Background | Text |
|----------|------------|------|
| Construction | `bg-blue-50` | `text-blue-700` |
| Healthcare | `bg-green-50` | `text-green-700` |
| Infrastructure | `bg-amber-50` | `text-amber-700` |
| IT & Technology | `bg-indigo-50` | `text-indigo-700` |
| Energy | `bg-rose-50` | `text-rose-700` |

### F.2 Status Badge Colors

| Status | Background | Text |
|--------|------------|------|
| Active | `bg-green-50` | `text-green-700` |
| Draft | `bg-amber-50` | `text-amber-700` |
| Closed | `bg-slate-50` | `text-slate-700` |
| Pending | `bg-yellow-100` | `text-yellow-800` |

### F.3 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

---

## Document Metadata

| Property | Value |
|----------|-------|
| **Document Version** | 1.0 |
| **Created** | December 29, 2024 |
| **Last Updated** | December 29, 2024 |
| **Application** | BidWizer Frontend |
| **Framework** | Next.js 14 (React) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS |
| **Status** | Frontend Complete (Dummy Data) |
| **Total Pages** | 17+ routes |
| **Total Components** | 30+ reusable components |
| **Mock Data Files** | 5 files |

---

## Implementation Priority Guide

> [!TIP]
> Follow this recommended implementation order for the backend:

### Phase 1: Foundation (Week 1-2)
1. Database schema setup
2. User authentication (register, login, JWT)
3. Organization and team member management
4. Basic CRUD for tenders

### Phase 2: Core Features (Week 3-4)
5. Tender listing with search and filters
6. Publisher directory and following system
7. File storage and document management
8. Tender workspace API

### Phase 3: AI Features (Week 5-6)
9. Document processing pipeline (PDF extraction)
10. Vector embeddings and semantic search
11. AI Brief generation endpoint
12. AI Chat endpoint with streaming
13. Cover letter generation

### Phase 4: Polish (Week 7-8)
14. Email notification system
15. Billing/subscription integration
16. Analytics and usage tracking
17. Performance optimization

---

> [!IMPORTANT]
> This document represents the complete frontend implementation specification. The backend team should use this as the definitive reference for building APIs and services that integrate with the existing frontend codebase.
