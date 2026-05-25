import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';

export function AccountList() {
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get('/platforms');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  const handleDeleteRekening = async (id: number) => {
    if (!window.confirm('Hapus rekening beserta seluruh aset di dalamnya?')) return;
    try {
      await api.delete(`/platforms/${id}`);
      setAccounts(accounts.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting account:', error);
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
                <Link to={`/tambah-aset?akun=${rek.id}`} className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container dark:bg-primary/20 text-primary dark:text-primary-fixed-dim hover:opacity-80 transition-transform hover:scale-105 active:scale-95 no-underline" title="Tambah aset">
                  <span className="material-symbols-outlined text-[22px] font-bold">add</span>
                </Link>
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
                    <button type="button" className="p-0.5 text-error hover:opacity-70 transition-transform hover:scale-110 active:scale-95" title="Hapus aset">
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
    </section>
  );
}