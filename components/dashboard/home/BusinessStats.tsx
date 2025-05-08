"use client";

import { AppointmentWithService, ServiceWithAppointments } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ServicesPieChart from "./ServicesPieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecentAppointmentDetail from "./RecentAppointmentDetail";
import EmptyResults from "@/components/global/EmptyResults";

type BusinessStatsProps = {
  appointments: AppointmentWithService[];
  services: ServiceWithAppointments;
};

const BusinessStats = ({ appointments, services }: BusinessStatsProps) => {
  //for resolving hydration issues with pie chart
  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [isClient, setIsClient] = useState(false);

  const data = services.filter((s) => s.Appointment.length > 0);
  const chartData = data.map((service) => ({
    service: service.name,
    pieChartLabel: service.pieChartLabel,
    total: service.Appointment.length,
    fill: `hsl(var(--chart-${service.id}))`,
  }));

  const recentAppointments = appointments.filter(
    (appt) => appt.status === "Completed"
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section>
      <div className='mb-12 bg-muted md:p-12 p-3 rounded-lg w-full'>
        <p className='text-2xl font-medium mb-8'>Business Stats</p>
        <div className='flex gap-8 lg:flex-row flex-col justify-between'>
          {data.length === 0 ? (
            <EmptyResults />
          ) : (
            isClient && (
              <div className='flex-1'>
                <ServicesPieChart data={chartData} />
              </div>
            )
          )}

          <div className='flex-2'>
            <Card className='h-full'>
              <CardHeader className='pb-0'>
                <CardTitle className='text-2xl font-medium'>
                  Recent Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentAppointments.length === 0 ? (
                  <div className='my-8'>
                    <EmptyResults />
                  </div>
                ) : (
                  recentAppointments.map((appt) => (
                    <RecentAppointmentDetail
                      key={appt.id}
                      appointment={appt}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessStats;
