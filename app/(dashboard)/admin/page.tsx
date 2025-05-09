import Hero from "@/components/dashboard/home/Hero";
import Container from "@/components/global/Container";
import React from "react";
import {
  fetchAllAppointments,
  fetchAllReviews,
  fetchAllTestimonials,
  fetchServiceWithAppointments,
  fetchTodaysAppointments,
} from "@/utils/actions";
import BusinessStats from "@/components/dashboard/home/BusinessStats";
import AppointmentOverview from "@/components/dashboard/home/AppointmentOverview";
import ManageReviews from "@/components/dashboard/home/ManageReviews";
import ManageTestimonials from "@/components/dashboard/home/ManageTestimonials";

const AdminHomePage = async () => {
  const appointments = await fetchAllAppointments();
  const todaysAppointments = await fetchTodaysAppointments();
  const services = await fetchServiceWithAppointments();
  const reviews = await fetchAllReviews();
  const testimonials = await fetchAllTestimonials();

  return (
    <main>
      <Container className='py-20 w-screen'>
        <Hero todaysAppointments={todaysAppointments} />
        <AppointmentOverview />
        <BusinessStats
          services={services}
          appointments={appointments}
        />
        <ManageReviews reviews={reviews} />
        <ManageTestimonials testimonials={testimonials} />
      </Container>
    </main>
  );
};

export default AdminHomePage;
