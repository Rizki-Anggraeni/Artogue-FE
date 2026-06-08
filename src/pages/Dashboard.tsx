import { useEffect } from "react";
import { TopBar } from "../components/TopBar";
import { NetWorthOverview } from "../components/NetWorthOverview";
import { AssetCharts } from "../components/AssetCharts";
import { AccountList } from "../components/AccountList";

export function Dashboard() {
  useEffect(() => {
    // Auto refresh data dashboard secara berkala (setiap 60 detik)
    const interval = setInterval(() => {
      window.dispatchEvent(new Event("dashboard-update"));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-shell">
      <main className="min-h-screen page-content">
        <TopBar />

        <div className="relative z-10 max-w-5xl px-6 py-8 mx-auto space-y-8 md:px-8">
          <NetWorthOverview />
          <AssetCharts />
          <AccountList />
        </div>
      </main>
    </div>
  );
}
