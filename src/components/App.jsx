import React, { useState, useEffect } from 'react'
import ContactForm from './Contacts/ContactsForm';
import ContactList from './Contacts/ContactList';
import { Filter } from './Contacts/FilterContacts';


const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

    const changeFilter = e => {
      setFilter(e.currentTarget.value );
    };

    const handleSubmit = obj => {
     
      const checkContact = contacts.find(
        contact => contact.name.toLowerCase() === obj.name.toLowerCase()
      );
      if (!checkContact) {
        setContacts( contacts => [...contacts, obj] );
        // console.log(obj)
        return;
      }
      alert(`${obj.name} is already in contacts `);
    }

    const deleteContact = id => {
      setContacts(contacts => contacts.filter(el => el.id !== id));
    }

    const visibileContacts = () => {
     
      const normalize = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalize)
      );
    };
    
      
      
      return (
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={handleSubmit} contacts={contacts} />
          <h2>Contacts</h2>
          <Filter filterName={changeFilter} value={filter} />
          <ContactList
            contacts={visibileContacts()}
            onDelete={deleteContact}
          />
        </div>
      );
    
};
export default App;