import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';

const AKUN_DATA: Record<string, any> = {
  bca: { tipe: 'Rekening Bank', nama: 'BCA — Tahapan', inisial: 'BCA', nomor: '•••• •••• •••• 4521', app: 'm-BCA / myBCA', ikon: 'account_balance', kartu: 'bank-card', chip: true },
  mandiri: { tipe: 'Rekening Bank', nama: 'Mandiri Livin\'', inisial: 'MDR', nomor: '•••• •••• •••• 8812', app: 'Livin\' by Mandiri', ikon: 'account_balance', kartu: 'bank-card', chip: true },
  bri: { tipe: 'Rekening Bank', nama: 'BRI Britama', inisial: 'BRI', nomor: '•••• •••• •••• 4567', app: 'BRIMO', ikon: 'account_balance', kartu: 'bank-card', chip: true },
  bni: { tipe: 'Rekening Bank', nama: 'BNI Taplus', inisial: 'BNI', nomor: '•••• •••• •••• 2109', app: 'BNI Mobile', ikon: 'account_balance', kartu: 'bank-card', chip: true },
  cimb: { tipe: 'Rekening Bank', nama: 'CIMB Niaga', inisial: 'CIMB', nomor: '•••• •••• •••• 3341', app: 'OCTO Mobile', ikon: 'account_balance', kartu: 'bank-card', chip: true },
  bibit: { tipe: 'Dompet Digital', nama: 'Bibit', inisial: 'BB', nomor: 'Portofolio reksa dana', app: 'aplikasi Bibit', ikon: 'savings', kartu: 'wallet-card-bibit', chip: false },
  pluang: { tipe: 'Dompet Digital', nama: 'Pluang', inisial: 'PLG', nomor: 'Portofolio investasi', app: 'aplikasi Pluang', ikon: 'trending_up', kartu: 'wallet-card-pluang', chip: false },
  ajaib: { tipe: 'Dompet Digital', nama: 'Ajaib', inisial: 'AJB', nomor: 'Portofolio saham', app: 'aplikasi Ajaib', ikon: 'candlestick_chart', kartu: 'wallet-card-ajaib', chip: false },
  gopay: { tipe: 'Dompet Digital', nama: 'GoPay', inisial: 'GP', nomor: 'Saldo dompet', app: 'aplikasi Gojek / GoPay', ikon: 'account_balance_wallet', kartu: 'wallet-card-ewallet', chip: false },
  ovo: { tipe: 'Dompet Digital', nama: 'OVO', inisial: 'OVO', nomor: 'Saldo dompet', app: 'aplikasi OVO', ikon: 'account_balance_wallet', kartu: 'wallet-card-ewallet', chip: false },
  dana: { tipe: 'Dompet Digital', nama: 'DANA', inisial: 'DANA', nomor: 'Saldo dompet', app: 'aplikasi DANA', ikon: 'account_balance_wallet', kartu: 'wallet-card-ewallet', chip: false },
  shopeepay: { tipe: 'Dompet Digital', nama: 'ShopeePay', inisial: 'SPay', nomor: 'Saldo dompet', app: 'aplikasi ShopeePay', ikon: 'account_balance_wallet', kartu: 'wallet-card-ewallet', chip: false },
};

const TIPE_LABEL: Record<string, string> = {
  bank: 'Rekening Bank',
  dompet: 'Dompet Digital',
  investasi: 'Platform Investasi',
  lainnya: 'Lainnya',
};

