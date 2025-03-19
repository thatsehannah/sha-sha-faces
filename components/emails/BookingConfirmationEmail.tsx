import { AppointmentWithService } from "@/utils/types";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import React from "react";

type BookingConfirmationEmailProps = {
  appointmentDetails: AppointmentWithService;
};

export const BookingConfirmationEmail = ({
  appointmentDetails,
}: BookingConfirmationEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body>
        <Preview>Sha Sha Faces Booking Details</Preview>
        <Container style={container}>
          <Section className='p-8 bg-[#f2eae3]'>
            <Row>
              <Column>
                <Text style={global.paragraphWithBold}>
                  Appointment Booked 💋
                </Text>
              </Column>
              <Column align='right'>
                <Link className='border text-lg p-2 w-[220px] block text-center bg-[#432f1f] text-[#f2eae3] rounded-lg'>
                  Add To Calendar
                </Link>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />
          <Section className='p-12 text-center'>
            <Row className='flex justify-center'>
              <Img
                src={`https://wdnowudpuwirpcddozlf.supabase.co/storage/v1/object/public/branding/logo-color.png`}
                alt='Logo'
                className='w-auto h-48'
              />
            </Row>
            <Heading style={global.heading}>Thank You For Booking.</Heading>
            <Text style={global.text}>
              Hi {appointmentDetails.name} Thank you for booking your makeup
              appointment with Sha Sha Faces! We’re so excited to bring your
              beauty vision to life.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              To ensure a smooth experience, please arrive on time with a clean,
              moisturized face. If you need to reschedule or have any questions,
              feel free to reach out at shashafaces@gmail.com. We can’t wait to
              see you and enhance your natural beauty!
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section className='p-8 bg-[#f2eae3]'>
            <Text style={{ ...global.text, fontSize: 14 }}>
              Date: Monday, March 17, 2025
            </Text>
            <Text style={{ ...global.text, fontSize: 14 }}>Time: 10:30 AM</Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              Location: 2125 Chestnut St, San Francisco, CA 94123
            </Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              Booked On: Sunday, March 16, 2025
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section
            style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
          >
            <Row>
              <Column>
                <Img
                  src={`https://wdnowudpuwirpcddozlf.supabase.co/storage/v1/object/public/branding/logo-color.png`}
                  alt='Logo'
                  className='w-auto h-32'
                />
              </Column>
              <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                <Text style={{ ...paragraph, fontWeight: "500" }}>
                  Full Glam Makeup Application
                </Text>
              </Column>
            </Row>
          </Section>
          <Hr style={{ ...global.hr, marginTop: "12px" }} />
          <Section className='p-8 bg-[#f2eae3]'>
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
    color: "#747474",
    fontWeight: "500",
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

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const recomendationsText = {
  margin: "0",
  fontSize: "15px",
  lineHeight: "1",
  paddingLeft: "10px",
  paddingRight: "10px",
};

const recomendations = {
  container: {
    padding: "20px 0",
  },
  product: {
    verticalAlign: "top",
    textAlign: "left" as const,
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  title: { ...recomendationsText, paddingTop: "12px", fontWeight: "500" },
  text: {
    ...recomendationsText,
    paddingTop: "4px",
    color: "#747474",
  },
};

const menu = {
  container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
  },
  content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
  },
  tel: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "32px",
    paddingBottom: "22px",
  },
};

const categories = {
  container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
  },
  text: {
    fontWeight: "500",
    color: "#000",
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
