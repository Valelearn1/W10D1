import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders the EpiBooks brand in the navbar', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  const brandElement = screen.getByRole('link', { name: /epibooks/i });
  expect(brandElement).toBeInTheDocument();
});
