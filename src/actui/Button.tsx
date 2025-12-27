const Button = <T,>(props: T) =>
  <button { ...{ ...props, type: 'button' } }/>

export default Button;
