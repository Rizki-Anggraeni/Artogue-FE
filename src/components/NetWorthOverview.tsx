import { useState, useEffect } from "react";
import { api } from "../lib/api";

export function NetWorthOverview() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };
    fetchDashboard();

    window.addEventListener("dashboard-update", fetchDashboard);
    return () => window.removeEventListener("dashboard-update", fetchDashboard);
  }, []);

  const totalNetWorth = summary?.totalNetWorth || 0;
  const totalRekening = summary?.summaryByPlatform?.length || 0;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Net Worth Card */}
      <div className="relative p-6 overflow-hidden shadow-lg lg:col-span-2 md:p-8 rounded-2xl bg-gradient-to-br from-primary via-primary-container to-surface-tint text-on-primary hover-lift animate-in delay-1 net-worth-glow">
        <div className="absolute top-0 right-0 w-64 h-64 -mt-20 -mr-20 rounded-full bg-white/10 blur-3xl orb-float"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 rounded-full bg-white/5 blur-2xl"></div>
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 tracking-wider uppercase font-label-md text-label-md opacity-80">
                Total Net Worth
              </p>
              <h3 className="tracking-tight font-headline-lg text-headline-lg">
                Rp {Number(totalNetWorth).toLocaleString("id-ID")}
              </h3>
            </div>
            <span className="material-symbols-outlined text-white/30 text-[48px]">
              account_balance_wallet
            </span>
          </div>
          {/* <div className="flex flex-wrap items-center gap-4 mt-8">
            <span className="flex items-center gap-1 px-4 py-1.5 bg-white/20 rounded-full font-label-md text-label-md backdrop-blur-sm">—</span>
            <p className="text-sm opacity-80">dibanding bulan lalu</p>
          </div> */}
        </div>
      </div>

      {/* Total Accounts Card */}
      <div className="flex flex-col justify-center p-6 border bg-surface-container-lowest dark:bg-dark-card md:p-8 rounded-2xl border-outline-variant dark:border-white/10 hover-lift animate-in delay-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-container dark:bg-primary/20 text-primary dark:text-primary-fixed-dim">
            <span className="material-symbols-outlined text-[28px]">
              account_balance
            </span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant">
              Total Rekening
            </p>
            <h3 className="font-headline-md text-headline-md dark:text-white">
              {totalRekening}
            </h3>
          </div>
        </div>
        <div className="space-y-4">
          {/* <div className="flex items-center justify-between text-body-sm"><span className="text-on-surface-variant dark:text-on-surface-variant">Perbankan</span><span className="font-bold text-on-surface dark:text-white">Rp {Number(perbankanTotal).toLocaleString('id-ID')}</span></div>
          <div className="w-full h-2 overflow-hidden rounded-full bg-surface-container dark:bg-white/5"><div className="h-2 transition-all duration-700 rounded-full bg-primary dark:bg-primary-fixed-dim" style={{ width: `${perbankanPct}%` }}></div></div>
          <div className="flex items-center justify-between text-body-sm"><span className="text-on-surface-variant dark:text-on-surface-variant">Investasi</span><span className="font-bold text-on-surface dark:text-white">Rp {Number(investasiTotal).toLocaleString('id-ID')}</span></div>
          <div className="w-full h-2 overflow-hidden rounded-full bg-surface-container dark:bg-white/5"><div className="h-2 transition-all duration-700 rounded-full bg-tertiary-container dark:bg-tertiary-fixed-dim" style={{ width: `${investasiPct}%` }}></div></div> */}
        </div>
      </div>
    </div>
  );
}
