import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Trash2, Mail, RefreshCw, Layers } from 'lucide-react';

const INITIAL_MARKETS = [
  {
    id: 'brazil',
    name: 'Brazil',
    flag: '🇧🇷',
    status: 'live',
    months: [
      { month: 'May 2026', commission: '€14,850', net: '€37,125', paid: 'Paid' },
      { month: 'April 2026', commission: '€12,200', net: '€30,500', paid: 'Paid' },
      { month: 'March 2026', commission: '€11,900', net: '€29,750', paid: 'Paid' }
    ],
    notes: 'Strong performance driven by local campaigns. Scaling up operations next month.'
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    status: 'launching',
    months: [
      { month: 'May 2026', commission: '€4,200', net: '€10,500', paid: 'Pending' },
      { month: 'April 2026', commission: '€3,100', net: '€7,750', paid: 'Paid' }
    ],
    notes: 'Currently launching new acquisition channels. Initial CTR is promising.'
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    status: 'live',
    months: [
      { month: 'May 2026', commission: '€8,900', net: '€22,250', paid: 'Paid' },
      { month: 'April 2026', commission: '€9,100', net: '€22,750', paid: 'Paid' }
    ],
    notes: 'Stable market with consistent user value. Optimization of CRM flow ongoing.'
  },
  {
    id: 'denmark',
    name: 'Denmark',
    flag: '🇩🇰',
    status: 'new',
    months: [
      { month: 'May 2026', commission: '€1,500', net: '€3,750', paid: 'Pending' }
    ],
    notes: 'New market entry. Setting up affiliate relationships and compliance checks.'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    flag: '🇲🇽',
    status: 'launching',
    months: [
      { month: 'May 2026', commission: '€3,800', net: '€9,500', paid: 'Paid' }
    ],
    notes: 'Launching localized site variants. High conversion rates observed in early cohorts.'
  }
];

const INITIAL_ACTIONS = [
  "Review underperforming sub-affiliates in Denmark",
  "Approve marketing budget increase for Brazil paid media campaigns",
  "Finalize contract terms for new India onboarding partnership",
  "Translate promotional banners for Mexico launch"
];

