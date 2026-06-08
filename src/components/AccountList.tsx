import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { api } from "../lib/api";

export function AccountList() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [modalType, setModalType] = useState<
    "tambah-rekening" | "tambah-aset" | "kelola-aset" | "edit-aset" | null
  >(null);
  const [activeAccountId, setActiveAccountId] = useState<number | null>(null);
  const [activeAssetId, setActiveAssetId] = useState<number | null>(null);

  const [namaRekening, setNamaRekening] = useState("");
  const [jenisAset, setJenisAset] = useState("");
  const [jumlahAsetRaw, setJumlahAsetRaw] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "rekening" | "aset" | "kategori";
    id: number;
    name?: string;
    parentName?: string;
    count?: number;
  } | null>(null);

  // Fungsi pemanggil notifikasi bergaya Toast
  const showNotification = (
    message: string,
    type: "error" | "success" = "error"
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/asset-category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/platform");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    const loadData = () => {
      fetchAccounts();
      fetchCategories();
    };

    loadData();

    window.addEventListener("dashboard-update", loadData);
    return () => window.removeEventListener("dashboard-update", loadData);
  }, []);

  // Menutup modal dengan tombol 'Escape'
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSaving) {
        if (deleteTarget) setDeleteTarget(null);
        else if (modalType) closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSaving, deleteTarget, modalType]);

  const handleDeleteRekening = async (id: number) => {
    setIsSaving(true);
    try {
      await api.delete(`/platform/${id}`);
      setAccounts(accounts.filter((a) => a.id !== id));
      window.dispatchEvent(new Event("dashboard-update"));
      showNotification("Rekening berhasil dihapus.", "success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting account:", error);
      showNotification("Gagal menghapus rekening.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAset = async (id: number) => {
    setIsSaving(true);
    try {
      await api.delete(`/portfolio/${id}`);
      const response = await api.get("/platform");
      setAccounts(response.data);
      window.dispatchEvent(new Event("dashboard-update"));
      showNotification("Aset berhasil dihapus.", "success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Error deleting asset:", error);
      showNotification("Gagal menghapus aset.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setIsSaving(true);
    try {
      await api.post("/asset-category", { name: newCategory });
      setNewCategory("");
      fetchCategories();
      showNotification("Kategori aset berhasil ditambahkan.", "success");
    } catch (error: any) {
      if (error.response?.status === 400) {
        showNotification(error.response.data.message || "Kategori sudah ada.");
      } else {
        console.error("Gagal menambahkan kategori aset:", error);
        showNotification("Gagal menambahkan kategori aset.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setIsSaving(true);
    try {
      await api.delete(`/asset-category/${id}`);
      fetchCategories();
      showNotification("Kategori aset berhasil dihapus.", "success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Gagal menghapus kategori aset:", error);
      showNotification("Gagal menghapus kategori aset.");
    } finally {
      setIsSaving(false);
    }
  };

  const openModal = (
    type: "tambah-rekening" | "tambah-aset" | "kelola-aset" | "edit-aset",
    accountId?: number,
    asset?: any
  ) => {
    setModalType(type);
    if (accountId) setActiveAccountId(accountId);
    setValidationError(false);
    setNamaRekening("");
    setNewCategory("");

    if (type === "edit-aset" && asset) {
      setActiveAssetId(asset.id);
      setJumlahAsetRaw(
        asset.balance ? Number(asset.balance).toLocaleString("id-ID") : ""
      );
    } else {
      setActiveAssetId(null);
      setJenisAset("");
      setJumlahAsetRaw("");
    }
  };

  const closeModal = () => {
    setModalType(null);
    setActiveAccountId(null);
    setActiveAssetId(null);
  };

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setJumlahAsetRaw(raw ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "");
  };

  const handleSimpanRekening = async () => {
    const nama = namaRekening.trim();
    if (!nama) return setValidationError(true);

    setIsSaving(true);
    try {
      const res = await api.post("/platform", { name: nama });
      setAccounts([...accounts, { ...res.data, portfolios: [] }]);
      window.dispatchEvent(new Event("dashboard-update"));
      showNotification("Rekening berhasil ditambahkan.", "success");
      closeModal();
    } catch (error) {
      showNotification(
        "Rekening dengan nama tersebut sudah ada atau terjadi kesalahan."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSimpanAset = async () => {
    const amount = parseInt(jumlahAsetRaw.replace(/\D/g, "") || "0", 10);
    if (!jenisAset || amount <= 0) return setValidationError(true);

    setIsSaving(true);
    try {
      await api.post("/portfolio", {
        platformId: activeAccountId,
        assetCategoryId: parseInt(jenisAset),
        balance: amount,
      });
      const response = await api.get("/platform");
      setAccounts(response.data);
      window.dispatchEvent(new Event("dashboard-update"));
      showNotification("Aset berhasil ditambahkan.", "success");
      closeModal();
    } catch (error: any) {
      console.error("Error saving asset:", error);
      showNotification(
        error.response?.data?.message ||
          "Terjadi kesalahan. Gagal menyimpan aset."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateAset = async () => {
    const amount = parseInt(jumlahAsetRaw.replace(/\D/g, "") || "0", 10);
    if (amount <= 0) return setValidationError(true);
    if (!activeAssetId) return;

    setIsSaving(true);
    try {
      await api.patch(`/portfolio/${activeAssetId}/balance`, {
        balance: amount,
      });
      const response = await api.get("/platform");
      setAccounts(response.data);
      window.dispatchEvent(new Event("dashboard-update"));
      showNotification("Perubahan berhasil disimpan.", "success");
      closeModal();
    } catch (error: any) {
      console.error("Error updating asset:", error);
      showNotification(
        error.response?.data?.message ||
          "Gagal menyimpan perubahan. Pastikan backend Anda berjalan dengan baik."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="space-y-6 animate-in delay-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">
            Rekening & Aset
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mt-0.5">
            Kelola rekening dan aset dalam satu alur
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openModal("tambah-rekening")}
            className="btn-gradient inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-on-primary font-label-md text-label-md shadow-md active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">
              add_circle
            </span>
            Tambah Rekening
          </button>
          <button
            type="button"
            onClick={() => openModal("kelola-aset")}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant dark:border-white/15 bg-surface-container-lowest dark:bg-dark-card text-on-surface dark:text-white font-label-md text-label-md hover:border-primary/40 transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-primary dark:text-primary-fixed-dim">
              settings
            </span>
            Kelola Jenis Aset
          </button>
        </div>
      </div>

      <div id="rekening-list" className="space-y-6">
        {accounts.map((rek) => {
          const totalAset =
            rek.portfolios?.reduce(
              (sum: number, p: any) => sum + Number(p.balance),
              0
            ) || 0;
          return (
            <article
              key={rek.id}
              className="account-card hover-lift rounded-2xl border border-outline-variant/40 dark:border-white/10 p-6 space-y-6 transition-colors bg-white dark:bg-[#1c1b1b] hover:border-primary/30 dark:hover:border-primary-fixed-dim/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center min-w-0 gap-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-fixed dark:bg-primary/20 shrink-0">
                    <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[28px]">
                      account_balance_wallet
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h5 className="truncate font-headline-md text-headline-md text-on-surface dark:text-white">
                      {rek.name}
                    </h5>
                    <p className="font-label-md text-label-md text-on-surface dark:text-white font-bold mt-0.5">
                      Rp {totalAset.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openModal("tambah-aset", rek.id)}
                    className="flex items-center justify-center w-10 h-10 transition-transform rounded-xl bg-surface-container dark:bg-primary/20 text-primary dark:text-primary-fixed-dim hover:opacity-80 hover:scale-105 active:scale-95"
                    title="Tambah aset"
                  >
                    <span className="material-symbols-outlined text-[22px] font-bold">
                      add
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget({
                        type: "rekening",
                        id: rek.id,
                        name: rek.name,
                        count: rek.portfolios?.length || 0,
                      })
                    }
                    className="flex items-center justify-center w-10 h-10 transition-transform rounded-xl bg-error-container/50 text-error dark:bg-error/15 dark:text-red-400 hover:opacity-80 hover:scale-105 active:scale-95"
                    title="Hapus rekening"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      delete
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex gap-4 px-2 pb-2 -mx-2 overflow-x-auto asset-scroll">
                {rek.portfolios?.map((aset: any) => (
                  <div
                    key={aset.id}
                    className="relative p-4 asset-chip rounded-xl shrink-0"
                  >
                    <div className="absolute flex gap-1 top-2 right-2">
                      <button
                        type="button"
                        onClick={() => openModal("edit-aset", rek.id, aset)}
                        className="p-0.5 text-primary hover:opacity-70 transition-transform hover:scale-110 active:scale-95"
                        title="Edit aset"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: "aset",
                            id: aset.id,
                            name: aset.assetCategory?.name || "Aset",
                            parentName: rek.name,
                          })
                        }
                        className="p-0.5 text-error hover:opacity-70 transition-transform hover:scale-110 active:scale-95"
                        title="Hapus aset"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                    {/* <span className="material-symbols-outlined text-primary/60 text-[20px] mb-2 block">
                      hub
                    </span> */}
                    <p className="pr-12 truncate font-label-md text-label-md text-on-surface dark:text-white">
                      {aset.assetCategory?.name || "Aset"}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-[#c8cedd] mt-1">
                      Rp {Number(aset.balance).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal Overlay */}
      {modalType &&
        createPortal(
          <div className="fixed inset-0 z-[999] flex items-end md:items-center justify-center p-0 md:p-6 opacity-100 visible">
            <div
              className="absolute inset-0 bg-[#141b2b]/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={closeModal}
            ></div>
            <div className="relative z-10 w-full max-w-[440px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1c1b1b] rounded-t-[24px] md:rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-bottom-4">
              <div className="w-10 h-1 mx-auto mb-6 rounded-full bg-outline-variant/50 dark:bg-white/20 md:hidden"></div>

              {modalType === "tambah-rekening" && (
                <div>
                  <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim">
                    <span className="material-symbols-outlined text-[28px]">
                      account_balance_wallet
                    </span>
                  </div>
                  <h3 className="text-center font-headline-md text-headline-md text-on-surface dark:text-white">
                    Tambah Rekening
                  </h3>
                  <p className="mt-1 mb-6 text-center font-body-sm text-body-sm text-on-surface-variant dark:text-white">
                    Buat dompet digital atau platform baru.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 dark:text-white">
                        Nama Rekening
                      </label>
                      <input
                        type="text"
                        value={namaRekening}
                        onChange={(e) => setNamaRekening(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSimpanRekening()
                        }
                        className={`w-full h-12 px-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          validationError && !namaRekening
                            ? "border-error ring-1 ring-error"
                            : "border-outline-variant dark:border-white/10"
                        }`}
                        placeholder="Contoh: BCA, Bibit..."
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 transition-colors border h-11 rounded-xl border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 dark:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleSimpanRekening}
                        disabled={isSaving}
                        className="flex items-center justify-center flex-1 gap-2 text-white transition-all h-11 rounded-xl bg-primary font-label-md hover:brightness-110 disabled:opacity-70"
                      >
                        {isSaving ? (
                          <span className="material-symbols-outlined animate-spin text-[20px]">
                            progress_activity
                          </span>
                        ) : (
                          "Simpan"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {modalType === "tambah-aset" && (
                <div>
                  <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim">
                    <span className="material-symbols-outlined text-[28px]">
                      savings
                    </span>
                  </div>
                  <h3 className="text-center font-headline-md text-headline-md text-on-surface dark:text-white">
                    Tambah Aset
                  </h3>
                  <p className="mt-1 mb-6 text-center font-body-sm text-body-sm text-on-surface-variant dark:text-white">
                    ke rekening{" "}
                    <strong className="text-primary dark:text-primary-fixed-dim">
                      {accounts.find((a) => a.id === activeAccountId)?.name}
                    </strong>
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 dark:text-white">
                        Jenis Aset
                      </label>
                      <select
                        value={jenisAset}
                        onChange={(e) => setJenisAset(e.target.value)}
                        className={`w-full h-12 px-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none ${
                          validationError && !jenisAset
                            ? "border-error ring-1 ring-error"
                            : "border-outline-variant dark:border-white/10"
                        }`}
                      >
                        <option value="" disabled>
                          Pilih Kategori
                        </option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 dark:text-white">
                        Jumlah (IDR)
                      </label>
                      <div className="relative">
                        <span className="absolute font-semibold -translate-y-1/2 left-4 top-1/2 text-primary">
                          Rp
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={jumlahAsetRaw}
                          onChange={handleJumlahChange}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSimpanAset()
                          }
                          className={`w-full h-12 pl-12 pr-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            validationError && !jumlahAsetRaw
                              ? "border-error ring-1 ring-error"
                              : "border-outline-variant dark:border-white/10"
                          }`}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 transition-colors border h-11 rounded-xl border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 dark:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleSimpanAset}
                        disabled={isSaving}
                        className="flex items-center justify-center flex-1 gap-2 text-white transition-all h-11 rounded-xl bg-primary font-label-md hover:brightness-110 disabled:opacity-70"
                      >
                        {isSaving ? (
                          <span className="material-symbols-outlined animate-spin text-[20px]">
                            progress_activity
                          </span>
                        ) : (
                          "Simpan"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {modalType === "edit-aset" && (
                <div>
                  <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim">
                    <span className="material-symbols-outlined text-[28px]">
                      edit
                    </span>
                  </div>
                  <h3 className="text-center font-headline-md text-headline-md text-on-surface dark:text-white">
                    Edit Aset
                  </h3>
                  <p className="mt-1 mb-6 text-center font-body-sm text-body-sm text-on-surface-variant dark:text-white">
                    di rekening{" "}
                    <strong className="text-primary dark:text-primary-fixed-dim">
                      {accounts.find((a) => a.id === activeAccountId)?.name}
                    </strong>
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="font-label-md text-label-md text-on-surface-variant block mb-1.5 dark:text-white">
                        Jumlah (IDR)
                      </label>
                      <div className="relative">
                        <span className="absolute font-semibold -translate-y-1/2 left-4 top-1/2 text-primary">
                          Rp
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={jumlahAsetRaw}
                          onChange={handleJumlahChange}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleUpdateAset()
                          }
                          className={`w-full h-12 pl-12 pr-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            validationError && !jumlahAsetRaw
                              ? "border-error ring-1 ring-error"
                              : "border-outline-variant dark:border-white/10"
                          }`}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 transition-colors border h-11 rounded-xl border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 dark:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdateAset}
                        disabled={isSaving}
                        className="flex items-center justify-center flex-1 gap-2 text-white transition-all h-11 rounded-xl bg-primary font-label-md hover:brightness-110 disabled:opacity-70"
                      >
                        {isSaving ? (
                          <span className="material-symbols-outlined animate-spin text-[20px]">
                            progress_activity
                          </span>
                        ) : (
                          "Simpan Perubahan"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {modalType === "kelola-aset" && (
                <div>
                  <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary/10 text-primary dark:text-primary-fixed-dim">
                    <span className="material-symbols-outlined text-[28px]">
                      settings
                    </span>
                  </div>
                  <h3 className="text-center font-headline-md text-headline-md text-on-surface dark:text-white">
                    Kelola Jenis Aset
                  </h3>
                  <p className="mt-1 mb-6 text-center font-body-sm text-body-sm text-on-surface-variant dark:text-white">
                    Atur kategori jenis aset portofolio Anda.
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleAddCategory()
                        }
                        disabled={isSaving}
                        className="w-full h-11 px-4 rounded-xl border bg-surface dark:bg-[#131313] dark:text-white border-outline-variant dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-70"
                        placeholder="Kategori baru..."
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        disabled={isSaving}
                        className="flex items-center justify-center text-white transition-all h-11 w-11 rounded-xl bg-primary hover:brightness-110 shrink-0 disabled:opacity-70"
                      >
                        {isSaving ? (
                          <span className="material-symbols-outlined animate-spin text-[20px]">
                            progress_activity
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[20px]">
                            add
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="pr-1 space-y-2 overflow-y-auto max-h-48 asset-scroll">
                      {categories.map((aset) => (
                        <div
                          key={aset.id}
                          className="flex items-center justify-between p-3 border rounded-xl border-outline-variant/40 dark:border-white/10 bg-surface-container-lowest dark:bg-dark-card"
                        >
                          <div className="flex items-center gap-3 pl-1">
                            {/* <div className="w-3 h-3 rounded-full bg-primary"></div> */}
                            <span className="font-medium font-body-sm text-on-surface dark:text-white">
                              {aset.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                type: "kategori",
                                id: aset.id,
                                name: aset.name,
                              })
                            }
                            className="p-1.5 text-on-surface-variant hover:text-error transition-colors rounded-lg hover:bg-error/10"
                            title="Hapus"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full transition-colors border h-11 rounded-xl border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 dark:text-white"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* Modal Konfirmasi Hapus */}
      {deleteTarget &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-0 md:p-6 opacity-100 visible">
            <div
              className={`absolute inset-0 transition-opacity ${
                modalType
                  ? "bg-black/20 dark:bg-black/40"
                  : "bg-[#141b2b]/40 dark:bg-black/60 backdrop-blur-sm"
              }`}
              onClick={() => !isSaving && setDeleteTarget(null)}
            ></div>
            <div className="relative z-10 w-full max-w-[400px] bg-white dark:bg-[#1c1b1b] rounded-t-[24px] md:rounded-2xl p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 md:slide-in-from-bottom-4">
              <div className="w-10 h-1 mx-auto mb-6 rounded-full bg-outline-variant/50 dark:bg-white/20 md:hidden"></div>
              <div className="flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-2xl bg-error/10 text-error dark:text-red-400">
                <span className="material-symbols-outlined text-[28px]">
                  {deleteTarget.type === "rekening"
                    ? "warning"
                    : "delete_forever"}
                </span>
              </div>
              <h3 className="text-center font-headline-md text-headline-md text-on-surface dark:text-white">
                {deleteTarget.type === "rekening"
                  ? "Hapus Rekening?"
                  : deleteTarget.type === "aset"
                  ? "Hapus Aset?"
                  : "Hapus Kategori?"}
              </h3>

              <div className="mt-2 mb-6 text-center">
                {deleteTarget.type === "rekening" && (
                  <p className="font-body-sm text-on-surface-variant dark:text-white">
                    Rekening{" "}
                    <strong className="text-on-surface dark:text-white">
                      {deleteTarget.name}
                    </strong>{" "}
                    beserta{" "}
                    <span className="font-semibold">
                      {deleteTarget.count
                        ? `${deleteTarget.count} aset`
                        : "semua aset"}
                    </span>{" "}
                    di dalamnya akan dihapus permanen.
                  </p>
                )}
                {deleteTarget.type === "aset" && (
                  <>
                    <p className="font-body-sm text-on-surface-variant">
                      <strong className="block mb-1 text-base text-on-surface dark:text-white">
                        {deleteTarget.name}
                      </strong>
                      dari rekening{" "}
                      <span className="font-semibold">
                        {deleteTarget.parentName}
                      </span>
                      . Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex gap-2 p-3 mt-4 text-left rounded-xl bg-error-container/50 dark:bg-error/10">
                      <span className="material-symbols-outlined text-error text-[20px] shrink-0">
                        warning
                      </span>
                      <p className="text-sm font-label-sm text-on-error-container dark:text-red-300">
                        Nilai aset akan dihapus dari portofolio dan grafik
                        distribusi.
                      </p>
                    </div>
                  </>
                )}
                {deleteTarget.type === "kategori" && (
                  <p className="font-body-sm text-on-surface-variant">
                    Kategori{" "}
                    <strong className="text-on-surface dark:text-white">
                      {deleteTarget.name}
                    </strong>{" "}
                    akan dihapus. Aset yang menggunakan kategori ini akan
                    kehilangan label jenisnya.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isSaving}
                  className="flex-1 transition-colors border h-11 rounded-xl border-outline-variant dark:border-white/15 font-label-md text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 disabled:opacity-70 dark:text-white"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (deleteTarget.type === "rekening")
                      handleDeleteRekening(deleteTarget.id);
                    else if (deleteTarget.type === "aset")
                      handleDeleteAset(deleteTarget.id);
                    else if (deleteTarget.type === "kategori")
                      handleDeleteCategory(deleteTarget.id);
                  }}
                  disabled={isSaving}
                  className="flex items-center justify-center flex-1 gap-2 text-white transition-all h-11 rounded-xl bg-error font-label-md hover:brightness-110 disabled:opacity-70"
                >
                  {isSaving ? (
                    <span className="material-symbols-outlined animate-spin text-[20px]">
                      progress_activity
                    </span>
                  ) : (
                    "Ya, Hapus"
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Toast Notification Custom */}
      {notification &&
        createPortal(
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] animate-in fade-in slide-in-from-top-8 duration-300">
            <div
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border ${
                notification.type === "error"
                  ? "bg-error-container text-on-error-container border-error/20 dark:bg-error/20 dark:text-red-300 dark:border-red-500/30"
                  : "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {notification.type === "error" ? "warning" : "check_circle"}
              </span>
              <p className="text-sm font-label-md">{notification.message}</p>
              <button
                onClick={() => setNotification(null)}
                className="flex items-center justify-center ml-4 hover:opacity-70"
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
