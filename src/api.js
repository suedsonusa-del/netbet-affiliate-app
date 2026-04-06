const MARKETS = {
  Brazil: {
    apiUrl: import.meta.env.VITE_BRAZIL_API_URL,
    lookerUrl: "https://lookerstudio.google.com/u/0/reporting/31668882-7711-4777-8322-632ad8177497/page/rprtF"
  },
  India: {
    apiUrl: import.meta.env.VITE_INDIA_API_URL,
    lookerUrl: "https://lookerstudio.google.com/u/2/reporting/25f3731d-3561-49e9-a577-3f65c70ee897/page/rprtF"
  }
};

export const getPeriodDates = (period) => {
  const end = new Date();
  const start = new Date();
  
  switch (period) {
    case 'Last 7 days':
      start.setDate(end.getDate() - 7);
      break;
    case 'Last 90 days':
      start.setDate(end.getDate() - 90);
      break;
    case 'Month to date':
      start.setDate(1);
      break;
    case 'Year to date':
      start.setMonth(0, 1);
      break;
    case 'Last Month':
      // Move to 1st of current month, then subtract 1 day to get last day of previous month
      end.setDate(0); 
      start.setDate(1); // Still previous month because end is now in previous month
      start.setMonth(end.getMonth());
      start.setFullYear(end.getFullYear());
      start.setDate(1);
      break;
    case 'Last 30 days':
    default:
      start.setDate(end.getDate() - 30);
      break;
  }

  const format = (d) => d.toISOString().split('T')[0];
  const formatLabel = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return {
    start: format(start),
    end: format(end),
    label: `${formatLabel(start)} – ${formatLabel(end)}`
  };
};

export const fetchData = async (market = 'Brazil', period = 'Last Month') => {
  const url = MARKETS[market]?.apiUrl;
  if (!url) return null;

  const { start, end } = getPeriodDates(period);
  // Add timestamp to prevent browser caching of Google redirects
  const fullUrl = `${url}?startDate=${start}&endDate=${end}&_t=${Date.now()}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow'
    });
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return { ...data, lookerUrl: MARKETS[market].lookerUrl };
  } catch (error) {
    console.error(`Error fetching ${market} data:`, error);
    return null;
  }
};

export const generateAIAnalysis = async (market = 'Brazil', period = 'Last Month') => {
  const url = MARKETS[market]?.apiUrl;
  if (!url) return null;

  const { start, end } = getPeriodDates(period);
  const fullUrl = `${url}?action=analysis&_t=${Date.now()}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow'
    });
    
    if (!response.ok) throw new Error(`AI Fetch failed (Status: ${response.status})`);
    
    const data = await response.json();
    
    let points = [];
    if (data && typeof data.analysis === 'string') {
      points = data.analysis.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#'))
        .map(line => line.replace(/\*\*/g, ''))
        .slice(0, 4);
    } else if (Array.isArray(data)) {
      points = data.slice(0, 4);
    }

    return points.length > 0 ? points : ["No intelligence report available for this market yet."];
  } catch (error) {
    console.error(`AI Analysis Error (${market}):`, error);
    return ["Currently unable to generate intelligence report for this market."];
  }
};
