import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  MapPinned,
  Users,
  ShieldCheck,
  KeyRound,
  Building2,
  Home,
  Vote,
  UserPlus,
  ClipboardList,
  CalendarCheck,
  Footprints,
  GitBranch,
  Heart,
  ListChecks,
  CalendarDays,
  AlertTriangle,
  MessageCircle,
  Radar,
  FileBarChart,
  Bell,
  MessageSquare,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronRight,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Menu,
  Check,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Lock,
  Shield,
} from "lucide-react";

/* =========================================================
   FONT STYLE
========================================================= */

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

    .font-display {
      font-family: 'Lexend', sans-serif;
    }

    .font-body {
      font-family: 'Inter', sans-serif;
    }

    .font-mono {
      font-family: 'IBM Plex Mono', monospace;
    }
  `}</style>
);

/* =========================================================
   HELPERS
========================================================= */

const uid = () => Math.random().toString(36).slice(2, 9);

/* =========================================================
   MODULE CONFIG
========================================================= */

const MODULES = {
  constituency: {
    title: "Constituency",
    icon: Vote,
    columns: [
      ["name", "Name"],
      ["district", "District"],
      ["state", "State"],
    ],
    fields: [
      {
        name: "name",
        label: "Constituency Name",
        type: "text",
      },
      {
        name: "district",
        label: "District",
        type: "text",
      },
      {
        name: "state",
        label: "State",
        type: "text",
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Meerut Cantt",
        district: "Meerut",
        state: "Uttar Pradesh",
      },
      {
        id: uid(),
        name: "Sardhana",
        district: "Meerut",
        state: "Uttar Pradesh",
      },
    ],
  },

  users: {
    title: "Users",
    icon: Users,
    columns: [
      ["name", "Name"],
      ["phone", "Phone"],
      ["email", "Email"],
      ["status", "Status"],
      ["volunteerType", "Type"],
    ],
    fields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
      },
      {
        name: "email",
        label: "Email",
        type: "text",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["ACTIVE", "INACTIVE", "BLOCKED"],
      },
      {
        name: "volunteerType",
        label: "Volunteer Type",
        type: "select",
        options: [
          "",
          "VOLUNTEER",
          "TEAM_LEADER",
          "COORDINATOR",
        ],
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Ramesh Chaudhary",
        phone: "9876543210",
        email: "ramesh@example.com",
        status: "ACTIVE",
        volunteerType: "COORDINATOR",
      },
      {
        id: uid(),
        name: "Sunita Devi",
        phone: "9876500011",
        email: "sunita@example.com",
        status: "ACTIVE",
        volunteerType: "VOLUNTEER",
      },
    ],
  },

  roles: {
    title: "Roles",
    icon: ShieldCheck,
    columns: [
      ["name", "Role Name"],
      ["codename", "Codename"],
      ["isSystem", "System Role"],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "name",
        label: "Role Name",
        type: "text",
      },
      {
        name: "codename",
        label: "Codename",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "isSystem",
        label: "System Role",
        type: "checkbox",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Super Admin",
        codename: "super_admin",
        isSystem: true,
        isActive: true,
      },
      {
        id: uid(),
        name: "Booth Coordinator",
        codename: "booth_coordinator",
        isSystem: false,
        isActive: true,
      },
    ],
  },

  permissions: {
    title: "Permissions",
    icon: KeyRound,
    columns: [
      ["name", "Name"],
      ["codename", "Codename"],
      ["module", "Module"],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "name",
        label: "Permission Name",
        type: "text",
      },
      {
        name: "codename",
        label: "Codename",
        type: "text",
      },
      {
        name: "module",
        label: "Module",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        name: "View Voters",
        codename: "voters.view",
        module: "voters",
        isActive: true,
      },
      {
        id: uid(),
        name: "Manage Campaigns",
        codename: "campaigns.manage",
        module: "whatsapp",
        isActive: true,
      },
    ],
  },

  mandal: {
    title: "Mandal",
    icon: Building2,
    columns: [
      ["name", "Mandal Name"],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "name",
        label: "Mandal Name",
        type: "text",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Meerut Sadar",
        isActive: true,
      },
      {
        id: uid(),
        name: "Kharkhoda",
        isActive: true,
      },
    ],
  },

  village: {
    title: "Village",
    icon: Home,
    columns: [
      ["name", "Village"],
      ["mandal", "Mandal"],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "name",
        label: "Village Name",
        type: "text",
      },
      {
        name: "mandal",
        label: "Mandal",
        type: "text",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Jani Khurd",
        mandal: "Meerut Sadar",
        isActive: true,
      },
      {
        id: uid(),
        name: "Bahadurpur",
        mandal: "Kharkhoda",
        isActive: true,
      },
    ],
  },

  booth: {
    title: "Booth",
    icon: MapPinned,
    columns: [
      ["boothNumber", "Booth No."],
      ["pollingStation", "Polling Station"],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "boothNumber",
        label: "Booth Number",
        type: "text",
      },
      {
        name: "pollingStation",
        label: "Polling Station",
        type: "text",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        boothNumber: "MRT-101",
        pollingStation:
          "Govt. Primary School, Jani Khurd",
        isActive: true,
      },
      {
        id: uid(),
        boothNumber: "MRT-102",
        pollingStation:
          "Panchayat Bhawan, Bahadurpur",
        isActive: true,
      },
    ],
  },

  voters: {
    title: "Voters",
    icon: Vote,
    columns: [
      ["name", "Name"],
      ["epicNumber", "EPIC No."],
      ["age", "Age"],
      ["gender", "Gender"],
      ["mobile", "Mobile"],
    ],
    fields: [
      {
        name: "name",
        label: "Voter Name",
        type: "text",
      },
      {
        name: "epicNumber",
        label: "EPIC Number",
        type: "text",
      },
      {
        name: "age",
        label: "Age",
        type: "number",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["MALE", "FEMALE", "OTHER"],
      },
      {
        name: "mobile",
        label: "Mobile",
        type: "text",
      },
      {
        name: "booth",
        label: "Booth Number",
        type: "text",
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Vikas Sharma",
        epicNumber: "UP12345678",
        age: 34,
        gender: "MALE",
        mobile: "9812345670",
        booth: "MRT-101",
      },
      {
        id: uid(),
        name: "Pooja Rani",
        epicNumber: "UP12345679",
        age: 29,
        gender: "FEMALE",
        mobile: "9812345671",
        booth: "MRT-102",
      },
    ],
  },

  volunteers: {
    title: "Volunteers",
    icon: UserPlus,
    columns: [
      ["name", "Name"],
      ["phone", "Phone"],
      ["volunteerType", "Type"],
      ["address", "Area"],
    ],
    fields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
      },
      {
        name: "volunteerType",
        label: "Type",
        type: "select",
        options: [
          "VOLUNTEER",
          "TEAM_LEADER",
          "COORDINATOR",
        ],
      },
      {
        name: "address",
        label: "Area / Address",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Anil Kumar",
        phone: "9900011122",
        volunteerType: "TEAM_LEADER",
        address: "Jani Khurd",
      },
      {
        id: uid(),
        name: "Meena Yadav",
        phone: "9900011133",
        volunteerType: "VOLUNTEER",
        address: "Bahadurpur",
      },
    ],
  },

  assignment: {
    title: "Volunteer Assignment",
    icon: ClipboardList,
    columns: [
      ["user", "Volunteer"],
      ["booth", "Booth No."],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "user",
        label: "Volunteer Name",
        type: "text",
      },
      {
        name: "booth",
        label: "Booth Number",
        type: "text",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        user: "Anil Kumar",
        booth: "MRT-101",
        isActive: true,
      },
      {
        id: uid(),
        user: "Meena Yadav",
        booth: "MRT-102",
        isActive: true,
      },
    ],
  },

  attendance: {
    title: "Attendance",
    icon: CalendarCheck,
    columns: [
      ["user", "Volunteer"],
      ["date", "Date"],
      ["status", "Status"],
      ["checkInAt", "Check-in"],
      ["checkOutAt", "Check-out"],
    ],
    fields: [
      {
        name: "user",
        label: "Volunteer Name",
        type: "text",
      },
      {
        name: "date",
        label: "Date",
        type: "date",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          "PRESENT",
          "ABSENT",
          "HALF_DAY",
          "ON_LEAVE",
        ],
      },
      {
        name: "checkInAt",
        label: "Check-in Time",
        type: "text",
      },
      {
        name: "checkOutAt",
        label: "Check-out Time",
        type: "text",
      },
    ],
    seed: [
      {
        id: uid(),
        user: "Anil Kumar",
        date: "2026-08-01",
        status: "PRESENT",
        checkInAt: "09:05",
        checkOutAt: "17:20",
      },
      {
        id: uid(),
        user: "Meena Yadav",
        date: "2026-08-01",
        status: "HALF_DAY",
        checkInAt: "09:40",
        checkOutAt: "13:00",
      },
    ],
  },

  /* =======================================================
     TASKS
  ======================================================= */

  tasks: {
    title: "Tasks",
    icon: ClipboardList,
    columns: [
      ["title", "Task"],
      ["taskType", "Type"],
      ["location", "Location"],
      ["assignedTo", "Volunteer"],
      ["priority", "Priority"],
      ["status", "Status"],
      ["dueDate", "Due Date"],
    ],
    fields: [],
    seed: [
      {
        id: uid(),
        title: "Door-to-Door Campaign",
        taskType: "DOOR_TO_DOOR",
        location: "Booth 45",
        assignedTo: "Rahul",
        priority: "HIGH",
        status: "ASSIGNED",
        dueDate: "2026-10-10",
      },
      {
        id: uid(),
        title: "Voter Survey",
        taskType: "VOTER_SURVEY",
        location: "Booth 46",
        assignedTo: "Neha",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
        dueDate: "2026-10-12",
      },
    ],
  },

  dtd: {
    title: "Door To Door Campaign",
    icon: Footprints,
    columns: [
      ["voter", "Voter"],
      ["user", "Volunteer"],
      ["status", "Status"],
      ["visitDate", "Visit Date"],
    ],
    fields: [
      {
        name: "voter",
        label: "Voter Name",
        type: "text",
      },
      {
        name: "user",
        label: "Volunteer Name",
        type: "text",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          "PENDING",
          "COMPLETED",
          "NOT_AVAILABLE",
          "REFUSED",
          "RESCHEDULED",
        ],
      },
      {
        name: "visitDate",
        label: "Visit Date",
        type: "date",
      },
      {
        name: "remarks",
        label: "Remarks",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        voter: "Vikas Sharma",
        user: "Anil Kumar",
        status: "COMPLETED",
        visitDate: "2026-07-30",
      },
      {
        id: uid(),
        voter: "Pooja Rani",
        user: "Meena Yadav",
        status: "PENDING",
        visitDate: "2026-08-02",
      },
    ],
  },

  family: {
    title: "Family Mapping",
    icon: GitBranch,
    columns: [
      ["familyCode", "Family Code"],
      ["headName", "Head of Family"],
      ["address", "Address"],
    ],
    fields: [
      {
        name: "familyCode",
        label: "Family Code",
        type: "text",
      },
      {
        name: "headName",
        label: "Head of Family",
        type: "text",
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        familyCode: "FAM-0001",
        headName: "Ram Lal Sharma",
        address: "Jani Khurd, Meerut",
      },
      {
        id: uid(),
        familyCode: "FAM-0002",
        headName: "Suresh Yadav",
        address: "Bahadurpur, Meerut",
      },
    ],
  },

  support: {
    title: "Support Classification",
    icon: Heart,
    columns: [
      ["voter", "Voter"],
      ["supportLevel", "Support Level"],
      ["remarks", "Remarks"],
    ],
    fields: [
      {
        name: "voter",
        label: "Voter Name",
        type: "text",
      },
      {
        name: "supportLevel",
        label: "Support Level",
        type: "select",
        options: [
          "STRONG_SUPPORTER",
          "SUPPORTER",
          "NEUTRAL",
          "OPPONENT",
          "STRONG_OPPONENT",
          "NOT_CONTACTED",
        ],
      },
      {
        name: "remarks",
        label: "Remarks",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        voter: "Vikas Sharma",
        supportLevel: "STRONG_SUPPORTER",
        remarks: "Attends every rally",
      },
      {
        id: uid(),
        voter: "Pooja Rani",
        supportLevel: "NEUTRAL",
        remarks: "Undecided, needs follow-up",
      },
    ],
  },

  survey: {
    title: "Survey",
    icon: ListChecks,
    columns: [
      ["title", "Title"],
      ["startDate", "Start"],
      ["endDate", "End"],
      ["isActive", "Active"],
    ],
    fields: [
      {
        name: "title",
        label: "Survey Title",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "startDate",
        label: "Start Date",
        type: "date",
      },
      {
        name: "endDate",
        label: "End Date",
        type: "date",
      },
      {
        name: "isActive",
        label: "Active",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        title: "Road & Water Survey 2026",
        startDate: "2026-07-01",
        endDate: "2026-08-15",
        isActive: true,
      },
    ],
  },

  events: {
    title: "Events",
    icon: CalendarDays,
    columns: [
      ["name", "Event Name"],
      ["eventDate", "Date"],
      ["location", "Location"],
    ],
    fields: [
      {
        name: "name",
        label: "Event Name",
        type: "text",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
      {
        name: "eventDate",
        label: "Event Date",
        type: "date",
      },
      {
        name: "location",
        label: "Location",
        type: "text",
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Jan Sabha - Sardhana",
        eventDate: "2026-08-10",
        location: "Sardhana Ground",
      },
    ],
  },

  issues: {
    title: "Issue Management",
    icon: AlertTriangle,
    columns: [
      ["voter", "Voter"],
      ["category", "Category"],
      ["priority", "Priority"],
      ["status", "Status"],
    ],
    fields: [
      {
        name: "voter",
        label: "Voter Name",
        type: "text",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          "ROAD",
          "WATER",
          "ELECTRICITY",
          "DRAINAGE",
          "STREET_LIGHT",
          "RATION",
          "PENSION",
          "TOILET",
          "OTHER",
        ],
      },
      {
        name: "priority",
        label: "Priority",
        type: "select",
        options: [
          "LOW",
          "MEDIUM",
          "HIGH",
          "CRITICAL",
        ],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          "OPEN",
          "IN_PROGRESS",
          "RESOLVED",
          "REJECTED",
          "CLOSED",
        ],
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        voter: "Vikas Sharma",
        category: "WATER",
        priority: "HIGH",
        status: "OPEN",
      },
      {
        id: uid(),
        voter: "Pooja Rani",
        category: "STREET_LIGHT",
        priority: "MEDIUM",
        status: "IN_PROGRESS",
      },
    ],
  },

  feedback: {
    title: "Feedback",
    icon: MessageCircle,
    columns: [
      ["issueId", "Issue Ref"],
      ["satisfaction", "Satisfaction"],
      ["isResolved", "Resolved"],
    ],
    fields: [
      {
        name: "issueId",
        label: "Issue Reference",
        type: "text",
      },
      {
        name: "satisfaction",
        label: "Satisfaction",
        type: "select",
        options: [
          "VERY_SATISFIED",
          "SATISFIED",
          "NEUTRAL",
          "DISSATISFIED",
          "VERY_DISSATISFIED",
        ],
      },
      {
        name: "feedback",
        label: "Feedback",
        type: "textarea",
      },
      {
        name: "isResolved",
        label: "Marked Resolved",
        type: "checkbox",
        default: true,
      },
    ],
    seed: [
      {
        id: uid(),
        issueId: "WATER-001",
        satisfaction: "SATISFIED",
        isResolved: true,
      },
    ],
  },

  gps: {
    title: "Live GPS Tracking",
    icon: Radar,
    columns: [
      ["user", "Volunteer"],
      ["latitude", "Latitude"],
      ["longitude", "Longitude"],
      ["recordedAt", "Last Ping"],
    ],
    fields: [
      {
        name: "user",
        label: "Volunteer Name",
        type: "text",
      },
      {
        name: "latitude",
        label: "Latitude",
        type: "text",
      },
      {
        name: "longitude",
        label: "Longitude",
        type: "text",
      },
      {
        name: "recordedAt",
        label: "Recorded At",
        type: "text",
      },
    ],
    seed: [
      {
        id: uid(),
        user: "Anil Kumar",
        latitude: "28.9845",
        longitude: "77.7064",
        recordedAt: "10:42 AM",
      },
      {
        id: uid(),
        user: "Meena Yadav",
        latitude: "28.9701",
        longitude: "77.7213",
        recordedAt: "10:39 AM",
      },
    ],
  },

  reports: {
    title: "Reports",
    icon: FileBarChart,
    columns: [
      ["user", "Volunteer"],
      ["reportDate", "Date"],
      ["voterContacted", "Voters Contacted"],
      ["issuesReported", "Issues Reported"],
    ],
    fields: [
      {
        name: "user",
        label: "Volunteer Name",
        type: "text",
      },
      {
        name: "reportDate",
        label: "Report Date",
        type: "date",
      },
      {
        name: "voterContacted",
        label: "Voters Contacted",
        type: "number",
      },
      {
        name: "issuesReported",
        label: "Issues Reported",
        type: "number",
      },
      {
        name: "summary",
        label: "Summary",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        user: "Anil Kumar",
        reportDate: "2026-08-01",
        voterContacted: 42,
        issuesReported: 3,
      },
    ],
  },

  notifications: {
    title: "Notifications",
    icon: Bell,
    columns: [
      ["title", "Title"],
      ["audience", "Audience"],
      ["sentAt", "Sent"],
    ],
    fields: [
      {
        name: "title",
        label: "Title",
        type: "text",
      },
      {
        name: "message",
        label: "Message",
        type: "textarea",
      },
      {
        name: "audience",
        label: "Audience",
        type: "select",
        options: [
          "ALL_VOLUNTEERS",
          "TEAM_LEADERS",
          "COORDINATORS",
        ],
      },
      {
        name: "sentAt",
        label: "Sent At",
        type: "text",
      },
    ],
    seed: [
      {
        id: uid(),
        title: "Weekend Rally Reminder",
        audience: "ALL_VOLUNTEERS",
        sentAt: "01 Aug, 9:00 AM",
      },
    ],
  },

  whatsapp: {
    title: "WhatsApp Campaign",
    icon: MessageSquare,
    columns: [
      ["name", "Campaign"],
      ["template", "Template"],
      ["status", "Status"],
      ["sentCount", "Sent"],
    ],
    fields: [
      {
        name: "name",
        label: "Campaign Name",
        type: "text",
      },
      {
        name: "template",
        label: "Template Name",
        type: "text",
      },
      {
        name: "scheduledAt",
        label: "Scheduled At",
        type: "date",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: [
          "DRAFT",
          "SCHEDULED",
          "SENDING",
          "COMPLETED",
          "FAILED",
        ],
      },
      {
        name: "sentCount",
        label: "Sent Count",
        type: "number",
      },
    ],
    seed: [
      {
        id: uid(),
        name: "Voter ID Camp Update",
        template: "voter_id_camp",
        status: "COMPLETED",
        sentCount: 1240,
      },
      {
        id: uid(),
        name: "Rally Invitation",
        template: "rally_invite",
        status: "SCHEDULED",
        sentCount: 0,
      },
    ],
  },

  settings: {
    title: "Settings",
    icon: SettingsIcon,
    columns: [
      ["key", "Key"],
      ["value", "Value"],
    ],
    fields: [
      {
        name: "key",
        label: "Setting Key",
        type: "text",
      },
      {
        name: "value",
        label: "Value",
        type: "textarea",
      },
    ],
    seed: [
      {
        id: uid(),
        key: "otp_expiry_minutes",
        value: "5",
      },
      {
        id: uid(),
        key: "app_name",
        value: "Jan Sampark",
      },
    ],
  },
};

/* =========================================================
   USER MANAGEMENT COMPONENTS
========================================================= */

const UMInput = ({ label, ...p }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {label}
    </label>

    <input
      {...p}
      className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
    />
  </div>
);

const UMSelect = ({ label, children, ...p }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
      {label}
    </label>

    <select
      {...p}
      className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      {children}
    </select>
  </div>
);

const UMCard = ({
  title,
  description,
  icon: Icon = Users,
  children,
}) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

    <div className="px-5 py-4 border-b border-slate-100 flex items-start gap-3">

      <div className="w-9 h-9 rounded-lg bg-indigo-950 flex items-center justify-center">
        <Icon size={17} className="text-amber-400" />
      </div>

      <div>
        <h3 className="font-display font-700 text-slate-900 text-[15px]">
          {title}
        </h3>

        <p className="text-[12px] text-slate-500">
          {description}
        </p>
      </div>

    </div>

    <div className="p-5">
      {children}
    </div>

  </div>
);

const UMButton = ({
  children,
  variant = "primary",
  ...p
}) => (
  <button
    {...p}
    className={`${
      variant === "primary"
        ? "bg-amber-500 hover:bg-amber-400 text-indigo-950"
        : "border border-slate-300 text-slate-600 hover:bg-slate-50"
    } font-semibold text-[13px] px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

