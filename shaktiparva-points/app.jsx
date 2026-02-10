const { useState, useEffect } = React;

// Branch color mapping
const branchColors = {
    CS: '#3b82f6',
    ELEC: '#eab308',
    ENTC: '#10b981',
    MECH: '#ef4444',
    INSTRU: '#a855f7',
    MANU: '#f97316',
    META: '#06b6d4',
    CIVIL: '#84cc16',
    'AI&ROBO': '#ec4899'
};

const branches = ['CS', 'ELEC', 'ENTC', 'MECH', 'INSTRU', 'MANU', 'META', 'CIVIL', 'AI&ROBO'];

// Header Component
const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <img src="shaktiparvalogo_withoutbg.png" alt="Shaktiparva Logo" className="header-logo" />
                    <div className="header-text">
                        <h1 className="header-title">SHAKTIPARVA'26</h1>
                        <p className="header-subtitle">Annual Sports Festival - Points Dashboard</p>
                    </div>
                </div>
                <div className="header-flame">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C12 2 8 6 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 6 12 2 12 2Z" fill="url(#flame-gradient)" />
                        <path d="M12 14C12 14 10 16 10 18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18C14 16 12 14 12 14Z" fill="url(#flame-gradient-2)" />
                        <defs>
                            <linearGradient id="flame-gradient" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#f59e0b" />
                                <stop offset="1" stopColor="#ff6b35" />
                            </linearGradient>
                            <linearGradient id="flame-gradient-2" x1="12" y1="14" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#ff6b35" />
                                <stop offset="1" stopColor="#dc2626" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </header>
    );
};

