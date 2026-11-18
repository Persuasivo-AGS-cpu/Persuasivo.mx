import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Start with 'dark' as default, since the app is optimized for it
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('persuasivo-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no saved preference, we default to dark, but we could check system preference:
      // const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      // if (prefersLight) setTheme('light');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('persuasivo-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
