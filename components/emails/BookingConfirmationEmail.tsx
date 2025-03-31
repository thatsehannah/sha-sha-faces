import { BookingConfirmationEmailDetails } from "@/utils/types";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  // Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

type BookingConfirmationEmailProps = {
  confirmationDetails: BookingConfirmationEmailDetails;
};

export const BookingConfirmationEmail = ({
  confirmationDetails,
}: BookingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body>
        <Preview>Sha Sha Faces Booking Details</Preview>
        <Container className='w-[600px] max-w-[100%] border-[1px] border-solid border-[#432f1f]'>
          <Hr style={global.hr} />
          <Section className='p-12 text-center'>
            <div className='flex justify-center'>
              <Img
                src='https://shashafaces.com/branding/logo-color.png'
                alt='Logo'
                className='w-auto h-48'
              />
            </div>
            <Heading style={global.heading}>Thank You For Booking.</Heading>
            <Text style={global.text}>
              Hi {confirmationDetails.name}! Thank you for booking your makeup
              appointment with Sha Sha Faces! We’re so excited to bring your
              beauty vision to life.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              To ensure a smooth experience, please arrive on time with a clean,
              moisturized face. If you need to reschedule or have any questions,
              feel free to reach out at info@shashafaces.com. We can’t wait to
              see you and enhance your natural beauty!
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section className='p-8 bg-[#f2eae3]'>
            <div className='flex justify-around'>
              <div className='flex justify-center items-center'>
                <Img
                  src='https://shashafaces.com/images/email-icon.png'
                  alt='Makeup Icon'
                  className='w-auto h-36'
                />
              </div>
              <div>
                <Text
                  style={{
                    ...global.text,
                    fontSize: 18,
                    textTransform: "capitalize",
                  }}
                >
                  💭 {confirmationDetails.serviceName}
                </Text>
                <Text style={{ ...global.text, fontSize: 18 }}>
                  🗓️ {confirmationDetails.apptDate}
                </Text>
                <Text style={{ ...global.text, fontSize: 18 }}>
                  🕛 {confirmationDetails.apptTime}
                </Text>
                <Text style={{ ...global.text, fontSize: 18 }}>
                  📍 {confirmationDetails.apptLocation}
                </Text>
                {/* <div className='grid place-items-center'>
                  <Link className='border text-lg p-2 w-[220px] block text-center bg-[#432f1f] text-[#f2eae3] rounded-lg mt-8'>
                    Add To Calendar
                  </Link>
                </div> */}
              </div>
            </div>
          </Section>
          <Section className='p-8'>
            <Row>
              <Text style={{ ...footer.text }}>
                Please contact us if you have any questions. (If you reply to
                this email, we will not be able to see it.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                © {new Date().getFullYear()} Sha Sha Faces, LLC. All Rights
                Reserved.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

BookingConfirmationEmail.PreviewProps = {
  confirmationDetails: {
    name: "Jane Doe",
    apptDate: "Wednesday, March 26, 2025",
    apptLocation: "Los Angeles, CA",
    apptTime: "1:00 PM",
    serviceName: "Full Glam Makeup Application",
  },
} satisfies BookingConfirmationEmailProps;

export default BookingConfirmationEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#000",
    fontWeight: "500",
    fontSize: "16px",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};
