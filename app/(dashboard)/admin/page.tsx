import Hero from "@/components/dashboard/home/Hero";
import Container from "@/components/global/Container";
import React from "react";
import {
  fetchAllAppointments,
  fetchAllReviews,
  fetchServiceWithAppointments,
} from "@/utils/actions";
import BusinessStats from "@/components/dashboard/home/BusinessStats";
import AppointmentOverview from "@/components/dashboard/home/AppointmentOverview";
import ReviewDetail from "@/components/dashboard/home/ReviewDetail";

const AdminHomePage = async () => {
  const appointments = await fetchAllAppointments();
  const services = await fetchServiceWithAppointments();
  const reviews = await fetchAllReviews();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <Hero appointments={appointments} />
        <AppointmentOverview appointments={appointments} />
        <BusinessStats
          services={services}
          appointments={appointments}
        />
        <ReviewDetail reviews={reviews} />
      </Container>
    </main>
  );
};

export default AdminHomePage;
