import { projects as initialProjects, Project, ProjectUpdate } from '@/data/mockData';

const STORAGE_KEY = 'civic_projects_v1';

function load(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Project[];
  } catch (e) {
    // ignore
  }
  // deep clone initialProjects so mutations don't affect module state
  return JSON.parse(JSON.stringify(initialProjects)) as Project[];
}

function save(projects: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    // ignore
  }
}

export function getProjects(): Project[] {
  return load();
}

export function getProject(id: string): Project | undefined {
  return load().find((p) => p.id === id);
}

export function updateProject(updated: Project): void {
  const projects = load();
  const idx = projects.findIndex((p) => p.id === updated.id);
  if (idx !== -1) {
    projects[idx] = updated;
    save(projects);
  }
}

export function markCompleted(id: string): void {
  const projects = load();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    projects[idx].status = 'completed';
    projects[idx].progress = 100;
    save(projects);
  }
}

export function addUpdate(id: string, update: ProjectUpdate): void {
  const projects = load();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    if (!projects[idx].updates) projects[idx].updates = [];
    projects[idx].updates.unshift(update);
    save(projects);
  }
}
