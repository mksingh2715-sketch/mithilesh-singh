# Security Specification: Bihar School Teacher Master Data Manager

## 1. Data Invariants
1. School profiles (`/schools/{schoolId}`) must only be readable and writable by the authenticated Headmaster where `request.auth.uid == schoolId`.
2. Teacher records (`/schools/{schoolId}/teachers/{teacherId}`) belong strictly to their parent school. Only the authorized Headmaster (`request.auth.uid == schoolId`) can read, create, update, or delete teachers.
3. Cross-school access is strictly blocked: a Headmaster from school A cannot view, query, or edit records belonging to school B.
4. Input validation mandates string lengths, allowed form categories (`prapatra_1` to `prapatra_10`), and valid document IDs.

## 2. The Dirty Dozen Payloads (Rejection Matrix)
1. **Unauthenticated Read on School**: `GET /schools/user_123` with `auth = null` -> PERMISSION_DENIED.
2. **Cross-Tenant School Read**: `GET /schools/user_A` with `auth.uid = "user_B"` -> PERMISSION_DENIED.
3. **Cross-Tenant Teacher List Query**: `GET /schools/user_A/teachers` with `auth.uid = "user_B"` -> PERMISSION_DENIED.
4. **Cross-Tenant Teacher Write**: `CREATE /schools/user_A/teachers/t_1` with `auth.uid = "user_B"` -> PERMISSION_DENIED.
5. **Orphaned Write with ID Tampering**: `CREATE /schools/user_A/teachers/t_1` where payload `schoolId = "user_B"` -> PERMISSION_DENIED.
6. **Invalid Form Category**: `CREATE /schools/user_A/teachers/t_1` with `formCategory = "invalid_category"` -> PERMISSION_DENIED.
7. **Resource Poisoning (1MB String)**: `UPDATE /schools/user_A/teachers/t_1` with a 1MB payload in `teacherName` -> PERMISSION_DENIED.
8. **Invalid Document ID Path**: `GET /schools/user_A/teachers/../../../etc/passwd` -> PERMISSION_DENIED.
9. **Missing Mandatory Fields**: `CREATE /schools/user_A/teachers/t_1` without `teacherName` -> PERMISSION_DENIED.
10. **Malicious Delete**: `DELETE /schools/user_A/teachers/t_1` by `user_B` -> PERMISSION_DENIED.
11. **Catch-All Infiltration**: `GET /admin/secrets` -> PERMISSION_DENIED.
12. **Tampered Parent School Creation**: `CREATE /schools/user_A` where `headmasterUid = "user_B"` with `auth.uid = "user_B"` -> PERMISSION_DENIED (UID must match path).
