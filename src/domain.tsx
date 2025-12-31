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
    const response = await fetch('/data/contacts.json');
    const contactArray = await response.json();
    const contactArrayValidation = contactArraySchema.safeParse(contactArray);

    if (contactArrayValidation.success) {
      const serializedContacts = JSON.stringify(contactArrayValidation.data);

      localStorage.setItem('contacts', serializedContacts);

      return { success: true, contacts: contactArrayValidation.data };
    }

    throw new Error('Fetched data didn\'t match the desired schema');
  }
  catch (e) {
    return { success: false, contacts: [] };
  }
};

export {
  readContacts
};
