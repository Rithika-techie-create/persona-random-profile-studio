const APP_VERSION = 'v1.0.0';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          Profiles powered by{' '}
          <a href="https://randomuser.me" target="_blank" rel="noopener noreferrer">
            Random User Generator API
          </a>
        </p>
        <p>Persona {APP_VERSION}</p>
      </div>
    </footer>
  );
}
