# Workspace Hub Doc

## 📌 1. Project Overview

### 🏷️ Project Name

Nex Flow (Multi-Tenant Project and Task Management System)

### 🧩 Project Type

Portfolio project / SaaS-style full-stack application

### 🎯 Purpose

This application allows multiple organizations or teams to manage their own users, projects, tasks, task comments, and activity history from one shared platform. Each organization works inside an isolated tenant workspace, so users from one tenant cannot access another tenant’s projects, tasks, comments, or activity logs.

The project is designed to demonstrate practical full-stack skills using Go, PostgreSQL, React, shadcn/ui, Gin, and sqlc.

### ✅ Main Goals

- Build a clean multi-tenant SaaS architecture.
- Implement secure authentication and tenant-based access control.
- Manage users inside each tenant.
- Create and manage projects.
- Create, assign, update, and track tasks.
- Add comments on tasks for collaboration.
- Maintain activity logs for important project and task changes.
- Build a modern dashboard UI using React and shadcn/ui.

### 🚫 Out of Scope for Initial Version

- File attachments
- Billing and subscription plans
- Real-time chat
- Mobile application
- Advanced reporting exports

---

## 🛠️ 2. Technology Stack

| Layer | Technology |
| --- | --- |
| Backend | Go |
| HTTP Framework | Gin |
| Database | PostgreSQL |
| SQL Layer | sqlc |
| Migrations | golang-migrate |
| Authentication | JWT access token |
| Frontend | React |
| UI Components | shadcn/ui |
| Styling | Tailwind CSS |
| API Client | React Query |
| Forms | React Hook Form + Zod |

---

## 🧠 3. Key Concepts

| Concept | Description |
| --- | --- |
| Tenant | An organization, workspace, or company using the app |
| User | A person who logs in to the system |
| Tenant User | A user connected to a specific tenant |
| Role | A permission group assigned to a tenant user |
| Project | A tenant-owned container for tasks and members |
| Task | A unit of work inside a project |
| Task Comment | A discussion message added to a task |
| Activity Log | A record of important actions performed by users |

---

## 🏗️ 4. Tenancy Model

### 🗃️ Tenant-Owned Tables

Most business tables should include:

```
tenant_id
created_by
updated_by
created_at
updated_at
deleted_at
```

### 🔐 Tenant Isolation Rules

- Every authenticated request must resolve the active tenant.
- The backend must verify that the logged-in user belongs to the requested tenant.
- All project, task, comment, and activity queries must filter by `tenant_id`.
- Never trust `tenant_id` from request body for authorization.
- Use middleware in Gin to load tenant context before protected handlers run.

---

## 👥 5. User Roles

| Role | Description |
| --- | --- |
| Owner | Owns the tenant workspace and can manage everything |
| Admin | Manages users, roles, projects, and settings inside a tenant |
| Project Manager | Manages projects, members, and tasks |
| Member | Works on assigned tasks and comments |
| Viewer | Can view projects and tasks but cannot modify them |

### 🔐 Permission Matrix

| Feature | Owner | Admin | Project Manager | Member | Viewer |
| --- | --- | --- | --- | --- | --- |
| View dashboard | Yes | Yes | Yes | Yes | Yes |
| Manage tenant | Yes | No | No | No | No |
| Manage users | Yes | Yes | No | No | No |
| Create project | Yes | Yes | Yes | No | No |
| Update project | Yes | Yes | Yes | No | No |
| Delete project | Yes | Yes | Yes | No | No |
| View project | Yes | Yes | Yes | Yes | Yes |
| Create task | Yes | Yes | Yes | Yes | No |
| View Task | Yes | Yes | Yes | Yes | Yes |
| Update assigned task | Yes | Yes | Yes | Yes | No |
| Delete task | Yes | Yes | Yes | No | No |
| Add task comment | Yes | Yes | Yes | Yes | No |
| Edit own comment | Yes | Yes | Yes | Yes | No |
| Delete own comment | Yes | Yes | Yes | Yes | No |
| View own comment | Yes | Yes | Yes | Yes | Yes |
| View activity logs | Yes | Yes | Yes | Project logs only (Yes) | Project logs only (Yes) |

### 🧱 Backend Layers

| Layer | Responsibility |
| --- | --- |
| Gin Routes | Define API endpoints and route groups |
| Handlers | Read request, validate input, return response |
| Services | Business logic and permission checks |
| sqlc Queries | Type-safe database operations |
| Middleware | Auth, tenant context, permissions, logging |
| Migrations | PostgreSQL schema changes |

