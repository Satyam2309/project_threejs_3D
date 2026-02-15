import { useEvent } from '../context/EventContext';

const OurStoryPage = () => {
  const { eventData } = useEvent();
  return (
    <main>
      <h1 className="h3 mb-3">Our Story</h1>
      <div className="timeline">
        {eventData.story.map((item) => (
          <article key={item.year} className="timeline-item fade-in">
            <img src={item.photo} alt={item.title} className="img-fluid rounded" />
            <h2 className="h5 mt-2">{item.year} — {item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
};

export default OurStoryPage;
