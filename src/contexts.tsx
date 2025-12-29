import React, { createContext } from 'react';
import type { Contact } from './types';

const ContactContext = createContext<{
  selectedContactTuple: [
    Contact | undefined,
    React.Dispatch<React.SetStateAction<Contact | undefined>>
  ],
  wrappedContactsTuple: [
    { success?: boolean, contacts: Contact[] },
    React.Dispatch<React.SetStateAction<{ success?: boolean, contacts: Contact[] }>>
  ]
} | undefined>(undefined);

export {
  ContactContext
};
