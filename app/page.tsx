import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Portfolio from '@/components/home/Portfolio';
import SectionBreaker from '@/components/home/SectionBreaker';
import Services from '@/components/home/Services';
import Shop from '@/components/home/Shop';
import Testimonials from '@/components/home/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <SectionBreaker />
      <About />
      <Testimonials />
      <Portfolio />
      <Services />
      <Shop />
    </>
  );
};

export default Home;
