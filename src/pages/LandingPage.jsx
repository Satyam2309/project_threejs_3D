import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useEvent } from '../context/EventContext';

const LandingPage = () => {
  const { eventData } = useEvent();
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(eventData.event.date) - new Date();
      const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
      setCountdown(`${days} days to go`);
    }, 1000);
    return () => clearInterval(timer);
  }, [eventData.event.date]);

  return (
    <main>
      <header className="hero rounded-4 p-5 text-white" style={{ backgroundImage: `url(${eventData.event.heroImage})` }}>
        <h1 className="display-5">{eventData.couple.names}</h1>
        <p>{new Date(eventData.event.date).toLocaleString()}</p>
        <p className="badge bg-dark-subtle text-dark">{countdown}</p>
        <Link className="btn btn-light" to="/rsvp">RSVP Now</Link>
      </header>
      <section className="mt-4">
        <h2 className="h4">About us</h2>
        <p>{eventData.couple.bio}</p>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-primary">Share on WhatsApp</button>
          <button className="btn btn-outline-primary">Share on Instagram</button>
          <button className="btn btn-outline-primary">Copy Invite Link</button>
        </div>
      </section>
      <section className="mt-4" aria-label="Wedding gallery preview">
        <h2 className="h4">Gallery Preview</h2>
        <div className="row g-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="col-md-4">
              <img src={`/assets/gallery-${n}.svg`} alt={`Gallery preview ${n}`} className="img-fluid rounded shadow-sm" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
