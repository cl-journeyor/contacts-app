import { useContext, useEffect } from 'react';
import Table from '../../actui/Table';
import VStack from '../../actui/VStack';
import { ContactContext } from '../../contexts';
import { readContacts } from '../../domain';
import { nonNull } from '../../utils';

const Contacts = () => {
  const {
    wrappedContactsTuple: [ wrappedContacts, setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const successComponentSwitch = (success: boolean | undefined) => {
    switch (success) {
      case true:
        return <Table rows={ wrappedContacts.contacts }/>
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

  return <VStack>{ successComponentSwitch(wrappedContacts.success) }</VStack>
};

export default Contacts;
