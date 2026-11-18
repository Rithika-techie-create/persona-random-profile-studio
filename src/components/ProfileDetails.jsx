import {
  AtSign,
  Building2,
  Cake,
  Clock,
  Flag,
  Globe,
  Hash,
  IdCard,
  Landmark,
  MapPin,
  Mail,
  Phone,
  User,
  Users,
} from 'lucide-react';
import DetailItem from './DetailItem';

function buildSections(profile) {
  return [
    {
      title: 'Identity',
      icon: IdCard,
      tone: 'sage',
      items: [
        { icon: User, label: 'Full name', value: profile.fullName },
        { icon: AtSign, label: 'Username', value: profile.username },
        { icon: Users, label: 'Gender', value: profile.gender },
        { icon: Clock, label: 'Age', value: profile.age === '—' ? '—' : `${profile.age} years` },
        { icon: Cake, label: 'Date of birth', value: profile.dob },
        { icon: Flag, label: 'Nationality', value: profile.nationality },
      ],
    },
    {
      title: 'Contact',
      icon: Mail,
      tone: 'peach',
      items: [
        { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}`, copyable: true },
        { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phoneDigits}`, copyable: true },
      ],
    },
    {
      title: 'Location',
      icon: MapPin,
      tone: 'sky',
      items: [
        { icon: Building2, label: 'City', value: profile.city },
        { icon: Landmark, label: 'State', value: profile.state },
        { icon: Globe, label: 'Country', value: profile.country },
        { icon: Hash, label: 'Postcode', value: profile.postcode },
      ],
    },
  ];
}

export default function ProfileDetails({ profile, onCopy }) {
  return (
    <div className="details">
      {buildSections(profile).map(({ title, icon: SectionIcon, tone, items }) => (
        <section key={title} className={`detail-section tone-${tone}`} aria-labelledby={`section-${title}`}>
          <header className="detail-section__header">
            <span className="detail-section__icon" aria-hidden="true">
              <SectionIcon size={18} />
            </span>
            <h3 id={`section-${title}`}>{title}</h3>
          </header>
          <dl className="detail-section__grid">
            {items.map(({ copyable, ...item }) => (
              <DetailItem key={item.label} {...item} onCopy={copyable ? onCopy : undefined} />
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
