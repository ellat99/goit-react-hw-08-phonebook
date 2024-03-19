import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contactsSlice';
//defineste componenta ca o functie care va returna elem jsx pt pagina telefonului
const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const { items: contacts } = useSelector(state => state.contacts);
  const [filter, setFilter] = useState('');
  //se incarca contactele at cand utilizatorul este autentificat,este activat atunci cand isLoggedIn se modifica sau cand dispatch este actualizat
  useEffect(() => {
    if (isLoggedIn) {
      //solicita contactele de la server
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  const handleAddContact = (name, number) => {
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={e => handleFilterChange(e.target.value)}
      />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default ContactsPage;
