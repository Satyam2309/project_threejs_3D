import { useState } from 'react';
import GuestList from '../components/GuestList';
import SeatingChart from '../components/SeatingChart';
import { useEvent } from '../context/EventContext';
import { downloadFile } from '../utils/fileUtils';

/**
 * PlannerDashboard is a role-protected UI for planning operations.
 * Includes guest management, seating drag-and-drop, budget and tasks.
 */
const PlannerDashboard = () => {
  const { role, eventData, setEventData } = useEvent();
  const [taskInput, setTaskInput] = useState('');

  if (role !== 'Planner' && role !== 'Couple') {
    return <div className="alert alert-warning">Planner access only. Switch role in Admin Panel.</div>;
  }

  const toggleTask = (id) => setEventData((prev) => ({ ...prev, tasks: prev.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }));
  const addTask = () => {
    if (!taskInput.trim()) return;
    setEventData((prev) => ({ ...prev, tasks: [...prev.tasks, { id: prev.tasks.length + 1, title: taskInput, done: false }] }));
    setTaskInput('');
  };

  return (
    <main>
      <h1 className="h3">Planner Dashboard</h1>
      <GuestList />
      <button className="btn btn-outline-secondary mb-3" onClick={() => downloadFile('event-data.json', JSON.stringify(eventData, null, 2), 'application/json')}>Export Event JSON</button>
      <SeatingChart />
      <section className="card p-3 mt-3">
        <h3 className="h5">Budget Tracker</h3>
        <p>${eventData.budget.spent} spent of ${eventData.budget.total}</p>
        <div className="progress"><div className="progress-bar" style={{ width: `${(eventData.budget.spent / eventData.budget.total) * 100}%` }} /></div>
      </section>
      <section className="card p-3 mt-3">
        <h3 className="h5">Task Checklist</h3>
        {eventData.tasks.map((t) => (
          <div className="form-check" key={t.id}><input type="checkbox" checked={t.done} className="form-check-input" onChange={() => toggleTask(t.id)} id={`task-${t.id}`} /><label className="form-check-label" htmlFor={`task-${t.id}`}>{t.title}</label></div>
        ))}
        <div className="input-group mt-2"><input className="form-control" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} placeholder="Add task" /><button className="btn btn-primary" onClick={addTask}>Add</button></div>
      </section>
      <section className="alert alert-secondary mt-3">Bulk Email UI Placeholder (integrate email service provider API here)</section>
    </main>
  );
};

export default PlannerDashboard;
