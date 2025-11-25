# PartPulse QA Requirements

## Quality Assurance Framework

This document defines the validation rules and QA gates that enforce architecture compliance for PartPulse.

---

## 1. QA Philosophy

### Green/Red Evaluation Model
- **GREEN**: Requirement fully met, verified by automated checks
- **RED**: Requirement not met, blocks deployment
- **YELLOW**: Partial compliance, requires review (non-blocking in development)

### QA Gates
All builds must pass through these gates before handover:

| Gate | Description | Blocking |
|------|-------------|----------|
| Architecture | Rules and components defined | Yes |
| Environment | Required env vars present | Yes (Strict Mode) |
| Type Safety | TypeScript compiles | Yes |
| Lint | ESLint passes | Yes |
| Build | Next.js builds | Yes |
| Tests | Unit + E2E pass | Yes |
| Wiring | Components connected | Yes |
| Routes | All respond 200 | Yes |
| Security | No vulnerabilities | Yes |

---

## 2. Validation Rules

### Architecture Compliance

| ID | Rule | Check Method |
|----|------|--------------|
| ARCH-001 | Architecture rules.md exists | File exists |
| ARCH-002 | Components.md exists | File exists |
| ARCH-003 | QA requirements.json exists | File exists |
| ARCH-004 | All pages in architecture are implemented | Route check |
| ARCH-005 | All components in architecture exist | File check |

### UI/UX Consistency

| ID | Rule | Check Method |
|----|------|--------------|
| UX-001 | Primary color #FF2B00 used | Config check |
| UX-002 | Logo displayed in header | E2E snapshot |
| UX-003 | Sidebar navigation present | E2E check |
| UX-004 | Responsive design works | E2E viewport test |
| UX-005 | Form validation feedback shown | E2E interaction |
| UX-006 | Loading spinners displayed | E2E check |
| UX-007 | Toast notifications work | E2E interaction |
| UX-008 | Error states displayed | E2E check |

### User Feedback Expectations

| Scenario | Expected Feedback | Timing |
|----------|-------------------|--------|
| Form submitting | Spinner + "Saving..." text | Immediate |
| Form success | Success toast | After save |
| Form error | Error toast + field highlight | Immediate |
| Page loading | Loading spinner | During fetch |
| Action complete | Confirmation message | After completion |

---

## 3. Component Wiring Checks

### Wiring Verification

| Component | Wiring Check | Pass Criteria |
|-----------|--------------|---------------|
| Header | Renders in DOM | Element visible |
| Sidebar | Contains nav items | Nav links present |
| PreviewToggle | Clickable and changes state | State changes on click |
| Forms | All fields render | Fields present |
| Buttons | Click handlers work | Actions triggered |
| Modals | Open/close functionality | State changes |

### Admin Component Visibility

| Component | Visible To | Hidden From |
|-----------|------------|-------------|
| Invite Members tab | Admin | Technician |
| Reports tab | Admin | Technician |
| Settings tab | Admin | Technician |
| Security Dashboard tab | Admin | Technician |
| Health Checker tab | Admin | Technician |

---

## 4. Workflow Validation

### Authentication Workflow

| Step | Validation |
|------|------------|
| Login | Credentials accepted, session created |
| Logout | Session cleared, redirect to login |
| Signup | Account created, email sent |
| Password Reset | Reset email sent, link works |
| Session Restore | LocalStorage persisted, restored on refresh |

### Form Submission Workflow

| Step | Validation |
|------|------------|
| Input | Fields accept valid data |
| Validation | Required fields enforced |
| Submit | Data sent to API |
| Save | Data persisted to database |
| Feedback | Success/error shown to user |
| Audit | Action logged |

### Report Generation Workflow

| Step | Validation |
|------|------------|
| Load | Data fetched from database |
| Filter | Filters modify displayed data |
| Export | Excel file generated |
| Download | File downloads correctly |

---

## 5. Data Integrity

### Database Integrity

| Check | Description |
|-------|-------------|
| Migrations | All migrations applied |
| Schema | Tables match expected structure |
| RLS | Row Level Security enabled |
| Constraints | Foreign keys enforced |
| Indexes | Required indexes present |

### Form Data Integrity

| Field Type | Validation |
|------------|------------|
| Required | Cannot be empty |
| Date | Valid date format |
| Number | Positive integer |
| Email | Valid email format |
| Selection | Valid option selected |

---

## 6. Deployment Readiness

### Pre-Deployment Checklist

| Item | Requirement |
|------|-------------|
| Build | Passes without errors |
| Tests | All tests pass |
| Lint | No ESLint errors |
| TypeCheck | No TypeScript errors |
| Env Vars | All required vars present |
| Database | Migrations applied |
| Routes | All respond 200 |
| Security | No exposed secrets |

### Environment Variables Required

| Variable | Purpose | Required |
|----------|---------|----------|
| NEXT_PUBLIC_SUPABASE_URL | Database URL | Yes |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Public key | Yes |
| SUPABASE_SERVICE_ROLE_KEY | Server key | Yes |
| RESEND_API_KEY | Email service | Yes |
| EMAIL_FROM | Sender address | No (fallback) |
| QA_STRICT | Strict mode toggle | No |

---

## 7. Security Expectations

### Security Checks

| ID | Check | Description |
|----|-------|-------------|
| SEC-001 | No exposed secrets | API keys not in client code |
| SEC-002 | Admin routes protected | Role check before render |
| SEC-003 | Input sanitized | XSS prevention |
| SEC-004 | HTTPS enforced | Secure transport |
| SEC-005 | Authentication required | No public data access |
| SEC-006 | RLS policies active | Database-level security |
| SEC-007 | Audit logging | Actions tracked |

### Security Baseline

- Passwords hashed via Supabase Auth
- Sessions expire appropriately
- Sensitive data encrypted at rest
- API endpoints authenticated
- CORS properly configured

---

## 8. Handover Criteria

### Build Allowed When

| Criterion | Status Required |
|-----------|-----------------|
| All architecture checks | GREEN |
| All environment checks | GREEN (or YELLOW if strict mode off) |
| Type safety | GREEN |
| Lint | GREEN |
| Build | GREEN |
| Unit tests | GREEN |
| E2E tests | GREEN |
| Wiring tests | GREEN |
| Route tests | GREEN |
| Security checks | GREEN |

### Build Not Allowed When

- Any required check is RED
- Wiring failures not addressed
- Security vulnerabilities present
- Routes returning non-200
- Database migrations pending

---

## 9. QA Process

### Standard QA Cycle

1. **Update Architecture** - Define requirements first
2. **Update QA Checks** - Encode machine-verifiable checks
3. **Run QA (expect RED)** - Verify checks fail before implementation
4. **Implement Changes** - Build to meet requirements
5. **Run QA (expect GREEN)** - Verify all checks pass
6. **Handover** - User verification via UI

### Continuous QA

- QA runs on every commit
- Failed checks block merge
- Health Checker provides in-app status
- Nightly full regression suite

---

## 10. QA Reporting

### Report Format

```json
{
  "timestamp": "ISO-8601",
  "status": "GREEN | RED | YELLOW",
  "summary": {
    "total": 50,
    "passed": 48,
    "failed": 2,
    "skipped": 0
  },
  "categories": [
    {
      "name": "Architecture",
      "status": "GREEN",
      "checks": [...]
    }
  ]
}
```

### Human-Readable Report

- No code shown to non-technical users
- Clear pass/fail indicators
- Actionable failure descriptions
- Component-level diagnostics
