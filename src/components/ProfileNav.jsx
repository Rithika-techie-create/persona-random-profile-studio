import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProfileNav({ position, total, onPrev, onNext }) {
  if (total === 0) return null;

  return (
    <nav className="profile-nav" aria-label="Profile history">
      <button
        type="button"
        className="icon-btn"
        onClick={onPrev}
        disabled={position <= 1}
        aria-label="Previous profile"
        title="Previous profile (←)"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="profile-nav__count" aria-live="polite">
        Profile {position} of {total}
      </span>
      <button
        type="button"
        className="icon-btn"
        onClick={onNext}
        disabled={position >= total}
        aria-label="Next profile"
        title="Next profile (→)"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
