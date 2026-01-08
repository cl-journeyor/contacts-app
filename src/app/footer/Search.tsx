import React, { useContext, useRef } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import { ContactContext } from '../../contexts';
import { nonNull } from '../../utils';

const Search = () => {
  const {
    operationTuple: [ , setOperation ],
    selectedContactTuple: [ selectedContact, setSelectedContact ],
    wrappedContactsTuple: [ wrappedContacts, setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const originalContactsRef = useRef([ ...wrappedContacts.contacts ]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();

    if (searchInput === '') {
      setWrappedContacts(prev => ({
        success: prev.success,
        contacts: originalContactsRef.current
      }));

      return;
    }

    const searchResults = originalContactsRef.current
      .filter(c => c.name.toLowerCase().includes(searchInput));

    setWrappedContacts(prev => ({
      success: prev.success,
      contacts: searchResults
    }));

    if (selectedContact && !searchResults.some(c => c.id === selectedContact.id)) {
      setSelectedContact(undefined);
    }
  };

  const cancel = () => {
    setWrappedContacts(prev => ({
      success: prev.success,
      contacts: originalContactsRef.current
    }));
    setOperation('none');
  };

  return (
    <HFraction>
      <Button onClick={ cancel }>Cancel</Button>
      Search
      <input
        type='text'
        onChange={ search }
      />
    </HFraction>
  );
};

export default Search;
