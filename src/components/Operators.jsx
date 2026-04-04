import React from 'react';

const Operators = ({ data, loading, analysisText, aiLoading }) => {
  if (loading) return <div className="loading-shimmer" style={{ height: '400px', borderRadius: '20px' }} />;
  if (!data) return <div>No operator data found</div>;

  // Sorted by income descending
  const sortedOperators = [...data].sort((a, b) => b.income - a.income);

  const getPillStyle = (deal) => {
    if (deal.includes('CPA+RS')) return 'pill-amber';
    if (deal.includes('RS+CPA')) return 'pill-green';
    if (deal.includes('RevShare')) return 'pill-blue';
    return '';
  };

  return (
    <div className="operators-tab">
      <div className="glass-card" style={{ padding: 0, marginBottom: '24px' }}>
        {sortedOperators.map((op, i) => (
          <div key={i} className="operator-row">
            <div className="op-info">
              <span className="op-name">{op.name}</span>
              <span className={`pill ${getPillStyle(op.deal)}`}>{op.deal}</span>
            </div>
            <div className="op-stats">
              <span className={`op-income ${op.income < 0 ? 'negative' : ''}`}>
                €{op.income.toLocaleString()}
              </span>
              <span className="op-ngr" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                {op.ftd} FTDs
              </span>
              <span className={`op-ngr ${op.ngr >= 0 ? 'positive' : 'negative'}`}>
                NGR: €{op.ngr.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card ai-analysis">
        {aiLoading ? (
          <div className="loading-shimmer" style={{ height: '80px', borderRadius: '10px' }} />
        ) : (
          <ul style={{ paddingLeft: '16px', margin: 0 }}>
            {(analysisText || []).map((point, i) => (
              <li key={i} style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                {point.replace(/^[•\-\*]\s*/, '')}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Operators;
