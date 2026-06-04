import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchData, generateAIAnalysis } from './api';

// Components
import Overview from './components/Overview';
import Operators from './components/Operators';
import Trends from './components/Trends';
import ReportBuilder from './components/ReportBuilder';

function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [activeTab, setActiveTab] = useState('Overview');
  const [market, setMarket] = useState('Brazil');
  const [period, setPeriod] = useState('Last Month');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    // Listen to custom pushstate/replacestate events to update state within SPA navigation
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;
    window.history.pushState = function(...args) {
      originalPush.apply(this, args);
      handleLocationChange();
    };
    window.history.replaceState = function(...args) {
      originalReplace.apply(this, args);
      handleLocationChange();
    };
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
  }, []);


  const [analysisText, setAnalysisText] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setData(null);
      setAnalysisText(null);
      
      const result = await fetchData(market, period);
      if (result) {
        setData(result);
        setAiLoading(true);
        const res = await generateAIAnalysis(market, period);
        setAnalysisText(res);
        setAiLoading(false);
      }
      setLoading(false);
    }
    loadData();
  }, [market, period]);

  const tabs = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Operators', icon: Users },
    { name: 'Trends', icon: TrendingUp },
  ];

  if (route === '/report') {
    return <ReportBuilder />;
  }

  return (
    <div className="app-container">
      <main className="content-area">
        <header className="main-header">
          <div>
            <h1>{activeTab}</h1>
            <button 
              onClick={() => window.history.pushState({}, '', '/report')}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '11px',
                padding: '4px 8px',
                cursor: 'pointer',
                marginTop: '4px',
                display: 'inline-block',
                fontFamily: 'inherit'
              }}
            >
              Report Builder
            </button>
          </div>
          <div className="market-switcher">
            {['Brazil', 'India'].map(m => (
              <button 
                key={m}
                className={`market-btn ${market === m ? 'active' : ''}`}
                onClick={() => setMarket(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </header>

        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + market}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Overview' && (
              <Overview 
                data={data?.totals} 
                loading={loading} 
                period={period} 
                onPeriodChange={setPeriod} 
              />
            )}
            {activeTab === 'Operators' && (
              <Operators 
                data={data?.operators} 
                loading={loading} 
                analysisText={analysisText} 
                aiLoading={aiLoading} 
              />
            )}
            {activeTab === 'Trends' && (
              <Trends 
                data={data?.monthlyTrend} 
                loading={loading} 
                lookerUrl={data?.lookerUrl}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`nav-item ${activeTab === tab.name ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            <tab.icon strokeWidth={activeTab === tab.name ? 2.5 : 2} />
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
