import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { PortfolioPhoto } from "@prisma/client";

type PhotoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photo: PortfolioPhoto;
};

const PhotoDialog = ({ open, onOpenChange, photo }: PhotoDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='max-h-[90vh] py-4'>
        <DialogTitle className='hidden'>Portfolio</DialogTitle>
        <div className='relative h-full w-full flex items-center justify-center overflow-hidden'>
          <Image
            src={photo.url}
            alt={photo.alt}
            width={500}
            height={500}
            className='object-cover w-full h-full rounded-sm'
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoDialog;
