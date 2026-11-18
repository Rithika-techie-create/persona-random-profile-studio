import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProfileCard from './components/ProfileCard';
import ProfileDetails from './components/ProfileDetails';
import GenerateButton from './components/GenerateButton';
import ProfileNav from './components/ProfileNav';
import FavoritesPanel from './components/FavoritesPanel';
import StatsSection from './components/StatsSection';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ToastStack from './components/ToastStack';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import { fetchRandomUser } from './services/userService';
import { formatUser, FALLBACK } from './utils/formatUser';
import { copyText } from './utils/clipboard';
import './App.css';

const HISTORY_LIMIT = 50;
const RECENT_WINDOW = 10; // Profiles checked when avoiding duplicates
const DUPLICATE_RETRIES = 3;
const TOAST_DURATION_MS = 2600;

const isStoredProfile = (profile) => Boolean(profile && profile.id && profile.fullName);

export default function App() {
  const [theme, setTheme] = useLocalStorage('persona:theme', () =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const [storedHistory, setHistory] = useLocalStorage('persona:history', []);
  const [storedIndex, setIndex] = useLocalStorage('persona:index', 0);
  const [favorites, setFavorites] = useLocalStorage('persona:favorites', []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionCount, setSessionCount] = useState(0);
  const [toasts, setToasts] = useState([]);

  const loadingRef = useRef(false);
  const toastIdRef = useRef(0);

  // Storage can hold stale or malformed data, so sanitise it once per change.
  const history = useMemo(
    () => (Array.isArray(storedHistory) ? storedHistory.filter(isStoredProfile) : []),
    [storedHistory]
  );
  const safeFavorites = useMemo(
    () => (Array.isArray(favorites) ? favorites.filter(isStoredProfile) : []),
    [favorites]
  );
  const index = Math.min(Math.max(Number(storedIndex) || 0, 0), Math.max(history.length - 1, 0));
  const profile = history[index] ?? null;
  const isFavorite = profile ? safeFavorites.some((item) => item.id === profile.id) : false;

  // Callbacks read the latest history through a ref so they stay stable.
  const historyRef = useRef(history);
  historyRef.current = history;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const showToast = useCallback((message, kind = 'success') => {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts((current) => [...current.slice(-2), { id, message, kind }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  const discover = useCallback(async () => {
    if (loadingRef.current) return; // Prevent duplicate requests
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const recentIds = new Set(historyRef.current.slice(-RECENT_WINDOW).map((item) => item.id));
      let user = null;
      for (let attempt = 0; attempt <= DUPLICATE_RETRIES; attempt += 1) {
        user = formatUser(await fetchRandomUser());
        if (!recentIds.has(user.id)) break;
      }

      const nextHistory = [...historyRef.current, user].slice(-HISTORY_LIMIT);
      setHistory(nextHistory);
      setIndex(nextHistory.length - 1);
      setSessionCount((count) => count + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong while loading a profile.');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [setHistory, setIndex]);

  // Load a first profile only when there is no saved history.
  useEffect(() => {
    if (historyRef.current.length === 0) discover();
  }, [discover]);

  const goPrevious = useCallback(() => {
    if (index > 0) {
      setError(null);
      setIndex(index - 1);
    }
  }, [index, setIndex]);

  const goNext = useCallback(() => {
    if (index < history.length - 1) {
      setError(null);
      setIndex(index + 1);
    }
  }, [index, history.length, setIndex]);

  // Space = new profile, arrow keys = history. Ignored while a control is focused.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target.closest?.('button, a, input, textarea, select, [contenteditable="true"]')) return;

      if (event.code === 'Space') {
        event.preventDefault();
        discover();
      } else if (event.key === 'ArrowLeft') {
        goPrevious();
      } else if (event.key === 'ArrowRight') {
        goNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [discover, goPrevious, goNext]);

  const toggleFavorite = useCallback(
    (target) => {
      const exists = safeFavorites.some((item) => item.id === target.id);
      setFavorites(exists ? safeFavorites.filter((item) => item.id !== target.id) : [target, ...safeFavorites]);
      showToast(
        exists ? `Removed ${target.fullName} from favorites` : `Added ${target.fullName} to favorites`,
        exists ? 'success' : 'favorite'
      );
    },
    [safeFavorites, setFavorites, showToast]
  );

  const viewFavorite = useCallback(
    (favorite) => {
      setError(null);
      const existingIndex = history.findIndex((item) => item.id === favorite.id);
      if (existingIndex >= 0) {
        setIndex(existingIndex);
      } else {
        const nextHistory = [...history, favorite].slice(-HISTORY_LIMIT);
        setHistory(nextHistory);
        setIndex(nextHistory.length - 1);
      }
      document.getElementById('showcase')?.scrollIntoView({ block: 'start' });
    },
    [history, setHistory, setIndex]
  );

  const copyValue = useCallback(
    async (label, value) => {
      const copied = await copyText(value);
      showToast(copied ? `${label} copied to clipboard` : `Could not copy ${label.toLowerCase()}`, copied ? 'success' : 'error');
      return copied;
    },
    [showToast]
  );

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  let showcase = null;
  if (loading) {
    showcase = <LoadingState />;
  } else if (error) {
    showcase = <ErrorState message={error} onRetry={discover} />;
  } else if (profile) {
    showcase = (
      <div className="showcase__grid" key={profile.id}>
        <ProfileCard profile={profile} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        <ProfileDetails profile={profile} onCopy={copyValue} />
      </div>
    );
  }

  return (
    <div className="app">
      <a className="skip-link" href="#showcase">Skip to profile</a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} apiOnline={!error} />

      <main className="container">
        <Hero />

        <section id="showcase" className="showcase" aria-label="Profile showcase" aria-busy={loading}>
          {showcase}
          <div className="actions">
            <GenerateButton onClick={discover} loading={loading} />
            <ProfileNav
              position={history.length === 0 ? 0 : index + 1}
              total={history.length}
              onPrev={goPrevious}
              onNext={goNext}
            />
          </div>
        </section>

        <StatsSection
          sessionCount={sessionCount}
          favoritesCount={safeFavorites.length}
          country={profile?.country ?? FALLBACK}
        />
        <FavoritesPanel
          favorites={safeFavorites}
          activeId={profile?.id}
          onSelect={viewFavorite}
          onRemove={toggleFavorite}
        />
      </main>

      <Footer />
      <ToastStack toasts={toasts} />
    </div>
  );
}
