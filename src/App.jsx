import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './context/ThemeContext.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Calculator from './pages/Calculator.jsx';
import Analytics from './pages/Analytics.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_20%),linear-gradient(180deg,_rgba(15,23,42,1)_0%,_rgba(15,23,42,0.96)_40%,_rgba(15,23,42,1)_100%)] dark:bg-slate-950">
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
