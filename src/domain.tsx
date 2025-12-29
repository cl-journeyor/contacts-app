import { useContext } from 'react';
import { ContactContext } from './contexts';
import { contactArraySchema } from './types';
import { parsedJsonMaybe } from './utils';

const loadContacts = () => {
  const contactContextValueMaybe = useContext(ContactContext);

  if (contactContextValueMaybe === undefined) {
    throw new Error('Cannot invoke `loadContacts` in the current scope');
  }

  const { wrappedContactsTuple: [ , setWrappedContacts ] } = contactContextValueMaybe;
  const FAILED_WRAPPED_CONTACTS = {
    success: false,
    contacts: []
  };

  const contactString = localStorage.getItem('contacts') ?? '[]';
  const anyContacts = parsedJsonMaybe(contactString);
  const contactArrayValidation = contactArraySchema.safeParse(anyContacts);

  if (contactArrayValidation.success) {
    setWrappedContacts({
      success: true,
      contacts: contactArrayValidation.data
    });

    return;
  }

  fetch('/data/contacts.json')
  .then(raw => raw.json())
  .then(obj => {
    const contactArrayValidation = contactArraySchema.safeParse(obj);

    if (contactArrayValidation.success) {
      const serializedContacts = JSON.stringify(contactArrayValidation.data);

      localStorage.setItem('contacts', serializedContacts);
      setWrappedContacts({
        success: true,
        contacts: contactArrayValidation.data
      });
    }
    else {
      setWrappedContacts(FAILED_WRAPPED_CONTACTS);
    }
  })
  .catch(() => setWrappedContacts(FAILED_WRAPPED_CONTACTS));
};

export {
  loadContacts
};
