import _ from 'lodash';
import { useEffect, useContext } from 'react';
import Table from '../../actui/Table';
import VStack from '../../actui/VStack';
import { ContactContext } from '../../contexts';
import { readContacts } from '../../domain';

const Contacts = () => {
  const [
    wrappedContacts,
    setWrappedContacts
  ] = useContext(ContactContext)!.wrappedContactsTuple;

  const successComponentSwitch = _.cond([
    [ _.matches(true), _.constant(<Table rows={ wrappedContacts.contacts }/>) ],
    [ _.matches(false), _.constant(<h1>Error while fetching the contacts</h1>) ],
    [ _.stubTrue, _.constant(<h1>Loading contacts...</h1>) ]
  ]);

  useEffect(() => {
    const setWrappedContactsAsync = async () => setWrappedContacts(await readContacts());

    setWrappedContactsAsync();
  }, []);

  return <VStack>{ successComponentSwitch(wrappedContacts.success) }</VStack>
};

export default Contacts;
