import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export function MessageModal({ title, message, type = 'success', onClose }) {
  const isSuccess = type === 'success';
  return (
    <div className="modal-overlay" style={{ zIndex: 110 }}>
      <div className="modal-content glass-card text-center" style={{ maxWidth: '400px' }}>
        <div className="flex justify-center mb-4">
          <div className="btn-icon" style={{ 
            background: isSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            color: isSuccess ? 'var(--success)' : 'var(--danger)', 
            width: 64, height: 64 
          }}>
            {isSuccess ? <CheckCircle size={32} /> : <XCircle size={32} />}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{message}</p>
        <button onClick={onClose} className="btn w-full btn-primary">OK</button>
      </div>
    </div>
  );
}
