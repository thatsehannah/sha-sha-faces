"use client";

import React, { useEffect, useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import OverviewCard from "../components/OverviewCard";
import { AppointmentWithService, ServiceWithAppointments } from "@/utils/types";
import ServicesPieChart from "./ServicesPieChart";
import RecentAppointmentDetail from "./RecentAppointmentDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OverviewProps = {
  allAppointments: AppointmentWithService[];
  allServices: ServiceWithAppointments;
};

const Overview = ({ allAppointments, allServices }: OverviewProps) => {
  //for resolving hydration issues with pie chart
  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [isClient, setIsClient] = useState(false);

  const pendingAppointmentCount = allAppointments.filter(
    (appt) => appt.status === "Pending"
  ).length;
  const confirmedAppointmentCount = allAppointments.filter(
    (appt) => appt.status === "Confirmed"
  ).length;
  const completedAppointmentCount = allAppointments.filter(
    (appt) => appt.status === "Completed"
  ).length;
  const cancelledAppointmentCount = allAppointments.filter(
    (appt) => appt.status === "Cancelled"
  ).length;

  const today = new Date().toLocaleDateString();
  // console.log(today);

  const todayAppointments = allAppointments.filter(
    (appt) => appt.date === today && appt.status === "Confirmed"
  );
  const recentAppointments = allAppointments.filter(
    (appt) => appt.status === "Completed"
  );

  const data = allServices.filter((s) => s.Appointment.length > 0);
  const chartData = data.map((service) => ({
    service: service.name,
    total: service.Appointment.length,
    fill: `hsl(var(--chart-${service.id}))`,
  }));

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section>
      <div className='mb-24 w-[100vw] lg:w-auto'>
        <p className='font-normal text-2xl mb-6'>Your day at a glance:</p>
        {todayAppointments.length === 0 ? (
          <p className='text-center font-medium text-foreground text-xl tracking-wide bg-gradient-to-r from-background via-secondary to-background rounded-md p-4'>
            No appointments today.
          </p>
        ) : (
          todayAppointments.map((appt, idx) => (
            <AppointmentCard
              key={idx}
              appointment={appt}
            />
          ))
        )}
      </div>
      <div className='mb-12 bg-muted p-12 rounded-lg w-[100vw] lg:w-auto'>
        <p className='text-2xl font-medium mb-8'>Appointment Overview</p>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 lg:gap-x-12 lg:gap-y-8 '>
          <OverviewCard
            title='Pending'
            value={pendingAppointmentCount}
          />
          <OverviewCard
            title='Confirmed'
            value={confirmedAppointmentCount}
          />
          <OverviewCard
            title='Completed'
            value={completedAppointmentCount}
          />
          <OverviewCard
            title='Canceled'
            value={cancelledAppointmentCount}
          />
        </div>
      </div>

      <div className='flex gap-8 lg:flex-row flex-col bg-muted p-12 rounded-lg'>
        {isClient && (
          <div>
            <ServicesPieChart data={chartData} />
          </div>
        )}

        <div className=''>
          <Card className='h-full'>
            <CardHeader className='pb-0'>
              <CardTitle className='text-2xl font-medium'>
                Recent Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentAppointments.map((appt) => (
                <RecentAppointmentDetail
                  key={appt.id}
                  appointment={appt}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Overview;
