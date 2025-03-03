import React from "react";

type EmptyResultsProps = {
  text?: string;
};

const EmptyResults = ({ text = "Nothing to see here" }: EmptyResultsProps) => {
  return (
    <div>
      <h2 className='text-center text-lg'>{text}</h2>
    </div>
  );
};

export default EmptyResults;
