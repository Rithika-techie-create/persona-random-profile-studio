import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <span className="error-state__icon" aria-hidden="true">
        <AlertTriangle size={28} />
      </span>
      <h2>We couldn’t load a profile</h2>
      <p>{message}</p>
      <button type="button" className="btn-primary" onClick={onRetry}>
        <RefreshCw size={18} className="btn-primary__icon" aria-hidden="true" />
        <span>Try again</span>
      </button>
    </div>
  );
}
