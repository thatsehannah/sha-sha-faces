'use server';

// utility function to log stuff from client components to the terminal instead
export const logToServer = async <T>(content: T) => {
  console.log(content);
};
