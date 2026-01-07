import { z } from 'zod';

// Schemas

export const contactSchema = z.object({
  id: z.number(),
  color: z.enum([
    'red', 'orange', 'yellow', 'green', 'skyblue', 'blue', 'violet', 'brown',
    'white', 'gray', 'black'
  ]),
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  groups: z.array(z.string())
});

export const contactArraySchema = z.array(contactSchema);


// Types

export type Contact = z.infer<typeof contactSchema>;

export type Operation = 'none' | 'create' | 'update' | 'delete' | 'search' | 'filter';

export type WrappedContacts = { success?: boolean, contacts: Contact[] };
