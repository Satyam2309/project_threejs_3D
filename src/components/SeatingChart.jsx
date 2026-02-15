import { useState } from 'react';
import { useEvent } from '../context/EventContext';

const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4'];

const SeatingChart = () => {
  const { eventData, assignSeat } = useEvent();
  const [dragGuestId, setDragGuestId] = useState(null);

  return (
    <section>
      <h3 className="h5">Seating Chart Editor</h3>
      <div className="row g-3">
        <div className="col-md-5">
          <h4 className="h6">Unassigned Guests</h4>
          {eventData.guests.filter((g) => !g.seat).slice(0, 20).map((g) => (
            <button key={g.id} draggable onDragStart={() => setDragGuestId(g.id)} className="btn btn-sm btn-outline-secondary w-100 mb-1 text-start">{g.name}</button>
          ))}
        </div>
        <div className="col-md-7">
          <div className="row g-2">
            {tables.map((table) => (
              <div key={table} className="col-6">
                <div className="seat-dropzone p-2" onDragOver={(e) => e.preventDefault()} onDrop={() => dragGuestId && assignSeat(dragGuestId, table)}>
                  <strong>{table}</strong>
                  <ul className="small mb-0 ps-3">
                    {eventData.guests.filter((g) => g.seat === table).map((g) => <li key={g.id}>{g.name}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatingChart;
