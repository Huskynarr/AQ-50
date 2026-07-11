import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return <button className="theme-toggle" onClick={toggleDarkMode} aria-label={isDarkMode ? 'Helles Farbschema verwenden' : 'Dunkles Farbschema verwenden'} title={isDarkMode ? 'Helles Design' : 'Dunkles Design'}><span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span></button>;
};

export default ThemeToggle;
