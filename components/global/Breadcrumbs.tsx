import React, { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";

type BreadcrumbsProps = {
  pages: { link: string; label: string }[];
  currentPage: string;
};

const Breadcrumbs = ({ pages, currentPage }: BreadcrumbsProps) => {
  return (
    <div className='mb-8'>
      <Breadcrumb>
        <BreadcrumbList>
          {pages.map((page, idx) => (
            <Fragment key={idx}>
              <BreadcrumbItem className='text-xl'>
                <BreadcrumbLink asChild>
                  <Link href={page.link}>{page.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))}
          <BreadcrumbItem className='text-xl'>
            <BreadcrumbPage className='capitalize'>
              {currentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
