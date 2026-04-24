import React, { useEffect, useMemo, useRef, useState } from 'react';

type Task = {
  id: number;
  desc: string;
  status: 'Done' | 'Partial' | 'Carried Forward' | 'Blocked' | string;
  time: string;
};

type Meeting = {
  id: number;
  title: string;
  outcome: string;
};

type CollectedData = {
  employee_name: string;
  department: string;
  role: string;
  date: string;
  date_iso: string;
  weekday: string;
  start_time: string;
  end_time: string;
  total_hours: string;
  tasks_count: number;
  min_tasks: number;
  met_minimum: string;
  tasks_done: number;
  tasks_partial: number;
  tasks_carried: number;
  tasks_blocked: number;
  tasks_text: string;
  tasks_json: string;
  no_meetings: string;
  meetings_count: number;
  meetings_text: string;
  meetings_json: string;
  deliverables: string;
  has_blocker: string;
  blocker_text: string;
  tomorrow_plan: string;
  mood_score: number;
  mood_label: string;
  mood_emoji: string;
  general_note: string;
  submitted_at: string;
  hr_email: string;
};

const CFG = {
  SHEET_URL: 'YOUR_APPS_SCRIPT_URL',
  HR_EMAIL: 'hr@magsmen.com',
  // Local Django API URL
};

const API_URL = 'https://api.mibbs.ai/api/daily-work-report/';


const DEPT_MIN: Record<string, number> = {
  Strategy: 5,
  'Business Development': 6,
  Operations: 5,
  'Digital & Content': 5,
  Design: 4,
  Finance: 4,
  Management: 4,
};

const DEPT_ROLES: Record<string, string[]> = {
  Strategy: ['Strategy Associate', 'Lead Strategist', 'Strategy Intern'],
  'Business Development': ['Business Associate', 'Senior Business Development', 'BD Intern'],
  Operations: ['Operations Associate', 'Head of Operations', 'Operations Intern'],
  'Digital & Content': ['Digital Associate', 'Content Associate', 'Digital Intern'],
  Design: ['Creative Associate', 'Creative Director', 'Design Intern'],
  Finance: ['Finance Associate', 'Finance Intern'],
  Management: ['Founder', 'Head of Operations', 'Manager'],
};

const MOOD_LABELS: Record<number, string> = {
  1: 'Drained',
  2: 'Low',
  3: 'Okay',
  4: 'Good',
  5: 'Fired up',
};

const MOOD_EMOJIS: Record<number, string> = {
  1: '😔',
  2: '😐',
  3: '🙂',
  4: '😊',
  5: '🔥',
};

const statusClass = (status: string) => {
  return {
    Done: 's-done',
    Partial: 's-partial',
    'Carried Forward': 's-carried',
    Blocked: 's-blocked',
  }[status] || '';
};

