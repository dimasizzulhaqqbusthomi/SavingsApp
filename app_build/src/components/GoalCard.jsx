import React from 'react';
import { Target, TrendingUp, Calendar, Trash2 } from 'lucide-react';

export function GoalCard({ goal, onLogTransaction, onDelete }) {
  const { id, title, targetAmount, currentAmount, targetDate } = goal;
  
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Tidak ada tenggat waktu';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="glass-card flex flex-col gap-4 relative overflow-hidden">
      {/* Progress Background */}
      <div 
        className="goal-card-progress"
        style={{ width: `${progress}%` }}
      />
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-2 text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            <Calendar size={14} />
            <span>{formatDate(targetDate)}</span>
          </div>
        </div>
        <button 
          onClick={() => onDelete(id)}
          className="btn-icon" 
          title="Hapus Tujuan"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex justify-between items-end mt-2">
        <div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Terkumpul</div>
          <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{formatCurrency(currentAmount)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Target</div>
          <div className="text-lg font-medium">{formatCurrency(targetAmount)}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button 
          className="btn btn-success flex-1"
          onClick={() => onLogTransaction(id, 'deposit')}
        >
          <TrendingUp size={16} /> Nabung
        </button>
        <button 
          className="btn btn-danger flex-1"
          onClick={() => onLogTransaction(id, 'withdrawal')}
        >
          Tarik Dana
        </button>
      </div>
    </div>
  );
}
