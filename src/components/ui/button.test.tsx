import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument();
  });

  it('exposes the variant and size as data attributes', () => {
    render(
      <Button variant='outline' size='lg'>
        Outline
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveAttribute('data-variant', 'outline');
    expect(button).toHaveAttribute('data-size', 'lg');
  });

  it('calls onClick when pressed', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Press' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick while disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Disabled' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as the child element when asChild is set', () => {
    render(
      <Button asChild>
        <a href='/start'>Get started</a>
      </Button>
    );

    const link = screen.getByRole('link', { name: 'Get started' });
    expect(link).toHaveAttribute('href', '/start');
    expect(link).toHaveAttribute('data-slot', 'button');
  });
});
