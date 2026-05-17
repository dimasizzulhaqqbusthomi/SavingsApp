import React from 'react';
import { Auth } from './components/Auth';
import { MainApp } from './MainApp';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [currentUser, setCurrentUser] = useLocalStorage('current_user', null);

  if (!currentUser) {
    return <Auth onLogin={setCurrentUser} />;
  }

  return <MainApp currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
}

export default App;
