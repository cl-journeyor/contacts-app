import { useContext, useRef } from 'react';
import Button from '../../actui/Button';
import ColorPicker from '../../actui/ColorPicker';
import HFraction from '../../actui/HFraction';
import HStack from '../../actui/HStack';
import { ContactContext } from '../../contexts';
import { nonNull } from '../../utils';

const Filter = () => {
  const {
    operationTuple: [ , setOperation ],
    selectedContactTuple: [ selectedContact, setSelectedContact ],
    wrappedContactsTuple: [ wrappedContacts, setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const originalContactsRef = useRef([ ...wrappedContacts.contacts ]);

  const filter = (t: { name: string, value: string }) => {
    const filteredContacts = originalContactsRef.current
      .filter(c => c.color === t.value);

    setWrappedContacts(prev => ({
      success: prev.success,
      contacts: filteredContacts
    }));

    if (selectedContact && !filteredContacts.some(c => c.id === selectedContact.id)) {
      setSelectedContact(undefined);
    }
  };

  const cancel = () => {
    setWrappedContacts(prev => ({
      success: prev.success,
      contacts: originalContactsRef.current
    }));
    setOperation('none');
  };

  return (
    <HFraction className='footer'>
      <Button className='secondary-button' onClick={ cancel }>Cancel</Button>
      <HStack className='footer-label-container'>
        <label>Choose color</label>
      </HStack>
      <ColorPicker
        colors={ [
          'red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'violet',
          'brown', 'white', 'gray', 'black'
        ] }
        classes={ { self: 'color-picker', buttons: 'color-picker-button' } }
        onChange={ filter }
      />
    </HFraction>
  );
};

export default Filter;
