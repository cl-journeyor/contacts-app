import React, { useContext, useState } from 'react';
import ColorPicker from '../../actui/ColorPicker';
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
    <form onSubmit={ submit }>
      <span>Choose color:</span>
      <ColorPicker
        name='color'
        colors={ [
          'red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'violet',
          'brown', 'white', 'gray', 'black'
        ] }
        onChange={ onChangeHandler }
        value={ form.color }
      />
      <label>
        Enter name:&nbsp;
        <input
          name='name'
          type='text'
          required={ true }
          onChange={ e => onChangeHandler(e.target) }
        />
      </label>
      <br/>
      <label>
        Enter phone number:&nbsp;
        <input
          name='phone'
          type='tel'
          required={ true }
          onChange={ e => onChangeHandler(e.target) }
        />
      </label>
      <br/>
      <label>
        Enter email address (optional):&nbsp;
        <input
          name='email'
          type='email'
          onChange={ e => onChangeHandler(e.target) }
        />
      </label>
      <br/>
      <label htmlFor='groupsField'>
        Enter groups, separated by a line break (optional):&nbsp;
      </label>
      <br/>
      <textarea
        id='groupsField'
        name='groups'
        onChange={ e => onChangeHandler(e.target) }
        placeholder='For ex.: family'
      />
      <br/>
      <button>Create</button>
    </form>
  );
};

export default ContactForm;
