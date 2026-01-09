import React, { useContext, useState } from 'react';
import ColorPicker from '../../actui/ColorPicker';
import HStack from '../../actui/HStack';
import VStack from '../../actui/VStack';
import { ContactContext } from '../../contexts';
import { contactSchema } from '../../types';
import { writeContacts } from '../../domain';
import { nonNull } from '../../utils';

const ContactForm = ({ updates }: { updates?: boolean }) => {
  const contactContext = nonNull(useContext(ContactContext));

  const determineInitialFormValues = () => {
    if (updates) {
      const {
        color, name, phone, email, groups
      } = nonNull(contactContext.selectedContactTuple[0]);

      return { color, name, phone, email, groups: groups.join('\n') };
    }

    return {
      color: 'red',
      name: '',
      phone: '',
      email: '', // Optional
      groups: '' // Optional
    };
  };

  const [ form, setForm ] = useState(determineInitialFormValues());

  const onChangeHandler = (target: { name: string, value: string }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const create = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      operationTuple: [ , setOperation ],
      selectedContactTuple: [ , setSelectedContact ],
      wrappedContactsTuple: [ { contacts } ]
    } = contactContext;
    const nextId = (contacts.length && Math.max(...contacts.map(c => c.id))) + 1;
    const unsafeContact = {
      id: nextId,
      color: form.color,
      name: form.name,
      phone: form.phone,
      email: form.email,
      groups: form.groups.split('\n')
    };
    const contactValidation = contactSchema.safeParse(unsafeContact);

    if (contactValidation.success) {
      writeContacts([ ...contacts, contactValidation.data ]);
    }

    setSelectedContact(undefined);
    setOperation('none');
  };

  const update = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      operationTuple: [ , setOperation ],
      selectedContactTuple: [ selectedContact, setSelectedContact ],
      wrappedContactsTuple: [ wrappedContacts ]
    } = contactContext;
    const unsafeContact = {
      id: nonNull(selectedContact).id,
      color: form.color,
      name: form.name,
      phone: form.phone,
      email: form.email,
      groups: form.groups.split('\n')
    };
    const contactValidation = contactSchema.safeParse(unsafeContact);

    if (contactValidation.success) {
      const updatedContact = contactValidation.data;

      writeContacts(
        wrappedContacts.contacts
          .map(c => c.id === updatedContact.id ? updatedContact : c)
      );
    }

    setSelectedContact(undefined);
    setOperation('none');
  };

  return (
    <form className='content' onSubmit={ updates ? update : create }>
      <VStack className='field-group'>
        <label className='form-label'>Color</label>
        <ColorPicker
          name='color'
          colors={ [
            'red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'violet',
            'brown', 'white', 'gray', 'black'
          ] }
          classes={ { buttons: 'color-picker-button' } }
          onChange={ onChangeHandler }
          value={ form.color }
        />
      </VStack>
      <VStack className='field-group'>
        <label
          htmlFor='nameField'
          className='form-label'
        >
          Name
        </label>
        <input
          id='nameField'
          name='name'
          className='text-field'
          type='text'
          required={ true }
          onChange={ e => onChangeHandler(e.target) }
          value={ form.name }
        />
      </VStack>
      <VStack className='field-group'>
        <label
          htmlFor='phoneField'
          className='form-label'
        >
          Phone number
        </label>
        <input
          id='phoneField'
          name='phone'
          className='text-field'
          type='tel'
          required={ true }
          onChange={ e => onChangeHandler(e.target) }
          value={ form.phone }
        />
      </VStack>
      <VStack className='field-group'>
        <label
          htmlFor='emailField'
          className='form-label'
        >
          Email address (optional)
        </label>
        <input
          id='emailField'
          name='email'
          className='text-field'
          type='email'
          onChange={ e => onChangeHandler(e.target) }
          value={ form.email }
        />
      </VStack>
      <VStack className='field-group'>
        <label
          htmlFor='groupsField'
          className='form-label'
        >
          Groups, separated by a line break (optional)
        </label>
        <textarea
          id='groupsField'
          name='groups'
          className='text-field'
          rows={ 3 }
          onChange={ e => onChangeHandler(e.target) }
          placeholder='For ex.: family'
          value={ form.groups }
        />
      </VStack>
      <HStack className='submit-button-container'>
        <button className='submit-button'>{ updates ? 'Update' : 'Create' }</button>
      </HStack>
    </form>
  );
};

export default ContactForm;
