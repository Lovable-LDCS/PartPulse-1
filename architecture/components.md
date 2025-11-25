# PartPulse Component Architecture

## Component Map Overview

This document defines all components that must be wired in the application, their dependencies, and the component hierarchy.

---

## 1. Component Hierarchy

```
App
├── AuthProvider
│   └── RoleProvider
│       └── Layout
│           ├── Header
│           │   └── PreviewModeToggle
│           ├── Sidebar
│           │   └── NavItem[]
│           └── MainContent
│               └── [Page Components]
```

---

## 2. Core Components

### Layout Components

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| Layout | `src/components/Layout` | Main app wrapper with sidebar/header | Required |
| Header | `src/components/Header` | Top bar with preview toggle | Required |
| Sidebar | `src/components/Sidebar` | Left navigation | Required |
| NavItem | `src/components/NavItem` | Individual nav link | Required |

### Context Providers

| Provider | Location | Purpose | Status |
|----------|----------|---------|--------|
| AuthProvider | `src/contexts/AuthContext` | Authentication state | Required |
| RoleProvider | `src/contexts/RoleContext` | User role management | Required |
| ToastProvider | `src/contexts/ToastContext` | Notification system | Required |

### Form Components

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| FormField | `src/components/forms/FormField` | Reusable form input | Required |
| DatePicker | `src/components/forms/DatePicker` | Date selection | Required |
| RadioGroup | `src/components/forms/RadioGroup` | Radio button group | Required |
| TextArea | `src/components/forms/TextArea` | Multi-line input | Required |
| SubmitButton | `src/components/forms/SubmitButton` | Form submission | Required |

### UI Components

| Component | Location | Purpose | Status |
|-----------|----------|---------|--------|
| Toast | `src/components/ui/Toast` | Notification popup | Required |
| Spinner | `src/components/ui/Spinner` | Loading indicator | Required |
| Modal | `src/components/ui/Modal` | Dialog overlay | Required |
| Card | `src/components/ui/Card` | Content container | Required |
| Button | `src/components/ui/Button` | Action button | Required |
| Badge | `src/components/ui/Badge` | Status indicator | Required |

---

## 3. Page Components

### Public Pages

| Page | Route | Component | Dependencies |
|------|-------|-----------|--------------|
| Login | `/login` | LoginPage | AuthContext, FormField |
| Signup | `/signup` | SignupPage | AuthContext, FormField |
| Forgot Password | `/forgot-password` | ForgotPasswordPage | AuthContext, FormField |
| Reset Password | `/reset-password` | ResetPasswordPage | AuthContext, FormField |

### Protected Pages (All Users)

| Page | Route | Component | Dependencies |
|------|-------|-----------|--------------|
| Dashboard | `/` | DashboardPage | Layout, RoleContext |
| Internal Transfer | `/internal-transfer` | InternalTransferPage | Layout, FormField, DatePicker |
| Warranty Claims | `/warranty-claims` | WarrantyClaimsPage | Layout, FormField, DatePicker |

### Admin-Only Pages

| Page | Route | Component | Dependencies |
|------|-------|-----------|--------------|
| Invite Members | `/invite-members` | InviteMembersPage | Layout, AdminGuard, FormField |
| Reports | `/reports` | ReportsPage | Layout, AdminGuard, DataTable, Filters |
| Settings | `/settings` | SettingsPage | Layout, AdminGuard, FormField |
| Security Dashboard | `/security-dashboard` | SecurityDashboardPage | Layout, AdminGuard, MetricsCard |
| Health Checker | `/health-checker` | HealthCheckerPage | Layout, AdminGuard, CheckResult |

---

## 4. Component Dependencies Graph

### Internal Transfer Form Dependencies
```
InternalTransferPage
├── Layout
├── FormField (Date)
├── FormField (Technician Name - auto-filled)
├── RadioGroup (SSID/PSID selector)
├── FormField (SSID/PSID number - conditional)
├── FormField (Quantity)
├── FormField (Part Number)
├── TextArea (Description)
├── SubmitButton
├── Toast (feedback)
└── Spinner (loading)
```

