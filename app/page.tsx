import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import CertificationsSection from '@/components/portfolio/CertificationsSection';
import AchievementsSection from '@/components/portfolio/AchievementsSection';
import SportsSection from '@/components/portfolio/SportsSection';
import Footer from '@/components/portfolio/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <CertificationsSection />
        <AchievementsSection />
        <SportsSection />
      </main>
      <Footer />
    </div>
  );
}
