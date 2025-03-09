import AppointmentForm from "@/components/contact/AppointmentForm";
import Container from "@/components/global/Container";
import LeftSectionTitle from "@/components/global/LeftSectionTitle";
import { fetchServiceInfo, fetchWeeklyAvailability } from "@/utils/actions";
import React, { Suspense } from "react";

const ContactPage = async () => {
  const serviceData = await fetchServiceInfo();
  const weeklyAvailability = await fetchWeeklyAvailability();

  return (
    <main className='relative'>
      <LeftSectionTitle title='booking an appointment' />
      <Container className='py-20 flex flex-col justify-center items-center'>
        <Suspense>
          <AppointmentForm
            serviceData={serviceData}
            weeklyAvailability={weeklyAvailability}
          />
        </Suspense>
      </Container>
    </main>
  );
};

export default ContactPage;
