import { Appointment as NewAppointment } from "@/utils/types";
import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Link,
} from "@react-email/components";
import React from "react";

type NewAppointmentEmailProps = {
  newAppointment: NewAppointment;
};

export const NewAppointmentEmail = ({
  newAppointment,
}: NewAppointmentEmailProps) => {
  const {
    time,
    date,
    location,
    name,
    requiresTravel,
    addtlDetails,
    email,
    phoneNumber,
    service,
    discovery,
    id,
  } = newAppointment;

  return (
    <Html>
      <Head />
      <Preview>New Appointment Created</Preview>
      <Tailwind>
        <Body>
          <Container>
            <Section className='p-4 rounded-lg flex justify-center'>
              <Img
                src='https://www.shashafaces.com/branding/logo-color.png'
                alt='Logo'
                className='w-auto h-48'
              />
            </Section>

            <Section className='border rounded-lg'>
              <Row>
                <Column>
                  <Container className='my-4'>
                    <Text className='text-3xl mb-8'>
                      <u>{name}</u> has booked a{" "}
                      <b className='capitalize'>{service}</b> appointment!
                    </Text>
                    <Text className='text-lg'>
                      <b>Location: </b>
                      {location}
                    </Text>
                    <Text className='text-lg'>
                      <b>Requires Travel: </b>
                      {requiresTravel ? "Yes" : "No"}
                    </Text>
                    <Text className='text-lg'>
                      <b>Date: </b>
                      {date}
                    </Text>
                    <Text className='text-lg'>
                      <b>Time: </b>
                      {time}
                    </Text>
                    <Text className='text-lg'>
                      <b>Email: </b>
                      {email}
                    </Text>
                    <Text className='text-lg'>
                      <b>Phone Number: </b>
                      {phoneNumber}
                    </Text>
                    <Text className='text-lg capitalize'>
                      <b>Discovery source: </b>
                      {discovery}
                    </Text>
                    {addtlDetails && (
                      <Text className='text-lg'>
                        <b>Details: </b>

                        {addtlDetails}
                      </Text>
                    )}
                  </Container>
                </Column>
              </Row>
              <Row>
                <Column
                  className='flex'
                  colSpan={2}
                >
                  <Link
                    className='bg-[#432f1f] rounded-md text-white cursor-pointer p-3'
                    href={`https://www.shashafaces.com/admin/appointments/${id}`}
                  >
                    Go To Appointment
                  </Link>
                </Column>
              </Row>
            </Section>
            <hr />
            <Text className='text-center text-xs text-gray-500'>
              © {new Date().getFullYear()} | Sha Sha Faces | www.shashafaces.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewAppointmentEmail.PreviewProps = {
  newAppointment: {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    phoneNumber: "2314567890",
    instagram: "@janedoe",
    isInstructionsAcknowledged: true,
    location: "Los Angeles, CA",
    date: "Tuesday, March 18, 2025",
    time: "10:00 AM",
    discovery: "Website",
    service: "Full Glam Makeup Application",
    requiresTravel: true,
    addtlDetails: "Test test test test test",
    id: "c1469bcc-8f26-4197-be7f-9fe83813ad49",
  },
} satisfies NewAppointmentEmailProps;

export default NewAppointmentEmail;