const EODReport: React.FC = () => {
  const [empName, setEmpName] = useState('');
  const [dept, setDept] = useState('');
  const [role, setRole] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('18:30');
  const [deliverables, setDeliverables] = useState('');
  const [blockerChecked, setBlockerChecked] = useState(false);
  const [blockerText, setBlockerText] = useState('');
  const [tmrw, setTmrw] = useState('');
  const [mood, setMood] = useState(0);
  const [note, setNote] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [noMeet, setNoMeet] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayText, setOverlayText] = useState('Submitting your report…');
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [showMoodError, setShowMoodError] = useState(false);
  const [taskWarning, setTaskWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successData, setSuccessData] = useState<CollectedData | null>(null);
  const nextTaskIdRef = useRef(1);

  const today = useMemo(() => new Date(), []);
  const pageDate = useMemo(
    () =>
      today.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    [today]
  );
  const pageTitle = useMemo(
    () => `${today.toLocaleDateString('en-IN', { weekday: 'long' })}'s Report`,
    [today]
  );

  const minTasks = DEPT_MIN[dept] || 4;
  const roleOptions = DEPT_ROLES[dept] || [];
  const taskCount = tasks.filter((task) => task.desc.trim().length > 0).length;

  const progress = useMemo(() => {
    let score = 0;
    const name = empName.trim().length > 0;
    const deptRole = dept.trim().length > 0 && role.trim().length > 0;
    const startEnd = startTime.trim().length > 0 && endTime.trim().length > 0;
    const deliver = deliverables.trim().length > 0;

    if (name) score += 15;
    if (deptRole) score += 15;
    if (startEnd) score += 10;
    if (taskCount >= minTasks) score += 30;
    else if (taskCount > 0) score += Math.round((taskCount / minTasks) * 30);
    if (deliver) score += 20;
    if (mood > 0) score += 10;

    return Math.min(score, 100);
  }, [empName, dept, role, startTime, endTime, taskCount, minTasks, deliverables, mood]);

  useEffect(() => {
    setTasks((currentTasks) => {
      if (currentTasks.length >= minTasks) return currentTasks;
      const nextTasks = [...currentTasks];
      for (let index = currentTasks.length; index < minTasks; index += 1) {
        nextTasks.push({
          id: nextTaskIdRef.current++,
          desc: '',
          status: 'Done',
          time: '',
        });
      }
      return nextTasks;
    });
  }, [minTasks]);

  useEffect(() => {
    if (role && !roleOptions.includes(role)) {
      setRole('');
    }
  }, [role, roleOptions]);

  useEffect(() => {
    if (meetings.length === 0) {
      setMeetings([{ id: 1, title: '', outcome: '' }]);
    }
  }, [meetings.length]);

  const updateTask = (id: number, field: keyof Omit<Task, 'id'>, value: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, [field]: value } : task
      )
    );
  };

  const addTask = () => {
    setTasks((currentTasks) => [
      ...currentTasks,
      { id: nextTaskIdRef.current++, desc: '', status: 'Done', time: '' },
    ]);
  };

  const delTask = (id: number) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const updateMeeting = (id: number, field: keyof Omit<Meeting, 'id'>, value: string) => {
    setMeetings((currentMeetings) =>
      currentMeetings.map((meeting) =>
        meeting.id === id ? { ...meeting, [field]: value } : meeting
      )
    );
  };

  const addMeeting = () => {
    setMeetings((currentMeetings) => {
      const nextId = currentMeetings.length > 0 ? Math.max(...currentMeetings.map((m) => m.id)) + 1 : 1;
      return [...currentMeetings, { id: nextId, title: '', outcome: '' }];
    });
  };

  const delMeeting = (id: number) => {
    setMeetings((currentMeetings) => currentMeetings.filter((meeting) => meeting.id !== id));
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const collectData = (): CollectedData => {
    const taskItems = tasks
      .filter((task) => task.desc.trim().length > 0)
      .map((task, index) => ({
        n: index + 1,
        desc: task.desc.trim(),
        status: task.status,
        time: task.time || '—',
      }));

    const meetingItems = !noMeet
      ? meetings
          .filter((meeting) => meeting.title.trim().length > 0 || meeting.outcome.trim().length > 0)
          .map((meeting, index) => ({
            n: index + 1,
            title: meeting.title.trim() || '—',
            outcome: meeting.outcome.trim() || '—',
          }))
      : [];

    const totalHours = (() => {
      if (startTime && endTime) {
        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = endTime.split(':').map(Number);
        const diff = eh * 60 + em - (sh * 60 + sm);
        if (diff > 0) {
          return `${(diff / 60).toFixed(1)} hrs`;
        }
      }
      return '—';
    })();

    const now = new Date();
    const date = now.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const weekday = now.toLocaleDateString('en-IN', { weekday: 'long' });

    return {
      employee_name: empName.trim(),
      department: dept,
      role,
      date,
      date_iso: now.toISOString().split('T')[0],
      weekday,
      start_time: startTime,
      end_time: endTime,
      total_hours: totalHours,
      tasks_count: taskItems.length,
      min_tasks: minTasks,
      met_minimum: taskItems.length >= minTasks ? 'Yes' : 'No',
      tasks_done: taskItems.filter((task) => task.status === 'Done').length,
      tasks_partial: taskItems.filter((task) => task.status === 'Partial').length,
      tasks_carried: taskItems.filter((task) => task.status === 'Carried Forward').length,
      tasks_blocked: taskItems.filter((task) => task.status === 'Blocked').length,
      tasks_text: taskItems.map((task) => `${task.n}. [${task.status}] ${task.desc} (${task.time})`).join('\n'),
      tasks_json: JSON.stringify(taskItems),
      no_meetings: noMeet ? 'Yes' : 'No',
      meetings_count: meetingItems.length,
      meetings_text: meetingItems.map((meeting) => `${meeting.n}. ${meeting.title} — ${meeting.outcome}`).join('\n') || 'None',
      meetings_json: JSON.stringify(meetingItems),
      deliverables: deliverables.trim(),
      has_blocker: blockerChecked ? 'Yes' : 'No',
      blocker_text: blockerChecked ? blockerText.trim() || '—' : 'None',
      tomorrow_plan: tmrw.trim() || '—',
      mood_score: mood,
      mood_label: MOOD_LABELS[mood] || '—',
      mood_emoji: MOOD_EMOJIS[mood] || '—',
      general_note: note.trim() || '—',
      submitted_at: now.toLocaleString('en-IN'),
      hr_email: CFG.HR_EMAIL,
    };
  };

  const validateData = (data: CollectedData) => {
    const nextErrors: Record<string, boolean> = {};

    if (!data.employee_name) nextErrors.empName = true;
    if (!data.department) nextErrors.dept = true;
    if (!data.role) nextErrors.role = true;
    if (!data.start_time) nextErrors.startTime = true;
    if (!data.end_time) nextErrors.endTime = true;
    if (!data.deliverables) nextErrors.deliverables = true;

    const moodError = mood === 0;
    const taskMinError = data.tasks_count < data.min_tasks;

    setFieldErrors(nextErrors);
    setShowMoodError(moodError);
    setTaskWarning(taskMinError);

    const hasFieldError = Object.keys(nextErrors).length > 0;
    const isValid = !hasFieldError && !moodError && !taskMinError;

    if (!isValid) {
      if (hasFieldError) {
        const order = ['empName', 'dept', 'role', 'startTime', 'endTime', 'deliverables'];
        const nextErrorField = order.find((key) => nextErrors[key]);
        if (nextErrorField) scrollToId(nextErrorField);
      } else if (taskMinError) {
        scrollToId('tcounter');
      } else if (moodError) {
        scrollToId('moodErr');
      }
    }

    return isValid;
  };

  const emailBody = (data: CollectedData) => {
    const separator = '─'.repeat(42);
    return `GROFESION — END OF DAY REPORT\n${separator}\nDate     : ${data.date}\nEmployee : ${data.employee_name}\nDept     : ${data.department} · ${data.role}\nHours    : ${data.start_time} – ${data.end_time} (${data.total_hours})\nSubmitted: ${data.submitted_at}\n\nTASKS (${data.tasks_count}/${data.min_tasks} min · Met: ${data.met_minimum})\n${data.tasks_text || 'None'}\n\nDELIVERABLES\n${data.deliverables}\n\nMEETINGS\n${data.meetings_text}\n\nBLOCKER: ${data.has_blocker}\n${data.blocker_text}\n\nTOMORROW\n${data.tomorrow_plan}\n\nMOOD: ${data.mood_emoji} ${data.mood_score}/5 — ${data.mood_label}\n\nNOTE: ${data.general_note}\n${separator}\nDone:${data.tasks_done} Partial:${data.tasks_partial} Carried:${data.tasks_carried} Blocked:${data.tasks_blocked}`;
  };

  const fallbackMailto = (data: CollectedData) => {
    const subject = encodeURIComponent(`[EOD] ${data.employee_name} — ${data.department} — ${data.date_iso}`);
    const body = encodeURIComponent(emailBody(data));
    window.open(`mailto:${CFG.HR_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  const showSuccess = (data: CollectedData) => {
    setSuccessData(data);
    setSubmitted(true);
    setSubmitDisabled(false);
    setOverlayVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    debugger;
    const data = collectData();
    if (!validateData(data)) return;

    setSubmitDisabled(true);
    setOverlayVisible(true);
    setOverlayText('Submitting your report…');

    // 1. Google Sheets Logging
    const sheetOk = CFG.SHEET_URL !== 'YOUR_APPS_SCRIPT_URL';
    if (sheetOk) {
      try {
        setOverlayText('Logging to dashboard…');
        await fetch(CFG.SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.warn("Sheet Error:", error);
      }
    }

    // 2. Django API Submission (Replaces EmailJS)
    try {
      setOverlayText('Sending to HR…');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      await new Promise((resolve) => setTimeout(resolve, 400));
      showSuccess(data);

    } catch (error) {
      console.warn("API Submission failed, using fallback:", error);
      fallbackMailto(data);
      // Still show success screen because fallbackMailto handles the output
      showSuccess(data);
    }
  };

  const handleToggleBlocker = () => {
    const nextValue = !blockerChecked;
    setBlockerChecked(nextValue);
    if (nextValue) {
      window.setTimeout(() => {
        document.getElementById('blockerTa')?.focus();
      }, 100);
    }
  };

  const taskCounterClass = taskCount >= minTasks ? 'tcounter ok' : taskCount > 0 ? 'tcounter warn' : 'tcounter info';
  const taskCounterText = taskCount >= minTasks
    ? `${taskCount} tasks — minimum met ✓`
    : taskCount > 0
    ? `${taskCount} of ${minTasks} minimum tasks filled`
    : 'Tasks logged today';

  const pageStyles = `
:root {
  --orange:     #E8510A;
  --orange-d:   #C44208;
  --orange-l:   #FDF0EA;
  --black:      #0F0F0F;
  --white:      #FFFFFF;
  --off:        #F8F7F5;
  --g100:       #F0EEE9;
  --g200:       #E2DFD8;
  --g400:       #A09D95;
  --g600:       #5C5A55;
  --green:      #176B44;
  --green-bg:   #E8F7F0;
  --yellow:     #7A5A00;
  --yellow-bg:  #FFF8EC;
  --blue:       #1A4D7A;
  --blue-bg:    #EBF3FC;
  --red-bg:     #FFF4EE;
  --red-border: #FDDBC9;
  --red-text:   #7A3010;
  --r:          14px;
  --r-sm:       8px;
  --touch:      52px;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  font-family: 'Outfit', -apple-system, sans-serif;
  background: var(--off);
  color: var(--black);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav {
  background: var(--black);
  padding: 0 18px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-brand { font-size: 17px; font-weight: 800; letter-spacing: .01em; }
.nav-g { color: var(--orange); }
.nav-rest { color: var(--white); }
.nav-right { font-size: 11px; font-weight: 600; color: rgba(255,255,255,.4); letter-spacing: .06em; text-transform: uppercase; }

.prog-bar {
  height: 3px;
  background: var(--g200);
  position: sticky;
  top: 54px;
  z-index: 99;
}
.prog-fill {
  height: 100%;
  background: var(--orange);
  transition: width .4s ease;
  border-radius: 0 2px 2px 0;
}

.shell {
  max-width: 480px;
  margin: 0 auto;
  padding: 20px 16px 100px;
}

.page-head { margin-bottom: 20px; }
.page-eye {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 3px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--black);
  line-height: 1.2;
}
.page-date {
  font-size: 13px;
  color: var(--g600);
  margin-top: 2px;
}

.card {
  background: var(--white);
  border-radius: var(--r);
  border: 1px solid var(--g200);
  padding: 16px;
  margin-bottom: 12px;
}
.card-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--g400);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.field { margin-bottom: 12px; }
.lbl {
  display: block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--g600);
  margin-bottom: 6px;
}
.lbl .req { color: var(--orange); margin-left: 2px; }
.lbl .opt { font-size: 9px; color: var(--g400); font-weight: 500; text-transform: none; letter-spacing: .03em; margin-left: 4px; }

input[type=text], input[type=time], textarea, select {
  width: 100%;
  padding: 13px 14px;
  border: 1.5px solid var(--g200);
  border-radius: var(--r-sm);
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  color: var(--black);
  background: var(--white);
  outline: none;
  transition: border-color .15s;
  -webkit-appearance: none;
  min-height: var(--touch);
}
input:focus, textarea:focus, select:focus { border-color: var(--black); }
input.err, textarea.err, select.err { border-color: #D94B2B; }
textarea { resize: none; line-height: 1.5; }
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A09D95' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
  cursor: pointer;
}
.ferr {
  font-size: 11px;
  color: #C0391B;
  margin-top: 5px;
  font-weight: 500;
  display: none;
}
.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

.task-item {
  background: var(--off);
  border: 1.5px solid var(--g200);
  border-radius: var(--r-sm);
  padding: 12px;
  margin-bottom: 10px;
  position: relative;
}
.task-item.has-content { border-color: var(--g400); }
.task-num {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--g400);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.req-tag {
  font-size: 9px;
  font-weight: 700;
  color: var(--orange);
  background: var(--orange-l);
  padding: 2px 7px;
  border-radius: 3px;
  letter-spacing: .06em;
}
.task-desc {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: var(--black);
  resize: none;
  min-height: 44px;
  line-height: 1.5;
  padding: 0;
  margin-bottom: 10px;
}
.task-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.task-sel {
  padding: 9px 30px 9px 10px;
  border: 1px solid var(--g200);
  border-radius: 6px;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--black);
  background: var(--white);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23A09D95' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  min-height: 38px;
  width: 100%;
}
.task-sel.s-done     { background-color: var(--green-bg);  border-color: #B3E4CF; color: var(--green); }
.task-sel.s-partial { background-color: var(--yellow-bg); border-color: #FAD98A; color: var(--yellow); }
.task-sel.s-carried { background-color: var(--blue-bg);   border-color: #C5DEFA; color: var(--blue); }
.task-sel.s-blocked { background-color: var(--red-bg);    border-color: var(--red-border); color: var(--red-text); }
.task-del {
  position: absolute;
  top: 10px; right: 10px;
  width: 28px; height: 28px;
  border: none; background: none;
  color: var(--g400);
  font-size: 18px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px;
  transition: background .12s;
  -webkit-tap-highlight-color: transparent;
}

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  background: var(--off);
  border: 1.5px dashed var(--g200);
  border-radius: var(--r-sm);
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--g600);
  cursor: pointer;
  margin-top: 4px;
}

.tcounter {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--r-sm);
  margin-bottom: 12px;
  font-size: 13px;
}
.tcounter.ok   { background: var(--green-bg); color: var(--green); }
.tcounter.warn { background: var(--red-bg);   color: var(--red-text); }
.tcounter.info { background: var(--blue-bg);  color: var(--blue); }
.tc-n { font-size: 24px; font-weight: 800; min-width: 30px; }
.tc-txt strong { display: block; font-size: 13px; font-weight: 600; }
.tc-txt span   { font-size: 11px; opacity: .8; }

.toggle-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border: 1.5px solid var(--g200);
  border-radius: var(--r-sm);
  cursor: pointer;
  background: var(--white);
  min-height: var(--touch);
}
.toggle-row input[type=checkbox] {
  width: 18px; height: 18px;
  accent-color: var(--black);
  flex-shrink: 0;
}
.tr-label { font-size: 14px; font-weight: 500; color: var(--black); }
.tr-sub   { font-size: 11px; color: var(--g400); margin-top: 1px; }
.toggle-detail { display: none; margin-top: 10px; }
.toggle-detail.show { display: block; }

