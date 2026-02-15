import { useEffect } from 'react';
import { useEvent } from '../context/EventContext';

const ToastMessage = () => {
  const { toast, clearToast } = useEvent();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(clearToast, 2800);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" aria-live="polite" aria-atomic="true">
      <div className={`toast show text-bg-${toast.variant}`} role="status">
        <div className="toast-body d-flex justify-content-between align-items-center">
          <span>{toast.message}</span>
          <button className="btn-close btn-close-white ms-3" onClick={clearToast} aria-label="Close notification" />
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
