import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RsvpForm from '../components/RsvpForm';
import { EventProvider } from '../context/EventContext';

test('renders RSVP form title', () => {
  render(<BrowserRouter><EventProvider><RsvpForm /></EventProvider></BrowserRouter>);
  expect(screen.getByText(/RSVP to Celebrate With Us/i)).toBeInTheDocument();
});
