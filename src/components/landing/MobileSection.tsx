/* 3 phone mockups like the reference image */
const Sparkline = ({ color = '#a855f7' }) => {
  const colorId = color.replace('#', '');
  return (
    <div className="ms-sparkline h-8 w-full my-2">
      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id={`sg-${colorId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".4"/>
            <stop offset="100%" stopColor={color} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0 25 C10 22,20 18,30 20 C40 22,50 12,60 10 C70 8,80 14,90 6 L100 2 L100 30 L0 30Z"
          fill={`url(#sg-${colorId})`}/>
        <path d="M0 25 C10 22,20 18,30 20 C40 22,50 12,60 10 C70 8,80 14,90 6 L100 2"
          fill="none" stroke={color} strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

/* Phone 1 — Portfolio */
const Phone1 = () => (
  <div className="mini-ph bg-[#1c1b1b] text-white border-4 border-gray-800 rounded-2xl w-40 p-3 shadow-xl shrink-0">
    <div className="mini-scr text-xs">
      <div className="ms-label opacity-60">Portfolio</div>
      <Sparkline color="#a855f7"/>
      <div className="ms-big font-bold text-lg">Rp 466.7 jt</div>
      <div className="ms-sub opacity-60 text-[10px] mb-2">8 saham aktif</div>
      <div className="ms-rows space-y-1">
        {[
          {n:'BBCA',v:'Rp 12.2 jt',up:true},
          {n:'TLKM',v:'Rp 8.4 jt', up:false},
          {n:'GOTO',v:'Rp 5.1 jt', up:true},
        ].map((r,i)=>(
          <div key={i} className="ms-row flex justify-between bg-white/5 px-1.5 py-1 rounded">
            <span className="ms-rn">{r.n}</span>
            <span className="ms-rv font-bold" style={{color:r.up?'#22c55e':'#ef4444'}}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* Phone 2 — Insight */
const Phone2 = () => (
  <div className="mini-ph bg-[#1c1b1b] text-white border-4 border-gray-800 rounded-2xl w-40 p-3 shadow-xl shrink-0 transform -translate-y-6">
    <div className="mini-scr text-xs">
      <div className="ms-label opacity-60">Insight</div>
      <div className="ms-insight-box my-2">
        <div className="ms-insight-num font-bold text-lg">2,45 M</div>
        <div className="ms-insight-lbl opacity-60 text-[10px]">Total Aset</div>
      </div>
      <div className="ms-alert text-[9px] bg-white/10 p-1 rounded text-center mb-2">💡 Belanja Dana Penuh</div>
      <div className="ms-rows space-y-1">
        {[
          {n:'Pengeluaran',  v:'Rp 8.4 jt', c:'#f97316'},
          {n:'Investasi',    v:'Rp 23.2 jt',c:'#a855f7'},
          {n:'Keuntungan',   v:'+Rp 4.5 jt',c:'#22c55e'},
        ].map((r,i)=>(
          <div key={i} className="ms-row flex justify-between bg-white/5 px-1.5 py-1 rounded">
            <span className="ms-rn">{r.n}</span>
            <span className="ms-rv font-bold" style={{color:r.c}}>{r.v}</span>
          </div>
        ))}
      </div>
      <Sparkline color="#10b981"/>
    </div>
  </div>
)

/* Phone 3 — Eksplorasi */
const Phone3 = () => (
  <div className="mini-ph bg-[#1c1b1b] text-white border-4 border-gray-800 rounded-2xl w-40 p-3 shadow-xl shrink-0">
    <div className="mini-scr text-xs">
      <div className="ms-label opacity-60">Eksplorasi</div>
      <div className="ms-big font-bold text-lg">Rp 324.5 jt</div>
      <div className="ms-sub opacity-60 text-[10px] mb-2">Reksa Dana Aktif</div>
      <Sparkline color="#3b82f6"/>
      <div className="ms-rows space-y-1">
        {[
          {n:'BNPUS',  v:'+14.2%',c:'#22c55e'},
          {n:'MNCAM',  v:'+9.8%', c:'#22c55e'},
          {n:'MANDIRI',v:'+7.4%', c:'#22c55e'},
        ].map((r,i)=>(
          <div key={i} className="ms-row flex justify-between bg-white/5 px-1.5 py-1 rounded">
            <span className="ms-rn">{r.n}</span>
            <span className="ms-rv font-bold" style={{color:r.c}}>{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const MobileSection = () => (
  <section className="mobile-sec py-20" id="mobile">
    <div className="container mx-auto px-6">
      <div className="mobile-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* 3 phones */}
        <div className="mobile-phones flex gap-4 overflow-hidden py-8 justify-center animate-in delay-1">
          <Phone1/>
          <Phone2/>
          <Phone3/>
        </div>
        {/* Right content */}
        <div className="mobile-content text-center lg:text-left animate-in delay-2">
          <h2 className="text-3xl font-headline-lg font-bold mb-4 text-on-surface dark:text-white">Akses Kapan Saja,<br/><span className="text-primary dark:text-primary-fixed-dim">di Mana Saja</span></h2>
          <p className="opacity-80 mb-6 text-on-surface-variant dark:text-white/80">Kendali penuh atas keuanganmu, langsung dari genggaman. Tersedia untuk iOS dan Android.</p>
          <div className="app-stars font-bold text-yellow-500 text-lg">★★★★★ <span className="text-on-surface-variant dark:text-white text-sm font-normal opacity-80">4,9/5 dari 10.000+ pengguna</span></div>
        </div>
      </div>
    </div>
  </section>
)
export default MobileSection