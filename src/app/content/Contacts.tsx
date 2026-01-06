import type { Contact } from '../../types';
import { useContext, useEffect } from 'react';
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

  const successComponentSwitch = (success: boolean | undefined) => {
    switch (success) {
      case true:
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
      case false:
        return <h1>Error while fetching the contacts</h1>
      default:
        return <h1>Loading contacts...</h1>
    }
  };

  useEffect(() => {
    const setWrappedContactsAsync = async () => setWrappedContacts(await readContacts());

    setWrappedContactsAsync();
  }, []);

  return (
    <VStack className='contacts'>
      { successComponentSwitch(wrappedContacts.success) }
    </VStack>
  );
};

export default Contacts;
