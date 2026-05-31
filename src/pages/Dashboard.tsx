import { useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { NetWorthOverview } from '../components/NetWorthOverview';
import { AssetCharts } from '../components/AssetCharts';
import { AccountList } from '../components/AccountList';

export function Dashboard() {
  useEffect(() => {
    // Auto refresh data dashboard secara berkala (setiap 60 detik)
    const interval = setInterval(() => {
      window.dispatchEvent(new Event('dashboard-update'));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-shell">
      <main className="min-h-screen page-content">
        <TopBar />

        <div className="px-6 md:px-8 py-8 space-y-8 mx-auto max-w-5xl relative z-10">
          {/* <PortfolioSummary /> */}
          <NetWorthOverview />
          <AssetCharts />
          <AccountList />
        </div>
      </main>
    </div>
  );
}