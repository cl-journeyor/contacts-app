import React, { useRef } from 'react';

const ColorPicker = ({
  colors, classes, name = '', onChange = _ => {}, value
}: {
  colors: string[],
  classes?: {
    self?: string,
    buttons?: string
  },
  name?: string,
  onChange?: (target: { name: string, value: string }) => void,
  value?: string
}) => {
  const selectionRef = useRef(document.createElement('button'));
  const uniqueColors = [ ...new Set(colors) ];
  const selectedClass = `color-picker-selected ${ classes?.buttons }`;
  const deselectedClass = `color-picker-deselected ${ classes?.buttons }`;

  const handler = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    if (selectionRef.current !== target) {
      selectionRef.current.className = deselectedClass;
    }
    if (target.className.startsWith('color-picker-deselected')) {
      target.className = selectedClass;

      onChange({ name: name, value: target.value });
      selectionRef.current = target;
    }
  };

  const colorToButton = (color: string) => {
    const commonProps = {
      style: { background: color },
      value: color,
      onClick: handler
    };

    return color === value
    ? (
      <button
        ref={ selectionRef }
        key={ color }
        className={ selectedClass }
        type='button'
        { ...commonProps }
      />
    )
    : (
      <button
        key={ color }
        className={ deselectedClass }
        type='button'
        { ...commonProps }
      />
    );
  };

  return (
    <div className={ `color-picker ${ classes?.self }` }>
      { uniqueColors.map(colorToButton) }
    </div>
  );
};

export default ColorPicker;
