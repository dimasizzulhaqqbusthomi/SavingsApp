import React, { useState } from 'react';
import { LogIn, UserPlus, ShieldCheck, TrendingUp, Wallet } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Auth({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [users, setUsers] = useLocalStorage('savings_users', []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan password tidak boleh kosong.');
      return;
    }

    if (isLoginMode) {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        onLogin({ username: user.username, id: user.id });
      } else {
        setError('Username atau password salah.');
      }
    } else {
      const userExists = users.some(u => u.username === username);
      if (userExists) {
        setError('Username sudah digunakan. Silakan pilih username lain.');
      } else {
        const newUser = {
          id: crypto.randomUUID(),
          username,
          password
        };
        setUsers([...users, newUser]);
        onLogin({ username: newUser.username, id: newUser.id });
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Bagian Branding (Hanya tampil di Desktop) */}
        <div className="auth-brand">
          <div className="mb-6">
            <div className="btn-icon" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', width: 64, height: 64 }}>
              <Wallet size={32} />
            </div>
          </div>
          <h2>Mulai Atur<br/>Keuangan Anda.</h2>
          <p className="mb-6">Lacak tujuan tabungan, pantau pengeluaran, dan wujudkan impian finansial Anda dengan platform yang aman dan mudah digunakan.</p>
          
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} style={{ opacity: 0.8 }} />
              <span>Data tersimpan aman di perangkat Anda</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp size={24} style={{ opacity: 0.8 }} />
              <span>Pantau progres tabungan secara real-time</span>
            </div>
          </div>
        </div>

        {/* Bagian Form */}
        <div className="auth-form-container">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-bold mb-2">Manajer Tabungan</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              {isLoginMode ? 'Masuk kembali ke akun Anda' : 'Buat akun baru untuk memulai'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Username</label>
              <input 
                type="text" 
                placeholder="Masukkan username Anda" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ padding: '0.875rem 1rem' }}
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
              <input 
                type="password" 
                placeholder="Masukkan password Anda" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: '0.875rem 1rem' }}
              />
            </div>

            {error && (
              <div className="text-sm p-3 rounded" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary mt-4" style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
              {isLoginMode ? (
                <><LogIn size={18} /> Masuk Sekarang</>
              ) : (
                <><UserPlus size={18} /> Buat Akun Baru</>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span style={{ color: 'var(--text-secondary)' }}>
              {isLoginMode ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            </span>
            <button 
              type="button" 
              style={{ color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError('');
                setUsername('');
                setPassword('');
              }}
            >
              {isLoginMode ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
