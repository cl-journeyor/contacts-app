import { type Contact, contactArraySchema } from './types';
import React from 'react';
import { parsedJsonMaybe } from './utils';

const loadContacts = (setWrappedContacts: React.Dispatch<React.SetStateAction<{ success?: boolean, contacts: Contact[] }>>) => {
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
