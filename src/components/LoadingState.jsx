export default function LoadingState() {
  return (
    <div className="showcase__grid" role="status" aria-live="polite">
      <span className="sr-only">Loading a new profile…</span>

      <div className="profile-card" aria-hidden="true">
        <div className="skeleton skeleton--avatar" />
        <div className="skeleton skeleton--line skeleton--title" />
        <div className="skeleton skeleton--line skeleton--short" />
        <div className="skeleton-chips">
          <div className="skeleton skeleton--chip" />
          <div className="skeleton skeleton--chip" />
          <div className="skeleton skeleton--chip" />
        </div>
      </div>

      <div className="details" aria-hidden="true">
        {[6, 2, 4].map((rows, section) => (
          <div key={section} className="detail-section">
            <div className="skeleton skeleton--line skeleton--heading" />
            <div className="detail-section__grid">
              {Array.from({ length: rows }, (_, row) => (
                <div key={row} className="skeleton skeleton--item" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
