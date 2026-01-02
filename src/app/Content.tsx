import type { Operation } from '../types';
import { useContext } from 'react';
import { ContactContext } from '../contexts';
import ContactForm from './content/ContactForm';
import Contacts from './content/Contacts';
import { nonNull } from '../utils';

const Content = () => {
  const {
    operationTuple: [ operation ]
  } = nonNull(useContext(ContactContext));

  const operationComponentSwitch = (operation: Operation) => {
    switch (operation) {
      case 'create':
        return <ContactForm/>
      case 'update':
        return <ContactForm updates={ true }/>
      default:
        return <Contacts/>
    }
  };

  return operationComponentSwitch(operation);
};

export default Content;
