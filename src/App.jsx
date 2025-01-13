import { useState } from 'react';
import Calculator from './components/Calculator';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="app">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <Calculator />
    </div>
  );
}

export default App;