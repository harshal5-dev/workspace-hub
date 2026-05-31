-- Seed default system roles with role codes
INSERT INTO "roles" ("name", "code", "description", "scope", "status")
VALUES
  ('Owner', 'OWNER', 'Owns the tenant workspace and can manage everything', 'SYSTEM', 'ACTIVE'),
  ('Admin', 'ADMIN', 'Manages users, roles, projects, and settings inside a tenant', 'SYSTEM', 'ACTIVE'),
  ('Project Manager', 'PROJECT_MANAGER', 'Manages projects, members, and tasks', 'SYSTEM', 'ACTIVE'),
  ('Member', 'MEMBER', 'Works on assigned tasks and comments', 'SYSTEM', 'ACTIVE'),
  ('Viewer', 'VIEWER', 'Can view projects and tasks but cannot modify them', 'SYSTEM', 'ACTIVE')
ON CONFLICT ("code") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "description" = EXCLUDED."description",
  "scope" = EXCLUDED."scope",
  "status" = EXCLUDED."status",
  "updated_at" = now();

-- Seed permissions with permission codes
INSERT INTO "permissions" ("name", "code", "description")
VALUES
  ('View Dashboard', 'VIEW_DASHBOARD', 'Permission to view dashboard'),
  ('Manage Tenant', 'UPDATE_TENANT', 'Permission to manage tenant settings and details'),
  ('Manage Users', 'MANAGE_USERS', 'Permission to manage users'),

  ('Create Project', 'CREATE_PROJECTS', 'Permission to create projects'),
  ('Update Project', 'UPDATE_PROJECTS', 'Permission to update projects'),
  ('Delete Project', 'DELETE_PROJECTS', 'Permission to delete projects'),
  ('View Project', 'VIEW_PROJECTS', 'Permission to view projects'),

  ('Create Task', 'CREATE_TASKS', 'Permission to create tasks'),
  ('View Task', 'VIEW_TASKS', 'Permission to view tasks'),
  ('Update Assigned Task', 'UPDATE_TASKS', 'Permission to update assigned tasks'),
  ('Delete Task', 'DELETE_TASKS', 'Permission to delete tasks'),

  ('Add Task Comment', 'ADD_TASK_COMMENT', 'Permission to add task comments'),
  ('Edit Own Comment', 'EDIT_OWN_COMMENT', 'Permission to edit own comments'),
  ('Delete Own Comment', 'DELETE_OWN_COMMENT', 'Permission to delete own comments'),
  ('View Own Comment', 'VIEW_OWN_COMMENT', 'Permission to view own comments'),

  ('View Activity Logs', 'VIEW_ACTIVITY_LOGS', 'Permission to view all activity logs'),
  ('View Project Activity Logs', 'VIEW_PROJECT_ACTIVITY_LOGS', 'Permission to view project activity logs only')
ON CONFLICT ("code") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "description" = EXCLUDED."description",
  "updated_at" = now();

