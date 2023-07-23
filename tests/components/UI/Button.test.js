import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../../../components/UI/Button';


test('renders a button with the text "button"', () => {
    render(<Button />);
    const buttonElement = screen.getByText('button');
    expect(buttonElement).toBeInTheDocument();
  });
  