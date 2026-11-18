import { Globe, Heart, Users } from 'lucide-react';

export default function StatsSection({ sessionCount, favoritesCount, country }) {
  const stats = [
    { icon: Users, label: 'Profiles this session', value: sessionCount, tone: 'sage' },
    { icon: Heart, label: 'Favorites saved', value: favoritesCount, tone: 'peach' },
    { icon: Globe, label: 'Current country', value: country, tone: 'sky' },
  ];

  return (
    <section className="stats" aria-label="Session statistics">
      <dl className="stats__grid">
        {stats.map(({ icon: Icon, label, value, tone }) => (
          <div key={label} className={`stat tone-${tone}`}>
            <span className="stat__icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <div className="stat__text">
              <dt className="stat__label">{label}</dt>
              <dd className="stat__value">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
