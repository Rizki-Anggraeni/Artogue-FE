export function AssetCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Distribusi Per Jenis Aset */}
      <div className="chart-card p-6 md:p-8 rounded-xl border border-outline-variant/40 dark:border-white/10 hover-lift animate-in delay-2">
        <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-6">Distribusi Per Jenis Aset</h4>
        <div className="chart-pie-wrap relative flex justify-center items-center min-h-[260px] pb-7">
          <canvas id="chart-jenis-aset" className="max-h-[220px] w-full max-w-[300px]" aria-label="Diagram pie distribusi jenis aset"></canvas>
        </div>
        <ul className="mt-4 space-y-2.5 border-t border-outline-variant/30 dark:border-white/10 pt-6" id="chart-legend-list"></ul>
      </div>

      {/* Distribusi Per Rekening */}
      <div className="chart-card p-6 md:p-8 rounded-xl border border-outline-variant/40 dark:border-white/10 flex flex-col hover-lift animate-in delay-3">
        <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-6">Distribusi Per Rekening</h4>
        <div className="relative flex-1 min-h-[280px]">
          <canvas id="chart-rekening" className="w-full h-full min-h-[260px]" aria-label="Diagram batang distribusi rekening"></canvas>
        </div>
      </div>
    </div>
  );
}