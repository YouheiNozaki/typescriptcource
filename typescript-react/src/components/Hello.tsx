import React from 'react';
type HelloProps = {
  message: string;
};

export const Hello = (props: HelloProps) => {
  return <h1>Hello {props.message}</h1>;
};
