import { Link } from 'react-router-dom';

export function AccountList() {
  return (
    <section className="space-y-6 animate-in delay-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">Rekening & Aset</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mt-0.5">Kelola rekening dan aset dalam satu alur</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/tambah-aset" className="btn-gradient inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-on-primary font-label-md text-label-md shadow-md no-underline active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Tambah Rekening & Aset
          </Link>
          <Link to="/kelola-aset" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant dark:border-white/15 bg-surface-container-lowest dark:bg-dark-card text-on-surface dark:text-white font-label-md text-label-md hover:border-primary/40 transition-all no-underline">
            <span className="material-symbols-outlined text-[20px] text-primary dark:text-primary-fixed-dim">settings</span>
            Kelola Jenis Aset
          </Link>
        </div>
      </div>

      <div id="rekening-list" className="space-y-6"></div>
    </section>
  );
}