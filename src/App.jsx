import React, { useState, useMemo } from "react";
import './index.css'
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
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
 /* ---------------------------------------------------------    FONT IMPORT (display / body / mono) --------------------------------------------------------- */

 const FontStyle = () => (
  <style>{`     @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');     .font-display { font-family: 'Lexend', sans-serif; }     .font-body { font-family: 'Inter', sans-serif; }     .font-mono { font-family: 'IBM Plex Mono', monospace; }   `}</style>
); /* ---------------------------------------------------------    MODULE CONFIG — columns + form fields + seed data --------------------------------------------------------- */
const uid = () => Math.random().toString(36).slice(2, 9);
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
      { name: "name", label: "Constituency Name", type: "text" },
      { name: "district", label: "District", type: "text" },
      { name: "state", label: "State", type: "text" },
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
      { name: "name", label: "Full Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "text" },
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
        options: ["", "VOLUNTEER", "TEAM_LEADER", "COORDINATOR"],
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
      { name: "name", label: "Role Name", type: "text" },
      { name: "codename", label: "Codename", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "isSystem", label: "System Role", type: "checkbox" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
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
      { name: "name", label: "Permission Name", type: "text" },
      { name: "codename", label: "Codename", type: "text" },
      { name: "module", label: "Module", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
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
      { name: "name", label: "Mandal Name", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
    ],
    seed: [
      { id: uid(), name: "Meerut Sadar", isActive: true },
      { id: uid(), name: "Kharkhoda", isActive: true },
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
      { name: "name", label: "Village Name", type: "text" },
      { name: "mandal", label: "Mandal", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
    ],
    seed: [
      { id: uid(), name: "Jani Khurd", mandal: "Meerut Sadar", isActive: true },
      { id: uid(), name: "Bahadurpur", mandal: "Kharkhoda", isActive: true },
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
      { name: "boothNumber", label: "Booth Number", type: "text" },
      { name: "pollingStation", label: "Polling Station", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
    ],
    seed: [
      {
        id: uid(),
        boothNumber: "MRT-101",
        pollingStation: "Govt. Primary School, Jani Khurd",
        isActive: true,
      },
      {
        id: uid(),
        boothNumber: "MRT-102",
        pollingStation: "Panchayat Bhawan, Bahadurpur",
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
      { name: "name", label: "Voter Name", type: "text" },
      { name: "epicNumber", label: "EPIC Number", type: "text" },
      { name: "age", label: "Age", type: "number" },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: ["MALE", "FEMALE", "OTHER"],
      },
      { name: "mobile", label: "Mobile", type: "text" },
      { name: "booth", label: "Booth Number", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
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
      { name: "name", label: "Full Name", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      {
        name: "volunteerType",
        label: "Type",
        type: "select",
        options: ["VOLUNTEER", "TEAM_LEADER", "COORDINATOR"],
      },
      { name: "address", label: "Area / Address", type: "textarea" },
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
      { name: "user", label: "Volunteer Name", type: "text" },
      { name: "booth", label: "Booth Number", type: "text" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
    ],
    seed: [
      { id: uid(), user: "Anil Kumar", booth: "MRT-101", isActive: true },
      { id: uid(), user: "Meena Yadav", booth: "MRT-102", isActive: true },
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
      { name: "user", label: "Volunteer Name", type: "text" },
      { name: "date", label: "Date", type: "date" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["PRESENT", "ABSENT", "HALF_DAY", "ON_LEAVE"],
      },
      { name: "checkInAt", label: "Check-in Time", type: "text" },
      { name: "checkOutAt", label: "Check-out Time", type: "text" },
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
      { name: "voter", label: "Voter Name", type: "text" },
      { name: "user", label: "Volunteer Name", type: "text" },
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
      { name: "visitDate", label: "Visit Date", type: "date" },
      { name: "remarks", label: "Remarks", type: "textarea" },
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
      { name: "familyCode", label: "Family Code", type: "text" },
      { name: "headName", label: "Head of Family", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
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
      { name: "voter", label: "Voter Name", type: "text" },
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
      { name: "remarks", label: "Remarks", type: "textarea" },
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
      { name: "title", label: "Survey Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      { name: "isActive", label: "Active", type: "checkbox", default: true },
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
      { name: "name", label: "Event Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "eventDate", label: "Event Date", type: "date" },
      { name: "location", label: "Location", type: "text" },
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
      { name: "voter", label: "Voter Name", type: "text" },
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
        options: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["OPEN", "IN_PROGRESS", "RESOLVED", "REJECTED", "CLOSED"],
      },
      { name: "description", label: "Description", type: "textarea" },
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
      { name: "issueId", label: "Issue Reference", type: "text" },
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
      { name: "feedback", label: "Feedback", type: "textarea" },
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
      { name: "user", label: "Volunteer Name", type: "text" },
      { name: "latitude", label: "Latitude", type: "text" },
      { name: "longitude", label: "Longitude", type: "text" },
      { name: "recordedAt", label: "Recorded At", type: "text" },
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
      { name: "user", label: "Volunteer Name", type: "text" },
      { name: "reportDate", label: "Report Date", type: "date" },
      { name: "voterContacted", label: "Voters Contacted", type: "number" },
      { name: "issuesReported", label: "Issues Reported", type: "number" },
      { name: "summary", label: "Summary", type: "textarea" },
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
      { name: "title", label: "Title", type: "text" },
      { name: "message", label: "Message", type: "textarea" },
      {
        name: "audience",
        label: "Audience",
        type: "select",
        options: ["ALL_VOLUNTEERS", "TEAM_LEADERS", "COORDINATORS"],
      },
      { name: "sentAt", label: "Sent At", type: "text" },
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
      { name: "name", label: "Campaign Name", type: "text" },
      { name: "template", label: "Template Name", type: "text" },
      { name: "scheduledAt", label: "Scheduled At", type: "date" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["DRAFT", "SCHEDULED", "SENDING", "COMPLETED", "FAILED"],
      },
      { name: "sentCount", label: "Sent Count", type: "number" },
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
  moduleAccess: {
    title: "Module Access",
    icon: ShieldCheck,
    columns: [
      ["user", "Sub Admin"],
      ["modules", "Allowed Modules"],
      ["status", "Status"],
    ],
    fields: [
      { name: "user", label: "Sub Admin", type: "text" },
      { name: "modules", label: "Allowed Modules", type: "textarea" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["ACTIVE", "INACTIVE"],
      },
    ],
    seed: [
      {
        id: uid(),
        user: "Amit Verma",
        modules: "Users, Volunteers, Tasks, Booths, Door To Door, Attendance",
        status: "ACTIVE",
      },
    ],
  },
  userGeoAssignment: {
    title: "User Geo Assignment",
    icon: MapPinned,
    columns: [
      ["user", "User"],
      ["scope", "Assigned Locations"],
      ["status", "Status"],
    ],
    fields: [
      { name: "user", label: "User", type: "text" },
      { name: "scope", label: "Assigned Locations", type: "textarea" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["ACTIVE", "INACTIVE"],
      },
    ],
    seed: [
      {
        id: uid(),
        user: "Amit Verma",
        scope: "Constituency → Meerut Cantt → Booth 45, 46, 47",
        status: "ACTIVE",
      },
    ],
  },
  userPermissions: {
    title: "User Permissions",
    icon: KeyRound,
    columns: [
      ["user", "User"],
      ["module", "Module"],
      ["permissions", "Permissions"],
    ],
    fields: [
      { name: "user", label: "User", type: "text" },
      { name: "module", label: "Module", type: "text" },
      { name: "permissions", label: "Permissions", type: "textarea" },
    ],
    seed: [
      {
        id: uid(),
        user: "Amit Verma",
        module: "TASKS",
        permissions: "task.read, task.create, task.update, task.assign",
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
      { name: "key", label: "Setting Key", type: "text" },
      { name: "value", label: "Value", type: "textarea" },
    ],
    seed: [
      { id: uid(), key: "otp_expiry_minutes", value: "5" },
      { id: uid(), key: "app_name", value: "Jan Sampark" },
    ],
  },
};
/* ---------------------------------------------------------    SIDEBAR NAV STRUCTURE --------------------------------------------------------- */ const NAV =
  [
    {
      type: "item",
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { type: "item", id: "constituency", label: "Constituency", icon: Vote },
    {
      type: "group",
      label: "User Management",
      icon: Users,
      items: [
        { id: "users", label: "Users" },
        { id: "roles", label: "Roles" },
        { id: "permissions", label: "Permissions" },
        { id: "moduleAccess", label: "Module Access" },
        { id: "userGeoAssignment", label: "User Geo Assignment" },
        { id: "userPermissions", label: "User Permissions" },
      ],
    },
    { type: "item", id: "mandal", label: "Mandal", icon: Building2 },
    { type: "item", id: "village", label: "Village", icon: Home },
    { type: "item", id: "booth", label: "Booth", icon: MapPinned },
    { type: "item", id: "voters", label: "Voters", icon: Vote },
    {
      type: "group",
      label: "Volunteer Management",
      icon: UserPlus,
      items: [
        { id: "volunteers", label: "Volunteers" },
        { id: "assignment", label: "Volunteer Assignment" },
        { id: "attendance", label: "Attendance" },
      ],
    },
    {
      type: "group",
      label: "Campaign Management",
      icon: ClipboardList,
      items: [
        { id: "dtd", label: "Door To Door Campaign" },
        { id: "family", label: "Family Mapping" },
        { id: "support", label: "Support Classification" },
        { id: "survey", label: "Survey" },
        { id: "events", label: "Events" },
        { id: "issues", label: "Issue Management" },
        { id: "feedback", label: "Feedback" },
      ],
    },
    { type: "item", id: "gps", label: "Live GPS Tracking", icon: Radar },
    { type: "item", id: "reports", label: "Reports", icon: FileBarChart },
    { type: "item", id: "notifications", label: "Notifications", icon: Bell },
    {
      type: "item",
      id: "whatsapp",
      label: "WhatsApp Campaign",
      icon: MessageSquare,
    },
    { type: "item", id: "settings", label: "Settings", icon: SettingsIcon },
  ];
/* ---------------------------------------------------------    BOOTH-TAG SIGNATURE BADGE --------------------------------------------------------- */ const BoothTag =
  ({ children }) => (
    <span className="font-mono text-[11px] tracking-wide px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-800">
      {" "}
      {children}{" "}
    </span>
  );
/* ---------------------------------------------------------    SIDEBAR --------------------------------------------------------- */ function Sidebar({
  active,
  onSelect,
  open,
  setOpen,
}) {
  const [openGroups, setOpenGroups] = useState({
    "User Management": true,
    "Volunteer Management": false,
    "Campaign Management": false,
  });
  const toggleGroup = (label) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  return (
    <aside
      className={`${open ? "w-72" : "w-0 lg:w-20"} transition-all duration-200 bg-indigo-950 text-indigo-100 flex-shrink-0 overflow-y-auto overflow-x-hidden h-screen sticky top-0`}
    >
      {" "}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-indigo-900">
        {" "}
        <div className="w-9 h-9 rounded-md bg-amber-500 flex items-center justify-center font-display font-800 text-indigo-950 flex-shrink-0">
          {" "}
          JS{" "}
        </div>{" "}
        {open && (
          <div className="min-w-0">
            {" "}
            <div className="font-display font-700 text-white text-[15px] leading-tight truncate">
              Jan Sampark
            </div>{" "}
            <div className="text-[11px] text-indigo-400 font-body truncate">
              Campaign Console
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
      <nav className="py-3 px-2 font-body text-[13.5px]">
        {" "}
        {NAV.map((entry, idx) => {
          if (entry.type === "item") {
            const Icon = entry.icon;
            const isActive = active === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => onSelect(entry.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${isActive ? "bg-amber-500 text-indigo-950 font-semibold" : "text-indigo-200 hover:bg-indigo-900"}`}
              >
                {" "}
                <Icon size={17} className="flex-shrink-0" />{" "}
                {open && <span className="truncate">{entry.label}</span>}{" "}
              </button>
            );
          }
          const GroupIcon = entry.icon;
          const isOpen = openGroups[entry.label];
          const hasActiveChild = entry.items.some((i) => i.id === active);
          return (
            <div key={entry.label} className="mb-1">
              {" "}
              <button
                onClick={() => open && toggleGroup(entry.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${hasActiveChild ? "text-amber-400" : "text-indigo-200 hover:bg-indigo-900"}`}
              >
                {" "}
                <GroupIcon size={17} className="flex-shrink-0" />{" "}
                {open && (
                  <span className="flex-1 text-left truncate">
                    {entry.label}
                  </span>
                )}{" "}
                {open &&
                  (isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  ))}{" "}
              </button>{" "}
              {open && isOpen && (
                <div className="ml-4 pl-3 border-l border-indigo-800 mt-1 mb-1">
                  {" "}
                  {entry.items.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md mb-0.5 text-[13px] transition-colors ${isActive ? "bg-amber-500 text-indigo-950 font-semibold" : "text-indigo-300 hover:bg-indigo-900"}`}
                      >
                        {" "}
                        {item.label}{" "}
                      </button>
                    );
                  })}{" "}
                </div>
              )}{" "}
            </div>
          );
        })}{" "}
      </nav>{" "}
    </aside>
  );
}
/* ---------------------------------------------------------    FORM MODAL --------------------------------------------------------- */ function FormModal({
  config,
  initial,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState(() => {
    const base = {};
    config.fields.forEach((f) => {
      base[f.name] = initial
        ? (initial[f.name] ?? "")
        : (f.default ?? (f.type === "checkbox" ? false : ""));
    });
    return base;
  });
  const update = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...(initial || {}), ...form, id: initial ? initial.id : uid() });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm px-4">
      {" "}
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
        {" "}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
          {" "}
          <h3 className="font-display font-700 text-slate-900 text-[16px]">
            {" "}
            {initial ? "Edit" : "Add"} {config.title}{" "}
          </h3>{" "}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            {" "}
            <X size={18} />{" "}
          </button>{" "}
        </div>{" "}
        <form onSubmit={handleSubmit} className="px-6 py-5 font-body">
          {" "}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {" "}
            {config.fields.map((f) => (
              <div
                key={f.name}
                className={f.type === "textarea" ? "sm:col-span-2" : ""}
              >
                {" "}
                <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                  {f.label}
                </label>{" "}
                {f.type === "select" && (
                  <select
                    value={form[f.name]}
                    onChange={(e) => update(f.name, e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {" "}
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt === "" ? "—" : opt}
                      </option>
                    ))}{" "}
                  </select>
                )}{" "}
                {f.type === "textarea" && (
                  <textarea
                    value={form[f.name]}
                    onChange={(e) => update(f.name, e.target.value)}
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                )}{" "}
                {f.type === "checkbox" && (
                  <div className="flex items-center h-[38px]">
                    {" "}
                    <input
                      type="checkbox"
                      checked={!!form[f.name]}
                      onChange={(e) => update(f.name, e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />{" "}
                  </div>
                )}{" "}
                {["text", "number", "date"].includes(f.type) && (
                  <input
                    type={f.type}
                    value={form[f.name]}
                    onChange={(e) => update(f.name, e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                )}{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <div className="flex justify-end gap-2 mt-6">
            {" "}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[13.5px] font-medium text-slate-600 hover:bg-slate-100"
            >
              {" "}
              Cancel{" "}
            </button>{" "}
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-[13.5px] font-semibold bg-amber-500 text-indigo-950 hover:bg-amber-400"
            >
              {" "}
              Save{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
/* ---------------------------------------------------------    GENERIC MODULE PAGE (List + Add/Edit) --------------------------------------------------------- */ function ModulePage({
  moduleId,
  records,
  setRecords,
}) {
  const config = MODULES[moduleId];
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const rows = records[moduleId] || [];
  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      config.columns.some(([key]) =>
        String(r[key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [rows, query, config.columns]);
  const handleSave = (record) => {
    setRecords((prev) => {
      const list = prev[moduleId] || [];
      const exists = list.some((r) => r.id === record.id);
      const updated = exists
        ? list.map((r) => (r.id === record.id ? record : r))
        : [record, ...list];
      return { ...prev, [moduleId]: updated };
    });
    setModalOpen(false);
    setEditing(null);
  };
  const handleDelete = (id) => {
    setRecords((prev) => ({
      ...prev,
      [moduleId]: (prev[moduleId] || []).filter((r) => r.id !== id),
    }));
  };
  const Icon = config.icon;
  return (
    <div className="font-body">
      {" "}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        {" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="w-10 h-10 rounded-lg bg-indigo-950 flex items-center justify-center">
            {" "}
            <Icon size={18} className="text-amber-400" />{" "}
          </div>{" "}
          <div>
            {" "}
            <h2 className="font-display font-700 text-slate-900 text-xl">
              {config.title}
            </h2>{" "}
            <p className="text-[12.5px] text-slate-500">
              {rows.length} records
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center gap-2">
          {" "}
          <div className="relative">
            {" "}
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />{" "}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="pl-8 pr-3 py-2 text-[13px] border border-slate-300 rounded-lg w-44 sm:w-56 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />{" "}
          </div>{" "}
          <button
            onClick={() => {
              setEditing(null);
              setModalOpen(true);
            }}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-semibold text-[13px] px-4 py-2 rounded-lg"
          >
            {" "}
            <Plus size={15} /> Add {config.title}{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {" "}
        <div className="overflow-x-auto">
          {" "}
          <table className="w-full text-[13px]">
            {" "}
            <thead>
              {" "}
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-left">
                {" "}
                {config.columns.map(([key, label]) => (
                  <th
                    key={key}
                    className="px-5 py-3 font-medium whitespace-nowrap"
                  >
                    {label}
                  </th>
                ))}{" "}
                <th className="px-5 py-3 font-medium text-right">
                  Actions
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {filtered.length === 0 && (
                <tr>
                  {" "}
                  <td
                    colSpan={config.columns.length + 1}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    {" "}
                    No records yet. Click "Add {config.title}" to create
                    one.{" "}
                  </td>{" "}
                </tr>
              )}{" "}
              {filtered.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 hover:bg-amber-50/40 ${i % 2 ? "bg-slate-50/40" : ""}`}
                >
                  {" "}
                  {config.columns.map(([key]) => (
                    <td
                      key={key}
                      className="px-5 py-3 text-slate-700 whitespace-nowrap"
                    >
                      {" "}
                      {key === "boothNumber" || key === "booth" ? (
                        row[key] ? (
                          <BoothTag>{row[key]}</BoothTag>
                        ) : (
                          "—"
                        )
                      ) : typeof row[key] === "boolean" ? (
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${row[key] ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}
                        >
                          {" "}
                          {row[key] ? "Yes" : "No"}{" "}
                        </span>
                      ) : (
                        row[key] || <span className="text-slate-300">—</span>
                      )}{" "}
                    </td>
                  ))}{" "}
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    {" "}
                    <button
                      onClick={() => {
                        setEditing(row);
                        setModalOpen(true);
                      }}
                      className="text-slate-400 hover:text-indigo-700 p-1.5 inline-flex"
                    >
                      {" "}
                      <Pencil size={14} />{" "}
                    </button>{" "}
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5 inline-flex"
                    >
                      {" "}
                      <Trash2 size={14} />{" "}
                    </button>{" "}
                  </td>{" "}
                </tr>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
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
      )}{" "}
    </div>
  );
} /* ---------------------------------------------------------
   USER MANAGEMENT — CREATE USER + CONDITIONAL SETUP
--------------------------------------------------------- */
const SUB_ADMIN_MODULES = [
  "Users",
  "Volunteers",
  "Tasks",
  "Booths",
  "Door To Door",
  "Attendance",
  "Voters",
  "Surveys",
  "Events",
  "Reports",
];

const GEO_OPTIONS = [
  {
    id: "booth-45",
    label: "Booth 45",
    path: "Meerut Cantt → Meerut Sadar → Jani Khurd → Booth 45",
  },
  {
    id: "booth-46",
    label: "Booth 46",
    path: "Meerut Cantt → Meerut Sadar → Jani Khurd → Booth 46",
  },
  {
    id: "booth-47",
    label: "Booth 47",
    path: "Meerut Cantt → Meerut Sadar → Jani Khurd → Booth 47",
  },
  {
    id: "booth-60",
    label: "Booth 60",
    path: "Meerut Cantt → Kharkhoda → Bahadurpur → Booth 60",
  },
];

const PERMISSION_GROUPS = {
  TASKS: [
    "task.read",
    "task.create",
    "task.update",
    "task.delete",
    "task.assign",
  ],
  USERS: ["user.read", "user.create", "user.update", "user.delete"],
  VOLUNTEERS: [
    "volunteer.read",
    "volunteer.create",
    "volunteer.update",
    "volunteer.delete",
  ],
};

function SetupStepHeader({ currentStep }) {
  const steps = [
    "User Created",
    "Module Access",
    "Location Assignment",
    "User Permissions",
    "Complete",
  ];
  return (
    <div className="mb-7 overflow-x-auto">
      <div className="flex items-center min-w-[680px]">
        {steps.map((label, index) => {
          const step = index + 1;
          const done = currentStep > step;
          const activeStep = currentStep === step;
          return (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    done || activeStep
                      ? "bg-amber-500 text-indigo-950"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {done ? <Check size={15} /> : step}
                </div>
                <span
                  className={`text-[12px] whitespace-nowrap ${activeStep ? "font-semibold text-indigo-950" : "text-slate-500"}`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px flex-1 mx-3 ${currentStep > step ? "bg-amber-400" : "bg-slate-200"}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

function UserManagementPage({ records, setRecords }) {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [setup, setSetup] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    role: "",
  });
  const [volunteerSetup, setVolunteerSetup] = useState({
    volunteerType: "VOLUNTEER",
    location: "",
  });
  const [modules, setModules] = useState([
    "Users",
    "Volunteers",
    "Tasks",
    "Booths",
    "Door To Door",
    "Attendance",
  ]);
  const [locations, setLocations] = useState([]);
  const [permissions, setPermissions] = useState({});

  const rows = records.users || [];
  const filtered = rows.filter((r) => {
    const q = query.toLowerCase().trim();
    return (
      !q ||
      [r.name, r.phone, r.role, r.volunteerType].some((v) =>
        String(v || "")
          .toLowerCase()
          .includes(q),
      )
    );
  });

  const closeCreate = () => {
    setCreateOpen(false);
    setSetup(null);
    setForm({ name: "", phone: "", password: "", role: "" });
    setVolunteerSetup({ volunteerType: "VOLUNTEER", location: "" });
    setLocations([]);
    setPermissions({});
  };

  const createBaseUser = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.password || !form.role) return;
    const user = {
      id: uid(),
      name: form.name,
      phone: form.phone,
      password: form.password,
      role: form.role,
      status: "ACTIVE",
      email: "",
      volunteerType:
        form.role === "Volunteer" ? volunteerSetup.volunteerType : "",
    };
    setRecords((prev) => ({ ...prev, users: [user, ...(prev.users || [])] }));
    if (form.role === "Sub Admin") {
      setSetup({ userId: user.id, user, step: 1 });
    } else {
      setSetup({ userId: user.id, user, step: "volunteer" });
    }
  };

  const toggleModule = (module) =>
    setModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module],
    );
  const toggleLocation = (id) =>
    setLocations((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const togglePermission = (permission) =>
    setPermissions((prev) => ({ ...prev, [permission]: !prev[permission] }));

  const saveSubAdminSetup = () => {
    if (!setup?.userId) return;
    setRecords((prev) => ({
      ...prev,
      users: (prev.users || []).map((u) =>
        u.id === setup.userId
          ? {
              ...u,
              moduleAccess: modules,
              locations: locations.map(
                (id) => GEO_OPTIONS.find((g) => g.id === id)?.label,
              ),
              permissions: Object.entries(permissions)
                .filter(([, v]) => v)
                .map(([k]) => k),
              setupComplete: true,
            }
          : u,
      ),
      moduleAccess: [
        {
          id: uid(),
          user: form.name,
          modules: modules.join(", "),
          status: "ACTIVE",
        },
        ...(prev.moduleAccess || []),
      ],
      userGeoAssignment: [
        {
          id: uid(),
          user: form.name,
          scope: locations
            .map((id) => GEO_OPTIONS.find((g) => g.id === id)?.path)
            .join(" | "),
          status: "ACTIVE",
        },
        ...(prev.userGeoAssignment || []),
      ],
      userPermissions: [
        {
          id: uid(),
          user: form.name,
          module: "TASKS / USERS / VOLUNTEERS",
          permissions: Object.entries(permissions)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(", "),
        },
        ...(prev.userPermissions || []),
      ],
    }));
    setSetup((prev) => ({ ...prev, step: 5 }));
  };

  const saveVolunteerSetup = () => {
    if (!setup?.userId || !volunteerSetup.location) return;
    setRecords((prev) => ({
      ...prev,
      users: (prev.users || []).map((u) =>
        u.id === setup.userId
          ? {
              ...u,
              volunteerType: volunteerSetup.volunteerType,
              location: volunteerSetup.location,
              setupComplete: true,
            }
          : u,
      ),
      volunteers: [
        {
          id: uid(),
          name: form.name,
          phone: form.phone,
          volunteerType: volunteerSetup.volunteerType,
          address: volunteerSetup.location,
        },
        ...(prev.volunteers || []),
      ],
    }));
    closeCreate();
  };

  if (setup?.step === "volunteer") {
    return (
      <div className="font-body">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-700 text-slate-900 text-xl">
              Volunteer Setup
            </h2>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Complete the volunteer details for {form.name}.
            </p>
          </div>
          <button
            onClick={closeCreate}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                Volunteer Type
              </label>
              <select
                value={volunteerSetup.volunteerType}
                onChange={(e) =>
                  setVolunteerSetup((p) => ({
                    ...p,
                    volunteerType: e.target.value,
                  }))
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px]"
              >
                <option>VOLUNTEER</option>
                <option>TEAM_LEADER</option>
                <option>COORDINATOR</option>
              </select>
            </div>
            <div>
              <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                Location
              </label>
              <select
                value={volunteerSetup.location}
                onChange={(e) =>
                  setVolunteerSetup((p) => ({ ...p, location: e.target.value }))
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px]"
              >
                <option value="">Select Location</option>
                {GEO_OPTIONS.map((g) => (
                  <option key={g.id} value={g.label}>
                    {g.path}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={closeCreate}
              className="px-4 py-2 rounded-lg text-[13px] text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={saveVolunteerSetup}
              disabled={!volunteerSetup.location}
              className="px-4 py-2 rounded-lg bg-amber-500 text-indigo-950 font-semibold text-[13px] disabled:opacity-50"
            >
              Create Volunteer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (setup) {
    const step = setup.step;
    return (
      <div className="font-body">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-700 text-slate-900 text-xl">
              Sub Admin Setup
            </h2>
            <p className="text-[12.5px] text-slate-500 mt-1">
              Configure access, working locations and permissions for{" "}
              {setup.user.name}.
            </p>
          </div>
          <button
            onClick={closeCreate}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        <SetupStepHeader currentStep={step} />
        <div className="bg-white border border-slate-200 rounded-xl p-6 max-w-4xl">
          {step === 1 && (
            <div>
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Check size={21} />
              </div>
              <h3 className="font-display font-700 text-slate-900 text-lg">
                User Created
              </h3>
              <p className="text-[13px] text-slate-500 mt-1">
                {setup.user.name} has been created as a Sub Admin. Continue with
                access configuration.
              </p>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="font-display font-700 text-slate-900 text-lg mb-1">
                Module Access
              </h3>
              <p className="text-[13px] text-slate-500 mb-5">
                Select which modules this Sub Admin can access.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SUB_ADMIN_MODULES.map((module) => (
                  <label
                    key={module}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${modules.includes(module) ? "border-amber-400 bg-amber-50" : "border-slate-200"}`}
                  >
                    <input
                      type="checkbox"
                      checked={modules.includes(module)}
                      onChange={() => toggleModule(module)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <span className="text-[13px] text-slate-700">{module}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="font-display font-700 text-slate-900 text-lg mb-1">
                Location Assignment
              </h3>
              <p className="text-[13px] text-slate-500 mb-5">
                Assign the locations where this Sub Admin can work. Multiple
                locations are allowed.
              </p>
              <div className="border border-slate-200 rounded-lg divide-y">
                {GEO_OPTIONS.map((g) => (
                  <label
                    key={g.id}
                    className="flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={locations.includes(g.id)}
                      onChange={() => toggleLocation(g.id)}
                      className="w-4 h-4 mt-0.5 accent-amber-500"
                    />
                    <div>
                      <div className="text-[13.5px] font-semibold text-slate-800">
                        {g.label}
                      </div>
                      <div className="text-[11.5px] text-slate-500 mt-0.5">
                        {g.path}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="font-display font-700 text-slate-900 text-lg mb-1">
                User Permissions
              </h3>
              <p className="text-[13px] text-slate-500 mb-5">
                Module access decides what the user can access. Permissions
                decide what actions they can perform.
              </p>
              <div className="space-y-4">
                {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
                  <div
                    key={group}
                    className="border border-slate-200 rounded-lg overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-slate-50 font-display font-600 text-[13px] text-slate-800">
                      {group}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                      {perms.map((permission) => (
                        <label
                          key={permission}
                          className="flex items-center gap-2 text-[12.5px] text-slate-700"
                        >
                          <input
                            type="checkbox"
                            checked={!!permissions[permission]}
                            onChange={() => togglePermission(permission)}
                            className="w-4 h-4 accent-amber-500"
                          />
                          {permission}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Check size={27} />
              </div>
              <h3 className="font-display font-700 text-slate-900 text-xl">
                Setup Complete
              </h3>
              <p className="text-[13px] text-slate-500 mt-2">
                {setup.user.name} is ready as a Sub Admin.
              </p>
              <button
                onClick={closeCreate}
                className="mt-6 px-5 py-2.5 rounded-lg bg-amber-500 text-indigo-950 font-semibold text-[13px]"
              >
                Back to Users
              </button>
            </div>
          )}

          {step >= 1 && step < 5 && (
            <div className="flex justify-between mt-7 pt-5 border-t border-slate-100">
              <button
                onClick={() =>
                  setSetup((p) => ({ ...p, step: Math.max(1, p.step - 1) }))
                }
                disabled={step === 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setSetup((p) => ({ ...p, step: p.step + 1 }))}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-indigo-950 font-semibold text-[13px]"
                >
                  Next <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={saveSubAdminSetup}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 text-indigo-950 font-semibold text-[13px]"
                >
                  Complete Setup <Check size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="font-body">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950 flex items-center justify-center">
            <Users size={18} className="text-amber-400" />
          </div>
          <div>
            <h2 className="font-display font-700 text-slate-900 text-xl">
              Users
            </h2>
            <p className="text-[12.5px] text-slate-500">{rows.length} users</p>
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
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users..."
              className="pl-8 pr-3 py-2 text-[13px] border border-slate-300 rounded-lg w-44 sm:w-56"
            />
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-indigo-950 font-semibold text-[13px] px-4 py-2 rounded-lg"
          >
            <Plus size={15} /> Create User
          </button>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-left">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Setup</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No users yet. Click Create User.
                  </td>
                </tr>
              )}
              {filtered.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-slate-100 ${i % 2 ? "bg-slate-50/40" : ""}`}
                >
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {row.name}
                  </td>
                  <td className="px-5 py-3 text-slate-700">{row.phone}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                      {row.role || "—"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {row.setupComplete
                      ? "Complete"
                      : row.role === "Sub Admin"
                        ? "Setup pending"
                        : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {createOpen && !setup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-950/40 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="font-display font-700 text-slate-900">
                  Create User
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-0.5">
                  Create the user first, then complete role-specific setup.
                </p>
              </div>
              <button onClick={closeCreate} className="text-slate-400">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={createBaseUser} className="px-6 py-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                    Phone
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, password: e.target.value }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-slate-600 mb-1">
                    Role
                  </label>
                  <select
                    required
                    value={form.role}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, role: e.target.value }))
                    }
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[13.5px]"
                  >
                    <option value="">Select Role</option>
                    <option value="Sub Admin">Sub Admin</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={closeCreate}
                  className="px-4 py-2 rounded-lg text-[13px] text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 text-indigo-950 font-semibold text-[13px]"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------    DASHBOARD PAGE --------------------------------------------------------- */ function DashboardPage({
  records,
  onSelect,
}) {
  const stats = [
    { id: "voters", label: "Total Voters", icon: Vote },
    { id: "volunteers", label: "Volunteers", icon: UserPlus },
    { id: "booth", label: "Booths Covered", icon: MapPinned },
    { id: "issues", label: "Open Issues", icon: AlertTriangle },
  ];
  return (
    <div className="font-body">
      {" "}
      <div className="mb-7">
        {" "}
        <h2 className="font-display font-800 text-slate-900 text-2xl">
          Namaste, Team 👋
        </h2>{" "}
        <p className="text-slate-500 text-[13.5px] mt-1">
          Yahan se apne poore campaign ka overview dekhein.
        </p>{" "}
      </div>{" "}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {" "}
        {stats.map((s) => {
          const Icon = s.icon;
          const count = (records[s.id] || []).length;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="bg-white border border-slate-200 rounded-xl p-5 text-left hover:border-amber-400 hover:shadow-md transition-all"
            >
              {" "}
              <div className="w-9 h-9 rounded-lg bg-indigo-950 flex items-center justify-center mb-3">
                {" "}
                <Icon size={16} className="text-amber-400" />{" "}
              </div>{" "}
              <div className="font-display font-800 text-2xl text-slate-900">
                {count}
              </div>{" "}
              <div className="text-[12.5px] text-slate-500 mt-0.5">
                {s.label}
              </div>{" "}
            </button>
          );
        })}{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {" "}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          {" "}
          <h3 className="font-display font-700 text-slate-900 text-[15px] mb-4">
            Recent Booth Assignments
          </h3>{" "}
          <div className="space-y-3">
            {" "}
            {(records.assignment || []).slice(0, 4).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between text-[13px] border-b border-slate-100 pb-2 last:border-0"
              >
                {" "}
                <span className="text-slate-700">{r.user}</span>{" "}
                <BoothTag>{r.booth}</BoothTag>{" "}
              </div>
            ))}{" "}
            {(records.assignment || []).length === 0 && (
              <p className="text-slate-400 text-[13px]">No assignments yet.</p>
            )}{" "}
          </div>{" "}
        </div>{" "}
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          {" "}
          <h3 className="font-display font-700 text-slate-900 text-[15px] mb-4">
            Open Issues by Priority
          </h3>{" "}
          <div className="space-y-3">
            {" "}
            {(records.issues || []).slice(0, 4).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between text-[13px] border-b border-slate-100 pb-2 last:border-0"
              >
                {" "}
                <span className="text-slate-700">
                  {r.voter} — {r.category}
                </span>{" "}
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.priority === "CRITICAL" || r.priority === "HIGH" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}
                >
                  {r.priority}
                </span>{" "}
              </div>
            ))}{" "}
            {(records.issues || []).length === 0 && (
              <p className="text-slate-400 text-[13px]">
                No issues logged yet.
              </p>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
/* ---------------------------------------------------------    APP ROOT --------------------------------------------------------- */ export default function Code() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [records, setRecords] = useState(() => {
    const init = {};
    Object.entries(MODULES).forEach(([key, cfg]) => {
      init[key] = cfg.seed;
    });
    return init;
  });
  const activeLabel = useMemo(() => {
    if (active === "dashboard") return "Dashboard";
    for (const entry of NAV) {
      if (entry.type === "item" && entry.id === active) return entry.label;
      if (entry.type === "group") {
        const found = entry.items.find((i) => i.id === active);
        if (found) return `${entry.label} / ${found.label}`;
      }
    }
    return "";
  }, [active]);
  return (
    <div className="flex min-h-screen bg-slate-50">
      {" "}
      <FontStyle />{" "}
      <Sidebar
        active={active}
        onSelect={setActive}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />{" "}
      <div className="flex-1 min-w-0">
        {" "}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="text-slate-500 hover:text-slate-900"
            >
              {" "}
              <Menu size={19} />{" "}
            </button>{" "}
            <div className="font-display font-600 text-slate-800 text-[14px]">
              {activeLabel}
            </div>{" "}
          </div>{" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="w-8 h-8 rounded-full bg-indigo-950 text-amber-400 flex items-center justify-center font-display font-700 text-[12px]">
              {" "}
              RC{" "}
            </div>{" "}
          </div>{" "}
        </header>{" "}
        <main className="p-5 sm:p-7">
          {" "}
          {active === "dashboard" ? (
            <DashboardPage records={records} onSelect={setActive} />
          ) : active === "users" ? (
            <UserManagementPage records={records} setRecords={setRecords} />
          ) : (
            <ModulePage
              moduleId={active}
              records={records}
              setRecords={setRecords}
            />
          )}{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
}