.meet-item {
  background: var(--off);
  border: 1.5px solid var(--g200);
  border-radius: var(--r-sm);
  padding: 12px;
  margin-bottom: 10px;
  position: relative;
}
.meet-del {
  position: absolute;
  top: 10px; right: 10px;
  width: 28px; height: 28px;
  border: none; background: none;
  color: var(--g400); font-size: 18px;
  cursor: pointer; display: flex;
  align-items: center; justify-content: center;
  border-radius: 6px;
}
.meet-field {
  width: 100%;
  border: 1px solid var(--g200);
  border-radius: 6px;
  padding: 9px 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  color: var(--black);
  background: var(--white);
  outline: none;
  margin-bottom: 8px;
  min-height: 40px;
}

.mood-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.mood-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 6px;
  border: 1.5px solid var(--g200);
  border-radius: var(--r-sm);
  background: var(--white);
  cursor: pointer;
  touch-action: manipulation;
}
.mood-btn.sel { border-color: var(--black); background: var(--black); }
.mood-emoji { font-size: 24px; line-height: 1; }
.mood-n { font-size: 13px; font-weight: 700; color: var(--black); }
.mood-btn.sel .mood-n { color: var(--white); }
.mood-lbl { font-size: 9px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: var(--g400); }
.mood-btn.sel .mood-lbl { color: rgba(255,255,255,.5); }
#moodErr { display: none; font-size: 11px; color: #C0391B; margin-top: 8px; font-weight: 500; }

