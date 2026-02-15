import { useState } from 'react';
import { useEvent } from '../context/EventContext';

const SchedulePage = () => {
  const { eventData } = useEvent();
  const [open, setOpen] = useState('Friday');
  return (
    <main>
      <h1 className="h3">Schedule</h1>
      {eventData.schedule.map((day) => (
        <section key={day.day} className="mb-3 card p-3">
          <button className="btn btn-link text-start" onClick={() => setOpen(open === day.day ? '' : day.day)}>{day.day}</button>
          {open === day.day && day.events.map((ev) => <p key={ev.time} className="mb-1">{ev.time} — {ev.name}</p>)}
        </section>
      ))}
      <div className="alert alert-info">Reminder setup UI (push/email integration placeholder)</div>
    </main>
  );
};

export default SchedulePage;
