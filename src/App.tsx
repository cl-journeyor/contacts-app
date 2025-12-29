import type { Contact, Operation, WrappedContacts } from './types';
import { useState } from 'react';
import VStack from './actui/VStack';
import { ContactContext } from './contexts';
import Footer from './app/Footer';
import Header from './app/Header';
import './actui/index.css';

const App = () => {
  const operationTuple = useState<Operation>('none');
  const selectedContactTuple = useState<Contact | undefined>(undefined);
  const wrappedContactsTuple = useState<WrappedContacts>({
    success: undefined,
    contacts: []
  });

  return (
    <VStack>
      <Header/>
      <ContactContext.Provider
        value={ { operationTuple, selectedContactTuple, wrappedContactsTuple } }
      >
        <Footer/>
      </ContactContext.Provider>
    </VStack>
  );
};

export default App;
