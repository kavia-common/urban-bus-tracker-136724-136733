import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Map section - shows routes, stops and live bus markers over a static placeholder map.
 * @param {object[]} buses - List of buses to display with their coordinates.
 * @param {object[]} stops - List of stops (lat/lng) for polyline and markers.
 * @param {object} route - Selected route (provides color/stops).
 */
function MapSection({ buses = [], stops = [], route }) {
  // Purely for illustrative layout, mimics bus and stop markers, replace integration for real map
  // Place markers using relative positioning (random layout for map illustration)

  // Helper: Lay markers in grid positions
  const sectionH = 300, sectionW = 680, padding = 38;
  const getXY = (lat, lng, idx, total) => {
    // Fake layout: arrange stops horizontally for illustration
    const step = (sectionW - 2*padding) / Math.max(1, total-1);
    return {
      x: padding + idx * step,
      y: sectionH/2 + (Math.sin(idx)*17)
    };
  };

  return (
    <section className="bt-map-section" aria-label="Map section with live bus positions">
      <div className="bt-map-placeholder">
        {/* Map background illustration (optionally) */}
        <span role="img" aria-label="city" style={{fontSize:'2.1rem',opacity:.14,position:'absolute',top:38,right:36}}>🏞️</span>
        <span style={{opacity:0.65}}>Map Loading... (mockview)</span>
      </div>
      {/* Stop markers */}
      {stops && stops.map((stop, idx) => {
        const pos = getXY(stop.lat, stop.lng, idx, stops.length);
        return (
          <div
            className="bt-stop-marker"
            key={stop.id}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y-4}px`,
              background: route?.color || "#F59E0B"
            }}
            title={stop.name}
          ></div>
        );
      })}
      {/* Bus markers */}
      {buses && buses.filter(bus => bus.route === route?.route_no).map((bus, idx) => {
        // Offset position for bus + small jitter
        const stopIdx = stops.findIndex(s => s.name === bus.current_stop);
        let pos = stopIdx !== -1 ? getXY(stops[stopIdx].lat, stops[stopIdx].lng, stopIdx, stops.length) : { x: 130+idx*22, y: 120+idx*9 };
        pos = { x: pos.x + (13-idx*5), y: pos.y - 20 };
        return (
          <div
            className="bt-bus-marker"
            key={bus.id}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`
            }}
            tabIndex={0}
            aria-label={`Bus ${bus.label}, at stop ${bus.current_stop}, ETA ${bus.eta_minutes} min.`}
            title={`Bus ${bus.label}\n${bus.current_stop} (${bus.eta_minutes} min)`}
          >
            🚌
          </div>
        );
      })}
    </section>
  );
}
export default MapSection;
