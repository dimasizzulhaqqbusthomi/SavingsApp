import React from 'react';
import { GoalCard } from './GoalCard';
import { Target, Wallet, Activity, ArrowDownRight, ArrowUpRight, Clock } from 'lucide-react';

export function Dashboard({ goals, transactions = [], onAddGoal, onLogTransaction, onDeleteGoal }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.min((totalSaved / totalTarget) * 100, 100) : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const formatDateTime = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const getGoalName = (id) => {
    const goal = goals.find(g => g.id === id);
    return goal ? goal.title : 'Tujuan Dihapus';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Summary */}
      <div className="glass-card flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tabungan Anda</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Kelola dan pantau tujuan keuangan Anda</p>
        </div>
        <button className="btn btn-primary" onClick={onAddGoal}>
          <Target size={18} /> Tujuan Baru
        </button>
      </div>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center gap-4">
          <div className="btn-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-primary)', width: 48, height: 48 }}>
            <Wallet size={24} />
          </div>
          <div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Terkumpul</div>
            <div className="text-2xl font-bold">{formatCurrency(totalSaved)}</div>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4">
          <div className="btn-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-secondary)', width: 48, height: 48 }}>
            <Target size={24} />
          </div>
          <div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Target</div>
            <div className="text-2xl font-bold">{formatCurrency(totalTarget)}</div>
          </div>
        </div>

        <div className="glass-card flex items-center gap-4">
          <div className="btn-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', width: 48, height: 48 }}>
            <Activity size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Progres Keseluruhan</span>
              <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
            </div>
            <div className="progress-bg">
              <div 
                className="progress-bar" 
                style={{ width: `${overallProgress}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Tujuan Aktif</h2>
        {goals.length === 0 ? (
          <div className="glass-card text-center py-12 flex flex-col items-center justify-center">
            <Target size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem', opacity: 0.5 }} />
            <h3 className="text-xl font-medium mb-2">Belum ada tujuan</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Mulai dengan membuat tujuan tabungan pertama Anda.</p>
            <button className="btn btn-primary" onClick={onAddGoal}>Buat Tujuan</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
              <GoalCard 
                key={goal.id} 
                goal={goal} 
                onLogTransaction={onLogTransaction} 
                onDelete={onDeleteGoal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Transaction History Section */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Histori Transaksi</h2>
        <div className="glass-card" style={{ padding: '0' }}>
          {transactions.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <Clock size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem', opacity: 0.5 }} />
              <h3 className="text-xl font-medium mb-2">Belum ada transaksi</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Transaksi menabung atau penarikan dana akan muncul di sini.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {transactions.slice(0, 10).map((tx, index) => (
                <div key={tx.id} className="flex justify-between items-center p-4" style={{ borderBottom: index < Math.min(transactions.length, 10) - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div className="flex items-center gap-4">
                    <div className="btn-icon" style={{ 
                      background: tx.type === 'deposit' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                      color: tx.type === 'deposit' ? 'var(--success)' : 'var(--danger)',
                      width: 48, height: 48
                    }}>
                      {tx.type === 'deposit' ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{tx.type === 'deposit' ? 'Menabung' : 'Penarikan'} - {getGoalName(tx.goalId)}</div>
                      <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{formatDateTime(tx.date)}</div>
                    </div>
                  </div>
                  <div className="font-bold text-lg" style={{ color: tx.type === 'deposit' ? 'var(--success)' : 'var(--danger)' }}>
                    {tx.type === 'deposit' ? '+' : '-'} {formatCurrency(tx.amount)}
                  </div>
                </div>
              ))}
              {transactions.length > 10 && (
                <div className="text-center p-4" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  Menampilkan 10 transaksi terakhir
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
