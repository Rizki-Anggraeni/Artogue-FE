export function PortfolioSummary() {
  return (
    <div className="rounded-2xl p-6 md:p-8 animate-in bg-gradient-to-br from-primary/5 via-primary/5 to-transparent border border-primary/10 dark:from-primary/15 dark:via-primary/5 dark:border-white/5">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
        <div>
          <p className="font-label-sm text-label-sm text-primary dark:text-primary-fixed-dim font-semibold uppercase tracking-wider mb-1">Ringkasan Portofolio</p>
          <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">Kekayaan Anda</h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <label className="period-select" title="Pilih periode laporan">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span className="period-select__label">—</span>
            <input type="month" className="period-select__input" aria-label="Pilih bulan dan tahun" />
          </label>
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant mt-1">Oktober 2025 – Mei 2026</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white/70 dark:bg-[#1c1b1b]/90 border border-outline-variant/50 dark:border-white/10 rounded-xl px-4 py-3 transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant">Net Worth</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mt-0.5">—</p>
        </div>
        <div className="bg-white/70 dark:bg-[#1c1b1b]/90 border border-outline-variant/50 dark:border-white/10 rounded-xl px-4 py-3 transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant">Rekening</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mt-0.5">—</p>
        </div>
        <div className="bg-white/70 dark:bg-[#1c1b1b]/90 border border-outline-variant/50 dark:border-white/10 rounded-xl px-4 py-3 transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <p className="font-label-sm text-label-sm text-on-surface-variant dark:text-on-surface-variant">Jenis Aset</p>
          <p className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold mt-0.5">—</p>
        </div>
        <div className="bg-white/70 dark:bg-[#1c1b1b]/90 border border-emerald-200/60 dark:border-emerald-500/20 rounded-xl px-4 py-3 transition-transform hover:-translate-y-0.5 hover:shadow-md">
          <p className="font-label-sm text-label-sm text-emerald-700 dark:text-emerald-400">Pertumbuhan</p>
          <p className="font-headline-md text-headline-md text-emerald-700 dark:text-emerald-400 font-bold mt-0.5 flex items-center gap-0.5">—</p>
        </div>
      </div>
    </div>
  );
}