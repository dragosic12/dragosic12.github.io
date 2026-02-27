import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.lang = 'es';
  });

  it('renders home content in Spanish by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Ingeniería de software aplicada a producto y cliente real/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ver proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Generador de im[aá]genes/i })).toBeInTheDocument();
  });

  it('switches locale to English and persists preference', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('locale-toggle'));

    expect(screen.getByRole('heading', { name: /Software engineering applied to product and real client delivery/i })).toBeInTheDocument();
    expect(window.localStorage.getItem('dragos.locale')).toBe('en');
  });

  it('switches theme and persists preference', () => {
    render(<App />);

    fireEvent.click(screen.getByTestId('theme-toggle'));

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(window.localStorage.getItem('dragos.theme')).toBe('light');
  });
});

