import React, { useState } from 'react';
import css from './Styles.module.css'
import { nanoid } from "nanoid";
import PropTypes from 'prop-types'

const ContactForm = ({ handleAddContact, onSubmit, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 
  
  const handleChange = e => {
    setName(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const obj = {id: nanoid(), name: name, number: number };
 
    onSubmit(obj);
    if (contacts.find(contact => contact.name === name)) {
      return;
    }
    reset();
  }

  const reset = () => {
    setName('');
    setNumber('');
   }

   return (
      <form className={css.wrapper} onSubmit={handleSubmit}>
        <label className={css.label} htmlFor="nameInputId">
          Name{' '}
          <input
            className={css.input}
            id="nameInputId"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />{' '}
        </label>
        <label className={css.label} htmlFor="numberInputId">
          Phone
          <input
            className={css.input}
            id="numberInputId"
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />{' '}
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    )
  
}
ContactForm.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func.isRequired,
  }
  
  export default ContactForm;