import { cn } from "@/lib/utils";

type SectionTypeProps = {
  title: string;
  textClasses?: string;
  barClasses?: string;
};

export const LeftSectionTitle = ({
  title,
  textClasses,
  barClasses,
}: SectionTypeProps) => {
  return (
    <div className='flex items-center px-4 gap-2 absolute top-5 left-8'>
      <div
        className={cn(
          "h-[1.5px] w-32 lg:w-56 bg-secondary-foreground",
          barClasses
        )}
      />
      <p
        className={cn(
          "text-2xl uppercase font-medium text-tertiary-foreground",
          textClasses
        )}
      >
        {title}
      </p>
    </div>
  );
};

export const RightSectionTitle = ({
  title,
  textClasses,
  barClasses,
}: SectionTypeProps) => {
  return (
    <div className='flex items-center px-4 gap-2 absolute top-5 right-8'>
      <p
        className={cn(
          "text-2xl uppercase font-medium text-tertiary-foreground",
          textClasses
        )}
      >
        {title}
      </p>
      <div
        className={cn(
          "h-[1.5px] w-32 lg:w-56 bg-secondary-foreground",
          barClasses
        )}
      />
    </div>
  );
};
