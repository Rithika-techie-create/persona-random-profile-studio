import { RefreshCw } from 'lucide-react';

export default function GenerateButton({ onClick, loading }) {
  return (
    <button
      type="button"
      className={`btn-primary ${loading ? 'is-loading' : ''}`}
      onClick={onClick}
      aria-disabled={loading}
      aria-busy={loading}
      aria-keyshortcuts="Space"
    >
      <RefreshCw size={18} className="btn-primary__icon" aria-hidden="true" />
      <span>{loading ? 'Finding someone…' : 'Discover Another Person'}</span>
      <kbd className="kbd" aria-hidden="true">Space</kbd>
    </button>
  );
}
