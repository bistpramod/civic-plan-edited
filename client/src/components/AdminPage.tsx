import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { projects as mockProjects } from "@/data/mockData";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import {
  Users,
  FolderKanban,
  Plus,
  Edit,
  Trash2,
  Power,
  AlertCircle,
  Search,
  X,
  CheckCircle,
  Clock,
  XCircle,
  MapPin,
  Calendar,
  DollarSign,
  User as UserIcon,
  Building2,
} from "lucide-react";

// Mock Data
const initialProjects = [
  {
    id: "1",
    title: "Ring Road Expansion Project",
    description: "Widening of the main ring road to reduce traffic congestion",
    category: "Transportation",
    location: "Kathmandu",
    budget: 5000000,
    startDate: "2024-01-15",
    endDate: "2025-12-31",
    status: "ongoing",
    contractor: "Nepal Construction Ltd.",
    progress: 45,
  },
  {
    id: "2",
    title: "Water Supply Network Upgrade",
    description: "Modernization of water distribution system",
    category: "Water",
    location: "Patan",
    budget: 3500000,
    startDate: "2023-06-01",
    endDate: "2024-08-31",
    status: "completed",
    contractor: "Aqua Solutions Nepal",
    progress: 100,
  },
  {
    id: "3",
    title: "Solar Street Light Installation",
    description: "Installation of solar-powered street lights across the city",
    category: "Electricity",
    location: "Bhaktapur",
    budget: 1200000,
    startDate: "2024-03-01",
    endDate: "2024-09-30",
    status: "halted",
    contractor: "Green Energy Nepal",
    progress: 30,
  },
];

const initialUsers = [
  {
    id: "1",
    name: "Ram Sharma",
    email: "ram.sharma@example.com",
    role: "Citizen",
    location: "Kathmandu",
    joinedDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sita Thapa",
    email: "sita.thapa@example.com",
    role: "Admin",
    location: "Patan",
    joinedDate: "2023-11-20",
    status: "active",
  },
  {
    id: "3",
    name: "Hari Basnet",
    email: "hari.basnet@example.com",
    role: "Citizen",
    location: "Bhaktapur",
    joinedDate: "2024-02-10",
    status: "inactive",
  },
  {
    id: "4",
    name: "Gita Rai",
    email: "gita.rai@example.com",
    role: "Moderator",
    location: "Pokhara",
    joinedDate: "2023-12-05",
    status: "active",
  },
];

const categories = [
  "Transportation",
  "Water",
  "Electricity",
  "Road",
  "Healthcare",
  "Education",
  "Sanitation",
];
const locations = [
  "Kathmandu",
  "Patan",
  "Bhaktapur",
  "Pokhara",
  "Biratnagar",
  "Lalitpur",
];

