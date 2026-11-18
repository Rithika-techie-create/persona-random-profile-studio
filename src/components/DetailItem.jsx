import { useEffect, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { FALLBACK } from '../utils/formatUser';

export default function DetailItem({ icon: Icon, label, value, href, onCopy }) {
  const [copied, setCopied] = useState(false);
  const hasValue = value !== undefined && value !== null && value !== FALLBACK;

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    const success = await onCopy(label, String(value));
    if (success) setCopied(true);
  };

  return (
    <div className="detail-item">
      <span className="detail-item__icon" aria-hidden="true">
        <Icon size={18} />
      </span>
      <div className="detail-item__text">
        <dt>{label}</dt>
        <dd>
          {hasValue && href ? <a href={href}>{value}</a> : value}
        </dd>
      </div>
      {hasValue && onCopy && (
        <button
          type="button"
          className={`copy-btn ${copied ? 'is-copied' : ''}`}
          onClick={handleCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          title={`Copy ${label.toLowerCase()}`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
    </div>
  );
}