function UMSetupStepper({ step }) {
  const steps = [
    "User Created",
    "Module Access",
    "Location Assignment",
    "User Permissions",
    "Complete",
  ];

  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto">

      {steps.map((x, i) => (
        <React.Fragment key={x}>

          <div className="flex items-center gap-2 shrink-0">

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i
                  ? "bg-emerald-500 text-white"
                  : step === i
                  ? "bg-amber-500 text-indigo-950"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > i ? <Check size={15} /> : i + 1}
            </div>

            <span className="hidden lg:block text-[11px] font-semibold text-slate-500">
              {x}
            </span>

          </div>

          {i < 4 && (
            <div className="h-px flex-1 min-w-6 bg-slate-200" />
          )}

        </React.Fragment>
      ))}

    </div>
  );
}

/* =========================================================
   USERS LIST
========================================================= */

function UserManagementUsers({ onCreate }) {
  const rows = [
    {
      name: "Amit Kumar",
      phone: "9876543210",
      role: "Sub Admin",
      location: "Booth 45, 46, 47",
      status: "ACTIVE",
    },
    {
      name: "Rahul",
      phone: "9876500011",
      role: "Volunteer",
      location: "Booth 45",
      status: "ACTIVE",
    },
    {
      name: "Neha",
      phone: "9876500022",
      role: "Volunteer",
      location: "Booth 46",
      status: "ACTIVE",
    },
  ];

  return (
    <div className="font-body">

      <div className="flex items-center justify-between mb-6">

        <div>
          <div className="text-[11px] text-slate-400">
            User Management
          </div>

          <h2 className="font-display font-800 text-slate-900 text-xl">
            Users
          </h2>

          <p className="text-[12.5px] text-slate-500">
            Manage Sub Admins and Volunteers.
          </p>
        </div>

        <UMButton onClick={onCreate}>
          <Plus size={15} className="inline mr-1" />
          Create User
        </UMButton>

      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">

        <div className="p-4 border-b">

          <div className="relative w-64">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search users..."
              className="pl-8 pr-3 py-2 text-[13px] border rounded-lg w-full"
            />

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-[13px]">

            <thead className="bg-slate-50">

              <tr>
                {[
                  "Name",
                  "Phone",
                  "Role",
                  "Location",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left font-medium text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>

            </thead>

            <tbody>

              {rows.map((u) => (
                <tr
                  key={u.name}
                  className="border-b hover:bg-amber-50/40"
                >

                  <td className="px-5 py-4 font-semibold">
                    {u.name}
                  </td>

                  <td className="px-5 py-4 font-mono text-xs">
                    {u.phone}
                  </td>

                  <td className="px-5 py-4">

                    <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                      {u.role}
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    {u.location}
                  </td>

                  <td className="px-5 py-4">

                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                      {u.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">
                    <Pencil size={14} />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   CREATE USER
========================================================= */

function CreateUser({ onCancel, onComplete }) {
  const [f, setF] = useState({
    name: "",
    phone: "",
    password: "",
    role: "",
    type: "",
    location: "",
  });

  const [step, setStep] = useState(null);

  const [mods, setMods] = useState({
    Users: true,
    Volunteers: true,
    Tasks: true,
    Booths: true,
    "Door To Door": true,
    Attendance: true,
    Voters: false,
    Surveys: false,
    Events: false,
    Reports: false,
  });

  const [locs, setLocs] = useState([]);

  const [perms, setPerms] = useState({
    "task.read": true,
    "task.create": true,
    "task.update": true,
    "task.delete": false,
    "task.assign": true,
    "user.read": true,
    "user.create": true,
    "user.update": false,
    "user.delete": false,
    "volunteer.read": true,
    "volunteer.create": true,
    "volunteer.update": true,
    "volunteer.delete": false,
  });

  const set = (k, v) =>
    setF((p) => ({
      ...p,
      [k]: v,
    }));

  const toggle = (setter, k) =>
    setter((p) => ({
      ...p,
      [k]: !p[k],
    }));

  if (step !== null) {
    const groups = {
      TASKS: [
        "task.read",
        "task.create",
        "task.update",
        "task.delete",
        "task.assign",
      ],
      USERS: [
        "user.read",
        "user.create",
        "user.update",
        "user.delete",
      ],
      VOLUNTEERS: [
        "volunteer.read",
        "volunteer.create",
        "volunteer.update",
        "volunteer.delete",
      ],
    };

    return (
      <div className="font-body">

        <div className="mb-5">

          <div className="text-[11px] text-slate-400">
            User Management / Users
          </div>

          <h2 className="font-display font-800 text-slate-900 text-xl">
            Sub Admin Setup
          </h2>

        </div>

        <UMSetupStepper step={step} />

        {step === 0 && (
          <UMCard
            title="User Created"
            description="Basic user account is ready."
            icon={Check}
          >

            <p className="text-sm">
              {f.name} · {f.phone} · Sub Admin
            </p>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() => setStep(null)}
              >
                Back
              </UMButton>

              <UMButton onClick={() => setStep(1)}>
                Continue
              </UMButton>

            </div>

          </UMCard>
        )}

        {step === 1 && (
          <UMCard
            title="Module Access"
            description="Which modules can this Sub Admin access?"
            icon={ListChecks}
          >

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

              {Object.keys(mods).map((m) => (
                <label
                  key={m}
                  className="flex justify-between border rounded-lg p-3"
                >
                  <span className="text-sm">
                    {m}
                  </span>

                  <input
                    type="checkbox"
                    checked={mods[m]}
                    onChange={() =>
                      toggle(setMods, m)
                    }
                    className="accent-amber-500"
                  />
                </label>
              ))}

            </div>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() => setStep(0)}
              >
                Back
              </UMButton>

              <UMButton onClick={() => setStep(2)}>
                Continue
              </UMButton>

            </div>

          </UMCard>
        )}

        {step === 2 && (
          <UMCard
            title="Location Assignment"
            description="Select the Sub Admin's working scope."
            icon={MapPin}
          >

            <div className="grid md:grid-cols-2 gap-4">

              <UMSelect
                label="Constituency"
                value="Meerut Cantt"
                onChange={() => {}}
              >
                <option>Meerut Cantt</option>
              </UMSelect>

              <UMSelect
                label="Mandal"
                value="Mandal 01"
                onChange={() => {}}
              >
                <option>Mandal 01</option>
              </UMSelect>

              <UMSelect
                label="Village"
                value="Village A"
                onChange={() => {}}
              >
                <option>Village A</option>
              </UMSelect>

              <UMSelect
                label="Polling Station"
                value="PS 12"
                onChange={() => {}}
              >
                <option>PS 12</option>
              </UMSelect>

            </div>

            <div className="mt-5 grid sm:grid-cols-3 gap-3">

              {[
                "Booth 45",
                "Booth 46",
                "Booth 47",
              ].map((l) => (
                <label
                  key={l}
                  className="flex justify-between border rounded-lg p-3"
                >
                  <span>{l}</span>

                  <input
                    type="checkbox"
                    checked={locs.includes(l)}
                    onChange={() =>
                      setLocs((p) =>
                        p.includes(l)
                          ? p.filter((x) => x !== l)
                          : [...p, l]
                      )
                    }
                    className="accent-amber-500"
                  />
                </label>
              ))}

            </div>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() => setStep(1)}
              >
                Back
              </UMButton>

              <UMButton
                disabled={!locs.length}
                onClick={() => setStep(3)}
              >
                Continue
              </UMButton>

            </div>

          </UMCard>
        )}

        {step === 3 && (
          <UMCard
            title="User Permissions"
            description="Separate action permissions from module access."
            icon={Shield}
          >

            <div className="space-y-5">

              {Object.entries(groups).map(([g, ps]) => (
                <div key={g}>

                  <h4 className="font-display font-700 text-sm mb-2">
                    {g}
                  </h4>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">

                    {ps.map((p) => (
                      <label
                        key={p}
                        className="flex justify-between border rounded-lg p-3"
                      >

                        <span className="font-mono text-[11px]">
                          {p}
                        </span>

                        <input
                          type="checkbox"
                          checked={perms[p]}
                          onChange={() =>
                            toggle(setPerms, p)
                          }
                          className="accent-amber-500"
                        />

                      </label>
                    ))}

                  </div>

                </div>
              ))}

            </div>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() => setStep(2)}
              >
                Back
              </UMButton>

              <UMButton onClick={() => setStep(4)}>
                Continue
              </UMButton>

            </div>

          </UMCard>
        )}

        {step === 4 && (
          <UMCard
            title="Setup Complete"
            description="Review the configuration."
            icon={Check}
          >

            <div className="grid md:grid-cols-3 gap-3">

              <div className="p-4 bg-slate-50 rounded-lg">
                <small>User</small>
                <div className="font-semibold">
                  {f.name}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <small>Modules</small>
                <div className="font-semibold">
                  {Object.values(mods).filter(Boolean).length}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg">
                <small>Locations</small>
                <div className="font-semibold">
                  {locs.length}
                </div>
              </div>

            </div>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() => setStep(3)}
              >
                Back
              </UMButton>

              <UMButton onClick={onComplete}>
                Finish
              </UMButton>

            </div>

          </UMCard>
        )}

      </div>
    );
  }

  return (
    <div className="font-body">

      <div className="mb-5">

        <div className="text-[11px] text-slate-400">
          User Management / Users
        </div>

        <h2 className="font-display font-800 text-slate-900 text-xl">
          Create User
        </h2>

      </div>

      <UMCard
        title="Basic User Details"
        description="Role decides the next setup flow."
      >

        <div className="grid md:grid-cols-2 gap-4">

          <UMInput
            label="Full Name"
            value={f.name}
            onChange={(e) =>
              set("name", e.target.value)
            }
            placeholder="Enter full name"
          />

          <UMInput
            label="Phone"
            value={f.phone}
            onChange={(e) =>
              set("phone", e.target.value)
            }
            placeholder="Enter phone number"
          />

          <UMInput
            label="Password"
            type="password"
            value={f.password}
            onChange={(e) =>
              set("password", e.target.value)
            }
            placeholder="Enter password"
          />

          <UMSelect
            label="Role"
            value={f.role}
            onChange={(e) =>
              set("role", e.target.value)
            }
          >
            <option value="">
              Select Role
            </option>

            <option value="SUB_ADMIN">
              Sub Admin
            </option>

            <option value="VOLUNTEER">
              Volunteer
            </option>

          </UMSelect>

        </div>

        {f.role === "VOLUNTEER" && (
          <div className="mt-5 p-4 bg-amber-50 rounded-lg">

            <div className="grid md:grid-cols-2 gap-4">

              <UMSelect
                label="Volunteer Type"
                value={f.type}
                onChange={(e) =>
                  set("type", e.target.value)
                }
              >
                <option value="">
                  Select Volunteer Type
                </option>

                <option>VOLUNTEER</option>
                <option>TEAM_LEADER</option>
                <option>COORDINATOR</option>

              </UMSelect>

              <UMSelect
                label="Location"
                value={f.location}
                onChange={(e) =>
                  set("location", e.target.value)
                }
              >
                <option value="">
                  Select Location
                </option>

                {[
                  "Booth 45",
                  "Booth 46",
                  "Booth 47",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}

              </UMSelect>

            </div>

          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">

          <UMButton
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </UMButton>

          <UMButton
            onClick={() =>
              f.role === "SUB_ADMIN"
                ? setStep(0)
                : onComplete()
            }
            disabled={
              !f.name ||
              !f.phone ||
              !f.password ||
              !f.role ||
              (f.role === "VOLUNTEER" &&
                (!f.type || !f.location))
            }
          >
            {f.role === "SUB_ADMIN"
              ? "Create & Setup Sub Admin"
              : "Create Volunteer"}
          </UMButton>

        </div>

      </UMCard>

    </div>
  );
}

/* =========================================================
   PLACEHOLDER
========================================================= */

function UMPlaceholder({
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="font-body">

      <div className="mb-6">

        <div className="text-[11px] text-slate-400">
          User Management
        </div>

        <h2 className="font-display font-800 text-slate-900 text-xl">
          {title}
        </h2>

        <p className="text-[12.5px] text-slate-500">
          {description}
        </p>

      </div>

      <UMCard
        title={title}
        description="Ready for backend integration."
        icon={Icon}
      >

        <div className="border border-dashed rounded-xl p-10 text-center">

          <Icon
            size={28}
            className="mx-auto text-slate-300"
          />

          <p className="text-sm text-slate-400 mt-3">
            {title} configuration will appear here.
          </p>

        </div>

      </UMCard>

    </div>
  );
}

/* =========================================================
   NAV
========================================================= */

const NAV = [
  {
    type: "item",
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    type: "item",
    id: "constituency",
    label: "Constituency",
    icon: Vote,
  },

  {
    type: "group",
    label: "User Management",
    icon: Users,
    items: [
      {
        id: "users",
        label: "Users",
      },
      {
        id: "roles",
        label: "Roles",
      },
      {
        id: "permissions",
        label: "Permissions",
      },
    ],
  },

  /* =======================================================
     TASK MANAGEMENT
  ======================================================= */

  {
    type: "group",
    label: "Task Management",
    icon: ClipboardList,
    items: [
      {
        id: "tasks",
        label: "Tasks",
      },
    ],
  },

  {
    type: "item",
    id: "mandal",
    label: "Mandal",
    icon: Building2,
  },

  {
    type: "item",
    id: "village",
    label: "Village",
    icon: Home,
  },

  {
    type: "item",
    id: "booth",
    label: "Booth",
    icon: MapPinned,
  },

  {
    type: "item",
    id: "voters",
    label: "Voters",
    icon: Vote,
  },

  {
    type: "group",
    label: "Volunteer Management",
    icon: UserPlus,
    items: [
      {
        id: "volunteers",
        label: "Volunteers",
      },
      {
        id: "assignment",
        label: "Volunteer Assignment",
      },
      {
        id: "attendance",
        label: "Attendance",
      },
    ],
  },

  {
    type: "group",
    label: "Campaign Management",
    icon: ClipboardList,
    items: [
      {
        id: "dtd",
        label: "Door To Door Campaign",
      },
      {
        id: "family",
        label: "Family Mapping",
      },
      {
        id: "support",
        label: "Support Classification",
      },
      {
        id: "survey",
        label: "Survey",
      },
      {
        id: "events",
        label: "Events",
      },
      {
        id: "issues",
        label: "Issue Management",
      },
      {
        id: "feedback",
        label: "Feedback",
      },
    ],
  },

  {
    type: "item",
    id: "gps",
    label: "Live GPS Tracking",
    icon: Radar,
  },

  {
    type: "item",
    id: "reports",
    label: "Reports",
    icon: FileBarChart,
  },

  {
    type: "item",
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },

  {
    type: "item",
    id: "whatsapp",
    label: "WhatsApp Campaign",
    icon: MessageSquare,
  },

  {
    type: "item",
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
  },
];

/* =========================================================
   BOOTH TAG
========================================================= */

const BoothTag = ({ children }) => (
  <span className="font-mono text-[11px] tracking-wide px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-800">
    {children}
  </span>
);

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  active,
  onSelect,
  open,
  setOpen,
}) {
  const [openGroups, setOpenGroups] = useState({
    "User Management": true,
    "Task Management": true,
    "Volunteer Management": false,
    "Campaign Management": false,
  });

  const toggleGroup = (label) =>
    setOpenGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

  return (
    <aside
      className={`${
        open ? "w-72" : "w-0 lg:w-20"
      } transition-all duration-200 bg-indigo-950 text-indigo-100 flex-shrink-0 overflow-y-auto overflow-x-hidden h-screen sticky top-0`}
    >

      <div className="flex items-center gap-2 px-5 py-5 border-b border-indigo-900">

        <div className="w-9 h-9 rounded-md bg-amber-500 flex items-center justify-center font-display font-800 text-indigo-950 flex-shrink-0">
          JS
        </div>

        {open && (
          <div className="min-w-0">

            <div className="font-display font-700 text-white text-[15px] leading-tight truncate">
              Jan Sampark
            </div>

            <div className="text-[11px] text-indigo-400 font-body truncate">
              Campaign Console
            </div>

          </div>
        )}

      </div>

      <nav className="py-3 px-2 font-body text-[13.5px]">

        {NAV.map((entry) => {

          if (entry.type === "item") {

            const Icon = entry.icon;

            const isActive =
              active === entry.id;

            return (
              <button
                key={entry.id}
                onClick={() =>
                  onSelect(entry.id)
                }
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? "bg-amber-500 text-indigo-950 font-semibold"
                    : "text-indigo-200 hover:bg-indigo-900"
                }`}
              >

                <Icon
                  size={17}
                  className="flex-shrink-0"
                />

                {open && (
                  <span className="truncate">
                    {entry.label}
                  </span>
                )}

              </button>
            );
          }

          const GroupIcon = entry.icon;

          const isOpen =
            openGroups[entry.label];

          const hasActiveChild =
            entry.items.some(
              (i) => i.id === active
            );

          return (
            <div
              key={entry.label}
              className="mb-1"
            >

              <button
                onClick={() =>
                  open &&
                  toggleGroup(entry.label)
                }
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  hasActiveChild
                    ? "text-amber-400"
                    : "text-indigo-200 hover:bg-indigo-900"
                }`}
              >

                <GroupIcon
                  size={17}
                  className="flex-shrink-0"
                />

                {open && (
                  <span className="flex-1 text-left truncate">
                    {entry.label}
                  </span>
                )}

                {open &&
                  (isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  ))}

              </button>

              {open && isOpen && (
                <div className="ml-4 pl-3 border-l border-indigo-800 mt-1 mb-1">

                  {entry.items.map((item) => {

                    const isActive =
                      active === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          onSelect(item.id)
                        }
                        className={`w-full text-left px-3 py-2 rounded-md mb-0.5 text-[13px] transition-colors ${
                          isActive
                            ? "bg-amber-500 text-indigo-950 font-semibold"
                            : "text-indigo-300 hover:bg-indigo-900"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}

                </div>
              )}

            </div>
          );
        })}

      </nav>

    </aside>
  );
}

/* =========================================================
   FORM MODAL
========================================================= */

function FormModal({
  config,
  initial,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => {

    const base = {};

    config.fields.forEach((f) => {
      base[f.name] = initial
        ? initial[f.name] ?? ""
        : f.default ??
          (f.type === "checkbox"
            ? false
            : "");
    });

    return base;
  });

  const update = (name, value) =>
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      ...(initial || {}),
      ...form,
      id: initial
        ? initial.id
        : uid(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm px-4">

      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">

        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">

          <h3 className="font-display font-700 text-slate-900 text-[16px]">
            {initial ? "Edit" : "Add"}{" "}
            {config.title}
          </h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 font-body"
        >

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {config.fields.map((f) => (
              <div
                key={f.name}
                className={
                  f.type === "textarea"
                    ? "sm:col-span-2"
                    : ""
                }
              >

                <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                  {f.label}
                </label>

                {f.type === "select" && (
                  <select
                    value={form[f.name]}
                    onChange={(e) =>
                      update(
                        f.name,
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {f.options.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                      >
                        {opt === ""
                          ? "—"
                          : opt}
                      </option>
                    ))}
                  </select>
                )}

                {f.type === "textarea" && (
                  <textarea
                    value={form[f.name]}
                    onChange={(e) =>
                      update(
                        f.name,
                        e.target.value
                      )
                    }
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                )}

                {f.type === "checkbox" && (
                  <div className="flex items-center h-[38px]">

                    <input
                      type="checkbox"
                      checked={!!form[f.name]}
                      onChange={(e) =>
                        update(
                          f.name,
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 accent-amber-500"
                    />

                  </div>
                )}

                {[
                  "text",
                  "number",
                  "date",
                ].includes(f.type) && (
                  <input
                    type={f.type}
                    value={form[f.name]}
                    onChange={(e) =>
                      update(
                        f.name,
                        e.target.value
                      )
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                )}

              </div>
            ))}

          </div>

          <div className="flex justify-end gap-2 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-[13.5px] font-semibold bg-amber-500 text-indigo-950 hover:bg-amber-400"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

/* =========================================================
   GENERIC MODULE PAGE
========================================================= */

function ModulePage({
  moduleId,
  records,
  setRecords,
}) {
  const config = MODULES[moduleId];

  const [query, setQuery] =
    useState("");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const rows =
    records[moduleId] || [];

  const filtered = useMemo(() => {

    if (!query.trim()) return rows;

    const q = query.toLowerCase();

    return rows.filter((r) =>
      config.columns.some(
        ([key]) =>
          String(
            r[key] ?? ""
          )
            .toLowerCase()
            .includes(q)
      )
    );

  }, [
    rows,
    query,
    config.columns,
  ]);

  const handleSave = (record) => {

    setRecords((prev) => {

      const list =
        prev[moduleId] || [];

      const exists =
        list.some(
          (r) => r.id === record.id
        );

      const updated = exists
        ? list.map((r) =>
            r.id === record.id
              ? record
              : r
          )
        : [record, ...list];

      return {
        ...prev,
        [moduleId]: updated,
      };
    });

    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {

    setRecords((prev) => ({
      ...prev,
      [moduleId]: (
        prev[moduleId] || []
      ).filter(
        (r) => r.id !== id
      ),
    }));
  };

  const Icon = config.icon;

  return (
    <div className="font-body">

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-lg bg-indigo-950 flex items-center justify-center">

            <Icon
              size={18}
              className="text-amber-400"
            />

          </div>

          <div>

            <h2 className="font-display font-700 text-slate-900 text-xl">
              {config.title}
            </h2>

            <p className="text-[12.5px] text-slate-500">
              {rows.length} records
            </p>

          </div>

        </div>

        <div className="flex items-center gap-2">

          <div className="relative">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search..."
              className="pl-8 pr-3 py-2 text-[13px] border border-slate-300 rounded-lg w-44 sm:w-56 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

          </div>

          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-semibold text-[13px] px-4 py-2 rounded-lg"
          >
            <Plus size={15} />
            Add {config.title}
          </button>

        </div>

      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full text-[13px]">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-left">

                {config.columns.map(
                  ([key, label]) => (
                    <th
                      key={key}
                      className="px-5 py-3 font-medium whitespace-nowrap"
                    >
                      {label}
                    </th>
                  )
                )}

                <th className="px-5 py-3 font-medium text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.length === 0 && (
                <tr>

                  <td
                    colSpan={
                      config.columns.length +
                      1
                    }
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No records yet.
                  </td>

                </tr>
              )}

              {filtered.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 hover:bg-amber-50/40 ${
                    i % 2
                      ? "bg-slate-50/40"
                      : ""
                  }`}
                >

                  {config.columns.map(
                    ([key]) => (
                      <td
                        key={key}
                        className="px-5 py-3 text-slate-700 whitespace-nowrap"
                      >

                        {key ===
                          "boothNumber" ||
                        key === "booth" ? (
                          row[key] ? (
                            <BoothTag>
                              {row[key]}
                            </BoothTag>
                          ) : (
                            "—"
                          )
                        ) : typeof row[
                            key
                          ] ===
                          "boolean" ? (
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              row[key]
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {row[key]
                              ? "Yes"
                              : "No"}
                          </span>
                        ) : (
                          row[key] || (
                            <span className="text-slate-300">
                              —
                            </span>
                          )
                        )}

                      </td>
                    )
                  )}

                  <td className="px-5 py-3 text-right whitespace-nowrap">

                    <button
                      onClick={() => {
                        setEditing(row);
                        setModalOpen(true);
                      }}
                      className="text-slate-400 hover:text-indigo-700 p-1.5 inline-flex"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(row.id)
                      }
                      className="text-slate-400 hover:text-red-600 p-1.5 inline-flex"
                    >
                      <Trash2 size={14} />
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {modalOpen && (
        <FormModal
          config={config}
          initial={editing}
          onClose={() => {
            setModalOpen(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}

    </div>
  );
}

/* =========================================================
   TASK MANAGEMENT
========================================================= */

function TaskManagement({
  records,
  setRecords,
}) {
  const [view, setView] =
    useState("list");

  const [step, setStep] =
    useState(1);

  const [query, setQuery] =
    useState("");

  const [error, setError] =
    useState("");

  const [task, setTask] = useState({
    title: "",
    description: "",
    taskType: "",
    location: "",
    priority: "MEDIUM",
    dueDate: "",
    assignedTo: "",
  });

  /* =======================================================
     SUB ADMIN GEO SCOPE
  ======================================================= */

  const subAdminScope = [
    "Booth 45",
    "Booth 46",
    "Booth 47",
  ];

  /* =======================================================
     VOLUNTEERS

     Later backend API se aayenge.
  ======================================================= */

  const volunteers = [
    {
      id: "rahul",
      name: "Rahul",
      phone: "9876500011",
      location: "Booth 45",
      status: "ACTIVE",
    },
    {
      id: "neha",
      name: "Neha",
      phone: "9876500022",
      location: "Booth 46",
      status: "ACTIVE",
    },
  ];

  /* =======================================================
     UPDATE TASK
  ======================================================= */

  const updateTask = (
    key,
    value
  ) => {

    setTask((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "location"
        ? { assignedTo: "" }
        : {}),
    }));

    setError("");
  };

  /* =======================================================
     ELIGIBLE VOLUNTEERS
  ======================================================= */

  const eligibleVolunteers =
    useMemo(() => {

      if (!task.location) {
        return [];
      }

      return volunteers.filter(
        (volunteer) =>
          volunteer.status ===
            "ACTIVE" &&
          volunteer.location ===
            task.location
      );

    }, [task.location]);

  /* =======================================================
     TASK LIST
  ======================================================= */

  const taskRows =
    records.tasks || [];

  const filteredTasks =
    useMemo(() => {

      if (!query.trim()) {
        return taskRows;
      }

      const q =
        query.toLowerCase();

      return taskRows.filter(
        (item) =>
          [
            item.title,
            item.taskType,
            item.location,
            item.assignedTo,
            item.priority,
            item.status,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)
      );

    }, [taskRows, query]);

  /* =======================================================
     VALIDATE
  ======================================================= */

  const validateStep = () => {

    setError("");

    if (step === 1) {

      if (!task.title.trim()) {
        setError(
          "Task title is required."
        );
        return false;
      }

      if (!task.taskType) {
        setError(
          "Please select task type."
        );
        return false;
      }

      if (!task.priority) {
        setError(
          "Please select priority."
        );
        return false;
      }
    }

    if (step === 2) {

      if (!task.location) {
        setError(
          "Please select task location."
        );
        return false;
      }

      if (
        !subAdminScope.includes(
          task.location
        )
      ) {
        setError(
          "You cannot create a task outside your assigned scope."
        );
        return false;
      }
    }

    if (step === 3) {

      if (!task.assignedTo) {
        setError(
          "Please select an eligible volunteer."
        );
        return false;
      }

      const volunteer =
        eligibleVolunteers.find(
          (v) =>
            v.id ===
            task.assignedTo
        );

      if (!volunteer) {
        setError(
          "Selected volunteer is not eligible for this task location."
        );
        return false;
      }
    }

    return true;
  };

  /* =======================================================
     NEXT STEP
  ======================================================= */

  const nextStep = () => {

    if (!validateStep()) {
      return;
    }

    setStep((prev) =>
      Math.min(prev + 1, 4)
    );
  };

  /* =======================================================
     CREATE TASK
  ======================================================= */

  const createTask = () => {

    if (!validateStep()) {
      return;
    }

    const volunteer =
      eligibleVolunteers.find(
        (v) =>
          v.id === task.assignedTo
      );

    if (!volunteer) {
      setError(
        "Volunteer is not eligible."
      );
      return;
    }

    const newTask = {
      id: uid(),

      title: task.title,

      description:
        task.description,

      taskType:
        task.taskType,

      location:
        task.location,

      priority:
        task.priority,

      status:
        "ASSIGNED",

      dueDate:
        task.dueDate,

      assignedTo:
        volunteer.name,

      assignedVolunteerId:
        volunteer.id,

      createdAt:
        new Date().toISOString(),
    };

    setRecords((prev) => ({
      ...prev,

      tasks: [
        newTask,
        ...(prev.tasks || []),
      ],
    }));

    setTask({
      title: "",
      description: "",
      taskType: "",
      location: "",
      priority: "MEDIUM",
      dueDate: "",
      assignedTo: "",
    });

    setStep(1);
    setView("list");
    setError("");
  };

  /* =======================================================
     CREATE SCREEN
  ======================================================= */

  if (view === "create") {

    return (
      <div className="font-body">

        <div className="mb-6">

          <div className="text-[11px] text-slate-400">
            Task Management / Create Task
          </div>

          <div className="flex items-center justify-between gap-3">

            <div>

              <h2 className="font-display font-800 text-slate-900 text-xl">
                Create Task
              </h2>

              <p className="text-[12.5px] text-slate-500">
                Create and assign a task to an eligible volunteer.
              </p>

            </div>

            <UMButton
              variant="secondary"
              onClick={() => {
                setView("list");
                setStep(1);
                setError("");
              }}
            >
              <ArrowLeft
                size={15}
                className="inline mr-1"
              />
              Back
            </UMButton>

          </div>

        </div>

        {/* =================================================
            STEPPER
        ================================================= */}

        <div className="flex items-center gap-2 mb-6 overflow-x-auto">

          {[
            "Task Details",
            "Location",
            "Volunteer",
            "Review",
          ].map((label, index) => {

            const current =
              index + 1;

            return (
              <React.Fragment key={label}>

                <div className="flex items-center gap-2 shrink-0">

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      step > current
                        ? "bg-emerald-500 text-white"
                        : step === current
                        ? "bg-amber-500 text-indigo-950"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {step > current ? (
                      <Check size={15} />
                    ) : (
                      current
                    )}
                  </div>

                  <span className="hidden sm:block text-[11px] font-semibold text-slate-500">
                    {label}
                  </span>

                </div>

                {current < 4 && (
                  <div className="h-px flex-1 min-w-6 bg-slate-200" />
                )}

              </React.Fragment>
            );
          })}

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">

            <div className="flex items-center gap-2">

              <AlertTriangle size={16} />

              {error}

            </div>

          </div>
        )}

        {/* =================================================
            STEP 1
        ================================================= */}

        {step === 1 && (
          <UMCard
            title="Task Details"
            description="Enter the basic information for this task."
            icon={ClipboardList}
          >

            <div className="grid md:grid-cols-2 gap-4">

              <div className="md:col-span-2">

                <UMInput
                  label="Task Title"
                  value={task.title}
                  onChange={(e) =>
                    updateTask(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Enter task title"
                />

              </div>

              <UMSelect
                label="Task Type"
                value={task.taskType}
                onChange={(e) =>
                  updateTask(
                    "taskType",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Task Type
                </option>

                <option value="DOOR_TO_DOOR">
                  Door To Door
                </option>

                <option value="VOTER_SURVEY">
                  Voter Survey
                </option>

                <option value="CAMPAIGN">
                  Campaign
                </option>

                <option value="BOOTH_VISIT">
                  Booth Visit
                </option>

                <option value="OTHER">
                  Other
                </option>

              </UMSelect>

              <UMSelect
                label="Priority"
                value={task.priority}
                onChange={(e) =>
                  updateTask(
                    "priority",
                    e.target.value
                  )
                }
              >

                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="CRITICAL">
                  Critical
                </option>

              </UMSelect>

              <UMInput
                label="Due Date"
                type="date"
                value={task.dueDate}
                onChange={(e) =>
                  updateTask(
                    "dueDate",
                    e.target.value
                  )
                }
              />

              <div className="md:col-span-2">

                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Description
                </label>

                <textarea
                  value={task.description}
                  onChange={(e) =>
                    updateTask(
                      "description",
                      e.target.value
                    )
                  }
                  rows={4}
                  placeholder="Describe the task..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />

              </div>

            </div>

            <div className="flex justify-end mt-6">

              <UMButton
                onClick={nextStep}
              >
                Continue
                <ArrowRight
                  size={15}
                  className="inline ml-1"
                />
              </UMButton>

            </div>

          </UMCard>
        )}

        {/* =================================================
            STEP 2
        ================================================= */}

        {step === 2 && (
          <UMCard
            title="Task Location"
            description="Select a booth inside your assigned geographic scope."
            icon={MapPin}
          >

            <div className="mb-5 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">

              <div className="flex items-center gap-2 mb-2">

                <Lock
                  size={15}
                  className="text-indigo-700"
                />

                <span className="text-sm font-semibold text-indigo-900">
                  Your Assigned Scope
                </span>

              </div>

              <div className="flex flex-wrap gap-2">

                {subAdminScope.map(
                  (location) => (
                    <BoothTag
                      key={location}
                    >
                      {location}
                    </BoothTag>
                  )
                )}

              </div>

            </div>

            <div className="grid sm:grid-cols-3 gap-3">

              {subAdminScope.map(
                (location) => {

                  const selected =
                    task.location ===
                    location;

                  return (
                    <button
                      key={location}
                      type="button"
                      onClick={() =>
                        updateTask(
                          "location",
                          location
                        )
                      }
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selected
                          ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                          : "border-slate-200 hover:border-amber-300"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <MapPin
                            size={16}
                            className={
                              selected
                                ? "text-amber-600"
                                : "text-slate-400"
                            }
                          />

                          <span className="font-semibold text-sm">
                            {location}
                          </span>

                        </div>

                        {selected && (
                          <Check
                            size={16}
                            className="text-emerald-600"
                          />
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>

            {task.location && (
              <div className="mt-5 p-4 rounded-lg bg-slate-50">

                <div className="text-xs text-slate-500">
                  Selected Location
                </div>

                <div className="font-semibold text-slate-900 mt-1">
                  {task.location}
                </div>

                <div className="text-xs text-slate-500 mt-2">
                  Eligible volunteers will be calculated according to this location.
                </div>

              </div>
            )}

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() =>
                  setStep(1)
                }
              >
                <ArrowLeft
                  size={15}
                  className="inline mr-1"
                />
                Back
              </UMButton>

              <UMButton
                disabled={!task.location}
                onClick={nextStep}
              >
                Continue
                <ArrowRight
                  size={15}
                  className="inline ml-1"
                />
              </UMButton>

            </div>

          </UMCard>
        )}

        {/* =================================================
            STEP 3
        ================================================= */}

        {step === 3 && (
          <UMCard
            title="Eligible Volunteers"
            description={`Volunteers available for ${
              task.location ||
              "selected location"
            }.`}
            icon={Users}
          >

            {task.location &&
              eligibleVolunteers.length ===
                0 && (
                <div className="p-5 bg-red-50 border border-red-200 rounded-xl mb-4">

                  <div className="flex gap-3">

                    <AlertTriangle
                      size={20}
                      className="text-red-500 shrink-0"
                    />

                    <div>

                      <div className="font-semibold text-red-800">
                        No eligible volunteer
                      </div>

                      <p className="text-sm text-red-600 mt-1">
                        There is no active volunteer assigned to{" "}
                        {task.location}.
                      </p>

                    </div>

                  </div>

                </div>
              )}

            <div className="grid md:grid-cols-2 gap-4">

              {eligibleVolunteers.map(
                (volunteer) => {

                  const selected =
                    task.assignedTo ===
                    volunteer.id;

                  return (
                    <button
                      key={volunteer.id}
                      type="button"
                      onClick={() =>
                        updateTask(
                          "assignedTo",
                          volunteer.id
                        )
                      }
                      className={`p-4 rounded-xl border text-left ${
                        selected
                          ? "border-amber-500 bg-amber-50 ring-2 ring-amber-200"
                          : "border-slate-200 hover:border-amber-300"
                      }`}
                    >

                      <div className="flex items-start justify-between">

                        <div>

                          <div className="font-semibold text-slate-900">
                            {volunteer.name}
                          </div>

                          <div className="text-xs text-slate-500 mt-1">
                            {volunteer.phone}
                          </div>

                          <div className="mt-2">

                            <BoothTag>
                              {volunteer.location}
                            </BoothTag>

                          </div>

                        </div>

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            selected
                              ? "bg-amber-500 text-indigo-950"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >

                          {selected ? (
                            <Check size={16} />
                          ) : (
                            <UserPlus size={16} />
                          )}

                        </div>

                      </div>

                    </button>
                  );
                }
              )}

            </div>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() =>
                  setStep(2)
                }
              >
                <ArrowLeft
                  size={15}
                  className="inline mr-1"
                />
                Back
              </UMButton>

              <UMButton
                disabled={
                  !task.assignedTo ||
                  eligibleVolunteers.length ===
                    0
                }
                onClick={nextStep}
              >
                Review
                <ArrowRight
                  size={15}
                  className="inline ml-1"
                />
              </UMButton>

            </div>

          </UMCard>
        )}

        {/* =================================================
            STEP 4
        ================================================= */}

        {step === 4 && (
          <UMCard
            title="Review & Assign"
            description="Verify task details before assigning."
            icon={Check}
          >

            <div className="grid md:grid-cols-2 gap-4">

              <div className="p-4 bg-slate-50 rounded-lg">

                <div className="text-xs text-slate-400">
                  Task
                </div>

                <div className="font-semibold mt-1">
                  {task.title}
                </div>

              </div>

              <div className="p-4 bg-slate-50 rounded-lg">

                <div className="text-xs text-slate-400">
                  Type
                </div>

                <div className="font-semibold mt-1">
                  {task.taskType}
                </div>

              </div>

              <div className="p-4 bg-slate-50 rounded-lg">

                <div className="text-xs text-slate-400">
                  Location
                </div>

                <div className="mt-1">

                  <BoothTag>
                    {task.location}
                  </BoothTag>

                </div>

              </div>

              <div className="p-4 bg-slate-50 rounded-lg">

                <div className="text-xs text-slate-400">
                  Volunteer
                </div>

                <div className="font-semibold mt-1">

                  {
                    eligibleVolunteers.find(
                      (v) =>
                        v.id ===
                        task.assignedTo
                    )?.name
                  }

                </div>

              </div>

              <div className="p-4 bg-slate-50 rounded-lg">

                <div className="text-xs text-slate-400">
                  Priority
                </div>

                <div className="font-semibold mt-1">
                  {task.priority}
                </div>

              </div>

              <div className="p-4 bg-slate-50 rounded-lg">

                <div className="text-xs text-slate-400">
                  Due Date
                </div>

                <div className="font-semibold mt-1">
                  {task.dueDate ||
                    "Not specified"}
                </div>

              </div>

            </div>

            <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">

              <div className="flex items-start gap-3">

                <ShieldCheck
                  size={19}
                  className="text-emerald-600 mt-0.5"
                />

                <div>

                  <div className="font-semibold text-emerald-800">
                    Assignment Valid
                  </div>

                  <p className="text-xs text-emerald-700 mt-1">
                    Task location is inside your scope and the selected volunteer is assigned to the same location.
                  </p>

                </div>

              </div>

            </div>

            <div className="flex justify-between mt-6">

              <UMButton
                variant="secondary"
                onClick={() =>
                  setStep(3)
                }
              >
                <ArrowLeft
                  size={15}
                  className="inline mr-1"
                />
                Back
              </UMButton>

              <UMButton
                onClick={createTask}
              >
                <Check
                  size={15}
                  className="inline mr-1"
                />
                Create & Assign
              </UMButton>

            </div>

          </UMCard>
        )}

      </div>
    );
  }

  /* =======================================================
     TASK LIST
  ======================================================= */

  return (
    <div className="font-body">

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

        <div>

          <div className="text-[11px] text-slate-400">
            Task Management
          </div>

          <h2 className="font-display font-800 text-slate-900 text-xl">
            Tasks
          </h2>

          <p className="text-[12.5px] text-slate-500">
            Create tasks and assign them to eligible volunteers.
          </p>

        </div>

        <UMButton
          onClick={() => {
            setView("create");
            setStep(1);
            setError("");
          }}
        >
          <Plus
            size={15}
            className="inline mr-1"
          />
          Create Task
        </UMButton>

      </div>

      {/* ===================================================
          SCOPE
      =================================================== */}

      <div className="mb-5 bg-indigo-950 text-white rounded-xl p-5">

        <div className="flex items-start gap-3">

          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">

            <MapPin
              size={17}
              className="text-amber-400"
            />

          </div>

          <div>

            <div className="font-display font-700 text-sm">
              Your Task Creation Scope
            </div>

            <p className="text-xs text-indigo-200 mt-1">
              You can create and assign tasks only inside your assigned booths.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">

              {subAdminScope.map(
                (location) => (
                  <span
                    key={location}
                    className="font-mono text-[11px] px-2 py-1 rounded bg-white/10 text-amber-300"
                  >
                    {location}
                  </span>
                )
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ===================================================
          SEARCH
      =================================================== */}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">

        <div className="p-4 border-b flex items-center justify-between">

          <div className="relative w-64">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              placeholder="Search tasks..."
              className="pl-8 pr-3 py-2 text-[13px] border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-400"
            />

          </div>

          <div className="text-xs text-slate-400">
            {filteredTasks.length} tasks
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-[13px]">

            <thead className="bg-slate-50">

              <tr>

                {[
                  "Task",
                  "Type",
                  "Location",
                  "Volunteer",
                  "Priority",
                  "Status",
                  "Due Date",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-left font-medium text-slate-500"
                  >
                    {heading}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {filteredTasks.length === 0 && (
                <tr>

                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No tasks found.
                  </td>

                </tr>
              )}

              {filteredTasks.map(
                (item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-amber-50/40"
                  >

                    <td className="px-5 py-4">

                      <div className="font-semibold text-slate-800">
                        {item.title}
                      </div>

                      {item.description && (
                        <div className="text-[11px] text-slate-400 mt-1 max-w-xs truncate">
                          {item.description}
                        </div>
                      )}

                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.taskType}
                    </td>

                    <td className="px-5 py-4">

                      <BoothTag>
                        {item.location}
                      </BoothTag>

                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {item.assignedTo ||
                        "Unassigned"}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                          item.priority ===
                          "CRITICAL"
                            ? "bg-red-100 text-red-700"
                            : item.priority ===
                              "HIGH"
                            ? "bg-orange-100 text-orange-700"
                            : item.priority ===
                              "MEDIUM"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                          item.status ===
                          "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status ===
                              "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-700"
                            : item.status ===
                              "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.dueDate || "—"}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function DashboardPage({
  records,
  onSelect,
}) {
  const stats = [
    {
      id: "voters",
      label: "Total Voters",
      icon: Vote,
    },
    {
      id: "volunteers",
      label: "Volunteers",
      icon: UserPlus,
    },
    {
      id: "booth",
      label: "Booths Covered",
      icon: MapPinned,
    },
    {
      id: "issues",
      label: "Open Issues",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="font-body">

      <div className="mb-7">

        <h2 className="font-display font-800 text-slate-900 text-2xl">
          Namaste, Team 👋
        </h2>

        <p className="text-slate-500 text-[13.5px] mt-1">
          Yahan se apne poore campaign ka overview dekhein.
        </p>

      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {stats.map((s) => {

          const Icon = s.icon;

          const count =
            (records[s.id] || [])
              .length;

          return (
            <button
              key={s.id}
              onClick={() =>
                onSelect(s.id)
              }
              className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-amber-400 hover:shadow-md transition-all"
            >

              <div className="w-9 h-9 rounded-lg bg-indigo-950 flex items-center justify-center mb-3">

                <Icon
                  size={16}
                  className="text-amber-400"
                />

              </div>

              <div className="font-display font-800 text-2xl text-slate-900">
                {count}
              </div>

              <div className="text-[12.5px] text-slate-500 mt-0.5">
                {s.label}
              </div>

            </button>
          );
        })}

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <h3 className="font-display font-700 text-slate-900 text-[15px] mb-4">
            Recent Booth Assignments
          </h3>

          <div className="space-y-3">

            {(records.assignment || [])
              .slice(0, 4)
              .map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between text-[13px] border-b border-slate-100 pb-2 last:border-0"
                >

                  <span className="text-slate-700">
                    {r.user}
                  </span>

                  <BoothTag>
                    {r.booth}
                  </BoothTag>

                </div>
              ))}

            {(records.assignment || [])
              .length === 0 && (
              <p className="text-slate-400 text-[13px]">
                No assignments yet.
              </p>
            )}

          </div>

        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">

          <h3 className="font-display font-700 text-slate-900 text-[15px] mb-4">
            Open Issues by Priority
          </h3>

          <div className="space-y-3">

            {(records.issues || [])
              .slice(0, 4)
              .map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between text-[13px] border-b border-slate-100 pb-2 last:border-0"
                >

                  <span className="text-slate-700">
                    {r.voter} — {r.category}
                  </span>

                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      r.priority ===
                        "CRITICAL" ||
                      r.priority === "HIGH"
                        ? "bg-red-50 text-red-600"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {r.priority}
                  </span>

                </div>
              ))}

            {(records.issues || [])
              .length === 0 && (
              <p className="text-slate-400 text-[13px]">
                No issues logged yet.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   APP ROOT
========================================================= */

export default function App() {

  const [active, setActive] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [userView, setUserView] =
    useState("list");

  const [records, setRecords] =
    useState(() => {

      const x = {};

      Object.entries(MODULES).forEach(
        ([k, c]) => {
          x[k] = c.seed;
        }
      );

      return x;
    });

  const activeLabel = useMemo(() => {

    if (active === "dashboard") {
      return "Dashboard";
    }

    for (const e of NAV) {

      if (
        e.type === "item" &&
        e.id === active
      ) {
        return e.label;
      }

      if (e.type === "group") {

        const f =
          e.items.find(
            (i) => i.id === active
          );

        if (f) {
          return `${e.label} / ${f.label}`;
        }
      }
    }

    return "";

  }, [active]);

  const select = (id) => {

    setActive(id);

    if (id !== "users") {
      setUserView("list");
    }
  };

  const um =
    active === "users"
      ? userView === "create"
        ? (
          <CreateUser
            onCancel={() =>
              setUserView("list")
            }
            onComplete={() =>
              setUserView("list")
            }
          />
        )
        : (
          <UserManagementUsers
            onCreate={() =>
              setUserView("create")
            }
          />
        )
      : active === "module-access"
      ? (
        <UMPlaceholder
          title="Module Access"
          description="Manage which modules a user can access."
          icon={ListChecks}
        />
      )
      : active === "user-geo-assignment"
      ? (
        <UMPlaceholder
          title="User Geo Assignment"
          description="Manage geographic scope assigned to users."
          icon={MapPin}
        />
      )
      : active === "user-permissions"
      ? (
        <UMPlaceholder
          title="User Permissions"
          description="Manage action-level permissions for users."
          icon={Shield}
        />
      )
      : null;

  const taskManagement =
    active === "tasks"
      ? (
        <TaskManagement
          records={records}
          setRecords={setRecords}
        />
      )
      : null;

  return (
    <div className="flex min-h-screen bg-slate-50">

      <FontStyle />

      <Sidebar
        active={active}
        onSelect={select}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="flex-1 min-w-0">

        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setSidebarOpen(
                  (v) => !v
                )
              }
              className="text-slate-500"
            >
              <Menu size={19} />
            </button>

            <div className="font-display font-600 text-slate-800 text-[14px]">
              {activeLabel}
            </div>

          </div>

          <div className="w-8 h-8 rounded-full bg-indigo-950 text-amber-400 flex items-center justify-center font-display font-700 text-[12px]">
            TA
          </div>

        </header>

        <main className="p-5 sm:p-7">

          {active === "dashboard" ? (

            <DashboardPage
              records={records}
              onSelect={select}
            />

          ) : [
              "users",
              "module-access",
              "user-geo-assignment",
              "user-permissions",
            ].includes(active) ? (

            um

          ) : active === "tasks" ? (

            taskManagement

          ) : (

            <ModulePage
              moduleId={active}
              records={records}
              setRecords={setRecords}
            />

          )}

        </main>

      </div>

    </div>
  );
}
