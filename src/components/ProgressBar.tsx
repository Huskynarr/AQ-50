interface ProgressBarProps {
  current: number;
  total: number;
  answered?: number;
  className?: string;
}

const ProgressBar = ({ current, total, answered = current - 1, className = '' }: ProgressBarProps) => {
  const safeTotal = Math.max(total, 1);
  const percentage = Math.min(100, Math.max(0, Math.round((current / safeTotal) * 100)));

  return (
    <div className={`progress ${className}`}>
      <div className="progress-label">
        <span>Frage {current} von {total}</span>
        <span>{answered} beantwortet</span>
      </div>
      <div className="progress-track" role="progressbar" aria-label="Testfortschritt" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}>
        <span style={{ width: `${percentage}%` }} />
      </div>
      <span className="sr-only">Frage {current} von {total} ({percentage}%)</span>
    </div>
  );
};

export default ProgressBar;
