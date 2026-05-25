const LogoBRI = () => (
  <svg height="24" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="1" width="13" height="16" rx="2.5" fill="#00529C" />
    <path d="M3 13V5H6.5C8 5 9 5.8 9 7.2C9 8.2 8 9 7 9H6V13H3Z" fill="white" />
    <path d="M6 8H6.5C7 8 7.3 7.8 7.3 7.2C7.3 6.7 7 6.5 6.5 6.5H6V8Z" fill="white" />
    <path d="M9 13L11.5 9H10L8 13H9Z" fill="#F15A23" />
    <text x="17" y="14" fill="#00529C" fontSize="13" fontWeight="900" letterSpacing="-0.5px">BRI</text>
  </svg>
)

const LogoBCA = () => (
  <svg height="24" viewBox="0 0 56 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="8" fill="#0060AF" />
    <path d="M5 12L8.5 6.5L10 9.5L11.5 7.5L13 12H5Z" fill="white" />
    <text x="21" y="14" fill="#0060AF" fontSize="13" fontWeight="900" letterSpacing="-0.5px">BCA</text>
  </svg>
)

const LogoMandiri = () => (
  <svg height="22" viewBox="0 0 74 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 10C4 6 8 5 11 6.5C14 8 15 4 16 2" stroke="#FFB700" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <text x="18" y="12" fill="#ffffff" fontSize="12" fontWeight="900" letterSpacing="-0.3px">mandiri</text>
  </svg>
)

const LogoBNI = () => (
  <svg height="24" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="9" r="7.5" fill="#F15A23" />
    <path d="M6 9C6.5 7 9 7 9.5 9" stroke="white" strokeWidth="1.8" fill="none" />
    <text x="19" y="14" fill="#00828A" fontSize="12.5" fontWeight="900" letterSpacing="-0.5px">BNI</text>
  </svg>
)

const LogoCIMB = () => (
  <svg height="22" viewBox="0 0 94 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="1" width="14" height="14" fill="#D8232A" rx="2" />
    <path d="M3 11L11 3M11 3H7.5M11 3V6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="19" y="12" fill="#e2e8f0" fontSize="10.5" fontWeight="900" letterSpacing="-0.2px">CIMB NIAGA</text>
  </svg>
)

const LogoBibit = () => (
  <svg height="24" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="2" width="14" height="14" rx="3.5" fill="#1AA86E" />
    <path d="M7 5C7 5 4.5 6.5 4.5 9C4.5 10.2 5.5 11.2 7 11.2C8.5 11.2 9.5 10.2 9.5 9C9.5 6.5 7 5 7 5Z" fill="white" />
    <circle cx="7" cy="8.2" r="1.2" fill="#1AA86E" />
    <text x="18" y="14" fill="#1AA86E" fontSize="12.5" fontWeight="900" letterSpacing="-0.5px">bibit</text>
  </svg>
)

const LogoAjaib = () => (
  <svg height="24" viewBox="0 0 56 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="2" width="14" height="14" rx="3.5" fill="#3A83F9" />
    <path d="M4 7C4 5.5 5.5 4.5 7 4.5C8.5 4.5 9.5 6 8 7.5C7.2 8.2 5.8 9 6.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="7.2" cy="12" r="0.8" fill="white" />
    <text x="18" y="14" fill="#3A83F9" fontSize="12.5" fontWeight="900" letterSpacing="-0.5px">ajaib</text>
  </svg>
)

const LogoPluang = () => (
  <svg height="22" viewBox="0 0 72 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill="url(#pluangGrad2)" />
    <circle cx="8" cy="8" r="3.5" fill="#0c0c24" />
    <defs>
      <linearGradient id="pluangGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <text x="19" y="12" fill="#e2e8f0" fontSize="12" fontWeight="800" letterSpacing="-0.3px">pluang</text>
  </svg>
)

const partnersList = [
  { component: <LogoBRI /> }, { component: <LogoBCA /> }, { component: <LogoMandiri /> },
  { component: <LogoBNI /> }, { component: <LogoCIMB /> }, { component: <LogoBibit /> },
  { component: <LogoAjaib /> }, { component: <LogoPluang /> }
]

const Partners = () => (
  <section className="partners border-y border-outline-variant/30 dark:border-white/10 bg-surface-container-lowest dark:bg-white/5 py-8" id="mitra">
    <div className="container mx-auto px-6 text-center animate-in delay-2">
      <div className="partners-txt mb-6 opacity-70 text-on-surface-variant dark:text-white/70">
        Dipercaya oleh ribuan pengguna & terhubung dengan lebih dari <strong>100+ institusi keuangan</strong>
      </div>
      <div className="partners-logos flex flex-wrap justify-center items-center gap-8">
        {partnersList.map((p, i) => (
          <div key={i} className="plogo opacity-60 dark:opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">{p.component}</div>
        ))}
      </div>
    </div>
  </section>
)
export default Partners