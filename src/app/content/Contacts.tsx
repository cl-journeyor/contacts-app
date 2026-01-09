import type { Contact } from '../../types';
import { useContext, useEffect } from 'react';
import HStack from '../../actui/HStack';
import Table from '../../actui/Table';
import VStack from '../../actui/VStack';
import { ContactContext } from '../../contexts';
import { readContacts } from '../../domain';
import { nonNull } from '../../utils';

const Contacts = () => {
  const {
    selectedContactTuple: [ , setSelectedContact ],
    wrappedContactsTuple: [ wrappedContacts, setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const contactToRow = (contact: Contact) => ({
    '': (
      <input
        name='contact'
        className='radio'
        type='radio'
        onChange={ () => setSelectedContact(contact) }
      />
    ),
    color: (
      <svg height='16' width='16' xmlns='http://www.w3.org/2000/svg'>
        <circle r='8' cx='8' cy='8' fill={ contact.color }/>
        { contact.color }
      </svg>
    ),
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    groups: contact.groups.join(', '),
    id: contact.id
  });

  const wrappedComponentCond = () => {
    if (wrappedContacts.success && wrappedContacts.contacts.length > 0) {
      return (
        <Table
          rows={ wrappedContacts.contacts.map(contactToRow) }
          keySelector={ c => c.id }
          classes={ {
            cells: 'table-cells',
            labels: 'table-labels'
          } }
        />
      );
    }
    switch (wrappedContacts.success) {
      case true:
        return (
          <HStack className='contacts-message-container'>
            No contacts found
          </HStack>
        );
      case false:
        return (
          <HStack className='contacts-message-container'>
            Error while fetching the contacts
          </HStack>
        );
      default:
        return (
          <HStack className='contacts-message-container'>
            Loading contacts...
          </HStack>
        );
    }
  };

  useEffect(() => {
    const setWrappedContactsAsync = async () =>
      setWrappedContacts(await readContacts());

    setWrappedContactsAsync();
  }, []);

  return (
    <VStack className='content'>
      { wrappedComponentCond() }
    </VStack>
  );
};

export default Contacts;
