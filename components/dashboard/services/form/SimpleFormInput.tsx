import FormError from "@/components/form/FormError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type SimpleFormInputProps = {
  label: string;
  inputType?: string;
  suffix?: string;
  prefix?: string;
  fieldName: string;
} & InputHTMLAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLTextAreaElement>;

const SimpleFormInput = ({
  label,
  inputType = "input",
  suffix,
  prefix,
  fieldName,
  ...inputProps
}: SimpleFormInputProps) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  if (inputType === "textarea") {
    return (
      <div className='flex flex-col max-w-sm gap-2'>
        <Label
          htmlFor={label}
          className='capitalize'
        >
          {label}
        </Label>
        <Textarea
          id={label}
          {...inputProps}
          {...register(fieldName)}
        />
        {errors[fieldName] && (
          <FormError>{errors[fieldName].message as string}</FormError>
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col max-w-sm gap-2'>
      <Label
        htmlFor={label}
        className='capitalize'
      >
        {label}
      </Label>
      <div className='flex'>
        {prefix && (
          <Input
            disabled
            defaultValue={prefix}
            className='rounded-r-none w-9 text-center'
          />
        )}
        <Input
          {...inputProps}
          {...register(fieldName)}
          id={label}
          className={
            prefix
              ? `rounded-l-none border-l-0 ${inputProps.className}`
              : suffix
              ? `rounded-r-none border-r-0 ${inputProps.className}`
              : inputProps.className
          }
        />
        {suffix && (
          <Input
            disabled
            defaultValue={suffix}
            className='rounded-l-none w-14 text-center'
          />
        )}
      </div>
      {errors[fieldName] && (
        <FormError>{errors[fieldName].message as string}</FormError>
      )}
    </div>
  );
};

export default SimpleFormInput;