### 🛡️ Important Middleware

- Auth middleware
- Tenant context middleware
- Role or permission middleware
- Request validation helper
- Activity log middleware/helper
- Error response middleware

---

## 🧩 6. Module-Wise Features and APIs

## 🔑 Module 1: Authentication

### 📝 Description

Handles user login, registration, logout, and current user profile.

### ✨ Features

- Register user
- Login user
- Forgot Password
- Generate JWT access token
- Logout
- Get logged-in user profile
- Update logged-in user profile
- List tenants available to logged-in user
- Switch active tenant

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Register a new user | Public |
| POST | `/api/v1/auth/login` | Login user | Public |
| POST | `/api/v1/auth/send-forgot-password-otp` | Send OTP to user emailId | Public |
| POST | `/api/v1/auth/verify-otp` | Verify OTP send to the email | Public |
| POST | `/api/v1/auth/logout` | Logout current user | Authenticated |
| GET | `/api/v1/auth/me` | Get current user profile | Authenticated |
| GET | `/api/v1/auth/me/update` | Update current user profile | Authenticated |
| GET | `/api/v1/auth/tenants` | Get user’s tenants | Authenticated |
| POST | `/api/v1/auth/switch-tenant` | Set active tenant | Authenticated |

---

## 🏢 Module 2: Tenant Management

### 📝 Description

Manages organization workspaces.

### ✨ Features

- Create tenant during registration or from dashboard
- View tenant details
- Update tenant name and basic settings
- View tenant users
- Deactivate tenant for demo/admin use

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/v1/tenants` | Create tenant | Authenticated |
| GET | `/api/v1/tenants` | List current user’s tenants | Authenticated |
| GET | `/api/v1/tenants/:tenantId` | Get tenant details | Tenant Member |
| PATCH | `/api/v1/tenants/:tenantId` | Update tenant | Owner, Admin |
| PATCH | `/api/v1/tenants/:tenantId/status` | Activate or deactivate tenant | Owner |

---

## 👤 Module 3: User Management

### 📝 Description

Allows tenant owners and admins to manage workspace users.

### ✨ Features

- Invite user by email
- Add user to tenant
- List tenant users
- Update tenant user role
- Activate or deactivate tenant user
- Remove user from tenant
- Search users by name or email

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/v1/users/invite` | Invite user to tenant | Owner, Admin |
| GET | `/api/v1/users` | List tenant users | Owner, Admin |
| GET | `/api/v1/users/:userId` | Get user details | Owner, Admin |
| PATCH | `/api/v1/users/:userId/role` | Update user’s tenant role | Owner, Admin |
| PATCH | `/api/v1/users/:userId/status` | Activate or deactivate user | Owner, Admin |
| DELETE | `/api/v1/users/:userId` | Remove user from tenant | Owner |

---

## 🛡️ Module 4: Role and Permission Management

### 📝 Description

Controls what users can do inside a tenant.

### 🧪 MVP Approach

Use fixed roles first. Custom roles can be added later.

### ✨ Features

- Seed default roles
- Assign role to tenant user
- Check role permissions in middleware or service layer
- Restrict project, task, comment, and activity log actions

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/api/v1/roles` | List available roles | Owner, Admin |
| GET | `/api/v1/permissions` | List role permission map | Owner, Admin |

---

## 📂 Module 5: Project Management

### 📝 Description

Manages projects inside a tenant.

### ✨ Features

- Create project
- Update project details
- Archive project
- Delete project
- Add project members
- Remove project members
- Track project status
- Track project priority
- Show project progress based on completed tasks
- Log project create, update, archive, and delete events

### 📊 Project Status

- Not Started
- Active
- On Hold
- Completed
- Archived

### 🚦 Project Priority

- Low
- Medium
- High
- Critical

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/v1/projects` | Create project | Owner, Admin, Project Manager |
| GET | `/api/v1/projects` | List tenant projects | Tenant Member |
| GET | `/api/v1/projects/:projectId` | Get project details | Project Member |
| PATCH | `/api/v1/projects/:projectId` | Update project | Owner, Admin, Project Manager |
| DELETE | `/api/v1/projects/:projectId` | Delete project | Owner, Admin |
| PATCH | `/api/v1/projects/:projectId/archive` | Archive project | Owner, Admin, Project Manager |
| POST | `/api/v1/projects/:projectId/members` | Add project member | Owner, Admin, Project Manager |
| GET | `/api/v1/projects/:projectId/members` | List project members | Project Member |
| DELETE | `/api/v1/projects/:projectId/members/:userId` | Remove project member | Owner, Admin, Project Manager |
| GET | `/api/v1/projects/:projectId/progress` | Get project progress | Project Member |

