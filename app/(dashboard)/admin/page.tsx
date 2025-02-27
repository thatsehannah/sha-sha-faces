import Hero from "@/components/dashboard/home/Hero";
import Container from "@/components/global/Container";
import React from "react";
import {
  fetchAllAppointments,
  fetchServiceWithAppointments,
} from "@/utils/actions";
import BusinessStats from "@/components/dashboard/home/BusinessStats";
import AppointmentOverview from "@/components/dashboard/home/AppointmentOverview";

const AdminHomePage = async () => {
  const appointments = await fetchAllAppointments();
  const services = await fetchServiceWithAppointments();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <Hero appointments={appointments} />
        <AppointmentOverview appointments={appointments} />
        <BusinessStats
          services={services}
          appointments={appointments}
        />
      </Container>
    </main>
  );
};

export default AdminHomePage;
