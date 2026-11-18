import { Heart, X } from 'lucide-react';

export default function FavoritesPanel({ favorites, activeId, onSelect, onRemove }) {
  return (
    <section className="favorites" aria-labelledby="favorites-title">
      <header className="section-header">
        <h2 id="favorites-title">Favorites</h2>
        <span className="count-pill">{favorites.length}</span>
      </header>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__icon" aria-hidden="true">
            <Heart size={24} />
          </span>
          <h3>No favorites yet</h3>
          <p>Tap the heart on a profile you like and it will be saved here.</p>
        </div>
      ) : (
        <ul className="favorites__list">
          {favorites.map((favorite) => (
            <li key={favorite.id} className="favorite-item">
              <button
                type="button"
                className="favorite-item__main"
                onClick={() => onSelect(favorite)}
                aria-current={favorite.id === activeId ? 'true' : undefined}
                aria-label={`View ${favorite.fullName}`}
              >
                <img src={favorite.thumbnail} alt="" width="48" height="48" loading="lazy" />
                <span className="favorite-item__text">
                  <strong>{favorite.fullName}</strong>
                  <span>{favorite.locationSummary}</span>
                </span>
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => onRemove(favorite)}
                aria-label={`Remove ${favorite.fullName} from favorites`}
                title="Remove"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
