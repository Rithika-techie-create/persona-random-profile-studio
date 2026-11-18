export const FALLBACK = '—';

const NATIONALITIES = {
  US: 'American',
  GB: 'British',
  IN: 'Indian',
  CA: 'Canadian',
  AU: 'Australian',
};

const clean = (value) => {
  if (value === undefined || value === null) return FALLBACK;
  const text = String(value).trim();
  return text || FALLBACK;
};

const capitalize = (value) => {
  const text = clean(value);
  return text === FALLBACK ? text : text.charAt(0).toUpperCase() + text.slice(1);
};

function formatDate(isoString) {
  const date = new Date(isoString);
  return Number.isNaN(date.getTime())
    ? FALLBACK
    : date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/** Converts a raw Random User API record into the flat shape the UI uses. */
export function formatUser(raw) {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Cannot display an empty profile.');
  }

  const { name = {}, location = {}, dob = {}, picture = {}, login = {} } = raw;
  const nat = clean(raw.nat).toUpperCase();
  const fullName = [name.first, name.last].filter(Boolean).join(' ') || FALLBACK;
  const title = clean(name.title);
  const phone = clean(raw.phone) !== FALLBACK ? clean(raw.phone) : clean(raw.cell);
  const city = clean(location.city);
  const country = clean(location.country);

  return {
    id: clean(login.uuid),
    title,
    fullName,
    displayName: title === FALLBACK ? fullName : `${title} ${fullName}`,
    username: clean(login.username),
    gender: capitalize(raw.gender),
    age: Number.isFinite(dob.age) ? dob.age : FALLBACK,
    dob: formatDate(dob.date),
    nationality: NATIONALITIES[nat] ?? nat,
    email: clean(raw.email),
    phone,
    phoneDigits: phone.replace(/[^\d+]/g, ''),
    city,
    state: clean(location.state),
    country,
    postcode: clean(location.postcode),
    locationSummary: [city, country].filter((part) => part !== FALLBACK).join(', ') || FALLBACK,
    picture: picture.large || picture.medium || '',
    thumbnail: picture.thumbnail || picture.medium || picture.large || '',
  };
}
