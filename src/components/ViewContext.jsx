import React, { createContext, useContext, useState, useEffect } from 'react';

const ViewContext = createContext();

export function ViewProvider({ children }) {
  // 1) 논문/유머 모드
  const [isHumorMode, setIsHumorMode] = useState(() => {
    const saved = localStorage.getItem('isHumorMode');
    return saved === 'true';
  });

  // 2) 라이트/다크 모드
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // 클래스명 동기화
  useEffect(() => {
    localStorage.setItem('isHumorMode', isHumorMode);
    localStorage.setItem('theme', theme);

    const prevModeClass = isHumorMode ? 'paper-mode' : 'humor-mode';
    const currModeClass = isHumorMode ? 'humor-mode' : 'paper-mode';

    const prevThemeClass = theme === 'light' ? 'dark-mode' : 'light-mode';
    const currThemeClass = theme === 'light' ? 'light-mode' : 'dark-mode';

    document.body.classList.remove(prevModeClass, prevThemeClass);
    document.body.classList.add(currModeClass, currThemeClass);

  }, [isHumorMode, theme]);

  const toggleMode = () => setIsHumorMode(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ViewContext.Provider value={{ isHumorMode, toggleMode, theme, toggleTheme }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewContext);
}
