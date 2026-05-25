/* SVG Icons for each feature */
const IconDashboard = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

const IconRealtime = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const IconInvest = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const features = [
  {
    Icon: IconDashboard,
    cls: 'fi-purple',
    color: '#a855f7',
    h: 'Semua Aset Dalam Satu Dashboard',
    p: 'Lihat seluruh aset dari berbagai platform dalam satu tampilan yang lengkap dan real-time.',
  },
  {
    Icon: IconRealtime,
    cls: 'fi-green',
    color: '#10b981',
    h: 'Tracking Real-time',
    p: 'Pantau pergerakan aset, harga pasar dan performa portfolio secara real-time.',
  },
  {
    Icon: IconInvest,
    cls: 'fi-pink',
    color: '#ec4899',
    h: 'Investasi Lengkap',
    p: 'Kelola saham, reksa dana, kripto, obligasi, hingga aset lainnya dalam satu platform.',
  },
]

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#a855f7" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FeaturesSection = () => (
  <section className="py-16" id="fitur">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 animate-in delay-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full mb-4 border border-primary/20">
          <StarIcon />
          Fitur Unggulan
        </div>
        <h2 className="text-3xl font-bold font-headline-lg text-on-surface dark:text-white mb-4">
          Semua yang Kamu Butuhkan<br />
          Untuk <span className="text-primary dark:text-primary-fixed-dim">Mengelola Keuangan</span>
        </h2>
        <p className="text-on-surface-variant dark:text-white/80 opacity-80 max-w-2xl mx-auto">
          Aplikasi all-in-one untuk memantau, mengintegrasikan, dan memperforma seluruh asetmu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => {
          const IconComponent = f.Icon;
          const delayClass = `delay-${(i % 4) + 1}`;
          return (
            <div key={i} className={`p-6 border border-outline-variant/30 dark:border-white/10 rounded-2xl bg-surface-container-lowest dark:bg-white/5 shadow-sm animate-in ${delayClass}`} id={`feat-${i}`}>
              <div className="mb-4" style={{ color: f.color }}>
                <IconComponent />
              </div>
              <h3 className="feat-h3 text-xl font-bold text-on-surface dark:text-white mb-2">{f.h}</h3>
              <p className="feat-p text-on-surface-variant dark:text-white/80 opacity-80 mb-4">{f.p}</p>
              <a href="#" className="feat-lnk text-primary-fixed-dim font-bold">Selengkapnya →</a>
            </div>
          );
        })}
      </div>
    </div>
  </section>
)

export default FeaturesSection