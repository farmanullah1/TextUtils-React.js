import React from 'react';

function Alert(props) {
  if (!props.alert) return null;

  const getIcon = (type) => {
    switch(type) {
      case 'success': return '✅';
      case 'danger': return '❌';
      case 'warning': return '⚠️';
      default: return '💡';
    }
  };

  const getTitle = (type) => {
    switch(type) {
      case 'success': return 'Success';
      case 'danger': return 'Error';
      case 'warning': return 'Warning';
      default: return 'Notice';
    }
  }

  // Check if dark mode is active to style the alert background correctly
  const isDarkMode = document.body.style.backgroundColor === 'rgb(11, 17, 32)' || document.body.style.backgroundColor === '#0b1120';

  return (
    <div className="modern-toast-container">
      <div className={`modern-toast ${props.alert.type}`} style={{
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        color: isDarkMode ? '#f8fafc' : '#0f172a'
      }}>
        <span style={{ fontSize: '1.4rem' }}>{getIcon(props.alert.type)}</span>
        <div>
          <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '2px' }}>
            {getTitle(props.alert.type)}
          </strong>
          <span style={{ opacity: 0.85, fontSize: '0.85rem' }}>{props.alert.msg}</span>
        </div>
      </div>
    </div>
  );
}

export default Alert;