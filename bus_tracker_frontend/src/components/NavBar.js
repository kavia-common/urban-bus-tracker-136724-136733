import React from 'react';

/**
 * PUBLIC_INTERFACE
 * App navigation bar. Shows logo, branding, language switcher, and mobile menu toggle.
 * @param {string} language - Current UI language.
 * @param {function} onLanguageChange - Callback to change language.
 * @param {function} onSidebarToggle - Callback to open sidebar on mobile.
 */
function NavBar({ language, onLanguageChange, onSidebarToggle }) {
  return (
    <nav className="bt-navbar" role="navigation" aria-label="Bus Tracker Navbar">
      <div className="bt-logo">
        <span className="bt-logo-icon" aria-label="bus logo" title="Urban Bus Tracker">
          🚌
        </span>
        Urban Bus Tracker
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <select
          className="bt-lang-selector"
          aria-label="Select UI Language"
          value={language}
          onChange={e => onLanguageChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="kn">ಕನ್ನಡ</option>
        </select>
        <button onClick={onSidebarToggle} className="bt-navbar-mobile-btn" aria-label="Open navigation menu">
          <span style={{fontSize:"1.8rem",verticalAlign:"middle"}}>☰</span>
        </button>
      </div>
    </nav>
  );
}
export default NavBar;
