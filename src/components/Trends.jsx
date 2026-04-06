import React from 'react';

const Trends = ({ data, loading }) => {
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
    </div>
  );
};

export default Trends;
