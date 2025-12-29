import _ from 'lodash';
import { useContext } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import { ContactContext } from '../../contexts';
import { loadContacts } from '../../domain';

const None = () => {
  const contactContextValueMaybe = useContext(ContactContext);
  const setOperation = contactContextValueMaybe!.operationTuple[1];
  const setWrappedContacts = contactContextValueMaybe!.wrappedContactsTuple[1];

  const textHandlerPairs = {
    'Reset': () => loadContacts(),
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
