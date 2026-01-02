// Mock data for Civic Plan - Nepal e-Governance

export type ProjectStatus = 'completed' | 'ongoing' | 'delayed' | 'planned';
export type ProjectCategory = 'electricity' | 'water' | 'roads' | 'health' | 'education';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  location: string;
  ward: number;
  contractor: string;
  milestones: Milestone[];
  updates: ProjectUpdate[];
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  description: string;
  type: 'progress' | 'issue' | 'milestone';
}

export interface LocalBody {
  id: string;
  name: string;
  type: 'municipality' | 'rural-municipality' | 'metropolitan';
  district: string;
  province: string;
  totalProjects: number;
  completedProjects: number;
  totalBudget: number;
}

export interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
}

// Categories with their display info
export const categories: { id: ProjectCategory; label: string; icon: string; color: string }[] = [
  { id: 'electricity', label: 'Electricity', icon: 'Zap', color: 'text-amber-500' },
  { id: 'water', label: 'Water Supply', icon: 'Droplets', color: 'text-blue-500' },
  { id: 'roads', label: 'Roads', icon: 'Route', color: 'text-slate-600' },
  { id: 'health', label: 'Health', icon: 'Heart', color: 'text-red-500' },
  { id: 'education', label: 'Education', icon: 'GraduationCap', color: 'text-emerald-500' },
];

// Locations
export const locations = [
  { id: 'ktm', name: 'Kathmandu', short: 'KTM' },
  { id: 'ptn', name: 'Patan', short: 'PTN' },
  { id: 'bkt', name: 'Bhaktapur', short: 'BKT' },
  { id: 'pkr', name: 'Pokhara', short: 'PKR' },
  { id: 'brt', name: 'Biratnagar', short: 'BRT' },
];

// Dashboard stats
export const dashboardStats: StatCard[] = [
  {
    id: 'total-projects',
    title: 'Total Projects',
    value: 186,
    change: 12,
    changeLabel: 'this month',
    icon: 'Folder',
  },
  {
    id: 'ongoing',
    title: 'Ongoing Projects',
    value: 47,
    change: -3,
    changeLabel: 'from last month',
    icon: 'Clock',
  },
  {
    id: 'completed',
    title: 'Completed',
    value: 124,
    change: 8,
    changeLabel: 'this quarter',
    icon: 'CheckCircle',
  },
  {
    id: 'total-budget',
    title: 'Total Budget',
    value: '₹ 45.2 Cr',
    change: 15,
    changeLabel: 'YoY increase',
    icon: 'Wallet',
  },
];

