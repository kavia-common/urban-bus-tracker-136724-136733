import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Notification panel at bottom of screen for alerts, info, etc.
 * @param {object[]} notifications - List of notification objects.
 */
function NotificationPanel({ notifications = [] }) {
  if (!notifications.length) return null;
  return (
    <div className="bt-notification-panel" aria-live="polite" role="region">
      {notifications.map(n => (
        <span
          className="bt-notification"
          key={n.id}
          style={ n.type==="alert" ? {color:"#b91c1c",backdropFilter:'brightness(1.09)'} : undefined }
        >
          {n.type === "alert" ? (
            <span aria-label="Warning" style={{marginRight:6}}>⚠️</span>
          ) : n.type === "info" ? (
            <span aria-label="Info" style={{marginRight:6}}>ℹ️</span>
          ) : null}
          {n.message}
        </span>
      ))}
    </div>
  );
}
export default NotificationPanel;
