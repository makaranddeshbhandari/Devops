import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { getRoleTitle } from '@/types';
import {
  LayoutDashboard, Map, BookOpen, Gamepad2, User, Briefcase, Route,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/practice', label: 'Practice', icon: Gamepad2 },
  { path: '/career-paths', label: 'Career Paths', icon: Route },
  { path: '/company', label: 'Company Mode', icon: Briefcase },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <>{children}</>;

  const role = getRoleTitle(user.completedTopics.length);
  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 fixed h-full z-30">
        <div className="p-6 border-b border-border">
          <Link to="/dashboard" className="text-xl font-heading font-bold text-gradient">DevPath Academy</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                  ? 'bg-primary/10 text-primary shadow-glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {location.pathname === item.path && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.fullName}</p>
              <p className="text-xs text-primary">{role.title}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-card border-r border-border animate-fade-in flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <span className="font-heading font-bold text-gradient">DevPath Academy</span>
              <button onClick={() => setSidebarOpen(false)} className="text-muted-foreground"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                    location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground"><Menu className="w-6 h-6" /></button>
          <span className="font-heading font-bold text-gradient text-lg">DevPath</span>
          <Link to="/profile">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xs">{initials}</div>
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card/90 backdrop-blur-md border-t border-border px-2 py-2 flex justify-around">
        {navItems.slice(0, 5).map(item => (
          <Link key={item.path} to={item.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs transition ${
              location.pathname === item.path || location.pathname.startsWith(item.path + '/') ? 'text-primary' : 'text-muted-foreground'
            }`}>
            <item.icon className="w-5 h-5" />
            <span className="truncate max-w-[60px]">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
