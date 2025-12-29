import React, { createContext } from 'react';
import type { Contact, Operation, WrappedContacts } from './types';

const ContactContext = createContext<{
  operationTuple: [
    Operation,
    React.Dispatch<React.SetStateAction<Operation>>
  ],
  selectedContactTuple: [
    Contact | undefined,
    React.Dispatch<React.SetStateAction<Contact | undefined>>
  ],
  wrappedContactsTuple: [
    WrappedContacts,
    React.Dispatch<React.SetStateAction<WrappedContacts>>
  ]
} | undefined>(undefined);

export {
  ContactContext
};
