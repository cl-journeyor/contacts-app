import { useContext } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
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
    <HFraction>
      Delete selected contact?
      <Button onClick={ cancel }>No</Button>
      <Button onClick={ doDelete }>Yes</Button>
    </HFraction>
  );
};

export default Delete;
