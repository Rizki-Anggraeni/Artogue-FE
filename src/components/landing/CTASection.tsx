const CTASection = () => (
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
        <button className="btn-cta bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90" id="btn-cta-main">
          Mulai Gratis Sekarang →
        </button>
      </div>
    </div>
  </section>
)

export default CTASection