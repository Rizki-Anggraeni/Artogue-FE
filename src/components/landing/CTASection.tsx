import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';

const CTASection = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('artogue_token');

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
        const btn = document.getElementById('google-login-cta');
        if (btn) client.renderButton(btn, { theme: 'outline', size: 'large', shape: 'pill' });
      }
    };

    if ((window as any).google) {
      renderGoogleBtn();
    } else {
      const timer = setInterval(() => {
        if ((window as any).google) {
          clearInterval(timer);
          renderGoogleBtn();
        }
      }, 200);
      return () => clearInterval(timer);
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className="cta" id="cta">
    <div className="container mx-auto px-6 py-16">
      <div className="cta-inner text-center animate-in delay-1">
        <div className="cta-left mb-6">
          <h2 className="cta-h2 text-3xl font-bold font-headline-lg text-on-surface dark:text-white mb-4">
            Siap Mengelola Seluruh Asetmu dengan Lebih Cerdas?
          </h2>
          <p className="cta-p text-lg text-on-surface-variant dark:text-white/80 opacity-80">
            Bergabunglah sekarang dan rasakan kemudahan mengelola keuangan dalam satu aplikasi.
          </p>
        </div>
        <div className="flex justify-center mt-6">
          {isLoggedIn ? (
            <Link to="/dashboard" className="btn-cta bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 flex items-center">
              Masuk Dashboard →
            </Link>
          ) : (
            <div id="google-login-cta" className="flex items-center"></div>
          )}
        </div>
      </div>
    </div>
  </section>
  );
};

export default CTASection