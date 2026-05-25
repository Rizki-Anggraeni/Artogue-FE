import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { api } from '../../lib/api';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('artogue_token');

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render tombol Google Sign-In yang andal jika pengguna belum login
  useEffect(() => {
    const renderGoogleBtn = () => {
      if (!isLoggedIn && (window as any).google) {
        const client = (window as any).google.accounts.id;
        client.initialize({
          client_id: '876130856435-311pf6cq1jjvpuduvqktg3irc6r934ck.apps.googleusercontent.com',
          callback: async (response: any) => {
            if (response.credential) {
              try {
                const res = await api.post('/auth/google', { token: response.credential });
                localStorage.setItem('artogue_token', res.data.token);
                localStorage.setItem('artogue_user_name', res.data.user.name);
                navigate('/dashboard');
              } catch (error) {
                console.error('Proses otentikasi ke backend gagal', error);
              }
            }
          },
        });
        const btn = document.getElementById('google-login-nav');
        if (btn) client.renderButton(btn, { theme: isDark ? 'filled_black' : 'outline', size: 'large', shape: 'pill' });
      }
    };

    if ((window as any).google) {
      renderGoogleBtn();
    } else {
      // Tunggu hingga script Google dimuat
      const timer = setInterval(() => {
        if ((window as any).google) {
          clearInterval(timer);
          renderGoogleBtn();
        }
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isLoggedIn, isDark, navigate]);

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
          : 'top-0 w-full max-w-full bg-transparent border border-transparent border-b-outline-variant/30 dark:border-transparent dark:border-b-white/10 rounded-none'
      }`}
    >
      <div className={`flex justify-between items-center w-full mx-auto max-w-5xl transition-all duration-500 ease-in-out ${
        isScrolled ? 'px-6 md:px-8 py-2.5' : 'px-6 md:px-12 lg:px-16 py-4'
      }`}>
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-bold text-xl tracking-tight text-on-surface dark:text-white">Artogue</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm text-on-surface-variant dark:text-white/80 font-semibold">
          <a href="#fitur" className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">Fitur</a>
          <a href="#pertumbuhan" className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">Pertumbuhan</a>
          <a href="#mitra" className="hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">Mitra</a>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-on-surface-variant dark:text-white/80 hover:text-primary dark:hover:text-primary-fixed-dim transition-all flex items-center justify-center rounded-full hover:bg-surface-variant/50 dark:hover:bg-white/10"
            aria-label="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-[22px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>
          
          {isLoggedIn ? (
            <Link to="/dashboard" className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:brightness-110 text-sm">
              Masuk Dashboard
            </Link>
          ) : (
            <div id="google-login-nav"></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;