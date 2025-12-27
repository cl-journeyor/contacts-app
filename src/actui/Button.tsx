const Button = <T,>(
  props: T & {
    className?: string
  }
) => (
  <button
    {
      ...{
        ...props,
        className: `button ${ props.className }`,
        type: 'button'
      }
    }
  />
);

export default Button;
