import { Sun, Moon } from './Icons';

export default function ThemeToggle({ theme, toggleTheme }) {
    return (
        <button
            onClick={toggleTheme}
            className="button function"
            style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
            {theme === 'light' ? <Moon /> : <Sun />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
}