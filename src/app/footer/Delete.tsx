import { useContext } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import HStack from '../../actui/HStack';
import { ContactContext } from '../../contexts';
import { writeContacts } from '../../domain';
import { nonNull } from '../../utils';

const Delete = () => {
  const {
    operationTuple: [ , setOperation ],
    selectedContactTuple: [ selectedContact, setSelectedContact ],
    wrappedContactsTuple: [ wrappedContacts, setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const doDelete = () => {
    const contactToDelete = nonNull(selectedContact);
    const updatedContacts = wrappedContacts.contacts
      .filter(c => c.id !== contactToDelete.id);
    
    writeContacts(updatedContacts);

    setOperation('none');
    setSelectedContact(undefined);
    setWrappedContacts({
      success: wrappedContacts.success,
      contacts: updatedContacts
    });
  };

  const cancel = () => setOperation('none');

  return (
    <HFraction className='footer'>
      <HStack className='footer-label-container'>
        <label>Delete selected contact?</label>
      </HStack>
      <Button className='secondary-button' onClick={ cancel }>No</Button>
      <Button className='primary-button' onClick={ doDelete }>Yes</Button>
    </HFraction>
  );
};

export default Delete;
