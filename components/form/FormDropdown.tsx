import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import FormError from "./FormError";

type FormDropwdownProps = {
  name: string;
  label: string;
  values: string[];
  placeholder?: string;
};

const FormDropdown = ({
  name,
  label,
  values,
  placeholder,
}: FormDropwdownProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const selectedValue = watch(name);

  return (
    <div className='mb-8'>
      <div>
        <Label
          htmlFor={name}
          className='text-black text-lg'
        >
          {label}
        </Label>
      </div>
      <div>
        <Select
          name={name}
          onValueChange={(value) => {
            setValue(name, value);
            clearErrors(name);
          }}
          value={selectedValue}
        >
          <SelectTrigger className='h-12 mt-2 border-black capitalize text-black text-xl md:text-2xl font-semibold data-[placeholder]:text-gray-500 data-[placeholder]:text-xl data-[placeholder]:normal-case data-[placeholder]:font-extralight'>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className='capitalize text-lg'>
            {values.map((value, idx) => {
              let isDisabled = false;

              if (value.includes(":") && value.endsWith("d")) {
                isDisabled = true;
                value = value.replace("d", "");
              }

              return (
                <SelectItem
                  value={value}
                  key={idx}
                  disabled={isDisabled}
                  className={`capitalize text-lg font-medium ${
                    isDisabled && "line-through"
                  }`}
                >
                  {value}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {errors[name] && (
          <FormError>{errors[name].message as string}</FormError>
        )}
      </div>
    </div>
  );
};

export default FormDropdown;
