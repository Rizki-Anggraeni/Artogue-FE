import { useState, useEffect, useRef } from 'react';
import { api } from '../lib/api';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export function AssetCharts() {
  const [summary, setSummary] = useState<any>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartInstance = useRef<Chart | null>(null);
  const barChartInstance = useRef<Chart | null>(null);

  // Fungsi untuk autogenerate warna yang dinamis berdasarkan urutan indeks
  const getChartColor = (index: number) => {
    // Menggeser hue sebesar 80 derajat untuk setiap item agar warnanya kontras
    let hue = (200 + index * 80) % 360;
    return `hsl(${hue}, 85%, 55%)`;
  };

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

  useEffect(() => {
    if (!summary) return;

    // Render Pie Chart (Distribusi Jenis Aset)
    if (pieChartRef.current) {
      if (pieChartInstance.current) pieChartInstance.current.destroy();
      
      const labels = summary.summaryByCategory?.map((c: any) => c.name) || [];
      // Gunakan nilai .total (di-convert ke Number) agar proporsi dihitung lebih presisi
      const data = summary.summaryByCategory?.map((c: any) => Number(c.total)) || [];
      const colors = summary.summaryByCategory?.map((_: any, i: number) => getChartColor(i)) || [];

      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      });
    }

    // Render Bar Chart (Distribusi Per Rekening)
    if (barChartRef.current) {
      if (barChartInstance.current) barChartInstance.current.destroy();

      const labels = summary.summaryByPlatform?.map((p: any) => p.name) || [];
      // Gunakan nilai aslinya (Number) agar proporsi donat dihitung akurat
      const data = summary.summaryByPlatform?.map((p: any) => Number(p.total)) || []; 
      const colors = summary.summaryByPlatform?.map((_: any, i: number) => getChartColor(i + 4)) || [];
      
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '72%',
          plugins: { legend: { display: false } },
        },
        plugins: [{
          id: 'textCenterPlatform',
          beforeDraw: function(chart) {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;
            ctx.restore();
            
            const totalRekening = summary.summaryByPlatform?.length || 0;
            const isDark = document.documentElement.classList.contains('dark');
            
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            const textX = Math.round(width / 2);
            const textY = Math.round(height / 2);
            
            ctx.font = 'normal 0.8rem sans-serif';
            ctx.fillStyle = isDark ? '#9aa3b8' : '#7b7487';
            ctx.fillText('Total', textX, textY - 12);
            
            ctx.font = 'bold 1.25rem sans-serif';
            ctx.fillStyle = isDark ? '#ffffff' : '#141b2b';
            ctx.fillText(`${totalRekening} Rekening`, textX, textY + 12);
            
            ctx.save();
          }
        }]
      });
    }

    return () => {
      if (pieChartInstance.current) pieChartInstance.current.destroy();
      if (barChartInstance.current) barChartInstance.current.destroy();
    };
  }, [summary]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Distribusi Per Jenis Aset */}
      <div className="chart-card p-6 md:p-8 rounded-xl border border-outline-variant/40 dark:border-white/10 hover-lift animate-in delay-2">
        <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-6">Distribusi Per Jenis Aset</h4>
        <div className="chart-pie-wrap relative flex justify-center items-center min-h-[260px] pb-7">
          <canvas ref={pieChartRef} className="max-h-[220px] w-full max-w-[300px]" aria-label="Diagram pie distribusi jenis aset"></canvas>
        </div>
        <ul className="mt-4 space-y-2.5 border-t border-outline-variant/30 dark:border-white/10 pt-6" id="chart-legend-list">
          {summary?.summaryByCategory?.map((cat: any, i: number) => (
            <li key={i} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getChartColor(i) }}></span>
                <span className="text-on-surface-variant dark:text-on-surface-variant">{cat.name}</span>
              </div>
              <span className="font-bold text-on-surface dark:text-white">{cat.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Distribusi Per Rekening */}
      <div className="chart-card p-6 md:p-8 rounded-xl border border-outline-variant/40 dark:border-white/10 flex flex-col hover-lift animate-in delay-3">
        <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-6">Distribusi Per Rekening</h4>
        <div className="chart-pie-wrap relative flex justify-center items-center min-h-[260px] pb-7">
          <canvas ref={barChartRef} className="max-h-[220px] w-full max-w-[300px]" aria-label="Diagram pie distribusi rekening"></canvas>
        </div>
        <ul className="mt-4 space-y-2.5 border-t border-outline-variant/30 dark:border-white/10 pt-6">
            {summary?.summaryByPlatform?.map((plat: any, i: number) => (
              <li key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: getChartColor(i + 4) }}></span>
                  <span className="text-on-surface-variant dark:text-on-surface-variant">{plat.name}</span>
                </div>
                <span className="font-bold text-on-surface dark:text-white">{plat.percentage}%</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}