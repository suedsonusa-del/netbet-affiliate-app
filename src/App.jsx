import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchData } from './api';

// Components
import Overview from './components/Overview';
import Operators from './components/Operators';
import Trends from './components/Trends';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await fetchData();
      if (result) {
        setData(result);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const tabs = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Operators', icon: Users },
    { name: 'Trends', icon: TrendingUp },
  ];

  return (
    <div className="app-container">
      <main className="content-area">
        <h1>{activeTab}</h1>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'Overview' && (
              <Overview data={data?.totals} allData={data} loading={loading} />
            )}
            {activeTab === 'Operators' && <Operators data={data?.operators} loading={loading} />}
            {activeTab === 'Trends' && <Trends data={data?.monthlyTrend} loading={loading} />}
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