.alert {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 10px 12px; border-radius: var(--r-sm);
  font-size: 13px; line-height: 1.6; margin-bottom: 12px;
}
.alert-info { background: var(--blue-bg); border: 1px solid #C5DEFA; color: var(--blue); }

.blocker-ta {
  width: 100%;
  border: 1.5px solid var(--orange);
  border-radius: var(--r-sm);
  padding: 12px 14px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  color: var(--black);
  background: var(--red-bg);
  outline: none;
  min-height: 80px;
}

.submit-wrap {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: var(--white);
  border-top: 1px solid var(--g200);
  z-index: 200;
}
.btn-submit {
  width: 100%;
  padding: 15px;
  background: var(--orange);
  color: var(--white);
  border: none;
  border-radius: var(--r-sm);
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: .02em;
}

.overlay {
  position: fixed; inset: 0;
  background: rgba(15,15,15,.85);
  z-index: 999;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}
.overlay.show { display: flex; }
.spin {
  width: 44px; height: 44px;
  border: 3px solid rgba(255,255,255,.15);
  border-top-color: var(--orange);
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.ov-txt { font-size: 14px; font-weight: 500; color: var(--white); }
.ov-sub { font-size: 12px; color: rgba(255,255,255,.4); }

.success {
  display: none;
  text-align: center;
  padding: 60px 24px 120px;
}
.success.show { display: block; }
.s-circle {
  width: 72px; height: 72px;
  background: var(--black);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
}
.s-title { font-size: 24px; font-weight: 700; color: var(--black); margin-bottom: 8px; line-height: 1.25; }
.s-sub { font-size: 13px; color: var(--g600); margin-bottom: 24px; line-height: 1.6; max-width: 320px; margin-left: auto; margin-right: auto; }
.s-stats {
  background: var(--g100);
  border-radius: var(--r);
  padding: 16px;
  text-align: left;
  max-width: 320px;
  margin: 0 auto 20px;
}
.s-stat {
  display: flex; align-items: center; gap: 10px;
  font-size: 13px; color: var(--black);
  margin-bottom: 8px;
}
.btn-again {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 24px;
  background: var(--black); color: var(--white);
  border: none; border-radius: var(--r-sm);
  font-family: 'Outfit', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer; margin-top: 8px;
}

.sec-sep {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--g400);
  margin: 20px 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sec-sep::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--g200);
}
`;

  const handleDeptChange = (value: string) => {
    setDept(value);
    setRole('');
  };

  return (
    <div className="eod-page">
      <style>{pageStyles}</style>
      {overlayVisible && (
        <div className="overlay show" id="overlay">
          <div className="spin" />
          <div className="ov-txt" id="ovTxt">{overlayText}</div>
          <div className="ov-sub">Sending to HR · Logging to dashboard</div>
        </div>
      )}

      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-g">G</span>
          <span className="nav-rest">ROFESION</span>
        </div>
        <div className="nav-right">EOD Report</div>
      </nav>

      <div className="prog-bar">
        <div className="prog-fill" id="progFill" style={{ width: `${progress}%` }} />
      </div>

      <div className="shell" id="mainForm">
        <div className="page-head">
          <div className="page-eye">End of Day</div>
          <div className="page-title" id="pageTitle">{pageTitle}</div>
          <div className="page-date" id="pageDate">{pageDate}</div>
        </div>

        <div className="sec-sep">Your Details</div>

        <div className="card">
          <div className="field">
            <label className="lbl" htmlFor="empName">
              Your Name <span className="req">*</span>
            </label>
            <input
              type="text"
              id="empName"
              placeholder="Full name"
              autoComplete="name"
              value={empName}
              className={fieldErrors.empName ? 'err' : ''}
              onChange={(event) => setEmpName(event.target.value)}
            />
            <div className="ferr" id="e-empName" style={{ display: fieldErrors.empName ? 'block' : 'none' }}>
              Please enter your name.
            </div>
          </div>

          <div className="frow">
            <div className="field">
              <label className="lbl" htmlFor="dept">
                Department <span className="req">*</span>
              </label>
              <select
                id="dept"
                value={dept}
                className={fieldErrors.dept ? 'err' : ''}
                onChange={(event) => handleDeptChange(event.target.value)}
              >
                <option value="">Select</option>
                <option>Strategy</option>
                <option>Business Development</option>
                <option>Operations</option>
                <option>Digital & Content</option>
                <option>Design</option>
                <option>Finance</option>
                <option>Management</option>
              </select>
              <div className="ferr" id="e-dept" style={{ display: fieldErrors.dept ? 'block' : 'none' }}>
                Required.
              </div>
            </div>

            <div className="field">
              <label className="lbl" htmlFor="role">
                Role <span className="req">*</span>
              </label>
              <select
                id="role"
                value={role}
                className={fieldErrors.role ? 'err' : ''}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="">{dept ? 'Select role' : 'Select dept first'}</option>
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="ferr" id="e-role" style={{ display: fieldErrors.role ? 'block' : 'none' }}>
                Required.
              </div>
            </div>
          </div>

          <div className="frow">
            <div className="field">
              <label className="lbl" htmlFor="startTime">
                Start Time <span className="req">*</span>
              </label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                className={fieldErrors.startTime ? 'err' : ''}
                onChange={(event) => setStartTime(event.target.value)}
              />
            </div>
            <div className="field">
              <label className="lbl" htmlFor="endTime">
                End Time <span className="req">*</span>
              </label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                className={fieldErrors.endTime ? 'err' : ''}
                onChange={(event) => setEndTime(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="sec-sep">
          Tasks <span id="deptMinNote" style={{ fontWeight: 400, fontSize: 10, color: 'var(--orange)', textTransform: 'none' }}>
            {dept ? `(min ${minTasks} for ${dept})` : ''}
          </span>
        </div>

        <div className={taskCounterClass} id="tcounter">
          <div className="tc-n">{taskCount}</div>
          <div className="tc-txt">
            <strong>{taskCounterText}</strong>
            <span>Min {minTasks} required for your department</span>
          </div>
        </div>

        <div id="taskList">
          {tasks.map((task) => {
            const isRequired = task.id <= minTasks;
            return (
              <div key={task.id} className={`task-item${task.desc.trim().length > 0 ? ' has-content' : ''}`}>
                <div className="task-num">
                  Task {task.id} {isRequired && <span className="req-tag">Required</span>}
                </div>
                <textarea
                  className="task-desc"
                  rows={2}
                  placeholder="What did you work on? Include client / project name…"
                  value={task.desc}
                  onChange={(event) => updateTask(task.id, 'desc', event.target.value)}
                />
                <div className="task-row2">
                  <select
                    className={`task-sel ${statusClass(task.status)}`}
                    value={task.status}
                    onChange={(event) => updateTask(task.id, 'status', event.target.value)}
                  >
                    <option value="Done">✓ Done</option>
                    <option value="Partial">◑ Partial</option>
                    <option value="Carried Forward">→ Carried</option>
                    <option value="Blocked">✗ Blocked</option>
                  </select>
                  <select
                    className="task-sel"
                    value={task.time}
                    onChange={(event) => updateTask(task.id, 'time', event.target.value)}
                  >
                    <option value="">Time spent</option>
                    <option>0.5 hr</option><option>1 hr</option><option>1.5 hrs</option>
                    <option>2 hrs</option><option>2.5 hrs</option><option>3 hrs</option><option>3+ hrs</option>
                  </select>
                </div>
                {!isRequired && (
                  <button className="task-del" type="button" onClick={() => delTask(task.id)}>×</button>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn-add" type="button" onClick={addTask}>＋ Add task</button>

        <div className="sec-sep">Meetings</div>

        <div className="card">
          <div className="toggle-row" onClick={() => setNoMeet((prev) => !prev)}>
            <input type="checkbox" checked={noMeet} readOnly />
            <div>
              <div className="tr-label">No meetings today</div>
              <div className="tr-sub">Tap to confirm</div>
            </div>
          </div>
          <div className={`toggle-detail${noMeet ? '' : ' show'}`}>
            {meetings.map((meeting) => (
              <div key={meeting.id} className="meet-item">

              <button className="meet-del" type="button" onClick={() => delMeeting(meeting.id)}>×</button>
                <input
                  className="meet-field"
                  placeholder="Meeting title / with whom"
                  value={meeting.title}
                  onChange={(event) => updateMeeting(meeting.id, 'title', event.target.value)}
                />
                <textarea
                  className="meet-field"
                  rows={2}
                  placeholder="Key outcome..."
                  value={meeting.outcome}
                  onChange={(event) => updateMeeting(meeting.id, 'outcome', event.target.value)}
                />
              </div>
            ))}
            <button className="btn-add" type="button" onClick={addMeeting}>＋ Add meeting</button>
          </div>
        </div>

        <div className="sec-sep">Output & Blockers</div>

        <div className="card">
          <div className="field">
            <label className="lbl">What did you deliver today? <span className="req">*</span></label>
            <textarea
              rows={3}
              placeholder="e.g. Sent proposal to 3 leads · Completed brand audit for Client X · Updated all ClickUp tasks"
              value={deliverables}
              className={fieldErrors.deliverables ? 'err' : ''}
              onChange={(event) => setDeliverables(event.target.value)}
            />
          </div>
          <div className="toggle-row" onClick={handleToggleBlocker}>
            <input type="checkbox" checked={blockerChecked} readOnly />
            <div>
              <div className="tr-label">🚧 Flag a blocker or issue</div>
              <div className="tr-sub">Something that stopped your work</div>
            </div>
          </div>
          <div className={`toggle-detail${blockerChecked ? ' show' : ''}`}>
            <textarea
              className="blocker-ta"
              rows={3}
              placeholder="What is the blocker?..."
              value={blockerText}
              onChange={(event) => setBlockerText(event.target.value)}
            />
          </div>
        </div>


        
        <div className="sec-sep">Tomorrow</div>

        <div className="card">
          <div className="field">
            <label className="lbl">Top priorities for tomorrow  (optional)</label>
            <textarea
              rows={3}
              placeholder="e.g. 1. Follow up with 5 leads  2. Finish strategy deck  3. Team standup"
              value={deliverables}
              className={fieldErrors.deliverables ? 'err' : ''}
              onChange={(event) => setDeliverables(event.target.value)}
            />
          </div>
        </div>



        <div className="sec-sep">Energy Check</div>

        <div className="card">
          <div className="mood-grid">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                className={`mood-btn${mood === value ? ' sel' : ''}`}
                onClick={() => { setMood(value); setShowMoodError(false); }}
              >
                <div className="mood-emoji">{MOOD_EMOJIS[value]}</div>
                <div className="mood-n">{value}</div>
                <div className="mood-lbl">{MOOD_LABELS[value]}</div>
              </button>
            ))}
          </div>
          {showMoodError && <div id="moodErr" style={{ display: 'block' }}>Please tap your energy rating.</div>}
        </div>

        <div className="card">
          <div className="field">
            <label className="lbl">Anything else for HR / Team lead  <span className="opt">(optional)</span></label>
            <textarea
              rows={2}
              placeholder="Any feedback, request, or observation…"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </div>
        </div>
      </div>

      {submitted && successData ? (
        <div className="success show">
          <div className="s-circle">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="s-title">Submitted, {successData.employee_name.split(' ')[0]}.</div>
          <div className="s-sub">Your EOD has been logged and HR notified.</div>
          <div className="s-stats">
            <div className="s-stat">✅ <span className="s-stat-val">{successData.tasks_count} tasks</span></div>
            <div className="s-stat">⏱ <span className="s-stat-val">{successData.total_hours} worked</span></div>
            <div className="s-stat">{successData.mood_emoji} <span className="s-stat-val">{successData.mood_score}/5 energy</span></div>
          </div>
          <button className="btn-again" onClick={() => window.location.reload()}>Submit another</button>
        </div>
      ) : (
        <div className="submit-wrap">
          <button className="btn-submit" disabled={submitDisabled} onClick={handleSubmit}>Submit EOD Report →</button>
        </div>
      )}
    </div>
  );
};

export default EODReport;
