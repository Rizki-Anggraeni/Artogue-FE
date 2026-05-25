import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import Partners from '../components/landing/Partners'
import FeaturesSection from '../components/landing/FeaturesSection'
import GrowthSection from '../components/landing/GrowthSection'
import MobileSection from '../components/landing/MobileSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export function Landing() {
  return (
    <div className="w-full min-h-screen relative z-10 overflow-x-clip">
      <Navbar />
      <div className="pt-8">
        <HeroSection />
        <Partners />
        <FeaturesSection />
        <GrowthSection />
        <MobileSection />
        <CTASection />
      </div>
      <Footer />
    </div>
  )
}