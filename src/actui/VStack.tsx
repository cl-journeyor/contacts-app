const VStack = <T,>(
  props: T & {
    className?: string
  }
) => (
  <div
    {
      ...{
        ...props,
        className: `v-stack ${ props.className }`
      }
    }
  />
);

export default VStack;
