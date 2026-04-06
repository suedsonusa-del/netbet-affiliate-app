import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchData, generateAIAnalysis } from './api';

// Components
import Overview from './components/Overview';
import Operators from './components/Operators';
import Trends from './components/Trends';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [market, setMarket] = useState('Brazil');
  const [period, setPeriod] = useState('Last 30 days');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="app-container">
      <main className="content-area">
        <header className="main-header">
          <h1>{activeTab}</h1>
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
