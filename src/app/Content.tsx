import { useContext } from 'react';
import { ContactContext } from '../contexts';
import Contacts from './content/Contacts';
import { nonNull } from '../utils';

const Content = () => {
  const {
    operationTuple: [ operation ]
  } = nonNull(useContext(ContactContext));

  return [ 'create', 'update' ].includes(operation)
  ?
    <h1>Form here</h1>
  :
    <Contacts/>
};

export default Content;
