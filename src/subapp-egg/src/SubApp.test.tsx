import React from 'react';
import { render, screen } from '@testing-library/react';
import SubApp from './SubApp';

test('renders learn react link', () => {
  render(<SubApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
