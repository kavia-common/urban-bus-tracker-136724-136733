import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar with route search/filter, route list for selection.
 * @param {object[]} routes - Array of available bus routes.
 * @param {object} selectedRoute - Currently selected route.
 * @param {function} onRouteSelect - Handler for route selection.
 * @param {string} filter - Filter string for route search.
 * @param {function} onFilterChange - Handler for filter.
 * @param {boolean} visible - If sidebar is visible on mobile.
 * @param {function} onClose - Callback to close sidebar on mobile.
 */
function SideBar({
  routes = [],
  selectedRoute,
  onRouteSelect,
  filter,
  onFilterChange,
  visible,
  onClose
}) {
  return (
    <aside className={`bt-sidebar${visible ? ' visible' : ''}`} tabIndex={-1}>
      <button className="bt-close-btn" onClick={onClose} aria-label="Close sidebar">&times;</button>
      <div className="bt-sidebar-title">Bus Routes</div>
      <input
        type="text"
        placeholder="Find route..."
        style={{
          marginBottom: '0.9rem',
          padding: '0.53rem 0.65rem',
          borderRadius: '12px',
          border: '1.5px solid #dbeafe',
          width: '90%',
          fontSize: '1rem'
        }}
        value={filter}
        onChange={e => onFilterChange(e.target.value)}
        aria-label="Search routes"
      />
      <ul className="bt-route-list">
        {routes.map(route =>
          <li
            key={route.id}
            onClick={() => onRouteSelect(route)}
            className={route.id === selectedRoute?.id ? 'selected' : ''}
            tabIndex={0}
            style={{
              borderLeft: `6px solid ${route.color}`,
            }}
            aria-current={route.id === selectedRoute?.id ? 'page' : undefined}
          >
            <span style={{
              color: route.color || "#2563EB",
              fontWeight: 700,
              marginRight: '6px',
              fontSize: '1em'
            }}>
              {route.route_no}
            </span>
            <span>{route.name}</span>
          </li>
        )}
      </ul>
    </aside>
  );
}
export default SideBar;
