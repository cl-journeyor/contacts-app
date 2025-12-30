import _ from 'lodash';
import { useContext } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import { ContactContext } from '../../contexts';
import { readContacts } from '../../domain';
import { nonNull } from '../../utils';

const None = () => {
  const {
    operationTuple: [ , setOperation ],
    wrappedContactsTuple: [ , setWrappedContacts ]
  } = nonNull(useContext(ContactContext));

  const textHandlerPairs = {
    'Reset': async () => setWrappedContacts(await readContacts()),
    'Create': () => setOperation('create'),
    'Update': () => setOperation('update'),
    'Delete': () => setOperation('delete'),
    'Search': () => setOperation('search'),
    'Filter': () => setOperation('filter'),
    'Sort': () =>
      setWrappedContacts(prev => ({
        success: prev.success,
        contacts: _.orderBy(prev.contacts, c => c.name)
      }))
  };

  return (
    <HFraction>
      {
        Object.entries(textHandlerPairs)
          .map(([ text, handler ]) => (
            <Button
              key={ text }
              onClick={ handler }
            >
              { text }
            </Button>
          ))
      }
    </HFraction>
  );
};

export default None;
