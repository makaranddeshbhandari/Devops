import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { companyTickets } from '@/data/tasks';
import { Briefcase, AlertCircle } from 'lucide-react';

const CompanySimulation = () => {
  const { user, completeTask } = useApp();
  const [solutions, setSolutions] = useState<Record<string, string>>({});
  if (!user) return null;

  const availableTickets = companyTickets.filter(t => user.completedTopics.length >= t.requiredLevel);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Company Mode</h1>
          <p className="text-sm text-muted-foreground">Currently working at <span className="text-primary font-medium">{user.company}</span></p>
        </div>
      </div>

      {availableTickets.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-foreground font-medium">No tickets available yet</p>
          <p className="text-sm text-muted-foreground mt-1">Complete more topics to unlock company simulation tasks.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {availableTickets.map(ticket => {
            const isDone = user.completedTasks.includes(`company-${ticket.id}`);
            return (
              <div key={ticket.id} className={`glass-card p-6 ${isDone ? 'border-[hsl(var(--success))/0.3]' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">{ticket.id}</span>
                    <h3 className="font-heading font-semibold text-foreground">{ticket.title}</h3>
                  </div>
                  <span className={`badge-pill ${
                    ticket.priority === 'Critical' ? 'bg-destructive/10 text-destructive border-destructive/30'
                    : ticket.priority === 'High' ? 'bg-[hsl(var(--warning)/0.1)] text-warning border-[hsl(var(--warning)/0.3)]'
                    : 'bg-muted text-muted-foreground border-border'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground mb-3">
                  🏢 {ticket.company} • Assigned to: <span className="text-foreground">{user.fullName}</span>
                </div>

                <p className="text-sm text-foreground/80 mb-4">{ticket.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Acceptance Criteria:</h4>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    {ticket.acceptanceCriteria.map((ac, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-muted-foreground">☐</span> {ac}
                      </li>
                    ))}
                  </ul>
                </div>

                {!isDone ? (
                  <div>
                    <textarea
                      value={solutions[ticket.id] || ''}
                      onChange={e => setSolutions(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                      placeholder="Describe your solution or paste your code..."
                      className="w-full h-28 px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                    <button
                      onClick={() => { if (solutions[ticket.id]?.trim()) completeTask(`company-${ticket.id}`); }}
                      className="mt-2 px-6 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-glow hover:opacity-90 transition">
                      Mark as Done (+{ticket.xpReward} XP)
                    </button>
                  </div>
                ) : (
                  <span className="badge-easy">Completed ✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompanySimulation;
