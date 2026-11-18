import { Cake, Heart, MapPin, Users, Flag } from 'lucide-react';

export default function ProfileCard({ profile, isFavorite, onToggleFavorite }) {
  const chips = [
    { icon: Cake, label: `${profile.age} years`, tone: 'sage' },
    { icon: Users, label: profile.gender, tone: 'lavender' },
    { icon: Flag, label: profile.nationality, tone: 'butter' },
    { icon: MapPin, label: profile.locationSummary, tone: 'sky' },
  ];

  return (
    <article className="profile-card" aria-label={`Profile of ${profile.fullName}`}>
      <span className="profile-card__blob profile-card__blob--top" aria-hidden="true" />
      <span className="profile-card__blob profile-card__blob--bottom" aria-hidden="true" />

      <button
        type="button"
        className={`heart-btn ${isFavorite ? 'is-active' : ''}`}
        onClick={() => onToggleFavorite(profile)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${profile.fullName} from favorites`
            : `Add ${profile.fullName} to favorites`
        }
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      <div className="avatar">
        <div className="avatar__frame">
          <img
            src={profile.picture}
            alt={`Portrait of ${profile.fullName}`}
            width="176"
            height="176"
          />
        </div>
      </div>

      <h2 className="profile-card__name">{profile.displayName}</h2>
      <p className="profile-card__handle">@{profile.username}</p>

      <ul className="chips">
        {chips.map(({ icon: Icon, label, tone }) => (
          <li key={tone} className={`chip chip--${tone}`}>
            <Icon size={14} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </article>
  );
}
