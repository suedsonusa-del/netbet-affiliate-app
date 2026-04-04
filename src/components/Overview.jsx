import React, { useState, useEffect } from 'react';
import { generateAIAnalysis } from '../api';

const Overview = ({ data, allData, loading }) => {
  const [analysis, setAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (allData && !analysis && !aiLoading) {
      setAiLoading(true);
      generateAIAnalysis().then(res => {
        setAnalysis(res);
        setAiLoading(false);
      });
    }
  }, [allData]);

  if (loading) return <div className="loading-shimmer" style={{ height: '200px', borderRadius: '20px' }} />;
  if (!data) return <div>Error loading totals</div>;

  const cards = [
    { label: 'Income', value: `€${data.income.toLocaleString()}` },
    { label: 'NGR', value: `€${data.ngr.toLocaleString()}`, type: data.ngr >= 0 ? 'positive' : 'negative' },
    { label: 'FTDs', value: data.ftd.toLocaleString() },
    { label: 'Effective CPA', value: `€${data.effectiveCpa.toLocaleString()}` },
  ];

  return (
    <div className="overview-tab">
      <div className="stats-grid">
        {cards.map((card, i) => (
          <div key={i} className="glass-card stat-card">
            <span className="stat-label">{card.label}</span>
            <span className={`stat-value ${card.type || ''}`}>{card.value}</span>
          </div>
        ))}
      </div>
      
      <div className="glass-card ai-analysis">
        {aiLoading ? (
          <div className="loading-shimmer" style={{ height: '80px', borderRadius: '10px' }} />
        ) : (
          <ul style={{ paddingLeft: '16px', margin: 0 }}>
            {(analysis || []).map((point, i) => (
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

export default Overview;
