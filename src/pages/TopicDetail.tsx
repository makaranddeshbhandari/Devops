import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { topics } from '@/data/topics';
import { getQuizQuestions, getExamQuestions } from '@/data/quizzes';
import { getTasksForTopic } from '@/data/tasks';
import { BookOpen, ClipboardList, Brain, GraduationCap, CheckCircle2, Lock, ChevronDown, ChevronRight, Clock, AlertTriangle } from 'lucide-react';

const TopicDetail = () => {
  const { id } = useParams<{ id: string }>();
  const topicId = parseInt(id || '1');
  const topic = topics.find(t => t.id === topicId);
  const navigate = useNavigate();
  const {
    user, isTopicUnlocked, isExamUnlocked, readSubtopics,
    markSubtopicRead, completeTask, saveQuizScore, saveExamScore,
    completeTopic, setWeakTopics,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'learn' | 'tasks' | 'quiz' | 'exam'>('learn');
  const [quizState, setQuizState] = useState<{ current: number; answers: number[]; finished: boolean }>({ current: 0, answers: [], finished: false });
  const [examState, setExamState] = useState<{ current: number; answers: number[]; finished: boolean; timeLeft: number; started: boolean }>({
    current: 0, answers: [], finished: false, timeLeft: 1200, started: false,
  });
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [taskSubmissions, setTaskSubmissions] = useState<Record<string, string>>({});

  const quizQuestions = getQuizQuestions(topicId);
  const examQuestions = getExamQuestions(topicId);
  const topicTasks = getTasksForTopic(topicId);

  // Exam timer
  useEffect(() => {
    if (!examState.started || examState.finished || examState.timeLeft <= 0) return;
    const timer = setInterval(() => {
      setExamState(prev => {
        if (prev.timeLeft <= 1) return { ...prev, finished: true, timeLeft: 0 };
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examState.started, examState.finished, examState.timeLeft]);

  const finishExam = useCallback(() => {
    const score = examState.answers.reduce((acc, ans, idx) => acc + (ans === examQuestions[idx]?.correctAnswer ? 1 : 0), 0);
    const wrong = examState.answers.map((ans, idx) => ans !== examQuestions[idx]?.correctAnswer ? idx : -1).filter(i => i >= 0);
    saveExamScore(topicId, score, examQuestions.length, wrong);

    // Detect weak subtopics
    const weakMap: Record<string, number> = {};
    wrong.forEach(idx => {
      const subtopicId = examQuestions[idx]?.subtopicId;
      if (subtopicId) weakMap[subtopicId] = (weakMap[subtopicId] || 0) + 1;
    });
    const weakSubtopics = Object.entries(weakMap).filter(([, count]) => count >= 2).map(([id]) => id);
    if (weakSubtopics.length > 0) setWeakTopics(topicId, weakSubtopics);

    if (score >= Math.ceil(examQuestions.length * 0.7)) {
      completeTopic(topicId);
    }
    setExamState(prev => ({ ...prev, finished: true }));
  }, [examState.answers, examQuestions, topicId, saveExamScore, completeTopic, setWeakTopics]);

  // Auto-finish exam when time runs out
  useEffect(() => {
    if (examState.started && examState.timeLeft <= 0 && !examState.finished) {
      finishExam();
    }
  }, [examState.timeLeft, examState.started, examState.finished, finishExam]);

  if (!topic || !user) return <div className="p-8 text-center text-muted-foreground">Topic not found</div>;
  if (!isTopicUnlocked(topicId)) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center animate-fade-in">
        <Lock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Topic Locked</h1>
        <p className="text-muted-foreground">Complete topic {topicId - 1} to unlock this topic.</p>
        <button onClick={() => navigate('/roadmap')} className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
          View Roadmap
        </button>
      </div>
    );
  }

  const completed = user.completedTopics.includes(topicId);
  const tabs = [
    { id: 'learn' as const, label: 'Learn', icon: BookOpen },
    { id: 'tasks' as const, label: 'Tasks', icon: ClipboardList },
    { id: 'quiz' as const, label: 'Quiz', icon: Brain },
    { id: 'exam' as const, label: 'Exam', icon: GraduationCap },
  ];

  const examScore = user.examScores[topicId];
  const passed = examScore !== undefined && examScore >= Math.ceil(examQuestions.length * 0.7);
  const examUnlocked = isExamUnlocked(topicId);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>Stage {topic.stageNumber}</span>
          <span>•</span>
          <span>{topic.estimatedDays} days</span>
          <span>•</span>
          <span className={completed ? 'text-success' : 'text-primary'}>{completed ? 'Completed ✓' : 'In Progress'}</span>
        </div>
        <h1 className="text-2xl font-heading font-bold text-foreground">{topic.id}. {topic.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-card rounded-lg p-1 border border-border overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-primary text-primary-foreground shadow-glow' : 'text-muted-foreground hover:text-foreground'
            }`}>
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Learn Tab */}
      {activeTab === 'learn' && (
        <div className="space-y-4">
          {topic.subtopics.map(sub => (
            <div key={sub.id} className="glass-card p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-heading font-semibold text-foreground">{sub.title}</h3>
                {readSubtopics.includes(sub.id) ? (
                  <span className="badge-easy">Read ✓</span>
                ) : (
                  <button onClick={() => markSubtopicRead(sub.id)}
                    className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition">
                    Mark as Read (+5 XP)
                  </button>
                )}
              </div>
              <div className="prose prose-invert prose-sm max-w-none text-foreground/90">
                {sub.content.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-3 text-sm leading-relaxed">{para}</p>
                ))}
              </div>
              {sub.codeExample && (
                <pre className="code-block mt-4 text-foreground/90"><code>{sub.codeExample}</code></pre>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {topicTasks.map(task => {
            const isDone = user.completedTasks.includes(task.id);
            return (
              <div key={task.id} className={`glass-card p-6 ${isDone ? 'border-[hsl(var(--success))/0.3]' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{task.id}</span>
                    <h3 className="font-heading font-semibold text-foreground">{task.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={task.difficulty === 'Easy' ? 'badge-easy' : task.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}>
                      {task.difficulty}
                    </span>
                    {isDone && <CheckCircle2 className="w-5 h-5 text-success" />}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.estimatedTime}</span>
                  <span>🏢 {task.company}</span>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 mb-4 border border-border">
                  <p className="text-sm text-foreground/80 italic">"{task.scenario}"</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Instructions:</h4>
                  <ol className="space-y-1 text-sm text-foreground/80">
                    {task.instructions.map((inst, i) => <li key={i} className="flex gap-2"><span className="text-primary font-mono">{i + 1}.</span> {inst}</li>)}
                  </ol>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Acceptance Criteria:</h4>
                  <ul className="space-y-1 text-sm text-foreground/80">
                    {task.acceptanceCriteria.map((ac, i) => <li key={i} className="flex gap-2"><span className="text-success">✓</span> {ac}</li>)}
                  </ul>
                </div>
                {task.codeStarter && <pre className="code-block mb-4 text-xs"><code>{task.codeStarter}</code></pre>}
                <button onClick={() => setExpandedHints(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3">
                  {expandedHints[task.id] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />} Hints
                </button>
                {expandedHints[task.id] && (
                  <ul className="text-sm text-muted-foreground space-y-1 mb-4 pl-4">
                    {task.hints.map((h, i) => <li key={i}>💡 {h}</li>)}
                  </ul>
                )}
                {!isDone && (
                  <div className="mt-4">
                    <textarea
                      value={taskSubmissions[task.id] || ''}
                      onChange={e => setTaskSubmissions(prev => ({ ...prev, [task.id]: e.target.value }))}
                      placeholder="Paste your solution or describe what you did..."
                      className="w-full h-28 px-4 py-3 rounded-lg bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                    <button
                      onClick={() => { if (taskSubmissions[task.id]?.trim()) completeTask(task.id); }}
                      className="mt-2 px-6 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-glow"
                    >
                      Submit (+50 XP)
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Quiz Tab */}
      {activeTab === 'quiz' && (
        <div className="glass-card p-6">
          {quizState.finished ? (
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Quiz Complete!</h2>
              <p className="text-4xl font-heading font-bold text-gradient my-4">
                {quizState.answers.reduce((acc, ans, idx) => acc + (ans === quizQuestions[idx]?.correctAnswer ? 1 : 0), 0)} / {quizQuestions.length}
              </p>
              <p className="text-muted-foreground mb-6">
                +{quizState.answers.reduce((acc, ans, idx) => acc + (ans === quizQuestions[idx]?.correctAnswer ? 10 : 0), 0)} XP earned
              </p>
              <button onClick={() => setQuizState({ current: 0, answers: [], finished: false })}
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                Retry Quiz
              </button>
            </div>
          ) : quizQuestions.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Question {quizState.current + 1} of {quizQuestions.length}</span>
                <div className="h-2 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-xp rounded-full transition-all" style={{ width: `${((quizState.current + 1) / quizQuestions.length) * 100}%` }} />
                </div>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-6">{quizQuestions[quizState.current]?.question}</h3>
              <div className="space-y-3">
                {quizQuestions[quizState.current]?.options.map((opt, i) => {
                  const answered = quizState.answers.length > quizState.current;
                  const selected = quizState.answers[quizState.current] === i;
                  const correct = quizQuestions[quizState.current]?.correctAnswer === i;
                  return (
                    <button key={i}
                      disabled={answered}
                      onClick={() => {
                        const newAnswers = [...quizState.answers];
                        newAnswers[quizState.current] = i;
                        setQuizState(prev => ({ ...prev, answers: newAnswers }));
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition ${
                        answered
                          ? correct ? 'border-[hsl(var(--success))] bg-[hsl(var(--success)/0.1)] text-foreground'
                            : selected ? 'border-destructive bg-destructive/10 text-foreground'
                            : 'border-border text-muted-foreground'
                          : 'border-border hover:border-primary/50 text-foreground hover:bg-primary/5'
                      }`}>
                      <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                  );
                })}
              </div>
              {quizState.answers.length > quizState.current && (
                <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-foreground/80">{quizQuestions[quizState.current]?.explanation}</p>
                </div>
              )}
              {quizState.answers.length > quizState.current && (
                <button onClick={() => {
                  if (quizState.current + 1 >= quizQuestions.length) {
                    const score = quizState.answers.reduce((acc, ans, idx) => acc + (ans === quizQuestions[idx]?.correctAnswer ? 1 : 0), 0);
                    saveQuizScore(topicId, score);
                    setQuizState(prev => ({ ...prev, finished: true }));
                  } else {
                    setQuizState(prev => ({ ...prev, current: prev.current + 1 }));
                  }
                }} className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm">
                  {quizState.current + 1 >= quizQuestions.length ? 'See Results' : 'Next Question →'}
                </button>
              )}
            </div>
          ) : <p className="text-muted-foreground">No quiz questions available for this topic.</p>}
        </div>
      )}

      {/* Exam Tab */}
      {activeTab === 'exam' && (
        <div className="glass-card p-6">
          {!examUnlocked && !passed ? (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">Exam Locked</h2>
              <p className="text-sm text-muted-foreground">Complete all 3 tasks and score at least 60% on the quiz to unlock.</p>
            </div>
          ) : passed ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 mx-auto text-success mb-4" />
              <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Exam Passed! 🎉</h2>
              <p className="text-4xl font-heading font-bold text-gradient my-4">{examScore} / {examQuestions.length}</p>
              <p className="text-muted-foreground">Topic {topicId} completed. Next topic unlocked!</p>
              {topicId < 15 && (
                <button onClick={() => navigate(`/topic/${topicId + 1}`)}
                  className="mt-6 px-6 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-glow">
                  Next Topic →
                </button>
              )}
            </div>
          ) : !examState.started ? (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="text-xl font-heading font-bold text-foreground mb-2">Topic Exam</h2>
              <p className="text-sm text-muted-foreground mb-1">{examQuestions.length} questions • 20 minutes</p>
              <p className="text-sm text-muted-foreground mb-6">Score 70% or above to pass and unlock the next topic.</p>
              <button onClick={() => setExamState(prev => ({ ...prev, started: true }))}
                className="px-8 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition">
                Start Exam
              </button>
            </div>
          ) : examState.finished ? (
            <div className="text-center">
              {(() => {
                const score = examState.answers.reduce((acc, ans, idx) => acc + (ans === examQuestions[idx]?.correctAnswer ? 1 : 0), 0);
                const passMark = Math.ceil(examQuestions.length * 0.7);
                const didPass = score >= passMark;
                return (
                  <>
                    {didPass ? <CheckCircle2 className="w-16 h-16 mx-auto text-success mb-4" /> : <AlertTriangle className="w-16 h-16 mx-auto text-warning mb-4" />}
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-2">{didPass ? 'Exam Passed! 🎉' : 'Not Quite There'}</h2>
                    <p className="text-4xl font-heading font-bold text-gradient my-4">{score} / {examQuestions.length}</p>
                    {didPass ? (
                      <p className="text-success mb-6">+100 XP earned. Next topic unlocked!</p>
                    ) : (
                      <div>
                        <p className="text-muted-foreground mb-4">You need {passMark} to pass. Review weak areas and try again.</p>
                        {user.weakTopics[topicId]?.length > 0 && (
                          <button onClick={() => navigate(`/weak-topics/${topicId}`)}
                            className="px-6 py-2 rounded-lg bg-warning text-warning-foreground font-medium mr-2">
                            Review Weak Areas
                          </button>
                        )}
                        <button onClick={() => setExamState({ current: 0, answers: [], finished: false, timeLeft: 1200, started: false })}
                          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                          Retake Exam
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Question {examState.current + 1} of {examQuestions.length}</span>
                <span className={`font-mono text-sm ${examState.timeLeft < 120 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  ⏱ {Math.floor(examState.timeLeft / 60)}:{String(examState.timeLeft % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
                <div className="h-full bg-gradient-xp rounded-full transition-all" style={{ width: `${((examState.current + 1) / examQuestions.length) * 100}%` }} />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-6">{examQuestions[examState.current]?.question}</h3>
              <div className="space-y-3">
                {examQuestions[examState.current]?.options.map((opt, i) => (
                  <button key={i}
                    onClick={() => {
                      const newAnswers = [...examState.answers];
                      newAnswers[examState.current] = i;
                      setExamState(prev => ({ ...prev, answers: newAnswers }));
                      // Auto-advance
                      setTimeout(() => {
                        if (examState.current + 1 >= examQuestions.length) {
                          // Will finish
                        } else {
                          setExamState(prev => ({ ...prev, current: prev.current + 1 }));
                        }
                      }, 300);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition ${
                      examState.answers[examState.current] === i
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border hover:border-primary/50 text-foreground hover:bg-primary/5'
                    }`}>
                    <span className="font-mono mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button disabled={examState.current === 0}
                  onClick={() => setExamState(prev => ({ ...prev, current: prev.current - 1 }))}
                  className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground disabled:opacity-30">
                  ← Previous
                </button>
                {examState.current + 1 >= examQuestions.length ? (
                  <button onClick={finishExam}
                    className="px-6 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-glow">
                    Finish Exam
                  </button>
                ) : (
                  <button onClick={() => setExamState(prev => ({ ...prev, current: prev.current + 1 }))}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                    Next →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicDetail;
