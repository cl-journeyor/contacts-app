import { useContext } from 'react';
import { ContactContext } from '../contexts';
import Contacts from './content/Contacts';

const Content = () => {
  const operation = useContext(ContactContext)!.operationTuple[0];

  return [ 'create', 'update' ].includes(operation)
  ?
    <h1>Form here</h1>
  :
    <Contacts/>
};

export default Content;
