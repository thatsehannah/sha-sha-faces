import About from '@/components/home/About';
import Hero from '@/components/home/Hero';
import Portfolio from '@/components/home/Portfolio';
import Services from '@/components/home/Services';
import Testimonies from '@/components/home/Testimonies';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Testimonies />
      <Portfolio />
      <Services />
    </>
  );
};

export default Home;
