import ManageAvailabilityCard from "@/components/dashboard/info/ManageAvailabilityCard";
import ManagePortfolioCard from "@/components/dashboard/info/ManagePortfolioCard";
import Container from "@/components/global/Container";
import { Separator } from "@/components/ui/separator";
import { fetchAllPhotos, fetchWeeklyAvailability } from "@/utils/actions";
import React from "react";

const AdminInfoPage = async () => {
  const photos = await fetchAllPhotos();
  const availability = await fetchWeeklyAvailability();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw] flex flex-col gap-8'>
        <p className='text-4xl lg:text-5xl font-normal'>My Information</p>
        <Separator />
        <div>
          <ManageAvailabilityCard availability={availability} />
        </div>
        <div>
          <ManagePortfolioCard photos={photos} />
        </div>
      </Container>
    </main>
  );
};

export default AdminInfoPage;
