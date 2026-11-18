import { AlertCircle, Check, Heart } from 'lucide-react';

const ICONS = { success: Check, favorite: Heart, error: AlertCircle };

export default function ToastStack({ toasts }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map(({ id, message, kind }) => {
        const Icon = ICONS[kind] ?? Check;
        return (
          <div key={id} className="toast">
            <Icon size={16} aria-hidden="true" />
            <span>{message}</span>
          </div>
        );
      })}
    </div>
  );
}
