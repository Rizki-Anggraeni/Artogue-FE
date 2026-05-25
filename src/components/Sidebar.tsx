export function Sidebar() {
  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', active: true },
    { label: 'Rekening & Aset', icon: 'account_balance_wallet', active: false },
    { label: 'Histori Transaksi', icon: 'receipt_long', active: false },
    { label: 'Pengaturan', icon: 'settings', active: false },
  ];

  return (
    <aside className="w-64 border-r border-outline-variant/30 dark:border-white/10 bg-surface-container-lowest dark:bg-dark-surface hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 transition-colors duration-300">
      {/* Menu Navigasi */}
      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              item.active
                ? 'bg-primary-container dark:bg-primary/20 text-on-primary-container dark:text-inverse-primary font-bold shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-variant dark:hover:bg-white/5 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-label-md text-base">{item.label}</span>
          </a>
        ))}
      </nav>
      
      {/* Tombol Logout (Bawah) */}
      <div className="p-4 border-t border-outline-variant/30 dark:border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-error dark:text-red-400 hover:bg-error-container/50 dark:hover:bg-red-500/10 transition-colors duration-200">
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span className="font-label-md text-base">Keluar</span>
        </button>
      </div>
    </aside>
  );
}