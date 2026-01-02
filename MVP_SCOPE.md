# BidWizer MVP Scope Document

## 1. Product Vision
BidWizer is a web-based platform designed to revolutionize the tendering process for both Publishers (organizations issuing tenders) and Bidders (vendors responding to them). The platform simplifies complex procurement workflows by centralizing tender discovery, management, and response preparation. The MVP focuses on delivering a functional ecosystem where Publishers can easily register and manage tenders, while Bidders can efficiently discover opportunities and leverage AI-powered tools to analyze requirements and draft high-quality responses.

## 2. Target Users

### 2.1 Bidders
**Profile:** Companies, contractors, or individual consultants seeking business opportunities through tenders.  
**Needs:**
- Efficiently search and filter relevant tender opportunities.
- Quickly understand complex tender requirements without reading hundreds of pages manually.
- streamline the proposal creation process.
- Manage documentation and track deadlines.

### 2.2 Publishers
**Profile:** Government departments, agile agencies, or private organizations that issue requests for proposals (RFPs) and tenders.  
**Needs:**
- A simple, reliable channel to publish tender notifications.
- Tools to ensure tender documents are clear and compliant.
- Visibility into bidder engagement (views, downloads).

## 3. MVP Features

### 3.1 Bidder Features

#### Account Management
- **User Registration & Login:** Secure email/password authentication.
- **Profile Management:** Manage company details, contact information, and preferences.
- **Subscription Management:** View current plan limits (e.g., number of follows, AI credits).

#### Tender Discovery
- **Search & Filter:** Robust search functionality allowing bidders to find tenders by keyword, sector, location, and value.
- **Tender Feed:** A personalized dashboard showing recommended or recent tenders based on user preferences.

#### Tender Details and Document Review
- **Quick View Panel:** A summary sidebar displaying key metadata (Closing Date, Budget, Location) and a list of attachments for rapid scanning.
- **Full Details Page:** A dedicated page with the complete tender advertisement, contact details, submission instructions, and comprehensive timelines.
- **Document Workspace:** A centralized file manager where users can view, download, and organize tender-related PDFs and spreadsheets.

#### AI Assistant
A suite of AI tools designed to accelerate understanding and response:
1.  **Brief:** Generates a concise executive summary of the tender, highlighting the scope of work, mandatory requirements, and budget constraints.
2.  **Chat:** An interactive Q&A interface where users can ask specific questions about the tender documents (e.g., "What is the insurance requirement?"). The AI provides answers with specific page citations from the source documents.
3.  **Cover Letter:** automatically drafts a professional cover letter or executive summary based on the user's company profile and the tender's key strengths.

#### Publisher Follow/Manage
- **Follow Publishers:** Bidders can "follow" specific organizations to receive updates on their new activities.
- **Management Dashboard:** A side panel or dedicated view listing followed publishers.
- **Limits:** Implementation of plan-based following limits (e.g., Standard plan users can follow up to 5 publishers).

#### Talent Marketplace (Optional for MVP)
- **Specialist Directory:** A browsable list of subject matter experts or partners with their rates and availability.
- **Enquiry System:** A simple "Contact" or "Enquire" button to facilitate offline communication.
> **Note:** Direct booking, payments, and scheduling are explicitly OUT of scope for MVP to reduce complexity.

### 3.2 Publisher Features

#### Registration & Login
- **Organization Onboarding:** Registration form capturing Organization Name, Type (Government/Private), Contact Person, Email, and Password.
- **Role Selection:** Distinct login flow for Publisher accounts vs. Bidder accounts.

#### Tender Creation & Management
- **Tender Builder:** A form-based wizard to create new tenders with fields for Title, Description, Sector/Category, Estimated Value, and Deadlines (Submission, Q&A).
- **Lifecycle Management:** Capabilities to Edit active tenders, Close tenders early, or Mark them as awarded.
- **Dashboard:** A central view listing all published tenders with their current status (Active, Closed, Draft).

#### Document Upload & AI Tools
- **File Management:** specific capabilities to upload PDFs, spreadsheets, and technical specs associated with a tender.
- **AI Compliance Review:** (Reuse of Bidder AI tech) An internal tool for publishers to "chat" with their own draft documents to verify clarity, check for missing sections, or ensure compliance before publishing.

#### Basic Analytics
- **Engagement Stats:** Simple dashboard metrics showing the number of Views and Document Downloads per tender.
- **MVP Scope:** Restricted to high-level counts. Detailed user tracking or conversion funnels are deferred.

#### 3.2.5 Pricing Plan & Payment Integration
**Bidder Pricing (Freemium Model)**
- **Free Tier:** Unlimited search & filtering, 1 Publisher follow, limited AI briefs (e.g., 3/month).
- **Pro Tier:** Unlimited follows, unlimited AI Assistant (Briefs, Chat, Cover Letter), priority support.

**Publisher Pricing**
- **Standard (Free):** Unlimited publishing, basic analytics.
- **Enterprise (Paid):** "Verified Publisher" badge, advanced analytics (who viewed/downloaded), AI Compliance Review.

**Payment Infrastructure**
- **Gateway:** Integration with Stripe/Razorpay for secure recurring billing.
- **Invoicing:** Automated tax-compliant invoice generation for B2B subscribers.
- **Self-Serve:** User capabilities to upgrade, downgrade, or cancel subscriptions.

### 3.3 Super Admin Features (Platform Administration)
*Crucial for managing the platform's integrity and operations.*

#### User & Organization Management
- **Gov/Publisher Verification:** Workflow to review and verify new Publisher accounts (specifically Government users) before they can publish.
- **User Administration:** Ability to view user lists, reset passwords, or suspend accounts for violations.
- **Profile Verification (Future):** Placeholder capability to verify Talent Marketplace profiles (deferred for post-MVP).

#### Subscription & Growth
- **Promo Code Manager:** Ability to generate percentage-based discount codes (e.g., 50%, 100% off) for subscriptions.
- **Referral System:** Basic tracking of referral codes.

#### Content Moderation
- **Tender Review:** (Optional) Flagging system for inappropriate or spam content.
- **Dispute Resolution:** Basic logs/tools to handle disputes between parties.

#### Master Data Management
- **Categories & Locations:** Interface to add or edit system-wide categories, tags, and location lists without code changes.

#### Platform Analytics
- **Health Metrics:** Dashboard showing Total Users (Bidder/Publisher split), Active Subscriptions (MRR), and Total Tenders Published.

#### Team Management (Simplified for MVP)
- **User Invites:** Ability to invite team members via email to join the organization's account.
- **Role Assignment:** Basic role distinction (Admin vs. Editor), or simplified to a single Admin role for the initial release.
