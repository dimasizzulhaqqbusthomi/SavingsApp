import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" style={{ zIndex: 100 }}>
      <div className="modal-content glass-card text-center" style={{ maxWidth: '400px' }}>
        <div className="flex justify-center mb-4">
          <div className="btn-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', width: 64, height: 64 }}>
            <AlertTriangle size={32} />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="btn flex-1" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>Batal</button>
          <button onClick={onConfirm} className="btn btn-danger flex-1">Ya, Hapus</button>
        </div>
      </div>
    </div>
  );
}
