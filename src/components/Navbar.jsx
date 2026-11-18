import { Github, Moon, Sun, Users } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, apiOnline }) {
  const isDark = theme === 'dark';

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="brand" href="#top" aria-label="Persona — Profile Studio, home">
          <span className="brand__mark" aria-hidden="true">
            <Users size={20} strokeWidth={2.2} />
          </span>
          <span className="brand__text">
            <span className="brand__name">Persona</span>
            <span className="brand__label">PROFILE STUDIO</span>
          </span>
        </a>

        <div className="navbar__actions">
          <span className={`status ${apiOnline ? '' : 'status--error'}`} role="status">
            <span className="status__dot" aria-hidden="true" />
            {apiOnline ? 'Live' : 'Unreachable'}
          </span>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            className="icon-btn navbar__github"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            title="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