-- Role-permission matrix mapping from shared image
WITH matrix(role_code, permission_code) AS (
  VALUES
    -- View dashboard: Owner/Admin/Project Manager/Member/Viewer
    ('OWNER', 'VIEW_DASHBOARD'),
    ('ADMIN', 'VIEW_DASHBOARD'),
    ('PROJECT_MANAGER', 'VIEW_DASHBOARD'),
    ('MEMBER', 'VIEW_DASHBOARD'),
    ('VIEWER', 'VIEW_DASHBOARD'),

    -- Manage tenant: Owner
    ('OWNER', 'UPDATE_TENANT'),

    -- Manage users: Owner/Admin
    ('OWNER', 'MANAGE_USERS'),
    ('ADMIN', 'MANAGE_USERS'),

    -- Create project: Owner/Admin/Project Manager
    ('OWNER', 'CREATE_PROJECTS'),
    ('ADMIN', 'CREATE_PROJECTS'),
    ('PROJECT_MANAGER', 'CREATE_PROJECTS'),

    -- Update project: Owner/Admin/Project Manager
    ('OWNER', 'UPDATE_PROJECTS'),
    ('ADMIN', 'UPDATE_PROJECTS'),
    ('PROJECT_MANAGER', 'UPDATE_PROJECTS'),

    -- Delete project: Owner/Admin/Project Manager
    ('OWNER', 'DELETE_PROJECTS'),
    ('ADMIN', 'DELETE_PROJECTS'),
    ('PROJECT_MANAGER', 'DELETE_PROJECTS'),

    -- View project: Owner/Admin/Project Manager/Member/Viewer
    ('OWNER', 'VIEW_PROJECTS'),
    ('ADMIN', 'VIEW_PROJECTS'),
    ('PROJECT_MANAGER', 'VIEW_PROJECTS'),
    ('MEMBER', 'VIEW_PROJECTS'),
    ('VIEWER', 'VIEW_PROJECTS'),

    -- Create task: Owner/Admin/Project Manager/Member
    ('OWNER', 'CREATE_TASKS'),
    ('ADMIN', 'CREATE_TASKS'),
    ('PROJECT_MANAGER', 'CREATE_TASKS'),
    ('MEMBER', 'CREATE_TASKS'),

    -- View task: Owner/Admin/Project Manager/Member/Viewer
    ('OWNER', 'VIEW_TASKS'),
    ('ADMIN', 'VIEW_TASKS'),
    ('PROJECT_MANAGER', 'VIEW_TASKS'),
    ('MEMBER', 'VIEW_TASKS'),
    ('VIEWER', 'VIEW_TASKS'),

    -- Update assigned task: Owner/Admin/Project Manager/Member
    ('OWNER', 'UPDATE_TASKS'),
    ('ADMIN', 'UPDATE_TASKS'),
    ('PROJECT_MANAGER', 'UPDATE_TASKS'),
    ('MEMBER', 'UPDATE_TASKS'),

    -- Delete task: Owner/Admin/Project Manager
    ('OWNER', 'DELETE_TASKS'),
    ('ADMIN', 'DELETE_TASKS'),
    ('PROJECT_MANAGER', 'DELETE_TASKS'),

    -- Add task comment: Owner/Admin/Project Manager/Member
    ('OWNER', 'ADD_TASK_COMMENT'),
    ('ADMIN', 'ADD_TASK_COMMENT'),
    ('PROJECT_MANAGER', 'ADD_TASK_COMMENT'),
    ('MEMBER', 'ADD_TASK_COMMENT'),

    -- Edit own comment: Owner/Admin/Project Manager/Member
    ('OWNER', 'EDIT_OWN_COMMENT'),
    ('ADMIN', 'EDIT_OWN_COMMENT'),
    ('PROJECT_MANAGER', 'EDIT_OWN_COMMENT'),
    ('MEMBER', 'EDIT_OWN_COMMENT'),

    -- Delete own comment: Owner/Admin/Project Manager/Member
    ('OWNER', 'DELETE_OWN_COMMENT'),
    ('ADMIN', 'DELETE_OWN_COMMENT'),
    ('PROJECT_MANAGER', 'DELETE_OWN_COMMENT'),
    ('MEMBER', 'DELETE_OWN_COMMENT'),

    -- View own comment: Owner/Admin/Project Manager/Member/Viewer
    ('OWNER', 'VIEW_OWN_COMMENT'),
    ('ADMIN', 'VIEW_OWN_COMMENT'),
    ('PROJECT_MANAGER', 'VIEW_OWN_COMMENT'),
    ('MEMBER', 'VIEW_OWN_COMMENT'),
    ('VIEWER', 'VIEW_OWN_COMMENT'),

    -- Activity logs: Owner/Admin/Project Manager (all), Member/Viewer (project only)
    ('OWNER', 'VIEW_ACTIVITY_LOGS'),
    ('ADMIN', 'VIEW_ACTIVITY_LOGS'),
    ('PROJECT_MANAGER', 'VIEW_ACTIVITY_LOGS'),
    ('MEMBER', 'VIEW_PROJECT_ACTIVITY_LOGS'),
    ('VIEWER', 'VIEW_PROJECT_ACTIVITY_LOGS')
),
resolved AS (
  SELECT r."id" AS role_id, p."id" AS permission_id
  FROM matrix m
  JOIN "roles" r ON r."code" = m.role_code
  JOIN "permissions" p ON p."code" = m.permission_code
)
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT res.role_id, res.permission_id
FROM resolved res
LEFT JOIN "role_permissions" rp
  ON rp."role_id" = res.role_id
 AND rp."permission_id" = res.permission_id
WHERE rp."id" IS NULL;
