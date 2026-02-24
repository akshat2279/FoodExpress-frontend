/* eslint-disable @typescript-eslint/no-explicit-any */

export const withData = (data: any) => {
  return { data, error: null };
};

export const withError = (error: any) => {
  return { data: null, error };
};
