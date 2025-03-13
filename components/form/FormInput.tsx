import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import FormError from "./FormError";

type FormInputProps = {
  name: string;
  label: string;
  type?: "input" | "textarea" | "checkbox";
  placeholder?: string;
};

const FormInput = ({
  name,
  label,
  placeholder,
  type = "input",
}: FormInputProps) => {
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  if (type === "checkbox") {
    const checked = watch(name);

    return (
      <div className='flex flex-col justify-center'>
        <div className='flex items-center gap-2'>
          <Checkbox
            id={name}
            name={name}
            checked={checked}
            onCheckedChange={(value) => {
              setValue(name, value);
              clearErrors(name);
            }}
          />
          <Label
            htmlFor={name}
            className='text-lg text-foreground'
          >
            {label}
          </Label>
        </div>
        {errors[name] && (
          <FormError>{errors[name].message as string}</FormError>
        )}
      </div>
    );
  }

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
        {type === "input" && (
          <Input
            id={name}
            {...register(name)}
            placeholder={placeholder}
            className='h-12 mt-2 text-black placeholder:text-gray-500 dark:placeholder:text-gray-700 placeholder:text-xl placeholder:font-extralight border-black border-x-0 border-t-0 shadow-none rounded-none text-xl md:text-2xl font-semibold'
          />
        )}
        {type === "textarea" && (
          <Textarea
            id={name}
            {...register(name)}
            placeholder={placeholder}
            className='h-32 mt-2 text-black placeholder:text-gray-500 dark:placeholder:text-gray-700 placeholder:text-xl placeholder:font-extralight border-black shadow-none rounded-md text-xl md:text-lg font-semibold'
          />
        )}
        {errors[name] && (
          <FormError>{errors[name].message as string}</FormError>
        )}
      </div>
    </div>
  );
};

export default FormInput;
