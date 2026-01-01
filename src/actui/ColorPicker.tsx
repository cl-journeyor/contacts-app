import React, { useState } from 'react';

const ColorPicker = ({ colors, caretColor, className, name = '', onChange = _ => {} }: {
  colors: string[],
  caretColor?: string,
  className?: string,
  name?: string,
  onChange?: (target: { name: string, value: string }) => void
}) => {
  const [ selection, setSelection ] = useState<HTMLButtonElement | undefined>(undefined);
  const uniqueColors = new Set(colors);

  const handler = ({ target }: React.MouseEvent<HTMLButtonElement>) => {
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    if (selection && selection !== target) {
      selection.className = 'color-picker-deselected';
    }
    if (target.className === 'color-picker-deselected') {
      target.className = 'color-picker-selected';

      onChange({ name: name, value: target.value });      
      setSelection(target);
    }
  };

  return (
    <div className={ `color-picker ${ className }` }>
      {
        [ ...uniqueColors ].map(c => (
          <button
            key={ c }
            style={ {
              background: c,
              borderColor: caretColor
            } }
            className='color-picker-deselected'
            type='button'
            value={ c }
            onClick={ handler }
          />
        ))
      }
    </div>
  );
};

export default ColorPicker;
