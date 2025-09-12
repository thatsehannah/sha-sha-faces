"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleX } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormMultiselectDropdownProps = {
  label: string;
  values: string[];
  placeholder: string;
};

const FormMultiselectDropdown = ({
  label,
  values,
  placeholder,
}: FormMultiselectDropdownProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <div className='mb-8'>
      <div>
        <Label className='text-black text-lg'>{label}</Label>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-full text-2xl mt-2 focus:ring-1 focus:ring-ring focus:outline-none ring-offset-background rounded-md'>
            <Input
              className='border-black h-12 placeholder:text-xl cursor-pointer md:text-xl'
              placeholder={placeholder}
              value={`${
                selectedOptions.length
              } ${label.toLowerCase()} selected`}
              readOnly
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            {values.map((opt, idx) => (
              <DropdownMenuCheckboxItem
                key={idx}
                onCheckedChange={() =>
                  setSelectedOptions((prevState) => [...prevState, opt])
                }
                className='text-lg capitalize'
                checked={selectedOptions.includes(opt)}
                disabled={selectedOptions.includes(opt)}
                onSelect={(e) => e.preventDefault()}
              >
                {opt}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {selectedOptions.length > 0 && (
        <div className='flex flex-wrap gap-4 mt-4'>
          {selectedOptions.map((sOpt, idx) => (
            <div
              key={idx}
              className='border-[1px] border-black p-2 rounded-md flex justify-center gap-2 bg-tertiary'
            >
              <p className='capitalize'>{sOpt}</p>
              <CircleX
                className='cursor-pointer'
                onClick={() =>
                  setSelectedOptions((prevState) =>
                    prevState.filter((o) => o !== sOpt)
                  )
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormMultiselectDropdown;
