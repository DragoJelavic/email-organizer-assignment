# Claude Development Implementation Plan

## AI-Powered Email Composition System

### 🎯 **Development Strategy**

- **Modular Architecture**: Each module can be developed and tested independently
- **Incremental Delivery**: Each module builds upon the previous one
- **Feature-First Approach**: Focus on core functionality before polish
- **Time-Boxed Development**: Clear boundaries for each implementation phase

---

## 📋 **Module Breakdown & Implementation Order**

### **Module 1: Foundation Setup** ⏱️ _10 minutes_

**Dependencies**: None
**Deliverable**: Working development environment

#### Backend Tasks:

- [ ] Database schema design and migration
- [ ] Basic Fastify server setup with CORS
- [ ] Environment configuration (.env setup)
- [ ] Basic health check endpoint

#### Frontend Tasks:

- [ ] Next.js project structure review
- [ ] MUI theme configuration
- [ ] Basic layout components
- [ ] API client setup (axios/fetch)

#### Files to Create/Modify:

```
backend/
├── migrations/001_create_emails_table.js
├── src/config/database.js
├── src/config/env.js
├── src/server.js
└── .env.example

frontend/
├── src/components/Layout/AppLayout.tsx
├── src/lib/api.ts
├── src/theme/theme.ts
└── src/types/email.ts
```

---

### **Module 2: Core Email Management** ⏱️ _15 minutes_

**Dependencies**: Module 1
**Deliverable**: Basic email CRUD without AI

#### Backend Tasks:

- [ ] Email model and validation schemas
- [ ] Email CRUD endpoints (GET, POST, PUT, DELETE)
- [ ] Basic error handling middleware
- [ ] Mock email data for testing

#### Frontend Tasks:

- [ ] Email list sidebar component
- [ ] Email detail viewer component
- [ ] Basic email composition form
- [ ] State management for email data

#### Files to Create/Modify:

```
backend/
├── src/models/Email.js
├── src/controllers/emailController.js
├── src/routes/emailRoutes.js
└── src/middleware/validation.js

frontend/
├── src/components/Email/EmailSidebar.tsx
├── src/components/Email/EmailViewer.tsx
├── src/components/Email/ComposeForm.tsx
├── src/hooks/useEmails.ts
└── src/store/emailStore.ts
```

#### API Endpoints:

```
GET    /api/emails          - List all emails
GET    /api/emails/:id      - Get specific email
POST   /api/emails          - Create new email
PUT    /api/emails/:id      - Update email
DELETE /api/emails/:id      - Delete email
```

---

### **Module 3: AI Router System** ⏱️ _15 minutes_

**Dependencies**: Module 2
**Deliverable**: AI classification and routing logic

#### Backend Tasks:

- [ ] OpenAI API integration setup
- [ ] AI Router service with classification logic
- [ ] Base AI Assistant abstract class
- [ ] Router endpoint for intent classification

#### Frontend Tasks:

- [ ] AI prompt modal component
- [ ] AI button integration in compose form
- [ ] Loading states for AI operations
- [ ] Error handling for AI failures

#### Files to Create/Modify:

```
backend/
├── src/services/aiService.js
├── src/services/aiRouter.js
├── src/controllers/aiController.js
├── src/routes/aiRoutes.js
└── src/utils/openai.js

frontend/
├── src/components/AI/AIPromptModal.tsx
├── src/components/AI/AIButton.tsx
├── src/hooks/useAI.ts
└── src/types/ai.ts
```

#### AI Router Prompt:

```
System prompt for classification:
"Classify the following email request into one of these categories:
- SALES: Outreach, proposals, business development
- FOLLOWUP: Check-ins, reminders, status updates
- OTHER: Everything else

Return only the category name."
```

---

### **Module 4: Specialized AI Assistants** ⏱️ _15 minutes_

**Dependencies**: Module 3
**Deliverable**: Working Sales and Follow-up email generation

#### Backend Tasks:

- [ ] Sales Assistant implementation
- [ ] Follow-up Assistant implementation
- [ ] Streaming response handling
- [ ] Assistant factory pattern

#### Frontend Tasks:

- [ ] Real-time streaming integration
- [ ] Progressive text population in form fields
- [ ] Stream error handling and fallbacks
- [ ] Edit capabilities post-generation

#### Files to Create/Modify:

```
backend/
├── src/assistants/SalesAssistant.js
├── src/assistants/FollowUpAssistant.js
├── src/assistants/BaseAssistant.js
├── src/services/streamingService.js
└── src/utils/prompts.js

frontend/
├── src/components/AI/StreamingText.tsx
├── src/hooks/useStreaming.ts
├── src/utils/streaming.ts
└── src/types/streaming.ts
```

#### Assistant Prompts:

