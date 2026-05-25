import Logo from './Logo'

const Footer = () => {
  const cols = [
    { h: 'Produk', links: ['Fitur', 'Keamanan', 'Harga', 'Integrasi'] },
    { h: 'Perusahaan', links: ['Tentang Kami', 'Blog', 'Karir', 'Kontak'] },
    { h: 'Bantuan', links: ['FAQ', 'Pusat Bantuan', 'Kebijakan Privasi', 'Syarat & Ketentuan'] },
  ]
  return (
    <footer className="footer border-t border-outline-variant/30 dark:border-white/10 pt-12 pb-6 px-6" id="footer">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4"><Logo size={32}/><span className="font-bold text-xl text-on-surface dark:text-white">Artogue</span></div>
          <p className="text-on-surface-variant dark:text-white/70 text-sm">Platform manajemen aset terlengkap untuk mengelola portofolio dari berbagai instrumen investasi secara real-time.</p>
        </div>
        {cols.map((c, i) => (
          <div key={i}>
            <h4 className="font-bold text-on-surface dark:text-white mb-4">{c.h}</h4>
            <ul className="space-y-2 text-on-surface-variant dark:text-white/70 text-sm">
              {c.links.map((l, j) => <li key={j}><a href="#" className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom text-center border-t border-outline-variant/30 dark:border-white/10 pt-6 opacity-50 text-sm text-on-surface-variant dark:text-white/50">
        © 2026 ArtoGue. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer