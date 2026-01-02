import React, { useRef } from 'react';

const ColorPicker = ({
  colors, caretColor, className, name = '', onChange = _ => {}, value
}: {
  colors: string[],
  caretColor?: string,
  className?: string,
  name?: string,
  onChange?: (target: { name: string, value: string }) => void,
  value?: string
}) => {
  const selectionRef = useRef(document.createElement('button'));
  const uniqueColors = [ ...new Set(colors) ];

  const handler = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    if (selectionRef.current !== target) {
      selectionRef.current.className = 'color-picker-deselected';
    }
    if (target.className === 'color-picker-deselected') {
      target.className = 'color-picker-selected';

      onChange({ name: name, value: target.value });
      selectionRef.current = target;
    }
  };

  const colorToButton = (color: string) => {
    const commonProps = {
      style: { background: color, borderColor: caretColor },
      value: color,
      onClick: handler
    };

    return color === value
    ? (
      <button
        ref={ selectionRef }
        key={ color }
        className='color-picker-selected'
        type='button'
        { ...commonProps }
      />
    )
    : (
      <button
        key={ color }
        className='color-picker-deselected'
        type='button'
        { ...commonProps }
      />
    );
  };

  return (
    <div className={ `color-picker ${ className }` }>
      { uniqueColors.map(colorToButton) }
    </div>
  );
};

export default ColorPicker;
