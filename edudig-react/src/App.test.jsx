import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';

test('renders EduDig', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'EduDig' })).toBeInTheDocument();
});
