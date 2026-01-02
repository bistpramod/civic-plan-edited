import AdminLayout from '@/components/layout/AdminLayout';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProject, updateProject, markCompleted, addUpdate } from '@/lib/projectStore';
import { formatCurrency, formatDate, getStatusColor, getProgressColor, categories } from '@/data/mockData';
import { CheckCircle, Circle, AlertTriangle, TrendingUp, ArrowLeft, MapPin, User, Calendar, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [newUpdate, setNewUpdate] = useState('');

  useEffect(() => {
    if (!id) return;
    const p = getProject(id);
    if (!p) return;
    setProject(p);
    setForm({ ...p });
  }, [id]);

  if (!project) {
    return (
      <AdminLayout>
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <div className="mt-6">
            <Link to="/admin/projects" className="btn">
              Back to admin projects
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const sortedMilestones = [...project.milestones].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const sortedUpdates = [...(project.updates ?? [])].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  function handleSave() {
    const updated = { ...form };
    updateProject(updated);
    setProject(updated);
    setEditing(false);
  }

  function handleMarkCompleted() {
    markCompleted(project.id);
    const updated = { ...project, status: 'completed', progress: 100 };
    setProject(updated);
  }

  function toggleMilestone(id: string) {
    const updated = { ...project };
    updated.milestones = updated.milestones.map((m: any) => (m.id === id ? { ...m, completed: !m.completed } : m));
    const completedCount = updated.milestones.filter((m: any) => m.completed).length;
    updated.progress = Math.round((completedCount / updated.milestones.length) * 100);
    if (completedCount === updated.milestones.length) {
      updated.status = 'completed';
    } else if (updated.status === 'completed') {
      updated.status = 'ongoing';
    }
    updateProject(updated);
    setProject(updated);
    setForm(updated);
  }

  function handleAddUpdate() {
    if (!newUpdate.trim()) return;
    const update = {
      id: 'u' + Date.now(),
      date: new Date().toISOString(),
      description: newUpdate.trim(),
      type: 'progress',
    } as any;
    addUpdate(project.id, update);
    setProject((prev: any) => ({ ...prev, updates: [update, ...(prev.updates ?? [])] }));
    setNewUpdate('');
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold">{project.title}</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm capitalize inline-block mb-3 border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditing((s) => !s)}
                    className="px-3 py-2 bg-secondary rounded-md hover:bg-secondary/90"
                  >
                    {editing ? 'Cancel' : 'Update project'}
                  </button>
                  <button
                    onClick={handleMarkCompleted}
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>

              {!editing ? (
                <>
                  <h2 className="text-2xl font-bold mt-2">{project.title}</h2>
                  <p className="text-gray-600 mt-3">{project.description}</p>
                </>
              ) : (
                <div className="space-y-3 mt-3">
                  <input className="w-full p-2 border rounded" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <textarea className="w-full p-2 border rounded" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded" value={form.contractor} onChange={(e) => setForm({ ...form, contractor: e.target.value })} />
                    <input className="w-full p-2 border rounded" value={form.budget} onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                    <input className="w-full p-2 border rounded" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" min={0} max={100} className="w-24 p-2 border rounded" value={form.progress} onChange={(e) => setForm({ ...form, progress: Number(e.target.value) })} />
                    <select className="p-2 border rounded" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <option value="ongoing">ongoing</option>
                      <option value="halted">halted</option>
                      <option value="planned">planned</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                  <div>
                    <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">Save</button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Location</span>
              </div>
              <p className="font-semibold text-lg text-gray-900">{project.location}</p>
              <p className="text-sm text-gray-500 mt-1">Ward {project.ward}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <User className="w-4 h-4" />
                <span className="font-medium">Contractor</span>
              </div>
              <p className="font-semibold text-lg text-gray-900 line-clamp-2">{project.contractor}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Timeline</span>
              </div>
              <p className="font-semibold text-lg text-gray-900">{formatDate(project.startDate)}</p>
              <p className="text-sm text-gray-500 mt-1">to {formatDate(project.endDate)}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <Wallet className="w-4 h-4" />
                <span className="font-medium">Budget</span>
              </div>
              <p className="font-semibold text-lg text-gray-900">{formatCurrency(project.budget)}</p>
              <p className="text-sm text-gray-500 mt-1">Spent: {formatCurrency(project.spent)}</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-gray-500" />
              <span className="font-semibold text-lg text-gray-900">Overall Progress</span>
            </div>
            <div className="flex items-center gap-6 w-2/3 ml-6">
              <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                <div className={`h-3 rounded-full bg-primary transition-all duration-500`} style={{ width: `${project.progress}%` }} />
              </div>
              <div className="text-3xl font-bold text-primary">{project.progress}%</div>
            </div>
          </div>

          {/* Milestones */}
          <div className="mt-6">
            <h3 className="font-bold mb-4 text-xl">Milestones ({project.milestones.filter((m:any)=>m.completed).length}/{project.milestones.length})</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {sortedMilestones.map((milestone:any) => (
                <div
                  key={milestone.id}
                  className={`flex items-start gap-4 p-6 rounded-xl border-2 ${
                    milestone.completed
                      ? 'bg-green-50 border-green-300 shadow-sm'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <button onClick={() => toggleMilestone(milestone.id)} className="mt-1">
                    {milestone.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 shrink-0 mt-1" />
                    )}
                  </button>

                  <div className="flex-1">
                    <p className={`font-semibold text-base leading-tight ${milestone.completed ? 'text-green-700' : 'text-gray-900'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{formatDate(milestone.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold mb-4 text-xl">Current Post</h3>
            <div className="p-4 border rounded mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{sortedUpdates[0]?.description ?? 'No recent posts'}</p>
                  <p className="text-xs text-muted-foreground mt-2">{sortedUpdates[0] ? formatDate(sortedUpdates[0].date) : ''}</p>
                </div>
                <div>
                  <button className="px-3 py-1 border rounded">Comments</button>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <textarea className="w-full p-3 border rounded" placeholder="Write an update..." value={newUpdate} onChange={(e) => setNewUpdate(e.target.value)} />
              <div className="flex justify-end mt-2">
                <button onClick={handleAddUpdate} className="px-4 py-2 bg-primary text-white rounded">Post</button>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-xl">Previous Posts</h3>
              {sortedUpdates.length === 0 && <div className="text-muted-foreground">No posts yet.</div>}
              <div className="space-y-4">
                {sortedUpdates.map((upd: any) => (
                  <div key={upd.id} className="p-4 border rounded">
                    <div className="text-xs text-muted-foreground">{formatDate(upd.date)}</div>
                    <div className="mt-2">{upd.description}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjectDetailPage;
