import { useState, useCallback } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Header } from './Header';
import { SurveyForm } from './SurveyForm';
import { StatisticsPanel } from './StatisticsPanel';
import '../styles/IncomeSurveyApp.css';

export function IncomeSurveyApp() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'survey' | 'statistics'>('survey');
  const [forceRefresh, setForceRefresh] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSurveySubmitted = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);
      // Trigger StatisticsPanel to refresh its data
      setForceRefresh(prev => prev + 1);
    } catch (err) {
      setError('Failed to process survey submission. Please try again.');
      console.error('Survey submission error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="income-survey-app">
      <Header />

      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="main-content">
        {!isConnected ? (
          <div className="connect-wallet-container">
            <h2 className="connect-wallet-title">
              Connect Your Wallet
            </h2>
            <p className="connect-wallet-description">
              Please connect your wallet to participate in the privacy-preserving income survey
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div>
            <div className="tab-navigation">
              <nav className="tab-nav">
                <button
                  onClick={() => setActiveTab('survey')}
                  className={`tab-button ${activeTab === 'survey' ? 'active' : 'inactive'}`}
                >
                  Take Survey
                </button>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className={`tab-button ${activeTab === 'statistics' ? 'active' : 'inactive'}`}
                >
                  View Statistics
                </button>
              </nav>
            </div>

            {activeTab === 'survey' && (
              <div className={isLoading ? 'loading-overlay' : ''}>
                <SurveyForm onSurveySubmitted={handleSurveySubmitted} />
                {isLoading && <div className="loading-indicator">Processing...</div>}
              </div>
            )}
            {activeTab === 'statistics' && <StatisticsPanel forceRefresh={forceRefresh} />}
          </div>
        )}
      </main>
    </div>
  );
}
