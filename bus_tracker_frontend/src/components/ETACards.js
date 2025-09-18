import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ETA Cards for active buses on selected route. Shows ETA and bus/stop combo.
 * @param {object[]} buses - Bus list for the route.
 * @param {object[]} stops - List of route stops.
 * @param {object} route - Current route.
 * @param {string} language - Current UI language code.
 */
function ETACards({ buses = [], stops = [], route, language }) {
  // For mock, show one ETA card per bus on the route
  const busOnRoute = buses.filter(bus => bus.route === route?.route_no);

  // For future: translation helper stub
  const t = (en, hi, kn) =>
    language === "hi"
      ? hi
      : language === "kn"
        ? kn
        : en;

  return (
    <div className="bt-eta-cards">
      {busOnRoute.length === 0 && (
        <div className="bt-eta-card" style={{ color: "#aaa" }}>
          {t("No active buses", "कोई बस उपलब्ध नहीं", "ಬಸ್‌ಗಳಿಲ್ಲ")}
        </div>
      )}
      {busOnRoute.map(bus =>
        <div className="bt-eta-card" key={bus.id}>
          <div className="bt-eta-label">
            {t("ETA to", "आगमन समय", "ಬಹುಮಾನ ಸಮಯ")} <strong>{bus.current_stop}</strong>
          </div>
          <div className="bt-eta-time">
            {bus.eta_minutes} {t("min", "मिनट", "ನಿಮಿಷ")}
          </div>
          <div className="bt-eta-route">
            <span style={{ color: route?.color, fontWeight: 700 }}>{bus.route}</span>
            {' '}• {bus.label}
          </div>
        </div>
      )}
    </div>
  );
}
export default ETACards;
