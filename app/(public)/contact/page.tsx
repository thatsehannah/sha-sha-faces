import AppointmentForm from "@/components/contact/AppointmentForm";
import Container from "@/components/global/Container";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import {
  fetchBookingInstructions,
  fetchServiceInfo,
  fetchWeeklyAvailability,
} from "@/utils/actions";
import React, { Suspense } from "react";

const ContactPage = async () => {
  const serviceData = await fetchServiceInfo();
  const weeklyAvailabilityData = await fetchWeeklyAvailability();
  const bookingInstructionsData = await fetchBookingInstructions().then(
    (data) => data!.map((inst) => inst.rule)
  );

  if (serviceData.length === 0) {
    return (
      <p>
        Something went wrong. We are working to get this issue resolved quickly.
      </p>
    );
  }

  return (
    <main className='relative'>
      <LeftSectionTitle title='booking form' />
      <Container className='py-20 flex flex-col justify-center items-center '>
        <Suspense>
          <AppointmentForm
            serviceData={serviceData}
            weeklyAvailability={weeklyAvailabilityData}
            bookingInstructions={bookingInstructionsData}
          />
        </Suspense>
      </Container>
    </main>
  );
};

export default ContactPage;