// Mock projects
export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'Ratnapark Electricity Grid Upgrade',
    description: 'Complete overhaul of the electrical infrastructure in Ratnapark area including underground cabling and smart meter installation for 2000+ households.',
    category: 'electricity',
    status: 'ongoing',
    progress: 75,
    budget: 12500000,
    spent: 9375000,
    startDate: '2025-01-10',
    endDate: '2025-06-30',
    location: 'Kathmandu',
    ward: 24,
    contractor: 'Nepal Electricity Authority',
    milestones: [
      { id: 'm1', title: 'Site Survey Complete', completed: true, date: '2025-01-15' },
      { id: 'm2', title: 'Cable Laying Started', completed: true, date: '2025-02-01' },
      { id: 'm3', title: '50% Households Connected', completed: true, date: '2025-03-15' },
      { id: 'm4', title: 'Smart Meters Installation', completed: false, date: '2025-05-01' },
      { id: 'm5', title: 'Project Completion', completed: false, date: '2025-06-30' },
    ],
    updates: [
      { id: 'u1', date: '2025-01-02', description: '500 additional households connected this week', type: 'progress' },
      { id: 'u2', date: '2024-12-28', description: 'Minor delay due to weather conditions', type: 'issue' },
    ],
  },
  {
    id: 'proj-002',
    title: 'Thamel Water Pipeline Renovation',
    description: 'Replacement of aging water pipelines in Thamel tourist district with modern corrosion-resistant materials.',
    category: 'water',
    status: 'ongoing',
    progress: 45,
    budget: 8500000,
    spent: 3825000,
    startDate: '2025-02-01',
    endDate: '2025-08-15',
    location: 'Kathmandu',
    ward: 26,
    contractor: 'Kathmandu Upatyaka Khanepani Ltd',
    milestones: [
      { id: 'm1', title: 'Old Pipeline Mapping', completed: true, date: '2025-02-10' },
      { id: 'm2', title: 'Phase 1 Replacement', completed: true, date: '2025-03-20' },
      { id: 'm3', title: 'Phase 2 Replacement', completed: false, date: '2025-05-15' },
      { id: 'm4', title: 'Quality Testing', completed: false, date: '2025-07-30' },
    ],
    updates: [
      { id: 'u1', date: '2025-01-01', description: 'Phase 1 completed ahead of schedule', type: 'milestone' },
    ],
  },
  {
    id: 'proj-003',
    title: 'Balaju Ring Road Section Repair',
    description: 'Major road repair and widening project for the Balaju section of Ring Road including new drainage systems.',
    category: 'roads',
    status: 'delayed',
    progress: 30,
    budget: 25000000,
    spent: 7500000,
    startDate: '2024-11-01',
    endDate: '2025-05-31',
    location: 'Kathmandu',
    ward: 16,
    contractor: 'Pappu Construction Pvt Ltd',
    milestones: [
      { id: 'm1', title: 'Initial Survey', completed: true, date: '2024-11-15' },
      { id: 'm2', title: 'Drainage Installation', completed: false, date: '2025-01-30' },
      { id: 'm3', title: 'Base Layer Complete', completed: false, date: '2025-03-15' },
      { id: 'm4', title: 'Final Asphalting', completed: false, date: '2025-05-31' },
    ],
    updates: [
      { id: 'u1', date: '2024-12-20', description: 'Project delayed due to land acquisition issues', type: 'issue' },
      { id: 'u2', date: '2024-12-15', description: 'Drainage work paused pending approvals', type: 'issue' },
    ],
  },
  {
    id: 'proj-004',
    title: 'Patan Durbar Square Street Lighting',
    description: 'Installation of heritage-compatible LED street lights around Patan Durbar Square UNESCO World Heritage site.',
    category: 'electricity',
    status: 'completed',
    progress: 100,
    budget: 3500000,
    spent: 3200000,
    startDate: '2024-08-01',
    endDate: '2024-12-15',
    location: 'Patan',
    ward: 15,
    contractor: 'Heritage Light Solutions',
    milestones: [
      { id: 'm1', title: 'Design Approval', completed: true, date: '2024-08-15' },
      { id: 'm2', title: 'Pole Installation', completed: true, date: '2024-10-01' },
      { id: 'm3', title: 'Wiring Complete', completed: true, date: '2024-11-15' },
      { id: 'm4', title: 'Final Commissioning', completed: true, date: '2024-12-15' },
    ],
    updates: [
      { id: 'u1', date: '2024-12-15', description: 'Project successfully completed under budget', type: 'milestone' },
    ],
  },
  {
    id: 'proj-005',
    title: 'Bhaktapur Water Treatment Plant',
    description: 'Construction of new water treatment facility to serve 50,000 residents with clean drinking water.',
    category: 'water',
    status: 'ongoing',
    progress: 60,
    budget: 45000000,
    spent: 27000000,
    startDate: '2024-06-01',
    endDate: '2025-12-31',
    location: 'Bhaktapur',
    ward: 8,
    contractor: 'Clean Water Nepal',
    milestones: [
      { id: 'm1', title: 'Land Acquisition', completed: true, date: '2024-06-30' },
      { id: 'm2', title: 'Foundation Work', completed: true, date: '2024-09-15' },
      { id: 'm3', title: 'Tank Construction', completed: true, date: '2024-12-01' },
      { id: 'm4', title: 'Equipment Installation', completed: false, date: '2025-06-30' },
      { id: 'm5', title: 'Testing & Commissioning', completed: false, date: '2025-12-31' },
    ],
    updates: [
      { id: 'u1', date: '2024-12-01', description: 'Tank construction completed successfully', type: 'milestone' },
    ],
  },
  {
    id: 'proj-006',
    title: 'Pokhara Lakeside Road Beautification',
    description: 'Complete beautification of Lakeside road including pedestrian walkways, cycle lanes, and landscaping.',
    category: 'roads',
    status: 'planned',
    progress: 0,
    budget: 35000000,
    spent: 0,
    startDate: '2025-03-01',
    endDate: '2026-02-28',
    location: 'Pokhara',
    ward: 6,
    contractor: 'TBD',
    milestones: [
      { id: 'm1', title: 'Tender Process', completed: false, date: '2025-02-15' },
      { id: 'm2', title: 'Contractor Selection', completed: false, date: '2025-03-01' },
      { id: 'm3', title: 'Phase 1 Work', completed: false, date: '2025-08-31' },
      { id: 'm4', title: 'Project Completion', completed: false, date: '2026-02-28' },
    ],
    updates: [],
  },
  {
    id: 'proj-007',
    title: 'New Baneshwor Health Post Construction',
    description: 'Construction of a modern health post with emergency services and maternal care facilities.',
    category: 'health',
    status: 'ongoing',
    progress: 55,
    budget: 18000000,
    spent: 9900000,
    startDate: '2024-09-01',
    endDate: '2025-06-30',
    location: 'Kathmandu',
    ward: 10,
    contractor: 'Himalayan Builders',
    milestones: [
      { id: 'm1', title: 'Foundation Complete', completed: true, date: '2024-10-15' },
      { id: 'm2', title: 'Structure Work', completed: true, date: '2024-12-20' },
      { id: 'm3', title: 'Interior & Equipment', completed: false, date: '2025-04-30' },
      { id: 'm4', title: 'Inauguration', completed: false, date: '2025-06-30' },
    ],
    updates: [
      { id: 'u1', date: '2024-12-20', description: 'Building structure completed', type: 'milestone' },
    ],
  },
  {
    id: 'proj-008',
    title: 'Kirtipur Community School Renovation',
    description: 'Complete renovation of existing school building including earthquake retrofitting and modern facilities.',
    category: 'education',
    status: 'completed',
    progress: 100,
    budget: 12000000,
    spent: 11800000,
    startDate: '2024-04-01',
    endDate: '2024-11-30',
    location: 'Kathmandu',
    ward: 2,
    contractor: 'EduBuild Nepal',
    milestones: [
      { id: 'm1', title: 'Structural Assessment', completed: true, date: '2024-04-15' },
      { id: 'm2', title: 'Retrofitting Work', completed: true, date: '2024-07-30' },
      { id: 'm3', title: 'Interior Renovation', completed: true, date: '2024-10-15' },
      { id: 'm4', title: 'Final Handover', completed: true, date: '2024-11-30' },
    ],
    updates: [
      { id: 'u1', date: '2024-11-30', description: 'School handed over to management committee', type: 'milestone' },
    ],
  },
];

