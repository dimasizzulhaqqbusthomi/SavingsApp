import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { GoalForm } from './components/GoalForm';
import { TransactionModal } from './components/TransactionModal';
import { ConfirmModal } from './components/ConfirmModal';
import { MessageModal } from './components/MessageModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LogOut } from 'lucide-react';

export function MainApp({ currentUser, onLogout }) {
  // Gunakan username sebagai bagian dari key localStorage agar data unik per user
  const [goals, setGoals] = useLocalStorage(`savings_goals_${currentUser.username}`, []);
  const [transactions, setTransactions] = useLocalStorage(`savings_transactions_${currentUser.username}`, []);
  
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  
  // Modal states
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
    setShowGoalForm(false);
    setSuccessMessage("Tujuan tabungan baru berhasil dibuat!");
  };

  const requestDeleteGoal = (goalId) => {
    setGoalToDelete(goalId);
  };

  const confirmDeleteGoal = () => {
    if (goalToDelete) {
      setGoals(goals.filter(g => g.id !== goalToDelete));
      setTransactions(transactions.filter(t => t.goalId !== goalToDelete));
      setGoalToDelete(null);
      setSuccessMessage("Tujuan tabungan berhasil dihapus.");
    }
  };

  const handleLogTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
    
    setGoals(goals.map(goal => {
      if (goal.id === transaction.goalId) {
        const change = transaction.type === 'deposit' ? transaction.amount : -transaction.amount;
        return { ...goal, currentAmount: goal.currentAmount + change };
      }
      return goal;
    }));
    
    setActiveTransaction(null);
    setSuccessMessage(`Berhasil ${transaction.type === 'deposit' ? 'menambahkan' : 'menarik'} dana sebesar Rp ${transaction.amount.toLocaleString('id-ID')}!`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex justify-end mb-4">
        <button onClick={onLogout} className="btn" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <LogOut size={16} /> Keluar ({currentUser.username})
        </button>
      </div>

      <Dashboard 
        goals={goals} 
        transactions={transactions}
        onAddGoal={() => setShowGoalForm(true)} 
        onLogTransaction={(goalId, type) => setActiveTransaction({ goalId, type })}
        onDeleteGoal={requestDeleteGoal}
      />
      
      {showGoalForm && (
        <GoalForm 
          onSave={handleAddGoal} 
          onClose={() => setShowGoalForm(false)} 
        />
      )}

      {activeTransaction && (
        <TransactionModal 
          goal={goals.find(g => g.id === activeTransaction.goalId)}
          type={activeTransaction.type}
          onSave={handleLogTransaction}
          onClose={() => setActiveTransaction(null)}
        />
      )}

      {goalToDelete && (
        <ConfirmModal 
          title="Hapus Tujuan"
          message="Apakah Anda yakin ingin menghapus tujuan tabungan ini? Aksi ini tidak dapat dibatalkan."
          onConfirm={confirmDeleteGoal}
          onCancel={() => setGoalToDelete(null)}
        />
      )}

      {successMessage && (
        <MessageModal
          title="Berhasil"
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  );
}
