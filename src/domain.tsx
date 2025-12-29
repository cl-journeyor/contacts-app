import { contactArraySchema } from './types';
import { parsedJsonMaybe } from './utils';

const readContacts = async () => {
  const contactString = localStorage.getItem('contacts') ?? '';
  const anyContacts = parsedJsonMaybe(contactString);
  const contactArrayValidation = contactArraySchema.safeParse(anyContacts);

  if (contactArrayValidation.success) {
    return { success: true, contacts: contactArrayValidation.data };
  }

  try {
    const contactArray = await fetch('/data/contacts.json')
      .then(raw => raw.json());

    const contactArrayValidation = contactArraySchema.safeParse(contactArray);

    if (contactArrayValidation.success) {
      const serializedContacts = JSON.stringify(contactArrayValidation.data);

      localStorage.setItem('contacts', serializedContacts);

      return { success: true, contacts: contactArrayValidation.data };
    }

    throw new Error('Object of type any didn\'t match the desired schema');
  }
  catch (e) {
    return { success: false, contacts: [] };
  }
};

export {
  readContacts
};