const SearchBar = ({ searchQuery, onSearchChange, selectedLocation, onLocationChange }: any) => {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search projects..."
        className="w-full pl-4 pr-4 py-2.5 bg-secondary border border-input rounded-lg"
      />
      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
        className="px-4 py-2 bg-background border border-input rounded-lg"
      >
        <option>All Locations</option>
        {locations.map((loc) => (
          <option key={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
};

const AdminPanel = () => { 
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "Transportation",
    location: "Kathmandu",
    budget: "",
    startDate: "",
    endDate: "",
    contractor: "",
    status: "ongoing",
    progress: 0,
  });

  // User Form State
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Citizen",
    location: "Kathmandu",
    status: "active",
  });

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      category: "Transportation",
      location: "Kathmandu",
      budget: "",
      startDate: "",
      endDate: "",
      contractor: "",
      status: "ongoing",
      progress: 0,
    });
    setEditingProject(null);
  };

  const resetUserForm = () => {
    setUserForm({
      name: "",
      email: "",
      role: "Citizen",
      location: "Kathmandu",
      status: "active",
    });
    setEditingUser(null);
  };

  const handleCreateProject = () => {
    if (!projectForm.title || !projectForm.budget) {
      alert("Please fill in all required fields");
      return;
    }

    const newProject = {
      ...projectForm,
      id: Date.now().toString(),
      budget: parseFloat(projectForm.budget),
      progress: parseInt(projectForm.progress.toString()),
    };

    setProjects([...projects, newProject]);
    setShowProjectModal(false);
    resetProjectForm();
  };

  const handleUpdateProject = () => {
    setProjects(
      projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...projectForm,
              id: p.id,
              budget: parseFloat(projectForm.budget),
              progress: parseInt(projectForm.progress.toString()),
            }
          : p
      )
    );
    setShowProjectModal(false);
    resetProjectForm();
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      budget: project.budget.toString(),
      progress: project.progress.toString(),
    });
    setShowProjectModal(true);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleCreateUser = () => {
    if (!userForm.name || !userForm.email) {
      alert("Please fill in all required fields");
      return;
    }

    const newUser = {
      ...userForm,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setUsers([...users, newUser]);
    setShowUserModal(false);
    resetUserForm();
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((u) =>
        u.id === editingUser.id
          ? { ...userForm, id: u.id, joinedDate: u.joinedDate }
          : u
      )
    );
    setShowUserModal(false);
    resetUserForm();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      status: user.status,
    });
    setShowUserModal(true);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const filteredStateProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Local project search/filter state (used only in Projects tab)
  const navigate = useNavigate();
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [selectedLocationFilter, setSelectedLocationFilter] = useState("All Locations");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(projectSearchQuery.toLowerCase());
    const matchesLocation =
      selectedLocationFilter === "All Locations" ||
      project.location.toLowerCase().includes(selectedLocationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "ongoing":
        return "bg-blue-100 text-blue-700";
      case "halted":
        return "bg-amber-100 text-amber-700";
      case "planned":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "ongoing":
        return <Clock className="w-4 h-4" />;
      case "halted":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel - Civic Plan Nepal</title>
        <meta
          name="description"
          content="Administrative dashboard for managing projects and users in Nepal's e-governance system"
        />
      </Helmet>

      <div className="min-h-screen bg-background">


        {/* Navigation Tabs */}
        <div className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                  activeTab === "projects"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FolderKanban className="w-5 h-5" />
                Manage Projects
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                  activeTab === "users"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-5 h-5" />
                Manage Users
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Search and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="search"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              onClick={() =>
                activeTab === "projects"
                  ? setShowProjectModal(true)
                  : setShowUserModal(true)
              }
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add {activeTab === "projects" ? "Project" : "User"}
            </button>
          </div>

          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <header className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Civic Projects</h3>
                  <p className="text-muted-foreground">Track government infrastructure projects in your area</p>
                </header>

                {/* Search & Filter (local to projects) */}
                <SearchBar
                  searchQuery={projectSearchQuery}
                  onSearchChange={setProjectSearchQuery}
                  selectedLocation={selectedLocationFilter}
                  onLocationChange={setSelectedLocationFilter}
                />

                {/* Projects List */}
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => navigate(`/admin/projects/${project.id}/view`)}
                    />
                  ))}

                  {filteredProjects.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No projects found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )} 

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="civic-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-secondary/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === "Admin"
                                ? "bg-tohers-100 text-tohers-700"
                                : user.role === "Moderator"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {user.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {user.joinedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Power className="w-3 h-3" />
                            {user.status === "active" ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No users found</p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  {editingProject ? "Edit Project" : "Create New Project"}
                </h2>
                <button
                  onClick={() => {
                    setShowProjectModal(false);
                    resetProjectForm();
                  }}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter project description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Category
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Location
                    </label>
                    <select
                      value={projectForm.location}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          location: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Budget (NPR) *
                  </label>
                  <input
                    type="number"
                    value={projectForm.budget}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, budget: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter budget amount"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Contractor
                  </label>
                  <input
                    type="text"
                    value={projectForm.contractor}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        contractor: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter contractor name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Status
                    </label>
                    <select
                      value={projectForm.status}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="planned">Planned</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="halted">Halted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Progress (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={projectForm.progress}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          progress: Math.min(
                            100,
                            Math.max(0, Number(e.target.value))
                          ),
                        })
                      }
                      className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowProjectModal(false);
                      resetProjectForm();
                    }}
                    className="px-4 py-2 text-muted-foreground hover:bg-secondary rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={
                      editingProject ? handleUpdateProject : handleCreateProject
                    }
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
                  >
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl max-w-xl w-full">
              <div className="border-b border-border px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editingUser ? "Edit User" : "Create User"}
                </h2>
                <button
                  onClick={() => {
                    setShowUserModal(false);
                    resetUserForm();
                  }}
                  className="p-2 hover:bg-secondary rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <input
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Role
                    </label>
                    <select
                      value={userForm.role}
                      onChange={(e) =>
                        setUserForm({ ...userForm, role: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option>Citizen</option>
                      <option>Moderator</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <select
                      value={userForm.location}
                      onChange={(e) =>
                        setUserForm({ ...userForm, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      {locations.map((loc) => (
                        <option key={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={userForm.status}
                    onChange={(e) =>
                      setUserForm({ ...userForm, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowUserModal(false);
                      resetUserForm();
                    }}
                    className="px-4 py-2 text-muted-foreground hover:bg-secondary rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingUser ? handleUpdateUser : handleCreateUser}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                  >
                    {editingUser ? "Update User" : "Create User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