```javascript
// Sales Assistant
const SALES_PROMPT = `
You are a sales email specialist. Generate concise, professional sales emails.
Requirements:
- Maximum 40 words total
- 7-10 words per sentence
- Professional but friendly tone
- Clear call-to-action
- Personalized when possible
`;

// Follow-up Assistant
const FOLLOWUP_PROMPT = `
You are a follow-up email specialist. Generate polite, professional follow-up emails.
Requirements:
- Courteous and respectful tone
- Clear reference to previous interaction
- Gentle reminder or check-in
- Professional closing
`;
```

---

### **Module 5: UI/UX Polish & Integration** ⏱️ _5 minutes_

**Dependencies**: Module 4
**Deliverable**: Complete working application

#### Backend Tasks:

- [ ] Final error handling improvements
- [ ] Request logging and basic monitoring
- [ ] API response optimization
- [ ] Database connection cleanup

#### Frontend Tasks:

- [ ] Apple Mail-style UI refinements
- [ ] Responsive design adjustments
- [ ] Loading animations and micro-interactions
- [ ] Final integration testing

#### Files to Create/Modify:

```
backend/
├── src/middleware/logging.js
├── src/middleware/errorHandler.js
└── src/utils/cleanup.js

frontend/
├── src/components/UI/LoadingSpinner.tsx
├── src/styles/globals.css
├── src/components/Layout/MainLayout.tsx
└── src/utils/ui.ts
```

---

## 🔧 **Development Commands for Each Module**

### Module 1 - Foundation:

```bash
# Backend
cd backend
yarn install
yarn migrate
yarn dev

# Frontend
cd frontend
yarn install
yarn dev
```

### Module 2 - Email Management:

```bash
# Test endpoints
curl -X GET http://localhost:3001/api/emails
curl -X POST http://localhost:3001/api/emails -H "Content-Type: application/json" -d '{"to":"test@example.com","subject":"Test","body":"Test email"}'
```

### Module 3 - AI Router:

```bash
# Test AI classification
curl -X POST http://localhost:3001/api/ai/classify -H "Content-Type: application/json" -d '{"prompt":"I want to follow up on our meeting"}'
```

### Module 4 - AI Assistants:

```bash
# Test streaming generation
curl -X POST http://localhost:3001/api/ai/generate -H "Content-Type: application/json" -d '{"type":"sales","prompt":"Reach out to potential client"}'
```

---

## 🧪 **Testing Strategy per Module**

### Module 1 Testing:

- [ ] Database connection successful
- [ ] Server starts without errors
- [ ] Frontend renders basic layout
- [ ] API client can connect to backend

### Module 2 Testing:

- [ ] Can create, read, update, delete emails
- [ ] Email list displays correctly
- [ ] Email viewer shows selected email
- [ ] Compose form validates inputs

### Module 3 Testing:

- [ ] AI classification returns correct categories
- [ ] Router selects appropriate assistant
- [ ] Error handling for API failures
- [ ] Modal interactions work smoothly

### Module 4 Testing:

- [ ] Sales assistant generates concise emails
- [ ] Follow-up assistant creates appropriate tone
- [ ] Streaming populates form fields correctly
- [ ] Generated content is editable

### Module 5 Testing:

- [ ] Complete user flow works end-to-end
- [ ] UI matches Apple Mail aesthetic
- [ ] Responsive design functions properly
- [ ] Error states are user-friendly

---

## 🚀 **Deployment Checklist**

### Pre-Deployment:

- [ ] Remove `.next` folder
- [ ] Remove `dev.sqlite3` file
- [ ] Remove `node_modules` folders
- [ ] Remove ignored files
- [ ] Verify environment variables are documented

### Environment Setup:

```bash
# Backend .env
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=./dev.sqlite3
PORT=3001

# Frontend .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📊 **Success Criteria by Module**

### Module 1: ✅ Foundation Ready

- Server runs on port 3001
- Frontend runs on port 3000
- Database migration successful
- Basic API connectivity confirmed

### Module 2: ✅ Email Management Complete

- Email CRUD operations functional
- Apple Mail-style sidebar working
- Email composition form operational
- Data persists in database

### Module 3: ✅ AI Router Active

- Intent classification accuracy >80%
- Proper routing to assistants
- Error handling for API failures
- User feedback on AI operations

### Module 4: ✅ AI Assistants Functional

- Sales emails under 40 words
- Follow-up emails appropriately toned
- Streaming integration working
- Post-generation editing enabled

### Module 5: ✅ Production Ready

- Complete user workflow functional
- UI polish and responsiveness
- Error handling comprehensive
- Documentation complete

---

## 🔄 **Iteration Strategy**

Each module should be:

1. **Implemented** - Code written and functional
2. **Tested** - Manual testing of core functionality
3. **Integrated** - Connected with previous modules
4. **Validated** - Meets success criteria
5. **Documented** - Key decisions and setup noted

This modular approach ensures that even if time runs short, we have working increments at each stage rather than incomplete features across the board.
