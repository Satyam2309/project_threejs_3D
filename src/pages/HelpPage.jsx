const HelpPage = () => (
  <main>
    <h1 className="h3">Help</h1>
    <div className="accordion" id="faq">
      {[
        ['Can I edit RSVP?', 'Yes, use your RSVP token.'],
        ['How to switch roles?', 'Go to Admin Panel.'],
        ['Where is the preview window?', 'Run npm start and open http://localhost:3000 in your browser.']
      ].map(([q, a], i) => (
        <div className="accordion-item" key={q}>
          <h2 className="accordion-header"><button className={`accordion-button ${i ? 'collapsed' : ''}`} data-bs-toggle="collapse" data-bs-target={`#f${i}`}>{q}</button></h2>
          <div id={`f${i}`} className={`accordion-collapse collapse ${i ? '' : 'show'}`} data-bs-parent="#faq"><div className="accordion-body">{a}</div></div>
        </div>
      ))}
    </div>
    <form className="mt-3 card p-3">
      <h2 className="h5">Contact us</h2>
      <input className="form-control mb-2" placeholder="Name" />
      <input className="form-control mb-2" placeholder="Email" />
      <textarea className="form-control mb-2" placeholder="Message" />
      <button className="btn btn-primary">Send</button>
    </form>
  </main>
);

export default HelpPage;
