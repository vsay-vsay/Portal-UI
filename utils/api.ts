const BASE = "/api";

const api = {
  DOMAIN: {
    CREATE: `${BASE}/super-admin/create-domain`,
    CHECK: `${BASE}/super-admin/domain`,
  },
  // Auth
  AUTH: {
    LOGIN: `${BASE}/auth/login`,
    REGISTER: `${BASE}/auth/register`,
    LOGOUT: `${BASE}/auth/logout`,
    ME: `${BASE}/auth/me`,
  },

  // Classes
  CLASSES: {
    BASE: `${BASE}/classes`,
    ALL: `${BASE}/classes/all-class`,
    CREATE: `${BASE}/classes/create-class`,
    BULK_CREATE: `${BASE}/classes/bulk-create-class`,
    BY_ID: (id: string) => `${BASE}/classes/${id}`,
    ADD_STUDENT: (id: string) => `${BASE}/classes/${id}/add-student`,
    REMOVE_STUDENT: (id: string) => `${BASE}/classes/${id}/remove-student`,
  },

  // Attendance
  ATTENDANCE: {
    MARK: `${BASE}/attendance/mark`,
    GET_ME: `${BASE}/attendance/me`,
    ALL: `${BASE}/attendance/all`,
    UPDATE: (id: string) => `${BASE}/attendance/${id}`,
    DELETE: (id: string) => `${BASE}/attendance/${id}`,
  },

  // Exams
  EXAMS: {
    CREATE: `${BASE}/exam/create`,
    UPDATE: `${BASE}/exam/update`,
    GET_ALL: `${BASE}/exam/get`,
    BULK_ADD: `${BASE}/exam/add-exams`,
  },

  // Timetables
  TIMETABLE: {
    BULK: `${BASE}/timetable/bulk`,
    CREATE: `${BASE}/timetable/create`,
    UPDATE: `${BASE}/timetable/update`,
    GET_ALL: `${BASE}/timetable/get`,
    GET_MY: `${BASE}/timetable/get-my`, // optional
  },

  // Announcements
  ANNOUNCEMENTS: {
    CREATE: `${BASE}/announcements/create-announcement`,
    ALL: `${BASE}/announcements/all-announcement`,
    BY_ID: (id: string) => `${BASE}/announcements/${id}`,
    DELETE: (id: string) => `${BASE}/announcements/${id}`,
    UPDATE: (id: string) => `${BASE}/announcements/${id}`,
  },

  // Events
  EVENTS: {
    CREATE: `${BASE}/events/create-event`,
    ALL: `${BASE}/events/all-event`,
    BY_ID: (id: string) => `${BASE}/events/${id}`,
    UPDATE: (id: string) => `${BASE}/events/${id}`,
    DELETE: (id: string) => `${BASE}/events/${id}`,
  },

  // Teachers
  TEACHERS: {
    BASE: `${BASE}/teacher`,
    ADD: `${BASE}/teacher/add`,
    ALL: `${BASE}/teacher/all`,
    BY_ID: (id: string) => `${BASE}/teacher/${id}`,
    UPDATE: (id: string) => `${BASE}/teacher/${id}`,
    UPDATE_DETAILS: (teacherId: string) => `${BASE}/teacher/${teacherId}`,
    BULK_ADD_STUDENTS: `${BASE}/teacher/add-students`,
    ADD_STUDENT: `${BASE}/teacher/add-student`,
    MARK_ATTENDANCE: `${BASE}/teacher/mark-attendance`,
    GET_CLASS_ATTENDANCE: (classId: string) =>
      `${BASE}/teacher/get-attendance/${classId}`,
    SCHEDULE_EXAM: `${BASE}/teacher/schedule-exam`,
    ASSIGN_MARKS: `${BASE}/teacher/assign-marks`,
    GET_TIMETABLE: (email: string) => `${BASE}/teacher/get-timetable/${email}`,
    ADD_STUDENT_TIMETABLE: `${BASE}/teacher/add-student-timetable`,
  },

  // Internal Email
  EMAIL: {
    SEND: `${BASE}/email/send`,
    INBOX: `${BASE}/email/inbox`,
    SENT: `${BASE}/email/sent`,
    BY_ID: (id: string) => `${BASE}/email/${id}`,
    DELETE: (id: string) => `${BASE}/email/${id}`,
    TOGGLE_IMPORTANT: (id: string) => `${BASE}/email/${id}/important`,
    DOWNLOAD_ATTACHMENT: (emailId: string, attachmentId: string) =>
      `${BASE}/email/${emailId}/attachments/${attachmentId}`,
  },

  // Meetings
  MEETINGS: {
    BASE: `${BASE}/meetings`,
    CREATE: `${BASE}/meetings`,
    LIST: `${BASE}/meetings`,
    BY_ID: (id: string) => `${BASE}/meetings/${id}`,
    UPDATE: (id: string) => `${BASE}/meetings/${id}`,
    DELETE: (id: string) => `${BASE}/meetings/${id}`,
    START: (id: string) => `${BASE}/meetings/${id}/start`,
    END: (id: string) => `${BASE}/meetings/${id}/end`,
    BY_MEETING_ID: (meetingId: string) =>
      `${BASE}/meetings/by-meeting-id/${meetingId}`,
  },

  // Meeting Participants
  PARTICIPANTS: {
    INVITE: (meetingId: string) => `${BASE}/participants/${meetingId}/invite`,
    JOIN: (meetingId: string) => `${BASE}/participants/${meetingId}/join`,
    LEAVE: (meetingId: string) => `${BASE}/participants/${meetingId}/leave`,
    LIST: (meetingId: string) =>
      `${BASE}/participants/${meetingId}/participants`,
    UPDATE_STATUS: (id: string) => `${BASE}/participants/${id}/status`,
    UPDATE_SOCKET_ID: (meetingId: string) =>
      `${BASE}/participants/${meetingId}/socket`,
    UPDATE_RTC_DATA: (meetingId: string) =>
      `${BASE}/participants/${meetingId}/rtc-data`,
  },

  // Internal Chat
  CHAT: {
    GROUP_CREATE: `${BASE}/chat/groups`,
    ADD_PARTICIPANT: (chatId: string) =>
      `${BASE}/chat/groups/${chatId}/participants`,
    REMOVE_PARTICIPANT: (chatId: string, participantId: string) =>
      `${BASE}/chat/groups/${chatId}/participants/${participantId}`,
    SEND_TO_CHAT: (chatId: string) => `${BASE}/chat/chats/${chatId}/messages`,
    SEND_TO_USER: (email: string) => `${BASE}/chat/messages/users/${email}`,
    GET_CHATS: `${BASE}/chat/chats`,
    GET_CHAT_MESSAGES: (chatId: string) =>
      `${BASE}/chat/chats/${chatId}/messages`,
    SEARCH_USERS: `${BASE}/chat/users/search`,
  },

  // Security Logs
  SECURITY: {
    ADMIN_LOGS: `${BASE}/logs/admin`,
    USER_LOGS: `${BASE}/logs/userlogs`,
  },

  // Users
  USERS: {
    BASE: `${BASE}/users`,
    ALL: `${BASE}/users/all-users`,
    CREATE: `${BASE}/auth/register`,
    BY_ID: (id: string) => `${BASE}/users/${id}`,
  },

  // Students
  STUDENTS: {
    BASE: `${BASE}/student`,
    BY_ID: (id: string) => `${BASE}/student/${id}`,
  },

  // Parents
  PARENTS: {
    BASE: `${BASE}/parents`,
    BY_ID: (id: string) => `${BASE}/parents/${id}`,
  },

  // Admins
  ADMINS: {
    BASE: `${BASE}/admins`,
    BY_ID: (id: string) => `${BASE}/admins/${id}`,
  },

  // Accountants
  ACCOUNTANTS: {
    BASE: `${BASE}/accountants`,
    BY_ID: (id: string) => `${BASE}/accountants/${id}`,
  },

  // Fees
  FEES: {
    BASE: `${BASE}/fees`,
    BY_STUDENT: (id: string) => `${BASE}/fees/student/${id}`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: `${BASE}/notifications`,
    BY_USER: (id: string) => `${BASE}/notifications/user/${id}`,
  },

  // Misc
  DASHBOARD: `${BASE}/dashboard`,
  COMMON: `${BASE}/common`,
  FEEDBACK: `${BASE}/feedback`,
  SUPER_ADMIN: {
    CREAT_DOMAIN: `${BASE}/super-admin/create-domain`,
    UPDATE_DOMAIN: `${BASE}/super-admin/domain`,
    CHECK_DOMAIN: `${BASE}/super-admin/domain`,

    CHECK_LICENCE: `${BASE}/super-admin`,
    TOGGLE_SUBSCRIPTION: `${BASE}/super-admin/toggle-subscription`,
  },
  PAYMENT: {
    INIT_PAYMENT: `${BASE}/payment/initialize-payment`,
    VERIFY_PAYMENT: `${BASE}/payment/verify-payment`,
    GET_SUBSCRIPTION_STATUS: `${BASE}/payment/subscription-status`,
  },
  LOGS: `${BASE}/logs`,
};

export default api;
