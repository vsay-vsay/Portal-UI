// src/api/api.ts

const api = {
    // Auth
    AUTH_LOGIN: "/api/auth/login",
    AUTH_REGISTER: "/api/auth/register",
    AUTH_LOGOUT: "/api/auth/logout",
    AUTH_ME: "/api/auth/me",
  
    // Users
    USERS: "users/all-users",
  
    // Students
    STUDENTS: "/api/students",
    STUDENT_BY_ID: "/api/students/:id",
  
    // Teachers
    TEACHERS: "/api/teachers",
    TEACHER_BY_ID: "/api/teachers/:id",
  
    // Parents
    PARENTS: "/api/parents",
    PARENT_BY_ID: "/api/parents/:id",
  
    // Admins
    ADMINS: "/api/admins",
    ADMIN_BY_ID: "/api/admins/:id",
  
    // Accountants
    ACCOUNTANTS: "/api/accountants",
    ACCOUNTANT_BY_ID: "/api/accountants/:id",
  
    // Attendance
    ATTENDANCE: "/api/attendance",
    ATTENDANCE_MARK: "/api/attendance/mark",
    ATTENDANCE_BY_STUDENT: "/api/attendance/student/:id",
  
    // Exams
    EXAMS: "/api/exams",
    EXAM_BY_ID: "/api/exams/:id",
  
    // Results
    RESULTS: "/api/results",
    RESULTS_BY_STUDENT: "/api/results/student/:id",
  
    // Fees
    FEES: "/api/fees",
    FEES_BY_STUDENT: "/api/fees/student/:id",
  
    // Timetable
    TIMETABLE: "/api/timetable",
    TIMETABLE_BY_CLASS: "/api/timetable/class/:id",
  
    // Notifications
    NOTIFICATIONS: "/api/notifications",
    NOTIFICATIONS_BY_USER: "/api/notifications/user/:id",

    EVENTS: "events/all-event",
  };
  
  export default api;
  