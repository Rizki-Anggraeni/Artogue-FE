import { Link } from 'react-router-dom';
import { TopBar } from '../components/TopBar';

export function TambahAset() {
  return (
    <div className="page-shell">
      <main className="min-h-screen page-content">
        <TopBar />
        <div className="px-6 md:px-8 py-8 space-y-8 mx-auto max-w-[1200px] relative z-10">
          
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-white/5 transition-colors text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link>
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface dark:text-white">Tambah Rekening & Aset</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mt-1">Masukkan data rekening atau aset baru Anda.</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest dark:bg-dark-card border border-outline-variant/50 dark:border-white/10 rounded-2xl p-6 md:p-8 max-w-2xl animate-in">
            <form className="space-y-6">
              <div>
                <label className="font-label-md text-label-md text-on-surface dark:text-white block mb-2">Nama Rekening / Platform</label>
                <input type="text" className="w-full bg-surface-container dark:bg-dark-surface border border-outline-variant/50 dark:border-white/10 rounded-xl px-4 py-3 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all" placeholder="Contoh: BCA, Bibit, Pluang..." />
              </div>
              <div>
                <label className="font-label-md text-label-md text-on-surface dark:text-white block mb-2">Nama Aset</label>
                <input type="text" className="w-full bg-surface-container dark:bg-dark-surface border border-outline-variant/50 dark:border-white/10 rounded-xl px-4 py-3 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all" placeholder="Contoh: Tabungan Utama, Reksadana Saham..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-md text-label-md text-on-surface dark:text-white block mb-2">Jenis Aset</label>
                  <select className="w-full bg-surface-container dark:bg-dark-surface border border-outline-variant/50 dark:border-white/10 rounded-xl px-4 py-3 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all">
                    <option>Cash</option>
                    <option>Reksadana</option>
                    <option>Saham ID</option>
                    <option>Saham US</option>
                    <option>Emas</option>
                    <option>Obligasi</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-md text-label-md text-on-surface dark:text-white block mb-2">Saldo / Jumlah (Rp)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary dark:text-primary-fixed-dim">Rp</span>
                    <input type="number" className="w-full bg-surface-container dark:bg-dark-surface border border-outline-variant/50 dark:border-white/10 rounded-xl pl-12 pr-4 py-3 text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white transition-all" placeholder="0" />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 dark:border-white/10 flex justify-end gap-3 mt-8">
                <Link to="/" className="px-6 py-2.5 rounded-xl font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 transition-colors">Batal</Link>
                <button type="button" className="btn-gradient px-6 py-2.5 rounded-xl text-white font-label-md font-semibold shadow-md hover-lift">Simpan Aset</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}