// Local bodies data
export const localBodies: LocalBody[] = [
  {
    id: 'ktm-metro',
    name: 'Kathmandu Metropolitan City',
    type: 'metropolitan',
    district: 'Kathmandu',
    province: 'Bagmati',
    totalProjects: 86,
    completedProjects: 52,
    totalBudget: 150000000,
  },
  {
    id: 'lalitpur-metro',
    name: 'Lalitpur Metropolitan City',
    type: 'metropolitan',
    district: 'Lalitpur',
    province: 'Bagmati',
    totalProjects: 45,
    completedProjects: 28,
    totalBudget: 85000000,
  },
  {
    id: 'bhaktapur-muni',
    name: 'Bhaktapur Municipality',
    type: 'municipality',
    district: 'Bhaktapur',
    province: 'Bagmati',
    totalProjects: 32,
    completedProjects: 24,
    totalBudget: 45000000,
  },
  {
    id: 'pokhara-metro',
    name: 'Pokhara Metropolitan City',
    type: 'metropolitan',
    district: 'Kaski',
    province: 'Gandaki',
    totalProjects: 23,
    completedProjects: 12,
    totalBudget: 65000000,
  },
];

// Format currency in Nepali style
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹ ${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) {
    return `₹ ${(amount / 100000).toFixed(1)} L`;
  }
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Get status color class
export const getStatusColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'completed':
      return 'civic-badge-complete';
    case 'ongoing':
      return 'civic-badge-ongoing';
    case 'delayed':
      return 'civic-badge-delayed';
    case 'planned':
      return 'civic-badge-planned';
    default:
      return 'civic-badge-planned';
  }
};

// Get progress bar color
export const getProgressColor = (status: ProjectStatus): string => {
  switch (status) {
    case 'completed':
      return 'bg-progress-complete';
    case 'ongoing':
      return 'bg-progress-ongoing';
    case 'delayed':
      return 'bg-progress-delayed';
    case 'planned':
      return 'bg-progress-planned';
    default:
      return 'bg-progress-planned';
  }
};
