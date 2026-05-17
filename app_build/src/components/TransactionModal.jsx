import React, { useState } from 'react';
import { X } from 'lucide-react';
import { MessageModal } from './MessageModal';

export function TransactionModal({ goal, type, onSave, onClose }) {
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const isDeposit = type === 'deposit';
  
  const formatNumberWithDots = (value) => {
    // Hanya ambil karakter angka
    const rawValue = value.replace(/\D/g, '');
    // Tambahkan titik setiap 3 digit dari belakang
    return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    setAmount(formatNumberWithDots(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawAmount = parseFloat(amount.replace(/\./g, ''));
    if (isNaN(rawAmount) || rawAmount <= 0) return;
    
    // Ensure we don't withdraw more than we have
    if (!isDeposit && rawAmount > goal.currentAmount) {
      setErrorMessage("Anda tidak dapat menarik lebih dari jumlah yang telah ditabung.");
      return;
    }

    onSave({
      id: crypto.randomUUID(),
      goalId: goal.id,
      amount: rawAmount,
      type,
      date: new Date().toISOString()
    });
  };

  return (
    <>
      <div className="modal-overlay" style={{ zIndex: 50 }}>
        <div className="modal-content glass-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {isDeposit ? 'Tambah Dana ke ' : 'Tarik Dana dari '}
              <span style={{ color: 'var(--accent-primary)' }}>{goal.title}</span>
            </h2>
            <button type="button" onClick={onClose} className="btn-icon">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                Jumlah untuk {isDeposit ? 'disimpan' : 'ditarik'} (Rp)
              </label>
              <div className="relative">
                <div className="absolute" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  Rp
                </div>
                <input 
                  type="text" 
                  placeholder="0" 
                  value={amount}
                  onChange={handleAmountChange}
                  required
                  style={{ paddingLeft: '3rem' }}
                />
              </div>
              {!isDeposit && (
                <div className="text-xs mt-2 text-right" style={{ color: 'var(--text-secondary)' }}>
                  Tersedia: Rp {goal.currentAmount.toLocaleString('id-ID')}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={onClose} className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                Batal
              </button>
              <button 
                type="submit" 
                className={`btn ${isDeposit ? 'btn-success' : 'btn-danger'}`}
              >
                Konfirmasi {isDeposit ? 'Nabung' : 'Tarik'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {errorMessage && (
        <MessageModal 
          title="Gagal" 
          message={errorMessage} 
          type="error" 
          onClose={() => setErrorMessage(null)} 
        />
      )}
    </>
  );
}