// Helper to generate Outlook-compatible HTML
const generateHtmlEmail = (markets, actions) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Performance Report</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f7; width: 100%; border-collapse: collapse; margin: 0; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Wrapper Card -->
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e1e1e8; border-radius: 12px; overflow: hidden; border-collapse: separate;">
          <!-- Header -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 32px; border-bottom: 3px solid #10b981;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; letter-spacing: -0.5px;">Affiliate Markets Report</h1>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">Clearfield.group — Prepared for GIMO / NetBet · Confidential</p>
                  </td>
                  <td align="right" valign="middle" style="font-size: 10px; font-weight: bold; color: #10b981; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">
                    CONFIDENTIAL
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 32px 28px 32px; background-color: #ffffff;">
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #334155; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
                Please find below the current performance metrics and status report for our active affiliate markets.
              </p>
              
              <!-- Markets Loop -->
              ${markets.map((m, index) => {
                const statusColors = {
                  live: { bg: '#dcfce7', text: '#15803d', label: 'Live' },
                  launching: { bg: '#eff6ff', text: '#1d4ed8', label: 'Launching' },
                  new: { bg: '#fef3c7', text: '#b45309', label: 'New' }
                };
                const sc = statusColors[m.status] || statusColors.new;
                
                return `
                <div style="margin-bottom: 32px; ${index < markets.length - 1 ? 'border-bottom: 1px solid #f1f5f9; padding-bottom: 24px;' : ''}">
                  <!-- Market Header -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 14px; border-collapse: collapse;">
                    <tr>
                      <td style="font-size: 17px; font-weight: 700; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; line-height: 1.2;">
                        <span style="font-size: 20px; margin-right: 8px; vertical-align: middle;">${m.flag || ''}</span>
                        <span style="vertical-align: middle;">${m.name}</span>
                      </td>
                      <td align="right" valign="middle">
                        <span style="background-color: ${sc.bg}; color: ${sc.text}; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 99px; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; display: inline-block;">
                          ${sc.label}
                        </span>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Monthly Data Table -->
                  ${m.months && m.months.length > 0 ? `
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse: collapse; width: 100%; margin-bottom: 14px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <thead>
                      <tr style="background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                        <th align="left" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">Month</th>
                        <th align="right" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">Commission</th>
                        <th align="right" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">Net Revenue</th>
                        <th align="center" style="padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${m.months.map((row, idx) => `
                        <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'}; border-bottom: 1px solid #f1f5f9;">
                          <td style="padding: 10px 14px; font-size: 13px; color: #334155; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">${row.month}</td>
                          <td align="right" style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #059669; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">${row.commission}</td>
                          <td align="right" style="padding: 10px 14px; font-size: 13px; color: #475569; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">${row.net}</td>
                          <td align="center" style="padding: 10px 14px; font-size: 12px; font-weight: 600; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; border: 1px solid #e2e8f0;">
                            ${row.paid === 'Paid' ? `
                              <span style="color: #059669;">Paid</span>
                            ` : row.paid === 'Pending' ? `
                              <span style="color: #2563eb;">Pending</span>
                            ` : `
                              <span style="color: #d97706;">On Hold</span>
                            `}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                  ` : `
                  <p style="margin: 0 0 14px 0; font-size: 13px; color: #94a3b8; font-style: italic; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
                    No performance data logged yet.
                  </p>
                  `}
                  
                  <!-- Notes Box -->
                  ${m.notes ? `
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 14px 16px; font-size: 13px; line-height: 1.5; color: #475569; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
                        <strong style="color: #1e293b; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Pipeline Update:</strong>
                        ${m.notes}
                      </td>
                    </tr>
                  </table>
                  ` : ''}
                </div>
                `;
              }).join('')}
              
              <!-- Action Items / Focus flags -->
              ${actions && actions.length > 0 ? `
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top: 8px; background-color: #f1f5f9; border-radius: 10px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Action Items & Flags</h3>
                    <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.6;">
                      ${actions.map(action => `
                        <li style="margin-bottom: 6px;">${action}</li>
                      `).join('')}
                    </ul>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
              This performance report is confidential. Generated via Performance Report Builder.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

// Helper to generate Plain-text fallback
const generatePlaintextEmail = (markets, actions) => {
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  let text = `==================================================\n`;
  text += `AFFILIATE MARKETS REPORT - ${dateStr.toUpperCase()}\n`;
  text += `Clearfield.group — Prepared for GIMO / NetBet · Confidential\n`;
  text += `==================================================\n\n`;
  
  text += `Please find below the current performance metrics and status report for our active affiliate markets.\n\n`;
  
  markets.forEach(m => {
    const statusLabel = m.status.toUpperCase();
    text += `--------------------------------------------------\n`;
    text += `${m.flag || ''} ${m.name.toUpperCase()} [Status: ${statusLabel}]\n`;
    text += `--------------------------------------------------\n`;
    
    if (m.months && m.months.length > 0) {
      m.months.forEach(row => {
        text += `- ${row.month}: Commission: ${row.commission} | Net Rev: ${row.net} | Status: ${row.paid}\n`;
      });
    } else {
      text += `No performance data logged yet.\n`;
    }
    
    if (m.notes) {
      text += `\nPipeline Update: ${m.notes}\n`;
    }
    text += `\n`;
  });
  
  if (actions && actions.length > 0) {
    text += `==================================================\n`;
    text += `ACTION ITEMS & FLAGS\n`;
    text += `==================================================\n`;
    actions.forEach((action, idx) => {
      text += `${idx + 1}. ${action}\n`;
    });
  }
  
  return text;
};

export default function ReportBuilder() {
  const [markets, setMarkets] = useState(() => {
    const stored = localStorage.getItem('netbet_report_markets');
    return stored ? JSON.parse(stored) : INITIAL_MARKETS;
  });

  const [actions, setActions] = useState(() => {
    const stored = localStorage.getItem('netbet_report_actions');
    return stored ? JSON.parse(stored) : INITIAL_ACTIONS;
  });

  const [activeMarketId, setActiveMarketId] = useState(() => {
    return markets.length > 0 ? markets[0].id : '';
  });

  const [newActionText, setNewActionText] = useState('');

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem('netbet_report_markets', JSON.stringify(markets));
  }, [markets]);

  useEffect(() => {
    localStorage.setItem('netbet_report_actions', JSON.stringify(actions));
  }, [actions]);

  const activeMarket = markets.find(m => m.id === activeMarketId) || null;

  const handleBackToDashboard = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all report data to the default settings? This will overwrite your current changes.")) {
      setMarkets(INITIAL_MARKETS);
      setActions(INITIAL_ACTIONS);
      if (INITIAL_MARKETS.length > 0) {
        setActiveMarketId(INITIAL_MARKETS[0].id);
      }
    }
  };

  const updateActiveMarketField = (field, value) => {
    setMarkets(prev => prev.map(m => {
      if (m.id === activeMarketId) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  const addMonthlyRow = () => {
    if (!activeMarket) return;
    const newRow = { month: 'New Month', commission: '€0', net: '€0', paid: 'Pending' };
    setMarkets(prev => prev.map(m => {
      if (m.id === activeMarketId) {
        return { ...m, months: [...(m.months || []), newRow] };
      }
      return m;
    }));
  };

  const updateMonthlyRowField = (rowIndex, field, value) => {
    setMarkets(prev => prev.map(m => {
      if (m.id === activeMarketId) {
        const updatedMonths = m.months.map((row, idx) => {
          if (idx === rowIndex) {
            return { ...row, [field]: value };
          }
          return row;
        });
        return { ...m, months: updatedMonths };
      }
      return m;
    }));
  };

  const deleteMonthlyRow = (rowIndex) => {
    setMarkets(prev => prev.map(m => {
      if (m.id === activeMarketId) {
        return { ...m, months: m.months.filter((_, idx) => idx !== rowIndex) };
      }
      return m;
    }));
  };

  const addMarket = () => {
    const newId = 'market-' + Date.now();
    const newMarket = {
      id: newId,
      name: 'New Market',
      flag: '🏳️',
      status: 'new',
      months: [],
      notes: ''
    };
    setMarkets(prev => [...prev, newMarket]);
    setActiveMarketId(newId);
  };

  const deleteMarket = (marketId) => {
    if (markets.length <= 1) {
      alert("You must keep at least one market in the report.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this market from the report builder?")) {
      const remaining = markets.filter(m => m.id !== marketId);
      setMarkets(remaining);
      if (activeMarketId === marketId) {
        setActiveMarketId(remaining[0].id);
      }
    }
  };

  const addActionItem = (e) => {
    e.preventDefault();
    if (!newActionText.trim()) return;
    setActions(prev => [...prev, newActionText.trim()]);
    setNewActionText('');
  };

  const deleteActionItem = (index) => {
    setActions(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleExport = () => {
    const htmlContent = generateHtmlEmail(markets, actions);
    const textContent = generatePlaintextEmail(markets, actions);

    const exportWindow = window.open('', '_blank');
    if (!exportWindow) {
      alert("Pop-up blocked! Please allow pop-ups for this website to view the export page.");
      return;
    }

    exportWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Performance Report Email Export</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background-color: #f5f5f7;
              color: #1d1d1f;
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
            }
            .instructions {
              background-color: #e8f5e9;
              border-left: 4px solid #2e7d32;
              padding: 16px;
              margin-bottom: 24px;
              border-radius: 4px;
              font-size: 14px;
              line-height: 1.5;
            }
            .instructions h3 {
              margin: 0 0 8px 0;
              color: #1b5e20;
            }
            .section-card {
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.05);
              padding: 30px;
              margin-bottom: 30px;
              border: 1px solid #e3e3e8;
            }
            .section-title {
              font-size: 18px;
              font-weight: 600;
              margin-top: 0;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #f0f0f5;
              color: #333;
            }
            textarea {
              width: 100%;
              height: 250px;
              font-family: monospace;
              padding: 12px;
              border: 1px solid #d2d2d7;
              border-radius: 8px;
              box-sizing: border-box;
              background-color: #f9f9fb;
              color: #1d1d1f;
              font-size: 13px;
              resize: vertical;
            }
            .button-bar {
              margin-bottom: 20px;
              display: flex;
              gap: 12px;
            }
            .btn {
              background-color: #10b981;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 14px;
              font-weight: 600;
              border-radius: 6px;
              cursor: pointer;
              text-decoration: none;
              display: inline-block;
              font-family: inherit;
            }
            .btn:hover {
              background-color: #059669;
            }
            .btn-secondary {
              background-color: #64748b;
            }
            .btn-secondary:hover {
              background-color: #475569;
            }
            .preview-container {
              border: 1px solid #e2e8f0;
              background: #ffffff;
              padding: 10px;
              border-radius: 8px;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="instructions">
              <h3>Copying for Outlook:</h3>
              <p><strong>Option A (Styled Email):</strong> Click the green <strong>"Select Styled Report"</strong> button, copy (Ctrl+C / Cmd+C), and paste directly into Outlook. The formatting, colors, status tags, and tables will transfer perfectly.</p>
              <p><strong>Option B (Plain Text):</strong> Click inside the text box at the bottom to auto-select, copy, and paste into a plain text email.</p>
            </div>
            
            <div class="button-bar">
              <button class="btn" onclick="selectElementContents(document.getElementById('email-preview'))">Select Styled Report</button>
              <button class="btn btn-secondary" onclick="window.close()">Close</button>
            </div>

            <div class="section-card">
              <div class="section-title">Rich Email Preview (Outlook Compatible)</div>
              <div class="preview-container" id="email-preview">
                ${htmlContent}
              </div>
            </div>

            <div class="section-card">
              <div class="section-title">Plain Text Fallback</div>
              <textarea readonly onclick="this.select()">${textContent}</textarea>
              <p style="font-size: 12px; color: #86868b; margin-top: 8px;">Click inside the text box to select all text, then copy.</p>
            </div>
          </div>

          <script>
            function selectElementContents(el) {
              var body = document.body, range, sel;
              if (document.createRange && window.getSelection) {
                range = document.createRange();
                sel = window.getSelection();
                sel.removeAllRanges();
                try {
                  range.selectNodeContents(el);
                  sel.addRange(range);
                } catch (e) {
                  range.selectNode(el);
                  sel.addRange(range);
                }
              } else if (body.createTextRange) {
                range = body.createTextRange();
                range.moveToElementText(el);
                range.select();
              }
            }
          </script>
        </body>
      </html>
    `);
    exportWindow.document.close();
  };

  const htmlPreviewDoc = generateHtmlEmail(markets, actions);

  return (
    <div className="report-app-container">
      {/* Navbar Header */}
      <header className="report-navbar">
        <div className="navbar-left">
          <button className="back-btn" onClick={handleBackToDashboard}>
            <ChevronLeft size={20} />
            <span>Dashboard</span>
          </button>
          <span className="navbar-divider">|</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <h1 className="report-navbar-title" style={{ margin: 0, lineHeight: 1.2 }}>Affiliate Markets Report</h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#a0a0a0', fontWeight: 'normal', opacity: 0.8 }}>
              Clearfield.group — Prepared for GIMO / NetBet · Confidential
            </p>
          </div>
        </div>
        
        <div className="navbar-actions">
          <button className="action-btn secondary-btn" onClick={handleResetToDefaults}>
            <RefreshCw size={16} />
            <span>Reset Defaults</span>
          </button>
          <button className="action-btn primary-btn" onClick={handleExport}>
            <Mail size={16} />
            <span>Export Email</span>
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="report-panels">
        {/* Left Panel: Editor */}
        <aside className="editor-panel">
          <div className="panel-section">
            <div className="section-header">
              <h2>Active Markets</h2>
              <button className="add-market-btn" onClick={addMarket}>
                <Plus size={16} />
                <span>Add</span>
              </button>
            </div>

            <div className="market-tabs">
              {markets.map(m => (
                <div 
                  key={m.id} 
                  className={`market-tab-wrapper ${m.id === activeMarketId ? 'active' : ''}`}
                >
                  <button 
                    className="market-tab-btn" 
                    onClick={() => setActiveMarketId(m.id)}
                  >
                    <span className="market-tab-flag">{m.flag || '🏳️'}</span>
                    <span className="market-tab-name">{m.name}</span>
                  </button>
                  {markets.length > 1 && (
                    <button 
                      className="market-tab-delete" 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMarket(m.id);
                      }}
                      title="Delete Market"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {activeMarket && (
            <div className="panel-section active-market-fields">
              <div className="section-header">
                <h2>Market Settings: {activeMarket.name}</h2>
              </div>
              
              <div className="fields-grid">
                <div className="field-group">
                  <label>Market Name</label>
                  <input 
                    type="text" 
                    value={activeMarket.name} 
                    onChange={e => updateActiveMarketField('name', e.target.value)} 
                    placeholder="e.g. Brazil"
                  />
                </div>
                <div className="field-group">
                  <label>Flag Emoji</label>
                  <input 
                    type="text" 
                    value={activeMarket.flag} 
                    onChange={e => updateActiveMarketField('flag', e.target.value)} 
                    placeholder="e.g. 🇧🇷"
                  />
                </div>
                <div className="field-group">
                  <label>Market Status</label>
                  <select 
                    value={activeMarket.status} 
                    onChange={e => updateActiveMarketField('status', e.target.value)}
                  >
                    <option value="live">Live</option>
                    <option value="launching">Launching</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>

              {/* Monthly Rows */}
              <div className="subsection-header">
                <h3>Monthly Data Rows</h3>
                <button className="add-row-btn" onClick={addMonthlyRow}>
                  <Plus size={14} />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="monthly-rows-table-wrapper">
                <table className="monthly-rows-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Commission</th>
                      <th>Net Revenue</th>
                      <th>Paid Status</th>
                      <th width="40"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMarket.months && activeMarket.months.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <input 
                            type="text" 
                            value={row.month} 
                            onChange={e => updateMonthlyRowField(idx, 'month', e.target.value)}
                            placeholder="e.g. May 2026"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={row.commission} 
                            onChange={e => updateMonthlyRowField(idx, 'commission', e.target.value)}
                            placeholder="e.g. €14,850"
                          />
                        </td>
                        <td>
                          <input 
                            type="text" 
                            value={row.net} 
                            onChange={e => updateMonthlyRowField(idx, 'net', e.target.value)}
                            placeholder="e.g. €37,125"
                          />
                        </td>
                        <td>
                          <select 
                            value={row.paid} 
                            onChange={e => updateMonthlyRowField(idx, 'paid', e.target.value)}
                          >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="On Hold">On Hold</option>
                          </select>
                        </td>
                        <td align="center">
                          <button 
                            className="delete-row-btn" 
                            onClick={() => deleteMonthlyRow(idx)}
                            title="Delete Row"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {(!activeMarket.months || activeMarket.months.length === 0) && (
                      <tr>
                        <td colSpan="5" className="empty-table-msg">
                          No monthly data. Click "Add Row" to populate performance.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pipeline Notes */}
              <div className="field-group textarea-group">
                <label>Pipeline Notes</label>
                <textarea 
                  value={activeMarket.notes || ''} 
                  onChange={e => updateActiveMarketField('notes', e.target.value)} 
                  placeholder="Insert market pipeline comments, updates on sub-affiliates, key traffic changes, etc..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Action Items section */}
          <div className="panel-section action-items-section">
            <div className="section-header">
              <h2>Action Items & Focus Flags</h2>
            </div>
            
            <form onSubmit={addActionItem} className="action-item-form">
              <input 
                type="text"
                value={newActionText}
                onChange={e => setNewActionText(e.target.value)}
                placeholder="Type a new action item or warning flag..."
              />
              <button type="submit" className="add-action-btn">
                <Plus size={16} />
              </button>
            </form>

            <ul className="action-items-list">
              {actions.map((action, idx) => (
                <li key={idx}>
                  <span>{action}</span>
                  <button onClick={() => deleteActionItem(idx)} title="Remove Action">
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
              {actions.length === 0 && (
                <li className="empty-actions-msg">No action items added yet.</li>
              )}
            </ul>
          </div>
        </aside>

        {/* Right Panel: Live Preview */}
        <main className="preview-panel">
          <div className="preview-title-bar">
            <div className="preview-title-left">
              <Layers size={16} className="text-secondary" />
              <span>Email Preview Canvas</span>
            </div>
            <span className="preview-mode-tag">HTML Rendering</span>
          </div>
          
          <div className="iframe-wrapper">
            <iframe 
              title="Report Email Live Preview"
              srcDoc={htmlPreviewDoc} 
              className="preview-iframe"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