// Points Breakdown Modal Component
const PointsModal = ({ isOpen, onClose, branch, year, breakdown, totalBreakdown }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title-section">
                        <div className="modal-branch-badge" style={{ backgroundColor: branchColors[branch] }}>
                            {branch}
                        </div>
                        <h3 className="modal-title">{year === 'TOTAL' ? 'Overall Points Breakdown' : `${year} - Points Breakdown`}</h3>
                    </div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                
                <div className="modal-body">
                    {year === 'TOTAL' && totalBreakdown ? (
                        // Year-wise breakdown for total
                        <div className="year-wise-breakdown">
                            {Object.entries(totalBreakdown).map(([yr, sports]) => {
                                const yearPoints = Object.values(sports).reduce((sum, pts) => sum + pts, 0);
                                if (yearPoints === 0) return null;
                                
                                return (
                                    <div key={yr} className="year-breakdown-section">
                                        <h4 className="year-breakdown-title">{yr}</h4>
                                        <div className="sports-grid">
                                            {Object.entries(sports)
                                                .filter(([sport, pts]) => pts > 0)
                                                .sort(([, a], [, b]) => b - a)
                                                .map(([sport, points]) => (
                                                    <div key={sport} className="sport-item">
                                                        <span className="sport-name">{sport}</span>
                                                        <span className="sport-points">{points} pts</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // Sport breakdown for individual year
                        <div className="sports-grid">
                            {breakdown && Object.entries(breakdown)
                                .filter(([sport, points]) => points > 0)
                                .sort(([, a], [, b]) => b - a)
                                .map(([sport, points]) => (
                                    <div key={sport} className="sport-item">
                                        <span className="sport-name">{sport}</span>
                                        <span className="sport-points">{points} pts</span>
                                    </div>
                                ))
                            }
                            {(!breakdown || Object.values(breakdown).every(p => p === 0)) && (
                                <div className="no-data">No points earned yet</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Table Component
const PointsTable = ({ year, data, onPointsClick }) => {
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (data) {
            const sorted = [...Object.entries(data)].sort((a, b) => {
                const pointsA = Object.values(a[1]).reduce((sum, pts) => sum + pts, 0);
                const pointsB = Object.values(b[1]).reduce((sum, pts) => sum + pts, 0);
                return pointsB - pointsA;
            });
            setSortedData(sorted);
        }
    }, [data]);

    return (
        <div className="table-container">
            <div className="table-header-section">
                <h2 className="table-title">{year}</h2>
                <div className="table-subtitle">Points Distribution</div>
            </div>
            
            <div className="table-wrapper">
                <table className="points-table">
                    <thead>
                        <tr>
                            <th className="rank-col">Rank</th>
                            <th className="branch-col">Branch</th>
                            <th className="points-col">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map(([branch, breakdown], index) => {
                            const totalPoints = Object.values(breakdown).reduce((sum, pts) => sum + pts, 0);
                            return (
                                <tr key={branch} className="table-row">
                                    <td className="rank-cell">
                                        <div className="rank-badge" style={{
                                            background: index === 0 ? 'linear-gradient(135deg, #ffd700, #ffed4e)' :
                                                       index === 1 ? 'linear-gradient(135deg, #c0c0c0, #e8e8e8)' :
                                                       index === 2 ? 'linear-gradient(135deg, #cd7f32, #daa06d)' :
                                                       'var(--bg-secondary)',
                                            color: index < 3 ? '#000' : '#fff'
                                        }}>
                                            {index + 1}
                                        </div>
                                    </td>
                                    <td className="branch-cell">
                                        <div className="branch-info">
                                            <div className="branch-color-bar" style={{ backgroundColor: branchColors[branch] }}></div>
                                            <span className="branch-name">{branch}</span>
                                        </div>
                                    </td>
                                    <td className="points-cell">
                                        <button 
                                            className="points-button"
                                            onClick={() => onPointsClick(branch, year, breakdown)}
                                            style={{ 
                                                borderColor: branchColors[branch],
                                                '--hover-color': branchColors[branch]
                                            }}
                                        >
                                            <span className="points-value">{totalPoints}</span>
                                            <span className="points-label">pts</span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    const [data, setData] = useState(null);
    const [modalState, setModalState] = useState({
        isOpen: false,
        branch: null,
        year: null,
        breakdown: null,
        totalBreakdown: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading and fetch data
        setTimeout(() => {
            fetch('data.json')
                .then(response => response.json())
                .then(jsonData => {
                    setData(jsonData);
                    setLoading(false);
                    document.getElementById('loader').style.display = 'none';
                })
                .catch(error => {
                    console.error('Error loading data:', error);
                    setLoading(false);
                    document.getElementById('loader').style.display = 'none';
                });
        }, 1500);
    }, []);

    const handlePointsClick = (branch, year, breakdown) => {
        if (year === 'TOTAL') {
            // For total, show year-wise breakdown
            const totalBreakdown = {
                FY: data.FY[branch] || {},
                SY: data.SY[branch] || {},
                TY: data.TY[branch] || {},
                LY: data.LY[branch] || {}
            };
            setModalState({
                isOpen: true,
                branch,
                year,
                breakdown: null,
                totalBreakdown
            });
        } else {
            setModalState({
                isOpen: true,
                branch,
                year,
                breakdown,
                totalBreakdown: null
            });
        }
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            branch: null,
            year: null,
            breakdown: null,
            totalBreakdown: null
        });
    };

    if (loading || !data) {
        return null;
    }

    return (
        <div className="app">
            <Header />
            
            <main className="main-content">
                <div className="tables-grid">
                    <PointsTable year="FIRST YEAR" data={data.FY} onPointsClick={handlePointsClick} />
                    <PointsTable year="SECOND YEAR" data={data.SY} onPointsClick={handlePointsClick} />
                    <PointsTable year="THIRD YEAR" data={data.TY} onPointsClick={handlePointsClick} />
                    <PointsTable year="FINAL YEAR" data={data.LY} onPointsClick={handlePointsClick} />
                </div>

                <div className="total-section">
                    <PointsTable year="TOTAL" data={data.TOTAL} onPointsClick={handlePointsClick} />
                </div>
            </main>

            <PointsModal 
                isOpen={modalState.isOpen}
                onClose={closeModal}
                branch={modalState.branch}
                year={modalState.year}
                breakdown={modalState.breakdown}
                totalBreakdown={modalState.totalBreakdown}
            />

            <footer className="footer">
                <p>Shaktiparva'26 - Annual Sports Festival</p>
                <p className="footer-note">Data updates daily after match completion</p>
            </footer>
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
