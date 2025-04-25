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
import ReviewDetail from "@/components/dashboard/home/ReviewDetail";
import ManageTestimonial from "@/components/dashboard/home/ManageTestimonial";

const AdminHomePage = async () => {
  const appointments = await fetchAllAppointments();
  const todaysAppointments = await fetchTodaysAppointments();
  const services = await fetchServiceWithAppointments();
  const reviews = await fetchAllReviews();
  const testimonials = await fetchAllTestimonials();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <Hero todaysAppointments={todaysAppointments} />
        <AppointmentOverview />
        <BusinessStats
          services={services}
          appointments={appointments}
        />
        <ReviewDetail reviews={reviews} />
        <ManageTestimonial testimonials={testimonials} />
      </Container>
    </main>
  );
};

export default AdminHomePage;
