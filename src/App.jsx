import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ViewProvider, useViewMode } from './components/ViewContext';
import { Sun, Moon } from 'lucide-react';

// Pages
import ListPage from './pages/List';
import DetailPage from './pages/Detail';
import WritePage from './pages/Write';

const Header = () => {
  const { isHumorMode, theme, toggleTheme } = useViewMode();
  return (
    <header style={{ 
      borderBottom: '1px solid var(--border-color)', 
      padding: '1rem 0',
      marginBottom: '2rem',
      background: 'var(--bg-color)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem', margin: '0 auto' }}>
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: 'var(--text-main)',
          textDecoration: 'none'
        }}>
          {isHumorMode ? 'humor archive' : 'your archive'}
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-main)', fontWeight: '500' }}>
            {isHumorMode ? '전체 게시글' : '전체 게시글'}
          </Link>
          <Link to="/write" style={{ color: 'var(--text-main)', fontWeight: '500' }}>
            {isHumorMode ? '글쓰기' : '글쓰기'}
          </Link>
          <button onClick={toggleTheme} style={{ 
            background: 'transparent', 
            color: 'var(--text-main)', 
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

const SecretButton = () => {
  const { toggleMode } = useViewMode();
  return (
    <button 
      className="secret-toggle" 
      onClick={toggleMode}
      aria-label="Toggle View"
      title=" "
    />
  );
};

// AnimatedWrapper re-triggers animation whenever `isHumorMode` or route changes.
const AnimatedContent = ({ children }) => {
  const location = useLocation();
  const { isHumorMode } = useViewMode();
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    // When route or view mode changes, bump the key to trigger remount/animation
    setAnimKey(prev => prev + 1);
    
    window.scrollTo(0, 0); // Reset scroll position when jumping
  }, [location.pathname, isHumorMode]);

  return (
    <div key={animKey} className="animate-slide-down">
      {children}
    </div>
  );
};

function AppContent() {
  return (
    <>
      <Header />
      <main className="container">
        <AnimatedContent>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/write" element={<WritePage />} />
          </Routes>
        </AnimatedContent>
      </main>
      <SecretButton />
    </>
  );
}

function App() {
  return (
    <ViewProvider>
      <Router>
        <AppContent />
      </Router>
    </ViewProvider>
  );
}

export default App;
