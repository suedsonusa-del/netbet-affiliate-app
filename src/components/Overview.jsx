const Overview = ({ data, loading }) => {
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
    </div>
  );
};

export default Overview;
