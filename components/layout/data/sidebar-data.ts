

import {
  IconBrowserCheck,
  IconCalendarStats,
  IconCertificate,
  IconChartBar,
  IconClipboardList,
  IconCoin,
  IconCreditCard,
  IconDashboard,
  IconDeviceAnalytics,
  IconFileReport,
  IconHelp,
  IconLicense,
  IconLock,
  IconLockAccess,
  IconNotebook,
  IconPalette,
  IconPercentage,
  IconSettings,
  IconShieldLock,
  IconTool,
  IconUserCog,
  IconWallet,
  IconChartPie,
  IconBuildingSkyscraper,
  IconId,
  IconReportMoney,
  IconReceipt,
  IconCashBanknote,
  IconBuildingBank,
  IconFileInvoice,
  IconChartInfographic,
  IconChartDots,
  IconBuildingCommunity,
  IconClipboardCheck,
  IconReportSearch,
  IconChartHistogram,
  IconAlertCircle,
  IconUserShield,
  IconChartLine,
  IconBuildingWarehouse,
  IconUsers as IconTeachers,
  IconUserExclamation,
  IconUserSearch,
  IconUsersGroup as IconClasses,
  IconBuildingEstate,
  IconBellRinging,
} from "@tabler/icons-react"

import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  User,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  CalendarDays,
  CalendarClock,
  ClipboardList,
  FileText,
  FileBarChart,
  Building,
  DollarSign,
  CreditCard,
  Receipt,
  Wallet,
  Calculator,
  Bell,
  BellRing,
  Settings,
  HelpCircle,
  Mail,
  FileCheck,
  FileBarChart2,
  FileDigit,
  FileIcon as FileDocument,
  Briefcase,
  BookMarked,
  BookOpenIcon,
  BookText,
  SettingsIcon as UserSettings,
  Store,
  Package,
  PackageCheck,
  Truck,
  BarChart4,
  LineChartIcon,
  Gauge,
  Megaphone,
  CalendarRange,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  BadgeCheck,
  BadgeDollarSign,
  Layers,
  Library,
  Video,
  MessageCircle,
  MessagesSquare,
  Send,
  Trash2,
  FilePlus,
  FolderPlus,
  FolderOpen,
  FolderSync,
  FolderTree,
  FolderInput,
  FolderOutput,
  FolderEdit,
  FolderSearch,
  FolderX,
  FolderCheck,
  FolderSymlink,
  LucideIceCreamCone,
} from "lucide-react"


