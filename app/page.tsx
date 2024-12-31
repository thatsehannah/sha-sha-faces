import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Portfolio from '@/components/home/Portfolio';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Testimonials />
      <Portfolio />
      <Services />
    </>
  );
};

export default Home;
