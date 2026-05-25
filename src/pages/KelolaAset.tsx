import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { api } from '../lib/api';

export function KelolaAset() {
  const [jenisAset, setJenisAset] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await api.get('/asset-categories');
      setJenisAset(response.data);
    } catch (error) {
      console.error('Gagal mengambil kategori aset:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await api.post('/asset-categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Gagal menambahkan kategori aset:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('Hapus kategori aset ini?')) return;
    try {
      await api.delete(`/asset-categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Gagal menghapus kategori aset:', error);
    }
  };

  return (
    <div className="page-shell">
      <main className="min-h-screen page-content">
        <TopBar />
        <div className="px-6 md:px-8 py-8 mx-auto max-w-[600px] relative z-10">
          
          {/* Header Halaman (Custom Back Button) */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-surface-variant dark:hover:bg-white/5 transition-colors text-on-surface-variant flex items-center justify-center">
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
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-surface-container dark:bg-dark-card border border-outline-variant dark:border-white/10 rounded-xl py-3 px-4 text-on-surface dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-outline dark:placeholder:text-on-surface-variant"
                  placeholder="Contoh: P2P Lending" type="text"
                />
              </div>
              <button type="button" onClick={handleAddCategory} aria-label="Tambah kategori"
                className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all duration-200 shrink-0">
                <span className="material-symbols-outlined text-[24px]">add</span>
              </button>
            </div>
          </section>

          {/* Section: Daftar Jenis Aset */}
          <section className="mb-6">
            <h2 className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant mb-4 px-1">Daftar Jenis Aset</h2>
            <div className="space-y-3">
              {jenisAset.map((aset) => (
                <div key={aset.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-dark-card hover:bg-surface-variant dark:hover:bg-white/5 transition-colors duration-200 rounded-xl border border-outline-variant/40 dark:border-white/10 group shadow-sm">
                  <div className="flex items-center gap-5 pl-2">
                    <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-110 transition-transform duration-300"></div>
                    <span className="font-body-md font-medium text-on-surface dark:text-white">{aset.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center rounded-lg hover:bg-primary/10" title="Edit">
                      <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button onClick={() => handleDeleteCategory(aset.id)} className="p-2 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center rounded-lg hover:bg-error/10" title="Hapus">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
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