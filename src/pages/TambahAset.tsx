import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { api } from '../lib/api';

export function TambahAset() {
  const navigate = useNavigate();

  const [namaRekening, setNamaRekening] = useState('');
  
  const [jenisAset, setJenisAset] = useState('');
  const [jumlahAsetRaw, setJumlahAsetRaw] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const [platforms, setPlatforms] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [platRes, catRes] = await Promise.all([
          api.get('/platforms'),
          api.get('/asset-categories')
        ]);
        setPlatforms(platRes.data);
        setCategories(catRes.data);
        
        const params = new URLSearchParams(window.location.search);
        const akunId = params.get('akun');
        if (akunId) {
          const plat = platRes.data.find((p: any) => p.id.toString() === akunId);
          if (plat) setNamaRekening(plat.name);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const formatRupiah = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const parseRupiah = (str: string) => {
    return parseInt(str.replace(/\D/g, '') || '0', 10);
  };

  const terbilangSingkat = (n: number) => {
    if (n === 0) return '';
    if (n >= 1_000_000_000) return `≈ ${(n / 1_000_000_000).toFixed(1)} miliar rupiah`;
    if (n >= 1_000_000) return `≈ ${(n / 1_000_000).toFixed(1)} juta rupiah`;
    if (n >= 1_000) return `≈ ${(n / 1_000).toFixed(0)} ribu rupiah`;
    return `${n.toLocaleString('id-ID')} rupiah`;
  };

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setJumlahAsetRaw(formatRupiah(raw));
  };

  const handleSimpan = async () => {
    const amount = parseRupiah(jumlahAsetRaw);
    const nama = namaRekening.trim();

    if (!nama || !jenisAset || !amount) {
      setValidationError(true);
      setTimeout(() => setValidationError(false), 600);
      return;
    }

    setIsSaving(true);
    try {
      let platformId;
      const existingPlat = platforms.find(p => p.name.toLowerCase() === nama.toLowerCase());
      
      if (existingPlat) {
        platformId = existingPlat.id;
      } else {
        const platRes = await api.post('/platforms', { name: nama });
        platformId = platRes.data.id;
      }

      await api.post('/portfolios', {
        platformId: parseInt(platformId),
        assetCategoryId: parseInt(jenisAset),
        amount: amount
      });

      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1800);
    } catch (error) {
      console.error('Error saving asset:', error);
      setIsSaving(false);
    }
  };

  const amount = parseRupiah(jumlahAsetRaw);
  const displaySaldo = amount ? `Rp ${formatRupiah(String(amount))}` : 'Rp 0';
  const displayTerbilang = amount ? terbilangSingkat(amount) : '';

  const nama = namaRekening.trim();
  const existingPlat = platforms.find(p => p.name.toLowerCase() === nama.toLowerCase());
  
  let previewData = {
      tipe: 'Rekening',
      nama: 'Belum diisi',
      inisial: '...',
      nomor: '•••• •••• ••••',
      app: 'Aplikasi',
      ikon: 'account_balance',
      kartu: 'bank-card',
      chip: false
  };

  if (nama) {
    previewData = {
      tipe: existingPlat ? 'Rekening Tersimpan' : 'Rekening Baru',
      nama: existingPlat ? existingPlat.name : nama,
      inisial: nama.slice(0, 3).toUpperCase(),
      nomor: existingPlat ? '•••• •••• ••••' : 'Rekening baru • siap diisi aset',
      app: existingPlat ? existingPlat.name : 'Artogue',
      ikon: existingPlat ? 'account_balance_wallet' : 'add_card',
      kartu: existingPlat ? 'bank-card' : 'wallet-card-ewallet',
      chip: !!existingPlat
    };
  }

  return (
    <div className="page-shell">
      <main className="min-h-screen page-content pb-8">
        <TopBar />
        <div className="px-4 sm:px-6 md:px-8 py-8 flex flex-col items-center w-full max-w-[800px] mx-auto relative z-10">
        {/* Breadcrumb / progress */}
        <div className="w-full animate-fade-up flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-on-surface-variant">
                <Link to="/dashboard" className="font-label-sm text-label-sm hover:text-primary dark:hover:text-primary-fixed-dim no-underline">Portofolio</Link>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="font-label-sm text-label-sm text-primary dark:text-primary-fixed-dim font-semibold">Tambah Rekening &amp; Aset</span>
            </div>
            <div className="flex flex-col items-end gap-1">
                <label className="period-select text-[13px]" title="Periode portofolio">
                    <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    <span className="period-select__label">—</span>
                    <input type="month" className="period-select__input" aria-label="Pilih bulan" />
                </label>
                <p className="font-label-sm text-label-sm text-primary dark:text-primary-fixed-dim font-semibold">—</p>
            </div>
        </div>

        {/* Pratinjau rekening / dompet terpilih */}
        <div className="w-full mt-6 animate-fade-up-delay">
            <div className={`${previewData.kartu} relative overflow-hidden rounded-2xl p-5 text-white transition-all duration-300`}>
                <div className="relative z-10 flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm tracking-tight">{previewData.inisial}</div>
                        <div>
                            <p className="text-white/80 text-xs font-medium">{previewData.tipe}</p>
                            <p className="font-semibold text-sm mt-0.5">{previewData.nama}</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-white/70 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{previewData.ikon}</span>
                </div>
                <p className="relative z-10 font-mono text-lg tracking-[0.2em] mb-1">{previewData.nomor}</p>
                <div className="relative z-10 flex justify-between items-end mt-4">
                    <div>
                        <p className="text-white/60 text-[10px] uppercase tracking-wider">Nilai aset baru</p>
                        <p className="font-bold text-xl mt-0.5">{displaySaldo}</p>
                    </div>
                    {previewData.chip && <div className="chip-emv w-10 h-7 rounded-md opacity-90"></div>}
                </div>
            </div>
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-2 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
                Sinkronkan saldo sesuai <span>{previewData.app}</span>
            </p>
        </div>

        {/* Form card */}
        <div className="w-full mt-8 animate-fade-up-delay delay-150">
            <div className="form-card bg-surface-container-lowest/95 dark:bg-dark-card rounded-2xl border border-outline-variant/80 dark:border-white/10 shadow-card p-6 w-full">

                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-fixed to-surface-container flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                        </div>
                        <div>
                            <h2 className="font-headline-md text-headline-md text-on-surface dark:text-white">Rekening &amp; Aset</h2>
                            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant">Pilih atau buat rekening, lalu isi aset</p>
                        </div>
                    </div>
                    <Link to="/dashboard" aria-label="Tutup"
                        className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-variant rounded-full transition-colors no-underline">
                        close
                    </Link>
                </div>

                <div className="space-y-6">
                    {/* Input Nama Rekening */}
                    <div className="space-y-4 animate-fade-up">
                        <label className="font-label-md text-label-md text-on-surface-variant px-1 flex items-center gap-1">
                            Nama Rekening / Platform
                            <span className="text-primary text-xs">*</span>
                        </label>
                        <div className="relative">
                            <input type="text" maxLength={48} list="existing-platforms" autoComplete="off"
                                value={namaRekening}
                                onChange={(e) => setNamaRekening(e.target.value)}
                                className={`input-field w-full h-12 bg-surface dark:bg-[#131313] border dark:border-white/10 rounded-xl px-4 focus:border-primary-container dark:text-white font-body-lg transition-all outline-none ${validationError && !namaRekening.trim() ? 'ring-2 ring-primary border-primary' : 'border-outline-variant'}`}
                                placeholder="Ketik nama baru atau pilih yang sudah ada..." />
                            <datalist id="existing-platforms">
                                {platforms.map(p => (
                                    <option key={p.id} value={p.name} />
                                ))}
                            </datalist>
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant px-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                            Jika nama sudah ada, aset akan ditambahkan ke rekening tersebut.
                        </p>
                    </div>

                    {/* Jenis Aset */}
                    <div className="space-y-4">
                        <label className="font-label-md text-label-md text-on-surface-variant px-1 flex items-center gap-1">
                            Jenis Aset
                            <span className="text-primary text-xs">*</span>
                        </label>
                        <div className="relative">
                            <select title="Jenis Aset"
                                value={jenisAset}
                                onChange={(e) => setJenisAset(e.target.value)}
                                className={`input-field w-full h-12 bg-surface dark:bg-[#131313] border dark:border-white/10 rounded-xl px-4 pr-10 appearance-none focus:border-primary-container dark:text-white font-body-lg text-body-lg transition-all outline-none cursor-pointer ${validationError && !jenisAset ? 'ring-2 ring-primary border-primary' : 'border-outline-variant'}`}>
                                <option disabled value="">Pilih jenis aset</option>
                                {categories.map(c => (
                                  <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                        </div>
                    </div>

                    {/* Jumlah */}
                    <div className="space-y-4">
                        <label className="font-label-md text-label-md text-on-surface-variant px-1 flex items-center gap-1">
                            Jumlah (IDR)
                            <span className="text-primary text-xs">*</span>
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="font-label-md text-label-md text-primary font-bold">Rp</span>
                            </div>
                            <input type="text" inputMode="numeric" autoComplete="off"
                                value={jumlahAsetRaw}
                                onChange={handleJumlahChange}
                                className={`input-field w-full h-14 bg-surface dark:bg-[#131313] border dark:border-white/10 rounded-xl pl-12 pr-4 focus:border-primary-container dark:text-white font-headline-md text-headline-md font-bold transition-all outline-none tracking-tight ${validationError && !amount ? 'ring-2 ring-primary border-primary' : 'border-outline-variant'}`}
                                placeholder="0" />
                        </div>
                        <p className="font-label-sm text-label-sm text-on-surface-variant px-1 italic min-h-[18px]">{displayTerbilang}</p>
                    </div>

                    {/* Info box */}
                    <div className="bg-gradient-to-r from-surface-container-low to-surface-container dark:from-white/5 dark:to-transparent p-4 rounded-xl flex gap-4 border border-outline-variant/50 dark:border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-primary text-lg">lightbulb</span>
                        </div>
                        <p className="font-label-sm text-label-sm text-on-secondary-container dark:text-on-surface-variant leading-relaxed">
                            Masukkan saldo sesuai <strong>{previewData.app}</strong> agar grafik portofolio dan alokasi aset tetap akurat.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8">
                    <Link to="/dashboard"
                        className="flex flex-1 items-center justify-center h-12 rounded-xl border-2 border-outline-variant/60 dark:border-white/10 font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container dark:hover:bg-white/5 hover:border-outline transition-all active:scale-[0.98] no-underline">
                        Batal
                    </Link>
                    <button type="button" onClick={handleSimpan} disabled={isSaving || isSuccess}
                        className={`btn-primary-glow flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-primary-container font-label-md text-label-md text-on-primary shadow-glow hover:brightness-105 transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${validationError ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-dark-card' : ''}`}>
                        {isSaving ? (
                            <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span> Menyimpan...</>
                        ) : isSuccess ? (
                            <><span className="material-symbols-outlined text-lg">check_circle</span> Berhasil!</>
                        ) : (
                            <><span className="material-symbols-outlined text-lg">add_circle</span> Simpan Aset</>
                        )}
                    </button>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/60 dark:border-white/10 flex justify-center items-center gap-1 text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span className="font-label-sm text-label-sm">Enkripsi TLS 1.3 • Tidak menyimpan password</span>
                </div>
            </div>
        </div>

        </div>

      </main>
    </div>
  );
}