### Warranty Claims Form Dependencies
```
WarrantyClaimsPage
├── Layout
├── FormField (Date)
├── FormField (Technician Name - auto-filled)
├── FormField (SSID)
├── FormField (Chiller Serial Number)
├── FormField (Chiller Model)
├── FormField (Building Name)
├── FormField (Quantity)
├── FormField (Part Number)
├── FormField (Failed Serial Number)
├── FormField (Repair Serial Number)
├── DatePicker (Date of Failure)
├── DatePicker (Date of Repair)
├── SubmitButton
├── Toast (feedback)
└── Spinner (loading)
```

### Reports Page Dependencies
```
ReportsPage
├── Layout
├── AdminGuard
├── FilterPanel
│   ├── RadioGroup (Type: SSID/PSID/Warranty)
│   ├── DateRangePicker
│   ├── MultiSelect (Part Number)
│   └── MultiSelect (Technician)
├── DataTable
│   ├── TableHeader
│   ├── TableRow[]
│   └── Pagination
├── ExportButton (Excel)
└── Spinner (loading)
```

---

## 5. Wiring Requirements

### Components Must Be Wired
A component is considered "wired" if it:
1. Is imported and rendered in the component tree
2. Is visible in the UI (or conditionally visible with valid conditions)
3. Responds to user interactions as expected
4. Passes E2E wiring tests

### Wiring Checks

| Check Type | Description | Test Method |
|------------|-------------|-------------|
| Static | Component file exists | File system check |
| Import | Component is imported | AST analysis |
| Render | Component renders in DOM | E2E snapshot |
| Interactive | Component responds to events | E2E interaction |

### Unwired Component Policy
- Components that exist but aren't wired must be:
  - **Option 1**: Wired immediately (keep QA RED until functional)
  - **Option 2**: Deleted (legacy/deprecated code)
- Two consecutive wiring failures → automatic deletion candidate

---

## 6. Component Removal Log

Track removed legacy components here:

| Component | Removed Date | Reason | Replaced By |
|-----------|--------------|--------|-------------|
| - | - | No legacy components removed yet | - |

---

## 7. Component Creation Checklist

When creating new components:

- [ ] Define in architecture first
- [ ] Add to component map
- [ ] Document dependencies
- [ ] Create TypeScript interface for props
- [ ] Add to wiring tests
- [ ] Verify render in E2E tests
- [ ] Update QA checks

---

## 8. Shared Component Guidelines

### Props Interface Standard
```typescript
interface ComponentProps {
  // Required props
  id: string;
  
  // Optional props with defaults
  className?: string;
  disabled?: boolean;
  
  // Event handlers
  onChange?: (value: T) => void;
  onSubmit?: () => void;
}
```

### Component File Structure
```
components/
  ComponentName/
    index.tsx          # Main component
    ComponentName.tsx  # Component implementation
    types.ts           # TypeScript interfaces
    styles.css         # Component-specific styles (if needed)
```

### Testing Requirements
- Unit tests for logic-heavy components
- E2E tests for user-facing components
- Wiring tests for all components in navigation

---

## 9. State Management

### Context Usage
| Context | Scope | Persistence |
|---------|-------|-------------|
| AuthContext | User session | localStorage |
| RoleContext | User role | localStorage |
| ToastContext | Notifications | None (ephemeral) |

### Local State
- Form inputs: useState
- Form validation: useState + useEffect
- API calls: useState + useEffect (or custom hooks)

---

## 10. API Integration

### API Endpoints Used by Components

| Endpoint | Method | Used By | Purpose |
|----------|--------|---------|---------|
| `/api/internal-transfers` | GET, POST | InternalTransferPage, ReportsPage | CRUD transfers |
| `/api/warranty-claims` | GET, POST | WarrantyClaimsPage, ReportsPage | CRUD claims |
| `/api/invite-user` | POST | InviteMembersPage | Send invitations |
| `/api/settings` | GET, PUT | SettingsPage | App configuration |
| `/api/health` | GET | HealthCheckerPage | System health |

### Error Handling Pattern
```typescript
try {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(response.statusText);
  const data = await response.json();
  showToast({ type: 'success', message: 'Operation successful' });
} catch (error) {
  showToast({ type: 'error', message: error.message });
  console.error('API Error:', error);
}
```
