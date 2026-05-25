import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function TopBar() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Cek tema saat komponen pertama kali dirender
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk mengubah class di <html> agar variabel CSS & Tailwind mendeteksi mode
  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      html.classList.add('light');
      setIsDark(false);
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header 
      className={`sticky z-50 transition-all duration-500 ease-in-out mx-auto ${
        isScrolled
          ? 'top-4 w-[92%] max-w-5xl bg-surface/70 dark:bg-dark-surface/70 backdrop-blur-md border border-outline-variant/30 dark:border-white/10 shadow-lg rounded-2xl'
          : 'top-0 w-full max-w-full bg-surface dark:bg-dark-surface border border-transparent border-b-outline-variant/30 dark:border-transparent dark:border-b-white/10 rounded-none'
      }`}
    >
      <div className={`flex justify-between items-center w-full mx-auto max-w-5xl transition-all duration-500 ease-in-out ${
        isScrolled ? 'px-6 md:px-8 py-2.5' : 'px-6 md:px-12 lg:px-16 py-4'
      }`}>
        <div>
          <Link to="/" className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim font-bold tracking-wide hover:opacity-80 no-underline">Artogue</Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-on-surface-variant mt-0.5">
            Halo, <span className="font-semibold text-on-surface dark:text-white">Pengguna</span>
          </p>
        </div>
        
        <div className="flex items-center gap-6 md:gap-8">
          <div className="relative hidden md:block">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-outline-variant text-[20px]">search</span>
            <input
              className="pl-11 pr-4 py-2.5 bg-surface-container-lowest dark:bg-dark-card border border-outline-variant dark:border-white/10 rounded-full text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-56 lg:w-80 dark:text-white transition-all duration-300"
              placeholder="Search assets..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-all flex items-center justify-center rounded-full hover:bg-surface-variant/50 dark:hover:bg-white/5"
              aria-label="Toggle Dark Mode"
            >
              <span className="material-symbols-outlined text-[22px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button className="p-2 text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-all flex items-center justify-center rounded-full hover:bg-surface-variant/50 dark:hover:bg-white/5" title="Notifikasi">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <button className="p-2 text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-all flex items-center justify-center rounded-full hover:bg-surface-variant/50 dark:hover:bg-white/5" title="Bantuan">
              <span className="material-symbols-outlined text-[22px]">help</span>
            </button>
            <div className="h-6 w-[1px] bg-outline-variant dark:bg-white/10 mx-1 md:mx-2"></div>
            <button className="text-on-surface-variant dark:text-on-surface-variant hover:text-error dark:hover:text-red-400 font-label-md text-label-md transition-all ml-1 px-3 py-2 rounded-lg hover:bg-error-container/50 dark:hover:bg-red-500/10">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}