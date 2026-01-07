import type { Operation } from '../../types';
import _ from 'lodash';
import { useContext } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import { ContactContext } from '../../contexts';
import { readContacts } from '../../domain';
import { capitalize, nonNull } from '../../utils';

const None = () => {
  const {
    operationTuple: [ , setOperation ],
    selectedContactTuple: [ selectedContact ],
    wrappedContactsTuple: [ , setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const createButton = (operation: Operation, disabled?: boolean) => (
    <Button
      onClick={ () => setOperation(operation) }
      disabled={ disabled }  
    >
      { capitalize(operation) }
    </Button>
  );

  const reset = async () => setWrappedContacts(await readContacts());
  
  const sort = () =>
    setWrappedContacts(prev => ({
      success: prev.success,
      contacts: _.orderBy(prev.contacts, c => c.name)
    }));

  return (
    <HFraction>
      <Button onClick={ reset }>Reset</Button>
      { createButton('create') }
      { createButton('update', !selectedContact) }
      { createButton('delete', !selectedContact) }
      { createButton('search') }
      { createButton('filter') }
      <Button onClick={ sort }>Sort</Button>
    </HFraction>
  );
};

export default None;
