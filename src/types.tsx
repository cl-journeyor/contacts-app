type Contact = {
  id: number,
  color: 'red' |
    'orange' |
    'yellow' |
    'green' |
    'skyblue' |
    'blue' |
    'violet' |
    'brown' |
    'white' |
    'gray' |
    'black',
  name: string,
  phone: string,
  email: string,
  groups: string[]
};

const DEFAULT_CONTACT: Contact = {
  id: 0,
  color: 'white',
  name: '',
  phone: '',
  email: '',
  groups: []
};

const newDefaultContact = (): Contact => ({ ...DEFAULT_CONTACT });
