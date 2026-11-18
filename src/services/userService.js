const API_URL =
  'https://randomuser.me/api/?nat=us,gb,in,ca,au&inc=name,gender,email,phone,cell,dob,location,picture,login,nat&noinfo';
const REQUEST_TIMEOUT_MS = 10000;

export class UserServiceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserServiceError';
  }
}

// A profile is only usable if the fields the UI cannot live without are present.
function isUsableUser(raw) {
  return Boolean(raw?.login?.uuid && raw?.name?.first && raw?.name?.last && raw?.picture?.large);
}

/**
 * Fetches one random user from the Random User API and returns the raw record.
 * Throws UserServiceError with a human-readable message on any failure.
 */
export async function fetchRandomUser() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(API_URL, { signal: controller.signal });
  } catch (error) {
    throw new UserServiceError(
      error.name === 'AbortError'
        ? 'The request took too long. Check your connection and try again.'
        : 'Could not reach the Random User API. Check your internet connection.'
    );
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    throw new UserServiceError(`The API responded with an error (status ${response.status}).`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new UserServiceError('The API sent a response that could not be read.');
  }

  if (payload?.error) {
    throw new UserServiceError('The API reported a problem. Please try again in a moment.');
  }

  const results = Array.isArray(payload?.results) ? payload.results : [];
  if (results.length === 0) {
    throw new UserServiceError('The API returned no profiles. Please try again.');
  }
  if (!isUsableUser(results[0])) {
    throw new UserServiceError('The API returned an incomplete profile. Please try again.');
  }

  return results[0];
}
