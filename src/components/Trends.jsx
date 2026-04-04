import React from 'react';

const Trends = ({ data, loading }) => {
  if (loading) return <div className="loading-shimmer" style={{ height: '300px', borderRadius: '20px' }} />;
  if (!data) return <div>No trend data available</div>;

  // Last 6 months
  const chartData = data.slice(-6);
  const maxIncome = Math.max(...chartData.map(d => d.income), 1);

  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleString('default', { month: 'short' });
  };

  return (
    <div className="glass-card">
      <div className="chart-container">
        {chartData.map((d, i) => (
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
  );
};

export default Trends;
