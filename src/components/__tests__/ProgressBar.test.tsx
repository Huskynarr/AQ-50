import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('ProgressBar Component', () => {
  it('renders with correct progress information', () => {
    render(<ProgressBar current={25} total={50} />);
    
    expect(screen.getByText('Frage 25 von 50 (50%)')).toBeInTheDocument();
  });

  it('calculates percentage correctly', () => {
    render(<ProgressBar current={1} total={50} />);
    expect(screen.getByText('Frage 1 von 50 (2%)')).toBeInTheDocument();
    
    render(<ProgressBar current={50} total={50} />);
    expect(screen.getByText('Frage 50 von 50 (100%)')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProgressBar current={10} total={50} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has correct progress bar width', () => {
    const { container } = render(<ProgressBar current={25} total={50} />);
    
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('handles edge cases correctly', () => {
    // Test 0% progress
    render(<ProgressBar current={0} total={50} />);
    expect(screen.getByText('Frage 0 von 50 (0%)')).toBeInTheDocument();
    
    // Test 100% progress
    render(<ProgressBar current={50} total={50} />);
    expect(screen.getByText('Frage 50 von 50 (100%)')).toBeInTheDocument();
  });
});
