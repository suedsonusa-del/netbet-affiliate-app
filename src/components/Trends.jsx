import React from 'react';
import { ExternalLink } from 'lucide-react';

const Trends = ({ data, loading, lookerUrl }) => {
  if (loading) return <div className="loading-shimmer" style={{ height: '300px', borderRadius: '20px' }} />;
  if (!data) return <div>No trend data available</div>;

  const maxIncome = Math.max(...data.map(d => d.income), 1);

  const formatMonth = (monthStr) => {
    // Check if monthStr is in YYYY-MM format
    if (typeof monthStr === 'string' && monthStr.includes('-')) {
      const [year, month] = monthStr.split('-');
      const date = new Date(year, month - 1);
      return date.toLocaleString('default', { month: 'short' });
    }
    return monthStr; // Return as is if not YYYY-MM
  };

  return (
    <div className="trends-tab">
      <div className="glass-card">
        <div className="chart-container">
          {data.map((d, i) => (
            <div key={i} className="bar-wrapper">
              <div 
                className="bar" 
                style={{ height: `${(d.income / maxIncome) * 100}%` }}
              >
                <span className="bar-value">€{Math.round(d.income).toLocaleString()}</span>
              </div>
              <span className="bar-label">{formatMonth(d.month)}</span>
            </div>
          ))}
        </div>
      </div>

      {lookerUrl && (
        <a 
          href={lookerUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="glass-card"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px',
            padding: '16px',
            textDecoration: 'none',
            color: 'var(--text-primary)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
          }}
        >
          <ExternalLink size={18} color="var(--color-green)" />
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Open Full Report (Looker)</span>
        </a>
      )}
    </div>
  );
};

export default Trends;
