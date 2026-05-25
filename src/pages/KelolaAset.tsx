import { Link } from 'react-router-dom';
import { TopBar } from '../components/TopBar';

export function KelolaAset() {
  // Data kategori aset statis (Default)
  const jenisAset = [
    { nama: 'Reksadana', warna: 'bg-[#5E5CE6]' },
    { nama: 'Saham ID', warna: 'bg-[#3B82F6]' },
    { nama: 'Saham US', warna: 'bg-[#10B981]' },
    { nama: 'Obligasi', warna: 'bg-[#F2A218]' },
    { nama: 'Cash', warna: 'bg-[#EB4D97]' },
    { nama: 'Emas', warna: 'bg-[#9D5CE6]' },
    { nama: 'Kripto', warna: 'bg-[#F59E0B]' },
    { nama: 'Properti', warna: 'bg-[#8B5CF6]' },
    { nama: 'Deposito', warna: 'bg-[#14B8A6]' }
  ];

  return (
    <div className="page-shell">
      <main className="min-h-screen page-content">
        <TopBar />
        <div className="px-6 md:px-8 py-8 mx-auto max-w-[600px] relative z-10">
          
          {/* Header Halaman (Custom Back Button) */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-surface-variant dark:hover:bg-white/5 transition-colors text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </Link>
            <div>
              <h1 className="font-headline-md text-[24px] md:text-headline-md font-bold text-on-surface dark:text-white leading-tight">Manajemen Aset</h1>
            </div>
          </div>

          {/* Pemilih Periode & Deskripsi */}
          <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
            <p className="font-label-sm text-on-surface-variant dark:text-on-surface-variant">Kelola kategori aset portofolio</p>
            <label className="period-select text-[13px]" title="Periode">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span className="period-select__label">—</span>
              <input type="month" className="period-select__input" aria-label="Pilih bulan" />
            </label>
          </div>

          {/* Section: Tambah Jenis Aset Baru */}
          <section className="mb-8">
            <h2 className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant mb-4 px-1">Tambah Jenis Aset Baru</h2>
            <div className="flex gap-3">
              <div className="relative flex-grow">
                <input
                  className="w-full bg-surface-container dark:bg-dark-card border border-outline-variant dark:border-white/10 rounded-xl py-3 px-4 text-on-surface dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-outline dark:placeholder:text-on-surface-variant"
                  placeholder="Contoh: P2P Lending" type="text"
                />
              </div>
              <Link to="/tambah-aset" aria-label="Tambah rekening dan aset"
                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all duration-200 no-underline shrink-0">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </Link>
            </div>
          </section>

          {/* Section: Daftar Jenis Aset */}
          <section className="mb-6">
            <h2 className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant mb-4 px-1">Daftar Jenis Aset</h2>
            <div className="space-y-3">
              {jenisAset.map((aset, i) => (
                <div key={i}
                  className="flex items-center justify-between p-4 bg-white dark:bg-dark-card hover:bg-surface-variant dark:hover:bg-white/5 transition-colors duration-200 rounded-xl border border-outline-variant/40 dark:border-white/10 group shadow-sm">
                  <div className="flex items-center gap-5 pl-2">
                    <div className={`w-4 h-4 rounded-full ${aset.warna} group-hover:scale-110 transition-transform duration-300`}></div>
                    <span className="font-body-md font-medium text-on-surface dark:text-white">{aset.nama}</span>
                  </div>
                  <div className="bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/30">
                    <span className="text-[10px] font-bold tracking-widest text-on-surface-variant">DEFAULT</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Note */}
          <p className="text-[12px] text-outline dark:text-on-surface-variant text-center pb-10">
            * Jenis aset default tidak dapat dihapus
          </p>
        </div>
      </main>
    </div>
  );
}