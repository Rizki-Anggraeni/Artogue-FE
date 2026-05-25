/* Donut SVG chart */
const DonutChart = () => {
  const segments = [
    { color: '#a855f7', pct: 40, label: 'Saham' },
    { color: '#3b82f6', pct: 25, label: 'Reksa Dana' },
    { color: '#10b981', pct: 20, label: 'Kripto' },
    { color: '#f97316', pct: 15, label: 'Obligasi' },
  ]
  let offset = 0
  const r = 28, cx = 36, cy = 36, circ = 2 * Math.PI * r
  return (
    <div className="phn-donut-wrap flex items-center gap-4 mb-6">
      <svg className="phn-donut w-24 h-24 shrink-0" viewBox="0 0 72 72">
        {segments.map((s, i) => {
          const dash = (s.pct / 100) * circ
          const el = (
            <circle key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="9"
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset * circ / 100}
              style={{ transition: 'stroke-dasharray .6s ease' }}
            />
          )
          offset += s.pct
          return el
        })}
        <circle cx={cx} cy={cy} r="20" fill="#131313" />
        <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle"
          fill="#ffffff" fontSize="8" fontWeight="800">
          4 Aset
        </text>
      </svg>
      <div className="phn-legend text-xs space-y-1 w-full text-white">
        {segments.map((s, i) => (
          <div key={i} className="legend-row flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="legend-dot w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="legend-name opacity-80">{s.label}</span>
            </div>
            <span className="legend-pct font-bold">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MiniLineChart = () => (
  <div className="phn-chart-wrap w-full h-16 mb-4">
    <svg viewBox="0 0 210 52" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity=".35" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 38 C18 35,30 28,48 30 C65 32,75 22,95 19 C115 16,130 10,150 8 C170 6,188 12,210 4 L210 52 L0 52Z"
        fill="url(#lineGrad)" />
      <path d="M0 38 C18 35,30 28,48 30 C65 32,75 22,95 19 C115 16,130 10,150 8 C170 6,188 12,210 4"
        fill="none" stroke="#a855f7" strokeWidth="1.8"
        strokeDasharray="800" strokeDashoffset="0"
        style={{ animation: 'drawLine 2s ease forwards' }}
      />
      <circle cx="210" cy="4" r="3" fill="#a855f7" />
    </svg>
  </div>
)

/* SVG components for trust icons */
const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconBolt = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

/* SVG components for Phone Mockup assets */
const IconStock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const IconLeaf = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22c1.25-6.7 5.27-12 11-14.7a13.6 13.6 0 0 1 8-1.3 10.8 10.8 0 0 1 1 8c-2.7 5.73-8 9.75-14.7 11H2z" />
    <path d="M2 22c5.3-5.3 10.7-5.3 16 0" />
  </svg>
)

const IconBank = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="22" width="20" height="2" />
    <line x1="12" y1="6" x2="12" y2="18" />
    <line x1="6" y1="6" x2="6" y2="18" />
    <line x1="18" y1="6" x2="18" y2="18" />
    <polygon points="12 2 2 6 22 6" />
  </svg>
)

const assets = [
  { ic: <IconStock />, bg: 'rgba(168,85,247,.16)', nm: 'Saham',     sub: '8 emiten',    amt: 'Rp 466.7 jt', chg: '+8,2%',  up:true },
  { ic: <IconLeaf />, bg: 'rgba(16,185,129,.16)', nm: 'Reksa Dana',sub: '12 produk',   amt: 'Rp 324.5 jt', chg: '+12,4%', up:true },
  { ic: <IconBank />, bg: 'rgba(249,115,22,.16)',nm: 'Obligasi',   sub: 'FR0006',      amt: 'Rp 200 jt',   chg: '+1,8%',  up:true },
]

const PhoneMockup = () => (
  <div className="phone-wrap bg-[#1c1b1b] text-white border-8 border-gray-800 rounded-[2rem] w-72 p-4 shadow-2xl relative animate-float">
    <div className="phn-topbar flex justify-between text-[10px] opacity-60 mb-4">
      <span>9:41</span>
      <span>●●●</span>
    </div>
    <div className="phn-total-lbl text-xs opacity-70">Total Aset</div>
    <div className="phn-total-amt text-2xl font-bold">Rp 2.456.789.000</div>
    <div className="phn-total-chg text-[10px] text-green-500 mb-4">▲ +2,45% (24 jam)</div>

    <DonutChart />
    <MiniLineChart />

    <div className="phn-aset space-y-3">
      {assets.map((a, i) => (
        <div key={i} className="phn-aset-row flex justify-between items-center bg-white/5 p-2 rounded-lg">
          <div className="phn-aset-left flex gap-2">
            <div className="phn-aset-ic w-8 h-8 rounded flex items-center justify-center" style={{ background: a.bg }}>{a.ic}</div>
            <div>
              <div className="phn-aset-nm text-xs font-bold">{a.nm}</div>
              <div className="phn-aset-sub text-[10px] opacity-60">{a.sub}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="phn-aset-amt text-xs font-bold">{a.amt}</div>
            <div className={`phn-aset-chg text-[10px] ${a.up ? 'text-green-500' : 'text-red-500'}`}>
              {a.up ? '▲' : '▼'} {a.chg}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const HeroSection = () => (
  <section className="hero pt-28 pb-16" id="hero">
    <div className="container mx-auto px-6">
      <div className="hero-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div className="animate-in delay-1">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Halo! Semua Asetmu Ada di Satu Tempat
          </div>
          <h1 className="hero-h1 text-4xl md:text-6xl font-bold leading-tight mb-6">
            Semua Asetmu,<br />
            Dalam <span className="text-primary-fixed-dim">Satu Aplikasi.</span>
          </h1>
          <p className="hero-p text-lg opacity-80 mb-8 max-w-lg">
            Pantau, kelola, dan kembangkan seluruh asetmu mulai dari bank, saham, kripto, obligasi, hingga lending dengan mudah dan aman.
          </p>
          <div className="hero-btns flex gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110">Mulai Gratis Sekarang →</button>
            <button className="border border-white/20 bg-white/5 px-6 py-3 rounded-xl font-bold hover:bg-white/10">▶ Lihat Demo</button>
          </div>

          <div className="hero-trust mt-10 flex flex-wrap gap-6">
            <div className="trust-it flex items-center gap-3">
              <div className="trust-ic bg-green-500/20 p-2 rounded-lg text-green-500">
                <IconLock />
              </div>
              <div>
                <div className="trust-label font-bold text-sm">100% Aman</div>
                <div className="trust-sub text-xs opacity-70">Bank-level Security</div>
              </div>
            </div>
            <div className="trust-it flex items-center gap-3">
              <div className="trust-ic bg-blue-500/20 p-2 rounded-lg text-blue-500">
                <IconBolt />
              </div>
              <div>
                <div className="trust-label font-bold text-sm">Real-time</div>
                <div className="trust-sub text-xs opacity-70">Data Terupdate</div>
              </div>
            </div>
            <div className="trust-it flex items-center gap-3">
              <div className="trust-ic bg-orange-500/20 p-2 rounded-lg text-orange-500">
                <IconLink />
              </div>
              <div>
                <div className="trust-label font-bold text-sm">Terhubung Otomatis</div>
                <div className="trust-sub text-xs opacity-70">Multi Bank &amp; Platform</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right flex justify-center relative animate-in delay-2">
          <PhoneMockup />
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection