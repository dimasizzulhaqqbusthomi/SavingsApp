import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export function GoalForm({ onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const formatNumberWithDots = (value) => {
    // Hanya ambil karakter angka
    const rawValue = value.replace(/\D/g, '');
    // Tambahkan titik setiap 3 digit dari belakang
    return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    setTargetAmount(formatNumberWithDots(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rawAmount = parseFloat(targetAmount.replace(/\./g, ''));
    if (!title || isNaN(rawAmount) || rawAmount <= 0) return;

    onSave({
      id: crypto.randomUUID(),
      title,
      targetAmount: rawAmount,
      currentAmount: 0,
      targetDate,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 50 }}>
      <div className="modal-content glass-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tujuan Tabungan Baru</h2>
          <button type="button" onClick={onClose} className="btn-icon">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Nama Tujuan</label>
            <input 
              type="text" 
              placeholder="Contoh: Dana Darurat, Liburan" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Jumlah Target (Rp)</label>
            <input 
              type="text" 
              placeholder="10.000.000" 
              value={targetAmount}
              onChange={handleAmountChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Tanggal Target (Opsional)</label>
            <input 
              type="date" 
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="btn" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> Buat Tujuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
