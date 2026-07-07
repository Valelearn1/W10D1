import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the EpiBooks brand in the navbar', () => {
  render(<App />);
  const brandElement = screen.getByRole('link', { name: /epibooks/i });
  expect(brandElement).toBeInTheDocument();
});
