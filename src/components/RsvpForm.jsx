import { useMemo, useState } from 'react';
import { useEvent } from '../context/EventContext';
import { downloadFile, generateIcs } from '../utils/fileUtils';
import strings from '../i18n';

/**
 * RsvpForm handles RSVP create/edit flow using token lookup and local state validation.
 * Props: none, reads event and mutation helpers from EventContext.
 */
const RsvpForm = () => {
  const { eventData, addOrUpdateRsvp } = useEvent();
  const [tokenSearch, setTokenSearch] = useState('');
  const [form, setForm] = useState({
    token: '',
    name: '',
    email: '',
    attendance: 'Attending',
    plusOne: false,
    mealChoice: 'Chicken',
    dietaryRestrictions: '',
    accessibilityNeeds: '',
    songRequest: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const confirmationText = useMemo(
    () => `${form.name}, your RSVP has been saved. Token: ${form.token}.`,
    [form]
  );

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.match(/\S+@\S+\.\S+/)) next.email = 'Valid email is required';
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const token = addOrUpdateRsvp(form);
    const ics = generateIcs({
      title: eventData.event.name,
      start: eventData.event.date,
      location: eventData.event.venue,
      description: eventData.event.description
    });
    downloadFile('wedding-invite.ics', ics, 'text/calendar');
    setShowModal(true);
    setForm((prev) => ({ ...prev, token }));
  };

  const loadByToken = () => {
    const match = eventData.guests.find((g) => g.token === tokenSearch.trim());
    if (!match) return setErrors({ token: 'Token not found' });

    setForm({
      token: match.token,
      name: match.name,
      email: match.email,
      attendance: match.status,
      plusOne: match.plusOne,
      mealChoice: match.mealChoice || 'Chicken',
      dietaryRestrictions: match.dietaryRestrictions || '',
      accessibilityNeeds: match.accessibilityNeeds || '',
      songRequest: match.songRequest || ''
    });
    setErrors({});
  };

  return (
    <section className="card shadow-sm p-4 fade-in" aria-labelledby="rsvp-title">
      <h2 id="rsvp-title" className="h4 mb-3">{strings.rsvp.title}</h2>
      <div className="input-group mb-3">
        <input
          className="form-control"
          aria-label="RSVP token"
          placeholder="RSVP token"
          value={tokenSearch}
          onChange={(e) => setTokenSearch(e.target.value)}
        />
        <button type="button" className="btn btn-outline-primary" onClick={loadByToken}>
          {strings.rsvp.editByToken}
        </button>
      </div>
      {errors.token && <div className="text-danger small mb-2">{errors.token}</div>}

      <form onSubmit={onSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Full name</label>
            <input id="name" className="form-control" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input id="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} />
          </div>
          <div className="col-md-4"><label className="form-label">Attendance</label><select className="form-select" value={form.attendance} onChange={(e) => setForm({ ...form, attendance: e.target.value })}><option>Attending</option><option>Declined</option></select></div>
          <div className="col-md-4"><label className="form-label">Meal choice</label><select className="form-select" value={form.mealChoice} onChange={(e) => setForm({ ...form, mealChoice: e.target.value })}><option>Chicken</option><option>Fish</option><option>Vegetarian</option></select></div>
          <div className="col-md-4 form-check mt-5"><input id="plusOne" type="checkbox" className="form-check-input" checked={form.plusOne} onChange={(e) => setForm({ ...form, plusOne: e.target.checked })} /><label htmlFor="plusOne" className="form-check-label">Plus one</label></div>
          <div className="col-md-6"><label className="form-label">Dietary restrictions</label><input className="form-control" value={form.dietaryRestrictions} onChange={(e) => setForm({ ...form, dietaryRestrictions: e.target.value })} /></div>
          <div className="col-md-6"><label className="form-label">Accessibility needs</label><input className="form-control" value={form.accessibilityNeeds} onChange={(e) => setForm({ ...form, accessibilityNeeds: e.target.value })} /></div>
          <div className="col-12"><label className="form-label">Song request</label><input className="form-control" value={form.songRequest} onChange={(e) => setForm({ ...form, songRequest: e.target.value })} /></div>
        </div>
        {errors.name && <p className="text-danger small mt-2">{errors.name}</p>}
        {errors.email && <p className="text-danger small">{errors.email}</p>}
        <button className="btn btn-primary mt-3" type="submit">{strings.rsvp.submit}</button>
      </form>

      {showModal && (
        <div className="modal d-block" role="dialog" aria-modal="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h3 className="h5 mb-0">RSVP confirmed</h3></div>
              <div className="modal-body"><p>{confirmationText}</p></div>
              <div className="modal-footer"><button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RsvpForm;