---

## ✅ Module 6: Task Management

### 📝 Description

Handles project tasks, assignment, priority, status, due dates, and progress.

### ✨ Features

- Create task under project
- Assign task to one user
- Update task title and description
- Update task status
- Update priority
- Set due date
- Filter by status, priority, assignee, and due date
- Show task detail page with comments and activity logs
- Log task create, update, status change, assignment, and delete events

### 📊 Task Status

- Todo
- In Progress
- In Review
- Blocked
- Done

### 🚦 Task Priority

- Low
- Medium
- High
- Critical

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/v1/projects/:projectId/tasks` | Create task | Project Member |
| GET | `/api/v1/projects/:projectId/tasks` | List project tasks | Project Member |
| GET | `/api/v1/tasks/:taskId` | Get task details | Project Member |
| PATCH | `/api/v1/tasks/:taskId` | Update task | Assignee, Project Manager, Admin |
| DELETE | `/api/v1/tasks/:taskId` | Delete task | Project Manager, Admin |
| PATCH | `/api/v1/tasks/:taskId/status` | Update task status | Assignee, Project Manager, Admin |
| PATCH | `/api/v1/tasks/:taskId/priority` | Update task priority | Project Manager, Admin |
| PATCH | `/api/v1/tasks/:taskId/assignee` | Assign or change task assignee | Project Manager, Admin |

---

## 💬 Module 7: Task Comments

### 📝 Description

Allows project members to discuss work directly on a task.

### ✨ Features

- Add comment to task
- List task comments
- Edit own comment
- Delete own comment
- Admin or project manager can delete inappropriate comments
- Store comment creator and timestamps
- Add activity log entry when a comment is created, edited, or deleted

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/v1/tasks/:taskId/comments` | Add task comment | Project Member |
| GET | `/api/v1/tasks/:taskId/comments` | List task comments | Project Member |
| GET | `/api/v1/comments/:commentId` | Get single comment | Project Member |
| PATCH | `/api/v1/comments/:commentId` | Edit comment | Comment Owner |
| DELETE | `/api/v1/comments/:commentId` | Delete comment | Comment Owner, Project Manager, Admin |

### 📏 Comment Rules

- Comments belong to one task.
- Comments must belong to the same tenant as the task.
- Users can only comment on tasks from projects they can access.
- Edited comments should update `updated_at`.
- Soft delete is recommended for audit visibility.

---

## 📜 Module 8: Activity Logs

### 📝 Description

Stores important events so users can see what changed, who changed it, and when it happened.

### ✨ Features

- Log project created
- Log project updated
- Log project archived
- Log task created
- Log task updated
- Log task status changed
- Log task assigned
- Log task deleted
- Log comment created
- Log comment updated
- Log comment deleted
- Filter logs by module, action, user, project, task, and date

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/api/v1/activity-logs` | List tenant activity logs | Owner, Admin |
| GET | `/api/v1/projects/:projectId/activity-logs` | List project activity logs | Project Member |
| GET | `/api/v1/tasks/:taskId/activity-logs` | List task activity logs | Project Member |
| GET | `/api/v1/activity-logs/:logId` | Get activity log details | Owner, Admin |

### 🧾 Suggested Activity Log Fields

```
id
tenant_id
actor_user_id
entity_type
entity_id
project_id
task_id
action
description
old_values
new_values
user_agent
created_at
```

### 🧩 Entity Type Examples

- tenant
- user
- project
- task
- comment

### ⚡ Action Examples

- created
- updated
- deleted
- archived
- status_changed
- assigned
- commented

---

## 📊 Module 9: Dashboard

### 📝 Description

Shows useful summaries for the current tenant and current user.

### ✨ Features

- Total projects
- Active projects
- Total tasks
- My assigned tasks
- Overdue tasks
- Tasks by status
- Recent activity logs
- Recently updated projects

### 🔌 APIs

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | `/api/v1/dashboard/summary` | Tenant dashboard summary | Tenant Member |
| GET | `/api/v1/dashboard/my-tasks` | Current user’s assigned task summary | Tenant Member |
| GET | `/api/v1/dashboard/recent-activity` | Recent tenant activity | Tenant Member |

---

## 🔐 8. Database Diagram

![nex-flow.png](Nex%20Flow%20Doc/nex-flow.png)
