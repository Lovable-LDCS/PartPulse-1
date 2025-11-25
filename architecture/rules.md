# PartPulse Architecture Rules

## True North – One-Time Build Philosophy

This document defines the architectural rules and source of truth for PartPulse. All builds, features, and modifications must align with this architecture.

---

## 1. Core Philosophies

### True North Philosophy
- **Architecture = Source of Truth**: All requirements, components, and behaviors are defined here first
- **No deviation without architecture update**: Code changes must reflect architecture decisions
- **Single source of truth**: This document supersedes conflicting implementations

### One-Time Build Philosophy
- **Complete before handover**: System must be 100% QA GREEN before user verification
- **No partial deliveries**: All features must be functional and wired
- **Quality over speed**: Thorough implementation over quick patches

---

## 2. Page Structure & Layout Definitions

### Layout Requirements
| Element | Specification |
|---------|--------------|
| Logo | Top-left corner, source: `/public/assets/logo.png` |
| Sidebar | Left-side navigation, collapsible on mobile |
| Header | Fixed, contains preview mode selector |
| Main Content | Right of sidebar, responsive width |
| Footer | Optional, for copyright/version info |

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Page Templates
1. **Dashboard Layout**: Sidebar + Header + Main Content
2. **Form Layout**: Centered form with validation feedback
3. **Report Layout**: Filterable table with export capabilities
4. **Settings Layout**: Sectioned configuration panels

---

## 3. Navigation Structure

### Sidebar Tabs (in order)
| Tab | Route | Access |
|-----|-------|--------|
| Internal Transfer | `/internal-transfer` | All users |
| Warranty Claims | `/warranty-claims` | All users |
| Invite New Members | `/invite-members` | Admin only |
| Reports | `/reports` | Admin only |
| Settings | `/settings` | Admin only |
| Security Dashboard | `/security-dashboard` | Admin only |
| Health Checker | `/health-checker` | Admin only |

### Route Protection Rules
- All routes require authentication
- Admin routes must verify role before render
- Redirect unauthorized users to appropriate page
- No 404 pages for valid routes

---

## 4. UX/UI Rules & Consistency

### User Feedback Requirements
| Action | Feedback Type | Timing |
|--------|--------------|--------|
| Form submission | Saving indicator | During save |
| Data loading | Loading spinner | During fetch |
| Error | Toast notification | Immediate |
| Success | Toast notification | After completion |
| Validation | Inline field errors | On blur/submit |

### Interaction Standards
- All buttons must have hover states
- Form fields must show focus states
- Required fields marked with red asterisk (*)
- Disabled elements must be visually distinct
- Click targets minimum 44x44px on mobile

---

## 5. Branding & Visual Design

### Color Scheme
| Purpose | Color |
|---------|-------|
| Primary | `#FF2B00` |
| Secondary | `#FFFFFF` |
| Background | `#F8F9FA` |
| Text Primary | `#1A1A1A` |
| Text Secondary | `#6B7280` |
| Error | `#DC2626` |
| Success | `#16A34A` |
| Warning | `#F59E0B` |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | System | 2rem | 700 |
| H2 | System | 1.5rem | 600 |
| H3 | System | 1.25rem | 600 |
| Body | System | 1rem | 400 |
| Small | System | 0.875rem | 400 |

### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Consistent padding: 16px (mobile), 24px (desktop)
- Card border-radius: 8px

---

## 6. System Behaviors

### Authentication Flow
1. User enters credentials
2. Supabase Auth validates
3. Session created with JWT
4. Role fetched from users table
5. Context persisted to localStorage
6. Admin access determined by role OR email in admin list

### Admin Gating Logic
Admin access granted if ANY of:
- `RoleContext` = "Admin"
- `user.role` === "Admin"
- Email in admin list:
  - `joline.kruger@tranetechnologies.com`
  - `johan.ras2@outlook.com`

### Form Submission Flow
1. Client-side validation
2. Show saving indicator
3. API call to backend
4. Database write with RLS
5. Audit log entry created
6. Success/error toast displayed
7. PDF generated (if applicable)
8. Email sent (if configured)

---

## 7. Launch Requirements

### Pre-Launch Checklist
- [ ] All routes respond with 200 status
- [ ] No 404 pages for defined routes
- [ ] All forms submit successfully
- [ ] Email integration verified
- [ ] Database migrations applied
- [ ] RLS policies active
- [ ] Admin functions restricted
- [ ] Mobile responsive verified

### ESLint Cleanliness
- Zero errors required
- Zero warnings preferred
- Consistent code style enforced
- TypeScript strict mode enabled

---

## 8. Domain-Specific Rules

### HVAC Parts Domain
- Part numbers follow company format
- SSID/PSID are mutually exclusive
- Warranty claims require failure documentation
- Serial numbers must be validated format

### Data Integrity
- All transfers logged with timestamp
- Technician name auto-filled from auth
- Quantity must be positive integer
- Dates cannot be future (for failures)

---

## 9. Acceptance Criteria Format

All functional requirements must include:
```
Given: [precondition]
When: [action]
Then: [expected result]
And: [additional expectations]
```

### Example
```
Given: User is authenticated as Technician
When: User submits Internal Transfer form with valid data
Then: Transfer is saved to database
And: PDF is generated
And: Email is sent to configured recipients
And: Success toast is displayed
```

---

## 10. Architecture Enforcement

### Before Code Changes
1. Verify requirement exists in architecture
2. If missing, update architecture first
3. Update QA checks to verify implementation
4. Implement code changes
5. Run QA to verify GREEN

### Legacy Code Handling
- Unwired code must be removed or wired
- Two consecutive wiring failures = delete
- No dead code allowed in production

### Documentation Requirements
- Component purpose documented
- Props interface defined
- Usage examples provided
- Dependencies listed
