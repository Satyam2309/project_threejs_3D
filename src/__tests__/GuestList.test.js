import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GuestList from '../components/GuestList';
import { EventProvider } from '../context/EventContext';

test('renders guest list search input', () => {
  render(<BrowserRouter><EventProvider><GuestList /></EventProvider></BrowserRouter>);
  expect(screen.getByLabelText(/Search guests/i)).toBeInTheDocument();
});
