import { useEffect, useState } from 'react';

/**
 * useState that persists to localStorage. Falls back to in-memory state
 * when storage is unavailable or holds invalid JSON.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
    } catch {
      // Ignore unreadable storage and use the default below.
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be full or blocked; the app keeps working in memory.
    }
  }, [key, value]);

  return [value, setValue];
}
