import { Navigate, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import ToastMessage from './components/ToastMessage';
import LandingPage from './pages/LandingPage';
import OurStoryPage from './pages/OurStoryPage';
import EventDetailsPage from './pages/EventDetailsPage';
import RsvpPage from './pages/RsvpPage';
import RegistryPage from './pages/RegistryPage';
import SchedulePage from './pages/SchedulePage';
import PlannerDashboard from './pages/PlannerDashboard';
import VendorsPage from './pages/VendorsPage';
import AdminPanel from './pages/AdminPanel';
import HelpPage from './pages/HelpPage';
import { useEvent } from './context/EventContext';

function App() {
  const { theme } = useEvent();
  return (
    <div className={`app theme-${theme}`}>
      <AppNavbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/story" element={<OurStoryPage />} />
          <Route path="/details" element={<EventDetailsPage />} />
          <Route path="/rsvp" element={<RsvpPage />} />
          <Route path="/registry" element={<RegistryPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/planner" element={<PlannerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <ToastMessage />
    </div>
  );
}

export default App;
