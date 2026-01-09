import React, { useContext, useRef } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import HStack from '../../actui/HStack';
import VStack from '../../actui/VStack';
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
    const searchInput = e.target.value.toLocaleLowerCase();

    if (searchInput === '') {
      setWrappedContacts(prev => ({
        success: prev.success,
        contacts: originalContactsRef.current
      }));

      return;
    }

    const searchResults = originalContactsRef.current
      .filter(c => c.name.toLocaleLowerCase().includes(searchInput));

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
    <HFraction className='footer'>
      <Button className='secondary-button' onClick={ cancel }>Cancel</Button>
      <HStack className='footer-label-container'>
        <label htmlFor='searchField'>Search</label>
      </HStack>
      <VStack className='search-field-container'>
        <input
          id='searchField'
          className='text-field'
          type='text'
          onChange={ search }
          autoFocus={ true }
        />
      </VStack>
    </HFraction>
  );
};

export default Search;
