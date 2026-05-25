import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export function AccountList() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [modalType, setModalType] = useState<'tambah-rekening' | 'tambah-aset' | 'kelola-aset' | null>(null);
  const [activeAccountId, setActiveAccountId] = useState<number | null>(null);
  
  const [namaRekening, setNamaRekening] = useState('');
  const [jenisAset, setJenisAset] = useState('');
  const [jumlahAsetRaw, setJumlahAsetRaw] = useState('');
  const [newCategory, setNewCategory] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/asset-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('/platform');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
    fetchCategories();
  }, []);

  const handleDeleteRekening = async (id: number) => {
    if (!window.confirm('Hapus rekening beserta seluruh aset di dalamnya?')) return;
    try {
      await api.delete(`/platform/${id}`);
      setAccounts(accounts.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleDeleteAset = async (id: number) => {
    if (!window.confirm('Hapus aset ini secara permanen?')) return;
    try {
      await api.delete(`/portfolios/${id}`);
      const response = await api.get('/platform');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await api.post('/asset-categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error: any) {
      if (error.response?.status === 400) {
        alert(error.response.data.message || 'Kategori sudah ada.');
      } else {
        console.error('Gagal menambahkan kategori aset:', error);
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('Hapus kategori aset ini? Aset yang menggunakan kategori ini akan kehilangan label jenisnya.')) return;
    try {
      await api.delete(`/asset-categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Gagal menghapus kategori aset:', error);
    }
  };

  const openModal = (type: 'tambah-rekening' | 'tambah-aset' | 'kelola-aset', accountId?: number) => {
    setModalType(type);
    if (accountId) setActiveAccountId(accountId);
    setValidationError(false);
    setNamaRekening('');
    setJenisAset('');
    setJumlahAsetRaw('');
    setNewCategory('');
  };

  const closeModal = () => {
    setModalType(null);
    setActiveAccountId(null);
  };

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setJumlahAsetRaw(raw ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '');
  };

  const handleSimpanRekening = async () => {
    const nama = namaRekening.trim();
    if (!nama) return setValidationError(true);
    
    setIsSaving(true);
    try {
      const res = await api.post('/platform', { name: nama });
      setAccounts([...accounts, { ...res.data, portfolios: [] }]);
      closeModal();
    } catch (error) {
      alert('Rekening dengan nama tersebut sudah ada atau terjadi kesalahan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSimpanAset = async () => {
    const amount = parseInt(jumlahAsetRaw.replace(/\D/g, '') || '0', 10);
    if (!jenisAset || amount <= 0) return setValidationError(true);

    setIsSaving(true);
    try {
      await api.post('/portfolios', { platformId: activeAccountId, assetCategoryId: parseInt(jenisAset), amount });
      const response = await api.get('/platform');
      setAccounts(response.data);
      closeModal();
    } catch (error) {
      console.error('Error saving asset:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-6 animate-in delay-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">Rekening & Aset</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mt-0.5">Kelola rekening dan aset dalam satu alur</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => openModal('tambah-rekening')} className="btn-gradient inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-on-primary font-label-md text-label-md shadow-md active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Tambah Rekening
          </button>
          <button type="button" onClick={() => openModal('kelola-aset')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant dark:border-white/15 bg-surface-container-lowest dark:bg-dark-card text-on-surface dark:text-white font-label-md text-label-md hover:border-primary/40 transition-all">
            <span className="material-symbols-outlined text-[20px] text-primary dark:text-primary-fixed-dim">settings</span>
            Kelola Jenis Aset
          </button>
        </div>
      </div>

      <div id="rekening-list" className="space-y-6">
        {accounts.map((rek) => {
          const totalAset = rek.portfolios?.reduce((sum: number, p: any) => sum + Number(p.amount), 0) || 0;
          return (
          <article key={rek.id} className="account-card hover-lift rounded-2xl border border-outline-variant/40 dark:border-white/10 p-6 space-y-6 transition-colors bg-white dark:bg-[#1c1b1b] hover:border-primary/30 dark:hover:border-primary-fixed-dim/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-6 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-primary-fixed dark:bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[28px]">account_balance_wallet</span>
                </div>
                <div className="min-w-0">
                  <h5 className="font-headline-md text-headline-md text-on-surface dark:text-white truncate">{rek.name}</h5>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white font-bold mt-0.5">
                    Rp {totalAset.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button type="button" onClick={() => openModal('tambah-aset', rek.id)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container dark:bg-primary/20 text-primary dark:text-primary-fixed-dim hover:opacity-80 transition-transform hover:scale-105 active:scale-95" title="Tambah aset">
                  <span className="material-symbols-outlined text-[22px] font-bold">add</span>
                </button>
                <button type="button" onClick={() => handleDeleteRekening(rek.id)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-error-container/50 text-error dark:bg-error/15 dark:text-red-400 hover:opacity-80 transition-transform hover:scale-105 active:scale-95" title="Hapus rekening">
                  <span className="material-symbols-outlined text-[22px]">delete</span>
                </button>
              </div>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 asset-scroll">
              {rek.portfolios?.map((aset: any) => (
                <div key={aset.id} className="asset-chip rounded-xl p-4 relative shrink-0">
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button type="button" className="p-0.5 text-primary hover:opacity-70 transition-transform hover:scale-110 active:scale-95" title="Edit aset">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button type="button" onClick={() => handleDeleteAset(aset.id)} className="p-0.5 text-error hover:opacity-70 transition-transform hover:scale-110 active:scale-95" title="Hapus aset">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <span className="material-symbols-outlined text-primary/60 text-[20px] mb-2 block">hub</span>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white pr-12 truncate">{aset.assetCategory?.name || 'Aset'}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-[#c8cedd] mt-1">Rp {Number(aset.amount).toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>
          </article>
        )})}
      </div>

      {/* Modal Overlay */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 opacity-100 visible">
          <div className="absolute inset-0 bg-[#141b2b]/40 dark:bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          <div className="relative z-10 w-full max-w-[440px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1c1b1b] rounded-t-[24px] md:rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-bottom-4">
             <div className="w-10 h-1 bg-outline-variant/50 dark:bg-white/20 rounded-full mx-auto mb-6 md:hidden"></div>
             
             {modalType === 'tambah-rekening' && (
               <div>
                 <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                 </div>
                 <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white text-center">Tambah Rekening</h3>
                 <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-1 mb-6">Buat dompet digital atau platform baru.</p>
                 <div className="space-y-4">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5">Nama Rekening</label>
                      <input type="text" value={namaRekening} onChange={e => setNamaRekening(e.target.value)} className={`w-full h-12 px-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${validationError && !namaRekening ? 'border-error ring-1 ring-error' : 'border-outline-variant dark:border-white/10'}`} placeholder="Contoh: BCA, Bibit..." />
                    </div>
                    <div className="flex gap-3 pt-4">
                       <button type="button" onClick={closeModal} className="flex-1 h-11 rounded-xl border border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 transition-colors">Batal</button>
                       <button type="button" onClick={handleSimpanRekening} disabled={isSaving} className="flex-1 h-11 rounded-xl bg-primary text-white font-label-md hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                          {isSaving ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : 'Simpan'}
                       </button>
                    </div>
                 </div>
               </div>
             )}

             {modalType === 'tambah-aset' && (
               <div>
                 <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
                 </div>
                 <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white text-center">Tambah Aset</h3>
                 <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-1 mb-6">ke rekening <strong className="text-primary dark:text-primary-fixed-dim">{accounts.find(a => a.id === activeAccountId)?.name}</strong></p>
                 <div className="space-y-4">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5">Jenis Aset</label>
                      <select value={jenisAset} onChange={e => setJenisAset(e.target.value)} className={`w-full h-12 px-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none ${validationError && !jenisAset ? 'border-error ring-1 ring-error' : 'border-outline-variant dark:border-white/10'}`}>
                         <option value="" disabled>Pilih Kategori</option>
                         {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5">Jumlah (IDR)</label>
                      <div className="relative">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-primary">Rp</span>
                         <input type="text" inputMode="numeric" value={jumlahAsetRaw} onChange={handleJumlahChange} className={`w-full h-12 pl-12 pr-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 ${validationError && !jumlahAsetRaw ? 'border-error ring-1 ring-error' : 'border-outline-variant dark:border-white/10'}`} placeholder="0" />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                       <button type="button" onClick={closeModal} className="flex-1 h-11 rounded-xl border border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 transition-colors">Batal</button>
                       <button type="button" onClick={handleSimpanAset} disabled={isSaving} className="flex-1 h-11 rounded-xl bg-primary text-white font-label-md hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                          {isSaving ? <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> : 'Simpan'}
                       </button>
                    </div>
                 </div>
               </div>
             )}

             {modalType === 'kelola-aset' && (
               <div>
                 <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
                 </div>
                 <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white text-center">Kelola Jenis Aset</h3>
                 <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-1 mb-6">Atur kategori jenis aset portofolio Anda.</p>
                 
                 <div className="space-y-4">
                    <div className="flex gap-2">
                      <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full h-11 px-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white border-outline-variant dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Kategori baru..." />
                      <button type="button" onClick={handleAddCategory} className="h-11 w-11 rounded-xl bg-primary text-white hover:brightness-110 transition-all flex items-center justify-center shrink-0">
                         <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>

                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1 asset-scroll">
                      {categories.map((aset) => (
                        <div key={aset.id} className="flex items-center justify-between p-3 rounded-xl border border-outline-variant/40 dark:border-white/10 bg-surface-container-lowest dark:bg-dark-card">
                          <div className="flex items-center gap-3 pl-1">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="font-body-sm font-medium text-on-surface dark:text-white">{aset.name}</span>
                          </div>
                          <button type="button" onClick={() => handleDeleteCategory(aset.id)} className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error/10" title="Hapus">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                       <button type="button" onClick={closeModal} className="w-full h-11 rounded-xl border border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 transition-colors">Tutup</button>
                    </div>
                 </div>
               </div>
             )}
          </div>
        </div>
      )}
    </section>
  );
}