import Hero from "@/components/dashboard/home/Hero";
import Overview from "@/components/dashboard/home/Overview";
import Container from "@/components/global/Container";
import React from "react";
import {
  fetchAllAppointments,
  fetchServiceWithAppointments,
} from "@/utils/actions";

const AdminHomePage = async () => {
  const allAppointments = await fetchAllAppointments();

  const services = await fetchServiceWithAppointments();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <Hero />
        <Overview
          allAppointments={allAppointments}
          allServices={services}
        />
      </Container>
    </main>
  );
};

export default AdminHomePage;
