import { getPeriodDates } from '../api';

const Overview = ({ data, loading, period, onPeriodChange }) => {
  const periods = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Month to date', 'Year to date'];
  const { label } = getPeriodDates(period);

  if (loading) return (
    <div className="overview-tab">
      <div className="loading-shimmer" style={{ height: '40px', borderRadius: '100px', marginBottom: '20px' }} />
      <div className="stats-grid">
        {[1, 2, 3, 4].map(i => <div key={i} className="loading-shimmer" style={{ height: '100px', borderRadius: '20px' }} />)}
      </div>
    </div>
  );

  if (!data) return <div>Error loading totals</div>;

  const cards = [
    { label: 'Income', value: `€${data.income.toLocaleString()}` },
    { label: 'NGR', value: `€${data.ngr.toLocaleString()}`, type: data.ngr >= 0 ? 'positive' : 'negative' },
    { label: 'FTDs', value: data.ftd.toLocaleString() },
    { label: 'Effective CPA', value: `€${data.effectiveCpa.toLocaleString()}` },
  ];

  return (
    <div className="overview-tab">
      <div className="period-container">
        <div className="period-selector">
          {periods.map(p => (
            <button
              key={p}
              className={`period-btn ${period === p ? 'active' : ''}`}
              onClick={() => onPeriodChange(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <p className="date-range-label">{period}: <span>{label}</span></p>
      </div>

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
