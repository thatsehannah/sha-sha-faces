import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Portfolio from '@/components/home/Portfolio';
import SectionBreaker from '@/components/home/SectionBreaker';
import Services from '@/components/home/Services';
import Shop from '@/components/home/Shop';
import Reviews from '@/components/home/Reviews';

const Home = () => {
  return (
    <>
      <Hero />
      <SectionBreaker />
      <About />
      <Reviews />
      <Portfolio />
      <Services />
      <Shop />
    </>
  );
};

export default Home;
