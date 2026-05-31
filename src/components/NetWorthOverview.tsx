import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export function NetWorthOverview() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setSummary(res.data);
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      }
    };
    fetchDashboard();

    window.addEventListener('dashboard-update', fetchDashboard);
    return () => window.removeEventListener('dashboard-update', fetchDashboard);
  }, []);

  const totalNetWorth = summary?.totalNetWorth || 0;
  const totalRekening = summary?.summaryByPlatform?.length || 0;
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Net Worth Card */}
      <div className="lg:col-span-2 relative overflow-hidden p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary via-primary-container to-surface-tint text-on-primary shadow-lg hover-lift animate-in delay-1 net-worth-glow">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl orb-float"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-10 -mb-10 blur-2xl"></div>
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-label-md text-label-md uppercase tracking-wider opacity-80 mb-1">Total Net Worth</p>
              <h3 className="font-headline-lg text-headline-lg tracking-tight">Rp {Number(totalNetWorth).toLocaleString('id-ID')}</h3>
            </div>
            <span className="material-symbols-outlined text-white/30 text-[48px]">account_balance_wallet</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1 px-4 py-1.5 bg-white/20 rounded-full font-label-md text-label-md backdrop-blur-sm">—</span>
            <p className="text-sm opacity-80">dibanding bulan lalu</p>
          </div>
        </div>
      </div>
      
      {/* Total Accounts Card */}
      <div className="bg-surface-container-lowest dark:bg-dark-card p-6 md:p-8 rounded-2xl border border-outline-variant dark:border-white/10 flex flex-col justify-center hover-lift animate-in delay-2">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-secondary-container dark:bg-primary/20 flex items-center justify-center text-primary dark:text-primary-fixed-dim">
            <span className="material-symbols-outlined text-[28px]">account_balance</span>
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant">Total Rekening</p>
            <h3 className="font-headline-md text-headline-md dark:text-white">{totalRekening}</h3>
          </div>
        </div>
        <div className="space-y-4">
          {/* <div className="flex justify-between items-center text-body-sm"><span className="text-on-surface-variant dark:text-on-surface-variant">Perbankan</span><span className="font-bold text-on-surface dark:text-white">Rp {Number(perbankanTotal).toLocaleString('id-ID')}</span></div>
          <div className="w-full bg-surface-container dark:bg-white/5 rounded-full h-2 overflow-hidden"><div className="bg-primary dark:bg-primary-fixed-dim h-2 rounded-full transition-all duration-700" style={{ width: `${perbankanPct}%` }}></div></div>
          <div className="flex justify-between items-center text-body-sm"><span className="text-on-surface-variant dark:text-on-surface-variant">Investasi</span><span className="font-bold text-on-surface dark:text-white">Rp {Number(investasiTotal).toLocaleString('id-ID')}</span></div>
          <div className="w-full bg-surface-container dark:bg-white/5 rounded-full h-2 overflow-hidden"><div className="bg-tertiary-container dark:bg-tertiary-fixed-dim h-2 rounded-full transition-all duration-700" style={{ width: `${investasiPct}%` }}></div></div> */}
        </div>
      </div>
    </div>
  );
}