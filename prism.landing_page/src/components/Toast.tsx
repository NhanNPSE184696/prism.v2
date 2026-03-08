import { useEffect } from 'react';
import './Toast.css';

interface ToastProps {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const Toast = ({ show, title, message, onClose }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      <div className="toast-title">{title}</div>
      <div className="toast-message">{message}</div>
    </div>
  );
};
