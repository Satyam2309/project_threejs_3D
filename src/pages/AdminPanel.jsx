import { useEvent } from '../context/EventContext';
import strings from '../i18n';

const AdminPanel = () => {
  const { role, switchRole } = useEvent();
  return (
    <main>
      <h1 className="h3">Admin Panel</h1>
      <p>Use role switcher to simulate protected content.</p>
      <label className="form-label" htmlFor="role">Current role</label>
      <select id="role" className="form-select w-auto" value={role} onChange={(e) => switchRole(e.target.value)}>
        {strings.roles.map((r) => <option key={r}>{r}</option>)}
      </select>
    </main>
  );
};

export default AdminPanel;
