import { useContext } from 'react';
import Button from '../../actui/Button';
import HFraction from '../../actui/HFraction';
import { ContactContext } from '../../contexts';
import { nonNull } from '../../utils';

const CreateOrUpdate = () => {
  const {
    operationTuple: [ , setOperation ],
    selectedContactTuple: [ , setSelectedContact ]
  } = nonNull(useContext(ContactContext));

  const cancel = () => {
    setSelectedContact(undefined);
    setOperation('none');
  };

  return (
    <HFraction>
      <Button onClick={ cancel }>Cancel</Button>
    </HFraction>
  );
};

export default CreateOrUpdate;
