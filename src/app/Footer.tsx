// Filter by color
// Search by name
import type { Operation } from '../types';
import { useContext } from 'react';
import { ContactContext } from '../contexts';
import { nonNull } from '../utils';
import CreateOrUpdate from './footer/CreateOrUpdate';
import Delete from './footer/Delete';
import Filter from './footer/Filter';
import None from './footer/None';
import Search from './footer/Search';

const Footer = () => {
  const {
    operationTuple: [ operation ]
  } = nonNull(useContext(ContactContext));

  const operationComponentSwitch = (operation: Operation) => {
    switch (operation) {
      case 'delete':
        return <Delete/>
      case 'filter':
        return <Filter/>
      case 'none':
        return <None/>
      case 'search':
        return <Search/>
      default:
        return <CreateOrUpdate/>
    }
  };

  return operationComponentSwitch(operation);
};

export default Footer;
