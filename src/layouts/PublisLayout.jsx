import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 shadow-sm border border-blue-100/50 dark:border-blue-900/30'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:text-gray-900 dark:hover:text-gray-200'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors duration-300">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-black text-white shadow-md shadow-blue-500/20">S</span>
              <span>SocialNet</span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">{user.fullName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Authenticated Member</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <NavLink to="/login" className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900">Sign In</NavLink>
                <NavLink to="/register" className="rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-500/10 transition-all">Create Account</NavLink>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-2 md:hidden text-slate-600 dark:text-slate-400"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Framework Layout Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Desktop Left Sidebar Panel */}
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-24 space-y-2">
              <NavLink to="/" className={navLinkClass} end>
                <span>🏠</span> <span>Dashboard</span>
              </NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/feed" className={navLinkClass}>
                    <span>🔥</span> <span>Global Feed</span>
                  </NavLink>
                  <NavLink to="/profile" className={navLinkClass}>
                    <span>👤</span> <span>Profile Network</span>
                  </NavLink>
                </>
              )}
            </div>
          </aside>

          {/* Central Workspace view */}
          <main className="col-span-1 md:col-span-3">
            <div className="max-w-2xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed bottom-0 top-16 right-0 w-64 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 animate-in slide-in-from-right duration-200" onClick={(e) => e.stopPropagation()}>
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass} end>Dashboard</NavLink>
            {isAuthenticated && (
              <>
                <NavLink to="/feed" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Global Feed</NavLink>
                <NavLink to="/profile" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Profile Network</NavLink>
                <button onClick={handleLogout} className="w-full text-left flex items-center space-x-3 px-4 py-3 text-sm text-red-600 font-medium">Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Sign In</NavLink>
                <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Create Account</NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}