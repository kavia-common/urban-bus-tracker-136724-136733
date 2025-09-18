import React, { useState } from 'react';
import './App.css';
import './theme.css';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import MapSection from './components/MapSection';
import ETACards from './components/ETACards';
import NotificationPanel from './components/NotificationPanel';
import mockData from './data/mockData';

/**
 * PUBLIC_INTERFACE
 * Main application entry for the Bus Tracker.
 * Renders app-wide containers and handles high-level state integration.
 */
function App() {
  // Mocked filters, selected route, notification state, and language
  const [selectedRoute, setSelectedRoute] = useState(mockData.routes[0]);
  const [language, setLanguage] = useState('en');
  const [filter, setFilter] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  // Derive filtered buses for sidebar/search filter
  const filteredBuses = filter
    ? mockData.buses.filter((bus) =>
        bus.route.toLowerCase().includes(filter.toLowerCase())
      )
    : mockData.buses;

  // Change language handler
  const changeLanguage = (lang) => setLanguage(lang);

  // Select route from sidebar
  const handleRouteSelect = (route) => setSelectedRoute(route);

  // Filter input changes
  const handleFilterChange = (value) => setFilter(value);

  // Toggle sidebar on mobile
  const handleSidebarToggle = () => setShowSidebar((prev) => !prev);

  return (
    <div className="bt-app ocean-theme">
      <NavBar
        language={language}
        onLanguageChange={changeLanguage}
        onSidebarToggle={handleSidebarToggle}
      />
      <div className="bt-main-layout">
        <SideBar
          routes={mockData.routes}
          selectedRoute={selectedRoute}
          onRouteSelect={handleRouteSelect}
          filter={filter}
          onFilterChange={handleFilterChange}
          visible={showSidebar}
          onClose={() => setShowSidebar(false)}
        />
        <main className="bt-main-content">
          <MapSection
            buses={filteredBuses}
            stops={selectedRoute.stops}
            route={selectedRoute}
          />
          <ETACards
            buses={filteredBuses}
            stops={selectedRoute.stops}
            route={selectedRoute}
            language={language}
          />
        </main>
      </div>
      <NotificationPanel notifications={mockData.notifications} />
    </div>
  );
}

export default App;
