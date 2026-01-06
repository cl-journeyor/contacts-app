import React, { useContext, useState } from 'react';
import ColorPicker from '../../actui/ColorPicker';
import VStack from '../../actui/VStack';
import { ContactContext } from '../../contexts';
import { nonNull } from '../../utils';

const ContactForm = ({ updates }: { updates?: boolean }) => {
  const [ form, setForm ] = useState({
    color: 'red',
    name: '',
    phone: '',
    email: '', // Optional
    groups: '' // Optional
  });

  const onChangeHandler = (target: { name: string, value: string }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(form));
  };

  return (
    <form className='contact-form' onSubmit={ submit }>
      <VStack className='field-group'>
        <label>Color</label>
        <ColorPicker
          name='color'
          colors={ [
            'red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'violet',
            'brown', 'white', 'gray', 'black'
          ] }
          classes={ { self: 'color-picker', buttons: 'color-picker-button' } }
          onChange={ onChangeHandler }
          value={ form.color }
        />
      </VStack>
      <VStack className='field-group'>
        <label htmlFor='nameField'>Name</label>
        <input
          id='nameField'
          name='name'
          className='text-field'
          type='text'
          required={ true }
          onChange={ e => onChangeHandler(e.target) }
        />
      </VStack>
      <VStack className='field-group'>
        <label htmlFor='phoneField'>Phone number</label>
        <input
          id='phoneField'
          name='phone'
          className='text-field'
          type='tel'
          required={ true }
          onChange={ e => onChangeHandler(e.target) }
        />
      </VStack>
      <VStack className='field-group'>
        <label htmlFor='emailField'>Email address (optional)</label>
        <input
          id='emailField'
          name='email'
          className='text-field'
          type='email'
          onChange={ e => onChangeHandler(e.target) }
        />
      </VStack>
      <VStack className='field-group'>
        <label htmlFor='groupsField'>Groups, separated by a line break (optional)</label>
        <textarea
          id='groupsField'
          name='groups'
          className='text-field'
          rows={ 3 }
          onChange={ e => onChangeHandler(e.target) }
          placeholder='For ex.: family'
        />
      </VStack>
      <VStack>
        <button className='submit-button'>Create</button>
      </VStack>
    </form>
  );
};

export default ContactForm;
