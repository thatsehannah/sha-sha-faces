import Hero from "@/components/dashboard/home/Hero";
import Container from "@/components/global/Container";
import React from "react";
import {
  fetchAllAppointments,
  fetchAllReviews,
  fetchServiceWithAppointments,
  fetchTodaysAppointments,
} from "@/utils/actions";
import BusinessStats from "@/components/dashboard/home/BusinessStats";
import AppointmentOverview from "@/components/dashboard/home/AppointmentOverview";
import ReviewDetail from "@/components/dashboard/home/ReviewDetail";
import UploadTestimonalForm from "@/components/dashboard/home/UploadTestimonalForm";

const AdminHomePage = async () => {
  const appointments = await fetchAllAppointments();
  const todaysAppointments = await fetchTodaysAppointments();
  const services = await fetchServiceWithAppointments();
  const reviews = await fetchAllReviews();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <Hero todaysAppointments={todaysAppointments} />
        <AppointmentOverview appointments={appointments} />
        <BusinessStats
          services={services}
          appointments={appointments}
        />
        <ReviewDetail reviews={reviews} />
        <UploadTestimonalForm />
      </Container>
    </main>
  );
};

export default AdminHomePage;
