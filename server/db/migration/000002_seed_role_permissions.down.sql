-- Remove seeded role-permission mappings
DELETE FROM "role_permissions"
WHERE ("role_id", "permission_id") IN (
  SELECT r."id", p."id"
  FROM "roles" r
  JOIN "permissions" p ON TRUE
  WHERE r."code" IN ('OWNER', 'ADMIN', 'PROJECT_MANAGER', 'MEMBER', 'VIEWER')
    AND p."code" IN (
      'VIEW_DASHBOARD',
      'UPDATE_TENANT',
      'MANAGE_USERS',
      'CREATE_PROJECTS',
      'UPDATE_PROJECTS',
      'DELETE_PROJECTS',
      'VIEW_PROJECTS',
      'CREATE_TASKS',
      'VIEW_TASKS',
      'UPDATE_TASKS',
      'DELETE_TASKS',
      'ADD_TASK_COMMENT',
      'EDIT_OWN_COMMENT',
      'DELETE_OWN_COMMENT',
      'VIEW_OWN_COMMENT',
      'VIEW_ACTIVITY_LOGS',
      'VIEW_PROJECT_ACTIVITY_LOGS'
    )
);

-- Remove seeded permissions
DELETE FROM "permissions"
WHERE "code" IN (
  'VIEW_DASHBOARD',
  'UPDATE_TENANT',
  'MANAGE_USERS',
  'CREATE_PROJECTS',
  'UPDATE_PROJECTS',
  'DELETE_PROJECTS',
  'VIEW_PROJECTS',
  'CREATE_TASKS',
  'VIEW_TASKS',
  'UPDATE_TASKS',
  'DELETE_TASKS',
  'ADD_TASK_COMMENT',
  'EDIT_OWN_COMMENT',
  'DELETE_OWN_COMMENT',
  'VIEW_OWN_COMMENT',
  'VIEW_ACTIVITY_LOGS',
  'VIEW_PROJECT_ACTIVITY_LOGS'
);

-- Remove seeded roles
DELETE FROM "roles"
WHERE "code" IN ('OWNER', 'ADMIN', 'PROJECT_MANAGER', 'MEMBER', 'VIEWER');
