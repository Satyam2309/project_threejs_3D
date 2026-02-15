import { useEvent } from '../context/EventContext';

const RegistryPage = () => {
  const { eventData, markGiftPurchased } = useEvent();
  return (
    <main>
      <h1 className="h3">Registry</h1>
      <div className="row g-3">
        {eventData.registry.map((item) => (
          <div key={item.id} className="col-md-4">
            <div className="card h-100">
              <img src={item.photo} alt={item.name} className="card-img-top" />
              <div className="card-body">
                <h2 className="h6">{item.name}</h2>
                <p>${item.price}</p>
                <a href={item.link} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary me-2">Store Link</a>
                <button className="btn btn-sm btn-primary" onClick={() => markGiftPurchased(item.id)}>{item.purchased ? 'Mark Unpurchased' : 'Mark Purchased'}</button>
                {item.groupGift && <span className="badge bg-info ms-2">Group Gift</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="alert alert-secondary mt-3">Cash Fund Widget (UI placeholder for payment API integration)</div>
    </main>
  );
};

export default RegistryPage;
