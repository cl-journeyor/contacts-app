import React, { Children } from 'react';

const HFraction = <T,>(
  props: T & {
    children?: React.ReactNode,
    className?: string,
    style?: object
  }
) => {
  const childCount = Children.count(props.children);
  
  return (
    <div
      {
        ...{
          ...props,
          className: `h-fraction ${ props.className }`,
          style: {
            ...props.style,
            gridTemplateColumns: '1fr '.repeat(childCount)
          }
        }
      }
    />
  );
};

export default HFraction;