export function TambahAset() {
  const navigate = useNavigate();

  const [modeRekening, setModeRekening] = useState<'existing' | 'baru'>('existing');
  const [akunAktif, setAkunAktif] = useState<string>('bca');
  const [namaRekeningBaru, setNamaRekeningBaru] = useState('');
  const [tipeRekeningBaru, setTipeRekeningBaru] = useState('bank');
  
  const [jenisAset, setJenisAset] = useState('');
  const [jumlahAsetRaw, setJumlahAsetRaw] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState(false);

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

  const handleSimpan = () => {
    const amount = parseRupiah(jumlahAsetRaw);
    const namaBaru = namaRekeningBaru.trim();

    if (modeRekening === 'baru' && !namaBaru) {
      setValidationError(true);
      setTimeout(() => setValidationError(false), 800);
      return;
    }
    
    if (!jenisAset || !amount) {
      setValidationError(true);
      setTimeout(() => setValidationError(false), 600);
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1800);
    }, 900);
  };

  const amount = parseRupiah(jumlahAsetRaw);
  const displaySaldo = amount ? `Rp ${formatRupiah(String(amount))}` : 'Rp 0';
  const displayTerbilang = amount ? terbilangSingkat(amount) : '';

  let previewData = AKUN_DATA['bca'];
  if (modeRekening === 'baru') {
    const nama = namaRekeningBaru.trim() || 'Rekening Baru';
    previewData = {
      tipe: TIPE_LABEL[tipeRekeningBaru] || 'Lainnya',
      nama: nama,
      inisial: nama.slice(0, 3).toUpperCase() || 'NEW',
      nomor: 'Rekening baru • siap diisi aset',
      app: 'Artogue',
      ikon: 'add_card',
      kartu: 'wallet-card-ewallet',
      chip: false
    };
  } else if (akunAktif && AKUN_DATA[akunAktif]) {
    previewData = AKUN_DATA[akunAktif];
  }

  return (
    <div className="page-shell">
      <main className="min-h-screen page-content pb-8">
        <TopBar />
        <div className="px-4 sm:px-6 md:px-8 py-8 flex flex-col items-center w-full max-w-[800px] mx-auto relative z-10">
        {/* Breadcrumb / progress */}
        <div className="w-full animate-fade-up flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-on-surface-variant">
                <Link to="/" className="font-label-sm text-label-sm hover:text-primary dark:hover:text-primary-fixed-dim no-underline">Portofolio</Link>
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
                    <Link to="/" aria-label="Tutup"
                        className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-variant rounded-full transition-colors no-underline">
                        close
                    </Link>
                </div>

                <div className="space-y-6">
                    {/* Mode: rekening ada / baru */}
                    <div className="flex p-1 rounded-xl bg-surface-container-low dark:bg-white/5 border border-outline-variant/50 dark:border-white/10" role="tablist">
                        <button type="button" role="tab" onClick={() => setModeRekening('existing')}
                            className={`flex-1 py-2.5 px-3 rounded-lg font-label-md text-label-md transition-all ${modeRekening === 'existing' ? 'bg-surface dark:bg-[#1c1b1b] shadow-sm text-primary dark:text-primary-fixed-dim font-semibold' : 'text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim'}`}>
                            Rekening yang ada
                        </button>
                        <button type="button" role="tab" onClick={() => setModeRekening('baru')}
                            className={`flex-1 py-2.5 px-3 rounded-lg font-label-md text-label-md transition-all ${modeRekening === 'baru' ? 'bg-surface dark:bg-[#1c1b1b] shadow-sm text-primary dark:text-primary-fixed-dim font-semibold' : 'text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim'}`}>
                            Rekening baru
                        </button>
                    </div>

                    {/* Panel rekening baru */}
                    {modeRekening === 'baru' && (
                      <div className="space-y-4 animate-fade-up">
                          <label className="font-label-md text-label-md text-on-surface-variant px-1 flex items-center gap-1">
                              Nama Rekening / Dompet
                              <span className="text-primary text-xs">*</span>
                          </label>
                          <input type="text" maxLength={48}
                              value={namaRekeningBaru}
                              onChange={(e) => setNamaRekeningBaru(e.target.value)}
                              className={`input-field w-full h-12 bg-surface dark:bg-[#131313] border dark:border-white/10 rounded-xl px-4 focus:border-primary-container dark:text-white font-body-lg transition-all outline-none ${validationError && !namaRekeningBaru.trim() ? 'ring-2 ring-primary border-primary' : 'border-outline-variant'}`}
                              placeholder="Contoh: SeaBank, Jenius..." />
                          <label className="font-label-md text-label-md text-on-surface-variant px-1">Kategori</label>
                          <select title="Kategori rekening"
                              value={tipeRekeningBaru}
                              onChange={(e) => setTipeRekeningBaru(e.target.value)}
                              className="input-field w-full h-12 bg-surface dark:bg-[#131313] border border-outline-variant dark:border-white/10 rounded-xl px-4 appearance-none focus:border-primary-container dark:text-white font-body-lg outline-none cursor-pointer">
                              <option value="bank">Rekening Bank</option>
                              <option value="dompet">Dompet Digital</option>
                              <option value="investasi">Platform Investasi</option>
                              <option value="lainnya">Lainnya</option>
                          </select>
                          <p className="font-label-sm text-label-sm text-on-surface-variant px-1 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                              Setelah rekening dibuat, aset pertama langsung ditambahkan di bawah.
                          </p>
                      </div>
                    )}

                    {/* Pilih Rekening / Dompet */}
                    {modeRekening === 'existing' && (
                      <div className="space-y-4 animate-fade-up">
                          <label className="font-label-md text-label-md text-on-surface-variant px-1 flex items-center gap-1">
                              Simpan ke Rekening / Dompet
                              <span className="text-primary text-xs">*</span>
                          </label>

                          <p className="font-label-sm text-label-sm text-on-surface-variant px-1 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">account_balance</span>
                              Rekening Bank
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {['bca', 'mandiri', 'bri', 'bni', 'cimb'].map((id) => {
                                const d = AKUN_DATA[id];
                                let bgClass = 'bg-primary';
                                if(id === 'bca') bgClass = 'bg-bca-blue';
                                else if(id === 'mandiri') bgClass = 'bg-[#003d79]';
                                else if(id === 'bri') bgClass = 'bg-[#00529c]';
                                else if(id === 'bni') bgClass = 'bg-[#f15a22]';
                                else if(id === 'cimb') bgClass = 'bg-[#790007]';

                                return (
                                  <button key={id} type="button" onClick={() => setAkunAktif(id)}
                                      className={`akun-pilih rounded-xl p-3 text-left flex items-center gap-3 bg-surface dark:bg-[#131313] border dark:border-white/10 ${id === 'cimb' ? 'sm:col-span-2' : ''} ${akunAktif === id ? 'selected' : 'border-outline-variant/60'}`}>
                                      <span className={`w-10 h-10 rounded-lg ${bgClass} text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0`}>{d.inisial}</span>
                                      <span>
                                          <span className="font-label-md text-label-md text-on-surface dark:text-white block">{d.nama}</span>
                                          <span className="font-label-sm text-label-sm text-on-surface-variant">{d.tipe === 'Rekening Bank' ? 'Tabungan/Giro' : 'Aset'}</span>
                                      </span>
                                  </button>
                                )
                              })}
                          </div>

                          <p className="font-label-sm text-label-sm text-on-surface-variant px-1 flex items-center gap-1 mt-2">
                              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
                              Dompet Digital &amp; Investasi
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {['bibit', 'pluang', 'ajaib', 'gopay', 'ovo', 'dana', 'shopeepay'].map((id) => {
                                const d = AKUN_DATA[id];
                                let bgClass = 'bg-primary';
                                if(id === 'bibit') bgClass = 'bg-bibit-green';
                                else if(id === 'pluang') bgClass = 'bg-[#3b82f6]';
                                else if(id === 'ajaib') bgClass = 'bg-[#7c3aed]';
                                else if(id === 'gopay') bgClass = 'bg-[#00aed6]';
                                else if(id === 'ovo') bgClass = 'bg-[#4c3494]';
                                else if(id === 'dana') bgClass = 'bg-[#108ee9]';
                                else if(id === 'shopeepay') bgClass = 'bg-[#ee4d2d]';

                                return (
                                  <button key={id} type="button" onClick={() => setAkunAktif(id)}
                                      className={`akun-pilih rounded-xl p-3 text-left flex items-center gap-3 bg-surface dark:bg-[#131313] border dark:border-white/10 ${akunAktif === id ? 'selected' : 'border-outline-variant/60'}`}>
                                      <span className={`w-10 h-10 rounded-lg ${bgClass} text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center shrink-0`}>{d.inisial}</span>
                                      <span>
                                          <span className="font-label-md text-label-md text-on-surface dark:text-white block">{d.nama}</span>
                                          <span className="font-label-sm text-label-sm text-on-surface-variant">{d.tipe === 'Dompet Digital' ? 'Dompet digital' : 'Investasi'}</span>
                                      </span>
                                  </button>
                                )
                              })}
                          </div>
                      </div>
                    )}

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
                                <option value="reksadana">Reksadana</option>
                                <option value="saham-id">Saham Indonesia</option>
                                <option value="saham-us">Saham US</option>
                                <option value="obligasi">Obligasi</option>
                                <option value="cash">Cash / Tabungan</option>
                                <option value="emas">Emas</option>
                                <option value="kripto">Kripto</option>
                                <option value="deposito">Deposito</option>
                                <option value="properti">Properti</option>
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
                    <Link to="/"
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