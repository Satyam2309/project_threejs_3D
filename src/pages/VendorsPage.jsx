import { useState } from 'react';
import { useEvent } from '../context/EventContext';

const VendorsPage = () => {
  const { eventData, addVendorNote } = useEvent();
  const [activeVendor, setActiveVendor] = useState(null);
  const [preview, setPreview] = useState('');

  return (
    <main>
      <h1 className="h3">Vendors</h1>
      <div className="row g-3">
        {eventData.vendors.map((vendor) => (
          <div className="col-md-4" key={vendor.id}>
            <div className="card h-100">
              <img src={vendor.photo} alt={vendor.name} className="card-img-top" />
              <div className="card-body">
                <h2 className="h6">{vendor.name}</h2>
                <p>{vendor.type} • {vendor.availability}</p>
                <button className="btn btn-sm btn-primary" onClick={() => setActiveVendor(vendor)}>View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeVendor && (
        <div className="modal d-block" role="dialog" aria-modal="true">
          <div className="modal-dialog"><div className="modal-content"><div className="modal-header"><h3 className="h5">{activeVendor.name}</h3></div><div className="modal-body">
            <p>Contact: {activeVendor.contact}</p>
            <textarea className="form-control" defaultValue={activeVendor.notes} onBlur={(e) => addVendorNote(activeVendor.id, e.target.value)} />
            <label className="form-label mt-2">Contract upload simulation</label>
            <input className="form-control" type="file" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setPreview(reader.result);
              reader.readAsDataURL(file);
            }} />
            {preview && <img src={preview} alt="Contract preview" className="img-fluid mt-2" />}
            <div className="alert alert-light mt-2">Availability calendar UI placeholder</div>
          </div><div className="modal-footer"><button className="btn btn-secondary" onClick={() => setActiveVendor(null)}>Close</button></div></div></div>
        </div>
      )}
    </main>
  );
};

export default VendorsPage;