// 🧠 Function to return sidebar data based on role
export const getSidebarData = (): any => {
  const isBrowser = typeof window !== 'undefined'

  const role = isBrowser ? localStorage.getItem("role") || "Admin" : "Admin"

  const common = {
    user: {
      name: isBrowser ? localStorage.getItem("name") || "Kaal" : "Kaal",
      email: isBrowser ? localStorage.getItem("email") || "" : "",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "VSAY ERP",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "VSAY LMS",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "VSAY Inventory",
        logo: Command,
        plan: "Free",
      },
    ],
  }


  const navgroupCommon={
    title: "Other",
    items: [
      { title: "Security", url: "/erp/security", icon: IconShieldLock },
      { title: "Licence", url: "/erp/licence", icon: IconLicense },
    ],
  }

  switch (role) {
    case "Admin":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/admin-dashboard", icon: IconDashboard },
              { title: "Analytics", url: "/erp/analytics", icon: IconDeviceAnalytics },
              { title: "Reports", url: "/erp/reports", icon: IconFileReport },
              { title: "Notifications", url: "/erp/notifications", icon: IconBellRinging },
            ],
          },
          {
            title: "Institution",
            items: [
              { title: "Branches", url: "/erp/branches", icon: IconBuildingSkyscraper },
              { title: "Departments", url: "/erp/departments", icon: IconBuildingCommunity },
              { title: "Facilities", url: "/erp/facilities", icon: IconBuildingEstate },
              { title: "Assets", url: "/erp/assets", icon: IconBuildingWarehouse },
            ],
          },
          {
            title: "Academic",
            items: [
              { title: "Academic Year", url: "/erp/academic-year", icon: CalendarRange },
              { title: "Class Management", url: "/erp/class-management", icon: IconClasses },
              { title: "Subjects", url: "/erp/subjects", icon: BookOpen },
              { title: "Timetable", url: "/erp/timetable", icon: CalendarClock },
              { title: "Exams", url: "/erp/exams", icon: FileCheck },
              { title: "Results", url: "/erp/results", icon: FileBarChart2 },
              { title: "Certificates", url: "/erp/certificates", icon: IconCertificate },
            ],
          },
          {
            title: "People",
            items: [
              { title: "Students", url: "/erp/students", icon: GraduationCap },
              { title: "Teachers", url: "/erp/teachers", icon: IconTeachers },
              { title: "Staff", url: "/erp/staff", icon: Briefcase },
              { title: "Parents", url: "/erp/parents", icon: Users },
              { title: "User Management", url: "/erp/user-management", icon: UserSettings },
              { title: "Attendance", url: "/erp/attendance", icon: CalendarCheck },
            ],
          },
          {
            title: "Finance",
            items: [
              { title: "Fee Management", url: "/erp/fee-management", icon: Receipt },
              { title: "Payroll", url: "/erp/payroll", icon: IconCashBanknote },
              { title: "Expenses", url: "/erp/expenses", icon: DollarSign },
              { title: "Income", url: "/erp/income", icon: Wallet },
              { title: "Budgeting", url: "/erp/budgeting", icon: Calculator },
              { title: "Financial Reports", url: "/erp/financial-reports", icon: IconReportMoney },
              { title: "Tax Management", url: "/erp/tax-management", icon: IconPercentage },
            ],
          },
          {
            title: "Resources",
            items: [
              { title: "Library", url: "/erp/library", icon: Library },
              { title: "Inventory", url: "/erp/inventory", icon: Package },
              { title: "Transport", url: "/erp/transport", icon: Truck },
              { title: "Hostel", url: "/erp/hostel", icon: Building },
              { title: "Canteen", url: "/erp/canteen", icon: Store },
            ],
          },
          {
            title: "Communication",
            items: [
              { title: "Announcements", url: "/erp/announcements", icon: Megaphone },
              { title: "Messages", url: "/erp/messages", icon: MessageCircle },
              { title: "Email", url: "/erp/email", icon: Mail },
              { title: "SMS", url: "/erp/sms", icon: Send },
              { title: "Events", url: "/erp/events", icon: Calendar },
              { title: "Meetings", url: "/erp/meetings", icon: Video },
            ],
          },
          {
            title: "Administration",
            items: [
              {
                title: "Settings",
                icon: IconSettings,
                items: [
                  { title: "General", url: "/erp/settings/general", icon: Settings },
                  { title: "Notifications", url: "/erp/settings/notifications", icon: Bell },
                  { title: "Account", url: "/erp/settings/account", icon: IconUserCog },
                  { title: "Appearance", url: "/erp/settings/appearance", icon: IconPalette },
                  { title: "Integrations", url: "/erp/settings/integrations", icon: IconTool },
                  { title: "Backup & Restore", url: "/erp/settings/backup", icon: FolderSync },
                ],
              },
              {
                title: "Security",
                url: "/erp/security",
                icon: IconShieldLock,
                items: [
                  { title: "Permissions", url: "/erp/security/permissions", icon: IconLockAccess },
                  { title: "Roles", url: "/erp/security/roles", icon: IconUserShield },
                  { title: "Audit Logs", url: "/erp/security/audit-logs", icon: IconClipboardList },
                  { title: "Two-Factor Auth", url: "/erp/security/2fa", icon: IconLock },
                ],
              },
              { title: "License Management", url: "/erp/license", icon: IconLicense },
              { title: "System Health", url: "/erp/system-health", icon: Gauge },
              { title: "Help & Support", url: "/erp/help", icon: HelpCircle },
            ],
          },
         navgroupCommon,
        ],
      }

    case "Teacher":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/teacher-dashboard", icon: IconDashboard },
              { title: "Calendar", url: "/erp/teacher-calendar", icon: Calendar },
              { title: "Notifications", url: "/erp/teacher-notifications", icon: BellRing },
            ],
          },
          {
            title: "Academic",
            items: [
              { title: "My Classes", url: "/erp/teacher-classes", icon: IconClasses },
              { title: "My Subjects", url: "/erp/teacher-subjects", icon: BookOpen },
              { title: "Timetable", url: "/erp/teacher-timetable", icon: CalendarClock },
              { title: "Lesson Plans", url: "/erp/lesson-plans", icon: FileText },
              { title: "Teaching Materials", url: "/erp/teaching-materials", icon: FolderOpen },
              { title: "Assignments", url: "/erp/assignments", icon: ClipboardList },
            ],
          },
          {
            title: "Student Management",
            items: [
              { title: "Attendance", url: "/erp/take-attendance", icon: CalendarCheck },
              { title: "Grades", url: "/erp/grades", icon: FileBarChart2 },
              { title: "Behavior", url: "/erp/behavior", icon: IconUserExclamation },
              { title: "Progress Reports", url: "/erp/progress-reports", icon: LineChartIcon },
              { title: "Student Details", url: "/erp/student-details", icon: IconUserSearch },
            ],
          },
          {
            title: "Assessment",
            items: [
              { title: "Create Exams", url: "/erp/create-exams", icon: FilePlus },
              { title: "Manage Exams", url: "/erp/manage-exams", icon: FileCheck },
              { title: "Grade Exams", url: "/erp/grade-exams", icon: FileBarChart },
              { title: "Question Bank", url: "/erp/question-bank", icon: FolderSearch },
            ],
          },
          {
            title: "Communication",
            items: [
              { title: "Messages", url: "/erp/teacher-messages", icon: MessageCircle },
              { title: "Parent Communication", url: "/erp/parent-communication", icon: MessagesSquare },
              { title: "Announcements", url: "/erp/teacher-announcements", icon: Megaphone },
              { title: "Meetings", url: "/erp/teacher-meetings", icon: Video },
            ],
          },
          {
            title: "Personal",
            items: [
              { title: "My Profile", url: "/erp/teacher-profile", icon: User },
              { title: "Payroll", url: "/erp/teacher-payroll", icon: IconCashBanknote },
              { title: "Leave Requests", url: "/erp/leave-requests", icon: CalendarX },
              { title: "Professional Development", url: "/erp/professional-development", icon: GraduationCap },
              { title: "Settings", url: "/erp/teacher-settings", icon: Settings },
              { title: "Help & Support", url: "/erp/teacher-help", icon: HelpCircle },
            ],
          },
         navgroupCommon,
        ],
      }

    case "Student":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/student-dashboard", icon: IconDashboard },
              { title: "Calendar", url: "/erp/student-calendar", icon: Calendar },
              { title: "Notifications", url: "/erp/student-notifications", icon: BellRing },
            ],
          },
          {
            title: "Academic",
            items: [
              { title: "My Classes", url: "/erp/student-classes", icon: IconClasses },
              { title: "Timetable", url: "/erp/student-timetable", icon: CalendarClock },
              { title: "Assignments", url: "/erp/student-assignments", icon: ClipboardList },
              { title: "Learning Materials", url: "/erp/learning-materials", icon: BookOpenIcon },
              { title: "Attendance", url: "/erp/student-attendance", icon: CalendarCheck },
            ],
          },
          {
            title: "Assessments",
            items: [
              { title: "Exams", url: "/erp/student-exams", icon: FileCheck },
              { title: "Results", url: "/erp/student-results", icon: FileBarChart2 },
              { title: "Progress Reports", url: "/erp/student-progress", icon: LineChartIcon },
              { title: "Certificates", url: "/erp/student-certificates", icon: BadgeCheck },
            ],
          },
          {
            title: "Finance",
            items: [
              { title: "Fees", url: "/erp/student-fees", icon: Receipt },
              { title: "Payment History", url: "/erp/payment-history", icon: FileDigit },
              { title: "Scholarships", url: "/erp/scholarships", icon: BadgeDollarSign },
            ],
          },
          {
            title: "Resources",
            items: [
              { title: "Library", url: "/erp/student-library", icon: Library },
              { title: "Digital Resources", url: "/erp/digital-resources", icon: Layers },
              { title: "Transport", url: "/erp/student-transport", icon: Truck },
              { title: "Hostel", url: "/erp/student-hostel", icon: Building },
              { title: "Canteen", url: "/erp/student-canteen", icon: Store },
            ],
          },
          {
            title: "Communication",
            items: [
              { title: "Messages", url: "/erp/student-messages", icon: MessageCircle },
              { title: "Events", url: "/erp/student-events", icon: Calendar },
              { title: "Announcements", url: "/erp/student-announcements", icon: Megaphone },
            ],
          },
          {
            title: "Personal",
            items: [
              { title: "My Profile", url: "/erp/student-profile", icon: User },
              { title: "Settings", url: "/erp/student-settings", icon: Settings },
              { title: "Help & Support", url: "/erp/student-help", icon: HelpCircle },
            ],
          },
         navgroupCommon
        ],
      }

    case "Accountant":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/accountant-dashboard", icon: IconDashboard },
              { title: "Financial Overview", url: "/erp/financial-overview", icon: IconChartBar },
              { title: "Notifications", url: "/erp/accountant-notifications", icon: BellRing },
            ],
          },
          {
            title: "Fee Management",
            items: [
              { title: "Fee Structure", url: "/erp/fee-structure", icon: IconFileInvoice },
              { title: "Fee Collection", url: "/erp/fee-collection", icon: IconCoin },
              { title: "Fee Reports", url: "/erp/fee-reports", icon: IconReportMoney },
              { title: "Defaulters", url: "/erp/fee-defaulters", icon: IconAlertCircle },
              { title: "Discounts & Scholarships", url: "/erp/discounts", icon: IconPercentage },
            ],
          },
          {
            title: "Payroll",
            items: [
              { title: "Salary Structure", url: "/erp/salary-structure", icon: IconFileInvoice },
              { title: "Process Payroll", url: "/erp/process-payroll", icon: IconCashBanknote },
              { title: "Payslips", url: "/erp/payslips", icon: IconReceipt },
              { title: "Payroll Reports", url: "/erp/payroll-reports", icon: IconChartHistogram },
              { title: "Advances & Loans", url: "/erp/advances-loans", icon: IconWallet },
            ],
          },
          {
            title: "Accounting",
            items: [
              { title: "Chart of Accounts", url: "/erp/chart-accounts", icon: IconChartPie },
              { title: "Journal Entries", url: "/erp/journal-entries", icon: IconClipboardList },
              { title: "Ledger", url: "/erp/ledger", icon: IconNotebook },
              { title: "Bank Reconciliation", url: "/erp/bank-reconciliation", icon: IconBuildingBank },
              { title: "Financial Statements", url: "/erp/financial-statements", icon: IconFileReport },
            ],
          },
          {
            title: "Expenses",
            items: [
              { title: "Expense Categories", url: "/erp/expense-categories", icon: FolderTree },
              { title: "Record Expenses", url: "/erp/record-expenses", icon: IconCreditCard },
              { title: "Approve Expenses", url: "/erp/approve-expenses", icon: IconClipboardCheck },
              { title: "Expense Reports", url: "/erp/expense-reports", icon: IconReportSearch },
            ],
          },
          {
            title: "Taxation",
            items: [
              { title: "Tax Configuration", url: "/erp/tax-configuration", icon: IconSettings },
              { title: "Tax Calculations", url: "/erp/tax-calculations", icon: Calculator },
              { title: "Tax Reports", url: "/erp/tax-reports", icon: IconFileReport },
              { title: "Tax Compliance", url: "/erp/tax-compliance", icon: IconBrowserCheck },
            ],
          },
          {
            title: "Reporting",
            items: [
              { title: "Financial Reports", url: "/erp/financial-reports", icon: IconChartInfographic },
              { title: "Budget Analysis", url: "/erp/budget-analysis", icon: IconChartDots },
              { title: "Audit Reports", url: "/erp/audit-reports", icon: IconClipboardCheck },
              { title: "Custom Reports", url: "/erp/custom-reports", icon: IconFileReport },
            ],
          },
          {
            title: "Settings",
            items: [
              { title: "Account Settings", url: "/erp/account-settings", icon: IconSettings },
              { title: "Financial Year", url: "/erp/financial-year", icon: IconCalendarStats },
              { title: "Payment Methods", url: "/erp/payment-methods", icon: IconCreditCard },
              { title: "Help & Support", url: "/erp/accountant-help", icon: IconHelp },
            ],
          },
        navgroupCommon,
        ],
      }

    case "Parent":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/parent-dashboard", icon: IconDashboard },
              { title: "Calendar", url: "/erp/parent-calendar", icon: Calendar },
              { title: "Notifications", url: "/erp/parent-notifications", icon: BellRing },
            ],
          },
          {
            title: "Children",
            items: [
              { title: "My Children", url: "/erp/my-children", icon: Users },
              { title: "Academic Progress", url: "/erp/children-progress", icon: LineChartIcon },
              { title: "Attendance", url: "/erp/children-attendance", icon: CalendarCheck },
              { title: "Behavior", url: "/erp/children-behavior", icon: IconUserExclamation },
            ],
          },
          {
            title: "Academic",
            items: [
              { title: "Timetable", url: "/erp/children-timetable", icon: CalendarClock },
              { title: "Homework", url: "/erp/children-homework", icon: ClipboardList },
              { title: "Exam Results", url: "/erp/children-results", icon: FileBarChart2 },
              { title: "Report Cards", url: "/erp/children-reports", icon: FileDocument },
            ],
          },
          {
            title: "Finance",
            items: [
              { title: "Fee Details", url: "/erp/children-fees", icon: Receipt },
              { title: "Payment History", url: "/erp/parent-payment-history", icon: FileDigit },
              { title: "Make Payment", url: "/erp/make-payment", icon: CreditCard },
              { title: "Fee Structure", url: "/erp/parent-fee-structure", icon: IconFileInvoice },
            ],
          },
          {
            title: "Communication",
            items: [
              { title: "Messages", url: "/erp/parent-messages", icon: MessageCircle },
              { title: "Teacher Communication", url: "/erp/teacher-communication", icon: MessagesSquare },
              { title: "Announcements", url: "/erp/parent-announcements", icon: Megaphone },
              { title: "Parent Meetings", url: "/erp/parent-meetings", icon: Video },
            ],
          },
          {
            title: "Resources",
            items: [
              { title: "School Calendar", url: "/erp/school-calendar", icon: CalendarDays },
              { title: "Events", url: "/erp/parent-events", icon: Calendar },
              { title: "Transport Routes", url: "/erp/transport-routes", icon: Truck },
              { title: "School Policies", url: "/erp/school-policies", icon: FileText },
            ],
          },
          {
            title: "Personal",
            items: [
              { title: "My Profile", url: "/erp/parent-profile", icon: User },
              { title: "Settings", url: "/erp/parent-settings", icon: Settings },
              { title: "Help & Support", url: "/erp/parent-help", icon: HelpCircle },
            ],
          },
          navgroupCommon
        ],
      }

    case "Librarian":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/librarian-dashboard", icon: IconDashboard },
              { title: "Calendar", url: "/erp/librarian-calendar", icon: Calendar },
              { title: "Notifications", url: "/erp/librarian-notifications", icon: BellRing },
            ],
          },
          {
            title: "Catalog Management",
            items: [
              { title: "Books", url: "/erp/books", icon: BookText },
              { title: "E-Resources", url: "/erp/e-resources", icon: Layers },
              { title: "Periodicals", url: "/erp/periodicals", icon: BookMarked },
              { title: "Media", url: "/erp/media", icon: Video },
              { title: "Categories", url: "/erp/library-categories", icon: FolderTree },
            ],
          },
          {
            title: "Circulation",
            items: [
              { title: "Issue Books", url: "/erp/issue-books", icon: FolderOutput },
              { title: "Return Books", url: "/erp/return-books", icon: FolderInput },
              { title: "Reservations", url: "/erp/reservations", icon: CalendarPlus },
              { title: "Overdue Items", url: "/erp/overdue", icon: FolderX },
              { title: "Fines", url: "/erp/library-fines", icon: DollarSign },
            ],
          },
          {
            title: "Members",
            items: [
              { title: "Student Members", url: "/erp/student-members", icon: GraduationCap },
              { title: "Staff Members", url: "/erp/staff-members", icon: Briefcase },
              { title: "Member Cards", url: "/erp/member-cards", icon: BadgeCheck },
              { title: "Member Reports", url: "/erp/member-reports", icon: FileBarChart2 },
            ],
          },
          {
            title: "Inventory",
            items: [
              { title: "Acquisitions", url: "/erp/acquisitions", icon: FolderPlus },
              { title: "Stock Verification", url: "/erp/stock-verification", icon: FolderCheck },
              { title: "Lost/Damaged Items", url: "/erp/lost-damaged", icon: FolderX },
              { title: "Inventory Reports", url: "/erp/inventory-reports", icon: FileBarChart },
            ],
          },
          {
            title: "Reports",
            items: [
              { title: "Circulation Reports", url: "/erp/circulation-reports", icon: IconChartHistogram },
              { title: "Collection Reports", url: "/erp/collection-reports", icon: IconChartPie },
              { title: "Usage Statistics", url: "/erp/usage-statistics", icon: BarChart4 },
              { title: "Custom Reports", url: "/erp/library-custom-reports", icon: IconFileReport },
            ],
          },
          {
            title: "Settings",
            items: [
              { title: "Library Settings", url: "/erp/library-settings", icon: Settings },
              { title: "Circulation Rules", url: "/erp/circulation-rules", icon: ClipboardList },
              { title: "Help & Support", url: "/erp/librarian-help", icon: HelpCircle },
            ],
          },
         navgroupCommon
        ],
      }

    case "Inventory Manager":
      return {
        ...common,
        navGroups: [
          {
            title: "Overview",
            items: [
              { title: "Dashboard", url: "/erp/inventory-dashboard", icon: IconDashboard },
              { title: "Notifications", url: "/erp/inventory-notifications", icon: BellRing },
            ],
          },
          {
            title: "Inventory",
            items: [
              { title: "Items", url: "/erp/inventory-items", icon: Package },
              { title: "Categories", url: "/erp/inventory-categories", icon: FolderTree },
              { title: "Suppliers", url: "/erp/suppliers", icon: Truck },
              { title: "Warehouses", url: "/erp/warehouses", icon: IconBuildingWarehouse },
            ],
          },
          {
            title: "Operations",
            items: [
              { title: "Purchase Orders", url: "/erp/purchase-orders", icon: ClipboardList },
              { title: "Goods Receipt", url: "/erp/goods-receipt", icon: PackageCheck },
              { title: "Stock Transfer", url: "/erp/stock-transfer", icon: FolderSymlink },
              { title: "Stock Adjustment", url: "/erp/stock-adjustment", icon: FolderEdit },
              { title: "Issuance", url: "/erp/issuance", icon: FolderOutput },
            ],
          },
          {
            title: "Asset Management",
            items: [
              { title: "Fixed Assets", url: "/erp/fixed-assets", icon: IconBuildingEstate },
              { title: "Asset Maintenance", url: "/erp/asset-maintenance", icon: IconTool },
              { title: "Depreciation", url: "/erp/depreciation", icon: IconChartLine },
              { title: "Asset Disposal", url: "/erp/asset-disposal", icon: Trash2 },
            ],
          },
          {
            title: "Reports",
            items: [
              { title: "Inventory Reports", url: "/erp/inventory-reports", icon: IconChartHistogram },
              { title: "Stock Status", url: "/erp/stock-status", icon: IconChartPie },
              { title: "Consumption Reports", url: "/erp/consumption-reports", icon: IconChartBar },
              { title: "Valuation Reports", url: "/erp/valuation-reports", icon: IconReportMoney },
            ],
          },
          {
            title: "Settings",
            items: [
              { title: "Inventory Settings", url: "/erp/inventory-settings", icon: Settings },
              { title: "Barcode Settings", url: "/erp/barcode-settings", icon: IconId },
              { title: "Help & Support", url: "/erp/inventory-help", icon: HelpCircle },
            ],
          },
         navgroupCommon,
        ],
      }

    default:
      return { ...common, navGroups: [] }
  }
}
