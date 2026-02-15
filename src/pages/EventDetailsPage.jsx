import { useEvent } from '../context/EventContext';

const EventDetailsPage = () => {
  const { eventData } = useEvent();
  return (
    <main>
      <h1 className="h3">Event Details</h1>
      <div className="card p-3 mb-3">
        <h2 className="h5">Venue</h2>
        <p>{eventData.event.venue}</p>
        <img src={eventData.event.mapPlaceholder} alt="Map placeholder" className="img-fluid rounded" />
      </div>
      <div className="row">
        <div className="col-md-3"><strong>Travel</strong><p>Airport shuttles available.</p></div>
        <div className="col-md-3"><strong>Dress Code</strong><p>Garden formal.</p></div>
        <div className="col-md-3"><strong>Accommodations</strong><p>Partner hotel rates provided.</p></div>
        <div className="col-md-3"><strong>Parking</strong><p>Complimentary valet and self-parking.</p></div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
