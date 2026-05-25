const GrowthChart = () => {
  // Smooth upward curve points matching the purple chart in the image
  const pts = [
    [0,175],[25,168],[50,162],[75,158],[100,148],
    [125,138],[150,124],[175,112],[200,100],
    [225,85],[250,72],[275,58],[300,46],[325,32],[350,18],[375,10],[395,4],
  ]
  const d = pts.map((p,i) => (i===0?`M${p[0]},${p[1]}`:`L${p[0]},${p[1]}`)).join(' ')
  const area = d + ` L395,200 L0,200 Z`

  return (
    <div className="cc-chart relative h-[240px] w-full">
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="gcGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity=".45"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity=".02"/>
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0,50,100,150,200].map(y=>(
          <line key={y} x1="0" y1={y} x2="400" y2={y}
            stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
        ))}

        {/* Y axis values */}
        {['3.5','3.0','2.5','2.0','1.5'].map((v,i)=>(
          <text key={i} x="20" y={i*40+14} textAnchor="start"
            fill="rgba(124,116,135,.7)" fontSize="10" className="dark:fill-white/40">{v} M</text>
        ))}

        {/* Area */}
        <path d={area} fill="url(#gcGrad)"/>

        {/* Line */}
        <path d={d} fill="none" stroke="#a855f7" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="800" strokeDashoffset="0"
          style={{animation:'drawLine 2.2s ease forwards'}}/>

        {/* End dot */}
        <circle cx="395" cy="4" r="4.5" fill="#a855f7"/>
        <circle cx="395" cy="4" r="10" fill="rgba(168,85,247,.28)"
          style={{animation:'pulseDot 1.6s ease-in-out infinite'}}/>
      </svg>
    </div>
  )
}

const GrowthSection = () => (
  <section className="growth py-16" id="pertumbuhan">
    <div className="container mx-auto px-6">
      <div className="growth-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="animate-in delay-1">
          <div className="growth-badge inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary dark:text-primary-fixed-dim rounded-full mb-4">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
              <line x1="2" y1="20" x2="22" y2="20"/>
            </svg>
            Pantau Pertumbuhan Asetmu
          </div>
          <h2 className="text-3xl font-bold font-headline-lg text-on-surface dark:text-white mb-4">
            Growth That<br/>
            <span className="text-primary dark:text-primary-fixed-dim">You Can See</span>
          </h2>
          <p className="text-on-surface-variant dark:text-white/80 opacity-80 mb-6">
            Kami menyajikan data dan visualisasi terbaik agar kamu selalu tahu bagaimana asetmu berkembang.
          </p>
        </div>

        {/* Right */}
        <div className="bg-surface-container-lowest dark:bg-white/5 border border-outline-variant/30 dark:border-white/10 p-6 rounded-2xl shadow-lg animate-in delay-2">
          <div className="mb-4">
            <div>
              <div className="text-sm text-on-surface-variant dark:text-white/60">30 Mei 2024</div>
              <div className="text-2xl font-bold text-on-surface dark:text-white">Rp 2.456.789.000</div>
              <div className="text-green-500 text-sm">▲ +12,45%</div>
            </div>
          </div>
          <GrowthChart/>
          <div className="flex justify-between text-xs text-on-surface-variant dark:text-white/60 mt-2 px-2">
            {['Jan','Feb','Mar','Apr','Mei','Jun','Jul'].map(m=><span key={m}>{m}</span>)}
          </div>
        </div>
      </div>
    </div>
  </section>
)
export default GrowthSection