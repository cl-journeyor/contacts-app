const HStack = <T,>(
  props: T & {
    className?: string
  }
) => (
  <div
    {
      ...{
        ...props,
        className: `h-stack ${ props.className }`
      }
    }
  />
);

export default HStack;
