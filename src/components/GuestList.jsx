import { useMemo, useState } from 'react';
import { useEvent } from '../context/EventContext';
import { downloadFile, toCSV } from '../utils/fileUtils';

const GuestList = () => {
  const { eventData } = useEvent();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const rows = useMemo(() => eventData.guests.filter((g) => {
    const inQuery = g.name.toLowerCase().includes(query.toLowerCase());
    const inStatus = status === 'All' || g.status === status;
    return inQuery && inStatus;
  }), [eventData.guests, query, status]);

  const exportCsv = () => downloadFile('guests.csv', toCSV(rows), 'text/csv;charset=utf-8;');

  return (
    <section>
      <div className="d-flex gap-2 mb-2">
        <input aria-label="Search guests" className="form-control" placeholder="Search guests" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option>All</option><option>Attending</option><option>Pending</option><option>Declined</option>
        </select>
        <button className="btn btn-outline-primary" onClick={exportCsv}>Export CSV</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Meal</th></tr></thead>
          <tbody>{rows.map((g) => <tr key={g.id}><td>{g.name}</td><td>{g.email}</td><td>{g.status}</td><td>{g.mealChoice}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
};

export default GuestList;
